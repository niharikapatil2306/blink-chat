import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import ChatBox from "./Chatbox";
import { Col, Container, Row } from "react-bootstrap";
import RoomsList from "./RoomsList";
import { auth, db } from "../firebase";
import Welcome from "./Welcome";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import RoomCreation from "./RoomCreation";

export default function Room() {

    const { roomId } = useParams();
    let roomInUser = false
    const [show, setshow] = useState(false)

    const fetchRooms = async () => {
        try {
            const rooms = await getDoc(doc(collection(db, "rooms"), roomId));
            if (rooms.exists()) {
                const display = () => rooms.data().users.includes(auth.currentUser.uid);
                roomInUser = display();
            }
        } catch (err) {
            console.log(`Error getting documents ${err}`);
        }
        setshow(roomInUser) 
    };

    useEffect(() => {

            const unsubscribe = onSnapshot((collection(db, 'rooms')), (snapshot) => {
                if(roomId){
                fetchRooms();
                }
                
            });
            return () => unsubscribe();

    }, [auth.currentUser, roomId]);

    return (

        <>
            {auth.currentUser ?
                    <div className="flex flex-col h-screen w-screen">
                        <Navigation />
                        <Container fluid className="flex flex-1 w-full g-0 overflow-hidden ">
                            <Row className="w-full g-0">
                                <Col xs={4} className="bg-[#baaad4] bg-opacity-40">
                                    <RoomsList />
                                </Col>
                                <Col className="h-full">
                                    {show?
                                    (roomId? 
                                         <ChatBox roomId={roomId} />
                                         :
                                        <RoomCreation />
                                    )
                                    :
                                    <RoomCreation />
                                    }
                                </Col>
                            </Row>
                        </Container>

                    </div>
                :
                <p>loading...</p>
            }
        </>
    );
}
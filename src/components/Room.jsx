import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import ChatBox from "./Chatbox";
import { Col, Container, Row } from "react-bootstrap";
import RoomsList from "./RoomsList";
import { auth, db } from "../firebase";
import Welcome from "./Welcome";
import Join from "./Join";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

export default function Room() {

    const { roomId } = useParams();

    const [roomInUser, setRoomInUser] = useState(false)

    const fetchRooms = async () => {
        const roomsRef = collection(db, "rooms")
        const roomsSnapshot = await getDocs(roomsRef);
        const roomList = roomsSnapshot.docs.map((doc) => {
            const currentUserInRoom = doc.data().users && doc.data().users.some(uid => uid === auth.currentUser.uid);
            setRoomInUser(currentUserInRoom)
        });
    };

    useEffect(() => {
        if (auth.currentUser) {
            const unsubscribe = onSnapshot((collection(db, 'rooms')), (snapshot) => {
                fetchRooms();
                
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser, roomInUser]);

    return (

        <>
            {auth.currentUser ?
                (roomInUser ?
                    <div className="flex flex-col h-screen w-screen">
                        <Navigation />
                        <Container fluid className="flex flex-1 w-full g-0 ">
                            <Row className="w-full g-0">
                                <Col xs={4} className="bg-[#baaad4] bg-opacity-40">
                                    <RoomsList />
                                </Col>
                                <Col>
                                    <ChatBox roomId={roomId} />
                                </Col>
                            </Row>
                        </Container>

                    </div>
                    :
                    <Join roomId={roomId} />
                )
                :
                <Welcome />
            }
        </>
    );
}
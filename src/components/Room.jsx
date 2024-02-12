import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import ChatBox from "./Chatbox";
import { Col, Container, Row } from "react-bootstrap";
import RoomsList from "./RoomsList";
import { auth } from "../firebase";
import Welcome from "./Welcome";

export default function Room() {

    const { roomId } = useParams();


    return (

        <>
            {auth.currentUser ?
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
                <Welcome />
            }
        </>
    );
}
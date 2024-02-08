import { Col, Container, Row } from "react-bootstrap";
import Navigation from "./Navigation";
import RoomsList from "./RoomsList";

export default function Home() {


    return (
        <>
            <Navigation />
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <RoomsList />
                    </Col>
                    <Col>
                    hii
                    </Col>
                </Row>
            </Container>
        </>
    );
}
import { Button, Container } from "react-bootstrap";
import Navigation from "./Navigation";
import google from "../assets/google.svg";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useState } from "react";

export default function Welcome(props) {

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };


    return (
        <Container fluid className="h-screen g-0 flex flex-col">
            <Navigation />
            <div className="flex-grow flex flex-wrap justify-center content-center">
                {auth.currentUser ?
                    (<></>)
                    :
                    (
                        <Button onClick={handleClick}
                            className="rounded-md font-semibold flex bg-[#c2a0b6] border-0 hover:bg-[#baaad4] activebutton">
                            <img src={google} alt="" />
                            <p className="mx-2 my-auto">
                                Sign in with Google
                            </p>
                        </Button>
                    )}
            </div>
        </Container>
    );
}
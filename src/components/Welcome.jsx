import { Button, Container } from "react-bootstrap";
import Navigation from "./Navigation";
import google from "../assets/google.svg";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function Welcome(props) {

    const [user] = useAuthState(auth);

    const handleClick = () =>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }


    return(
        <Container fluid className="h-screen g-0 flex flex-col">
            <Navigation />
            <div className="flex-grow flex flex-wrap justify-center content-center">
                {user?
                (<></>)
                :
                (
                    <Button onClick={handleClick} 
                        className="bg-blue-100 flex border-0">
                        <img src={google} alt="" />
                        Sign in with Google
                    </Button>
                )}
            </div>
        </Container>
    );
}
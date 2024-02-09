import { Button, Container } from "react-bootstrap";
import Navigation from "./Navigation";
import google from "../assets/google.svg";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc } from "firebase/firestore";

export default function Welcome(props) {

    const [user] = useAuthState(auth);

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const credential = await signInWithRedirect(auth, provider);
            navigate('/');
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
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Navigation from "./Navigation";
import { Button } from "react-bootstrap";
import { doc, arrayUnion, collection, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

export default function Join(props) {

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {  
           if(auth.currentUser){
            const roomRef = doc(collection(db, "rooms"), props.roomId)

            await updateDoc(roomRef, {
                users: arrayUnion(auth.currentUser.uid)
            });
            navigate(`/room/${props.roomId}`);
            }
            console.log(roomRef.data())
        }
        catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    return(
        <>
        <Navigation />
        <div className="flex-grow flex flex-wrap justify-center content-center">
                {auth.currentUser?
                (
                    <Button onClick={handleClick} 
                    className="rounded-md font-semibold flex bg-[#c2a0b6] border-0 hover:bg-[#baaad4] activebutton">
                        <p className="mx-2 my-auto">
                        Join Chat Room
                        </p>
                    </Button>
                )
                :
                (<></>)
                }
            </div>
        </>
    );
    
}
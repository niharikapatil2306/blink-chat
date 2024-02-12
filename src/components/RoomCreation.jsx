import { Button, Form, FormControl } from "react-bootstrap";
import Navigation from "./Navigation";
import { useState } from "react";
import { addDoc, collection, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function RoomCreation() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        
           if(auth.currentUser){
            const roomRef = await addDoc(collection(db, "rooms"), {
                creatorId: auth.currentUser.uid,
                roomName: name,
                roomDescription: description,
                users: [auth.currentUser.uid]
            })

            await updateDoc(roomRef, {
                roomId: roomRef.id
            });
            const roomdata =await getDoc(roomRef,roomRef.id)

            navigate(`/room/${roomRef.id}`);
            }else{
                navigate('/')
            }

        }

        catch (error) {
            console.error('Error: ', error);
        }
    };


    return (
        <>
            <Navigation />
            <Form className="my-8" onSubmit={handleSubmit}>
                <FormControl type="text" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Enter Room Name" />

                <FormControl type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)} placeholder="Enter Room Description" />

                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
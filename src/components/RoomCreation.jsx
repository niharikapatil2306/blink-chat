import { Button, Form, FormControl } from "react-bootstrap";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import Select from "react-select";

export default function RoomCreation() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState('');

    const [selectedEmail, setSelectedEmail] = useState([]);
    const [emailOptions, setEmailOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const usersRef = collection(db, 'users');
                const querySnapshot = await getDocs(usersRef);
                const options = querySnapshot.docs
                .filter(doc => doc.id !== auth.currentUser.uid)
                .map(doc => ({
                    value: doc.id,
                    label: doc.data().email
                }));
                setEmailOptions(options);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
        fetchEmails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (auth.currentUser) {
                const usersIds = selectedEmail.map(user => user.value);
                const roomRef = await addDoc(collection(db, "rooms"), {
                    creatorId: auth.currentUser.uid,
                    roomName: name,
                    roomDescription: description,
                    users: [ ...usersIds, auth.currentUser.uid]
                })

                await updateDoc(roomRef, {
                    roomId: roomRef.id
                });
                const roomdata = await getDoc(roomRef, roomRef.id)

                navigate(`/room/${roomRef.id}`);
            } else {
                navigate('/')
            }

        }

        catch (error) {
            console.error('Error: ', error);
        }
    };


    return (
        (auth.currentUser ?
            <>
                <Form className="my-8 mx-12" onSubmit={handleSubmit}>
                    <FormControl type="text" value={name} className="my-8"
                        onChange={(e) => setName(e.target.value)} placeholder="Enter Room Name" />

                    <FormControl type="text" value={description} className="my-8"
                        onChange={(e) => setDescription(e.target.value)} placeholder="Enter Room Description" />

                    <Select className="my-8"
                        options={emailOptions}
                        value={selectedEmail}
                        isMulti
                        onChange={(selectedOption) => setSelectedEmail(selectedOption)} />

                    <Button type="submit"
                        className="rounded-md font-semibold bg-[#c2a0b6] border-0 hover:bg-[#baaad4] activebutton ">
                        Submit
                    </Button>
                </Form>
            </>
            :
            <Welcome />)
    );
}
import { useState } from "react";
import { Button, Container, Form, FormControl, FormLabel } from "react-bootstrap";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

export default function SendMessage(props) {

  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message!!!");
      return;
    }

    const roomId = doc(collection(db, "rooms"),props.roomId)

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(roomId, "messages"), {
      text: message,
      name: displayName,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
  };

  return (
    <Container fluid className="g-0">
      <Form className="border-1 border-[#a19ca5] p-1 flex rounded-xl" onSubmit={(event) => sendMessage(event)}>
        <FormControl value={message} onChange={(e) => setMessage(e.target.value)}
          className="border-0 bg-transparent text-xl font-semibold rounded-none" type="text" placeholder="New Message . . ." />
        <Button type="submit" className="rounded-md font-semibold bg-[#c2a0b6] border-0 hover:bg-[#baaad4] activebutton ">
          Send!
        </Button>
      </Form>
    </Container>
  );
}

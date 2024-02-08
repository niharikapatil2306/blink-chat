import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import bg from "../assets/bg.gif"

export default function ChatBox(props) {

  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    if(auth.currentUser){
      const roomId = doc(collection(db, "rooms"),props.roomId)
    const q = query(
      collection(roomId, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
    }
  }, [props.roomId, auth.currentUser]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (

    <Container fluid className="h-full w-full g-0 flex flex-col bg-[#d6c8c4] bg-opacity-50">
      <div className="flex flex-wrap flex-1 overflow-y-auto bg-opacity-0 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
        <Container fluid className="p-4 mx-12 g-0">

          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <span ref={scroll}></span>
        </Container>
      </div>
      <div className="flex-shrink-0 p-4 mx-12 ">
        <SendMessage roomId={props.roomId} />
      </div>
    </Container>
  );

}
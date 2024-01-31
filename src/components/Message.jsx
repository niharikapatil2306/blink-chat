import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Message(props){

  const [user] = useAuthState(auth);

  console.log(props.message.uid);
  console.log(user.uid);

  return(
    <div className={`${props.message.uid === user.uid ? 
    "justify-end flex my-4" 
    : 
    "flex my-4"}`}>
    <div className="bg-[#edb9c9] p-2 py-3 bg-opacity-60 rounded-2xl flex">
        <img className="mx-2 h-8 rounded-full" src={props.message.avatar} alt="" />
        <div className="px-2 my-auto">
          <p className="mb-1 font-bold text-lg">{props.message.name}</p>
          <p className="" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{props.message.text}</p>
        </div>
      </div>
    </div>
  );
}

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   return (
//     <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//       <img
//         className="chat-bubble__left"
//         src={message.avatar}
//         alt="user avatar"
//       />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         <p className="user-message">{message.text}</p>
//       </div>
//     </div>
//   );
// };

// export default Message;
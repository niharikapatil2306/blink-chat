import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

export default function RoomsList() {

    const [rooms, setRooms] = useState([]);
    const [roomInUser, setRoomInUser] = useState(false)

    const fetchRooms = async () => {

        if (auth.currentUser) {
            await setDoc(doc(collection(db, "users"), auth.currentUser.uid), {
                name: auth.currentUser.displayName,
            });
        }

        const roomsRef = collection(db, "rooms")
        const roomsSnapshot = await getDocs(roomsRef);
        const roomList = roomsSnapshot.docs.map(async (doc) => { 
            const currentUserInRoom = doc.data().users && doc.data().users.some(uid => uid === auth.currentUser.uid);
            setRoomInUser(currentUserInRoom)
            const userIds = doc.data().users || []
            const usernames = await getUsernames(userIds);
            return{...doc.data(), usernames}
        });
        const resolvedRooms = await Promise.all(roomList);
        setRooms(resolvedRooms);

    };


    useEffect(() => {
        if (auth.currentUser) {
            const unsubscribe = onSnapshot((collection(db, 'rooms')), (snapshot) => {
                fetchRooms();
                
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser]);


    const getUsernames = async (userIds) => {
        const usernames = [];
        for (const userId of userIds) {
            try {
                const userSnapshot = await getDocs(collection(db, "rooms"));
                if (userSnapshot) {
                    const userData = userSnapshot.data().user;
                    usernames.push(userData);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        }
        return usernames;
    };

    return (
        <>
            {roomInUser?
            <>
            {rooms.map((room) => (
                <div key={room.roomId} className="my-4">
                    <Button className="w-full font-bold text-2xl rounded-none bg-[#c2a0b6] border-0 hover:bg-[#baaad4]">
                        <Link to={{ pathname: `/room/${room.roomId}` }} >
                            {room.roomName} - {room.usernames.join(", ")}
                        </Link>
                    </Button>
                </div>
            ))} 
            </>
            :
            <></>}
        </>
    );
}
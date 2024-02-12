import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

export default function RoomsList() {

    const [rooms, setRooms] = useState([]);
    const [roomInUser, setRoomInUser] = useState(false)
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {

        try {
            if (auth.currentUser) {
                await setDoc(doc(collection(db, "users"), auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email
                });
            }
            const roomsColRef = collection(db, 'rooms');
            const roomsSnapshot = await getDocs(roomsColRef);
            const roomList = [];

            const list = roomsSnapshot.docs.forEach((doc) => {
                const data = doc.data()
                const filter = data.users.includes(auth.currentUser.uid)
                if (filter) {
                    roomList.push(data);
                }
            });

            setRooms(roomList)
            setRoomInUser(rooms.length > 0);
            setLoading(false);

        } catch (err) {

            console.log(`Error getting documents ${err}`);
        }

    };

    useEffect(() => {

        const unsubscribe = onSnapshot((collection(db, 'rooms')), (snapshot) => {
            fetchRooms();

        });
        return () => unsubscribe();

    }, [auth.currentUser, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {roomInUser ?
                <>
                    {rooms.map((room) => (
                        <div key={room.roomId} className="my-4">
                            <Button className="w-full font-bold text-2xl rounded-none bg-[#c2a0b6] border-0 hover:bg-[#baaad4]">
                                <Link to={{ pathname: `/room/${room.roomId}` }} >
                                    {room.roomName}
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
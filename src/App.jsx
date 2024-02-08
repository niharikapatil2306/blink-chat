import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import Welcome from './components/Welcome';
import { auth } from './firebase';
import ChatBox from './components/Chatbox';
import { Route, Routes } from 'react-router-dom';
import RoomCreation from './components/RoomCreation';
import Room from './components/Room';
import Home from './components/Home';

function App() {

  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route  path="/" element={user? <Home /> : <Welcome />} />
      <Route path="/create-room" element={<RoomCreation />} />
      <Route path="/room/:roomId" element={<Room /> } />
    </Routes>
  )
}

export default App;

import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import Welcome from './components/Welcome';
import { auth } from './firebase';
import { Route, Routes } from 'react-router-dom';
import Room from './components/Room';

function App() {

  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route  path="/" element={user? <Room /> : <Welcome />} />
      <Route path="/room/:roomId" element={<Room /> } />
    </Routes>
  )
}

export default App;

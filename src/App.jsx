import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import Welcome from './components/Welcome';
import { auth } from './firebase';
import { Route, Routes } from 'react-router-dom';
import Room from './components/Room';

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-[#c2a0b6]"></div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={user ? <Room /> : <Welcome />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  )
}

export default App;

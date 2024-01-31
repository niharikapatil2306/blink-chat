import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import Welcome from './components/Welcome';
import { auth } from './firebase';
import ChatBox from './components/Chatbox';

function App() {

  const [user] = useAuthState(auth);

  return (
    <>
    {!user ? <Welcome /> : <ChatBox /> }          
    </>
  )
}

export default App;

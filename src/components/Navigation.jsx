import { signOut } from "firebase/auth";
import { Button, Navbar, NavbarBrand } from "react-bootstrap";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../assets/logo1.png";

export default function Navigation(props) {

    const [user] = useAuthState(auth)

    const handleClick = () => {
        signOut(auth);
    }

    return(
        <Navbar className="bg-[#d6c8c4] bg-opacity-50 flex justify-between">
            <NavbarBrand className="mx-8">
                <img className="h-20" src={logo} alt="" />
            </NavbarBrand>
            {user?
                (
                    <Button onClick={handleClick} 
                    className="mx-4 font-bold text-2xl bg-[#c2a0b6] border-0 hover:bg-[#baaad4]">
                        Logout
                    </Button>
                )
                :
                (<></>)
            }

        </Navbar>
    );
}
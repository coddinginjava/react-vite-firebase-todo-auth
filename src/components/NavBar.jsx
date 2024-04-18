import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Dropdown, NavItem, Alert, Form, Row, Col, Button} from "react-bootstrap";
import {auth} from "../firebase-config/firebase-config.js";
import Image from "react-bootstrap/Image";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const NavBar = () =>{

    const [error, setError] = useState("")

    const {currentUser, logout} = useAuth()

    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    console.log({currentUser})

    return(
      <>

        <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>My Notes</Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle as={NavItem}>
                            <Navbar.Text>
                                {currentUser.displayName ?? currentUser.email}
                                {auth.currentUser?.photoURL &&
                                    <Image className="mx-3" height={50} width={50}
                                           src={auth.currentUser?.photoURL}
                                           roundedCircle/>}
                            </Navbar.Text>
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={() => navigate("/update-profile")}>Update Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
          {error && <Alert variant="danger">{error}</Alert>}
      </>
    )
}

export default NavBar;
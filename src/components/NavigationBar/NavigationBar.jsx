import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth, logoutCurrentUser, selectAdmin } from '../../features/auth/authSlice'
import { addFlashMessage } from '../../features/flashMesssage/flashMessageSlice'
import './style.css';
import setAuthTokenAsHeader from '../../setAuthTokenAsHeader'

export default function NavigationBar(props) {
    const isAuthenticated = useSelector(selectAuth)
    const isAdmin = useSelector(selectAdmin)
    const dispatch = useDispatch()
   
    const loginBtn = (
        <Nav.Item><Button className="loginButton" href="/react-express-postApp-frontend/login" variant="primary" size="sm">Login</Button>{' '}</Nav.Item>
    );
    const logoutBtn = (     
        <Nav.Item><Button onClick={handleLogout} className="logoutButton" variant="primary" size="sm">Logout</Button>{' '}</Nav.Item>
    );

    function handleLogout() {
        dispatch(logoutCurrentUser())
        dispatch(addFlashMessage({
            text: "Sie wurden erfolgreich ausgeloggt.",
            type: "success"
        }))
        setAuthTokenAsHeader(false)
        window.location.reload()
    }

    return (
        <Navbar id="navbar" bg="light" expand="lg">
            <Navbar.Brand id="logo" href="/react-express-postApp-frontend">React</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item><Nav.Link href="/react-express-postApp-frontend">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/react-express-postApp-frontend/posts">Sprüche</Nav.Link></Nav.Item>
                    {!isAuthenticated && <Nav.Item><Button className="registerButton" href="/react-express-postApp-frontend/register" variant="primary" size="sm">Registrieren</Button>{' '}</Nav.Item>}
                    {isAuthenticated && <Nav.Item><Button href="/react-express-postApp-frontend/profile" className="profileButton" variant="primary" size="sm">Profil</Button>{' '}</Nav.Item>}
                </Nav>
                <Nav className="ml-auto">
                    {isAdmin && <Button id="adminBtn" size="sm" variant="outline-danger">Admin</Button>}
                    {isAuthenticated? logoutBtn : loginBtn}
                </Nav>
            </Navbar.Collapse>
        </Navbar> 
    )  
}
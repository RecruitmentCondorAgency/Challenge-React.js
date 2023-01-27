import { Container, Nav, Navbar} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import './styles.css'
import Logo from '../../assets/img/logo.png'


export const NavBar = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLogged, setUserLogged] = useState(localStorage.getItem('userLogged'));
    const refresh = () => window.location.reload(true)

    useEffect(() => {
        if (!userLogged || userLogged === '') {
            setLoggedIn(false);
        } else {
            setLoggedIn(true)
        }
      }, []);
      


    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('userLogged');
        localStorage.removeItem('userFirstName');
        setLoggedIn(false);
        
        refresh()
        
        
    }

    return (

        <Navbar expand="md" fixed="top" className="main-navbar">
            <Container>
                <Navbar.Brand href="/"> 
                    <img src={Logo} alt="Logo" className="logo"/>
                    { isLoggedIn ? <>Welcome {localStorage.getItem('userFirstName')}</> : <></>} 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="main-menu">
                        <Nav.Link href="/search">Search </Nav.Link>
                        {isLoggedIn && <Nav.Link href="/profile">Profile</Nav.Link>}
                        {isLoggedIn && <Nav.Link href="/logout" onClick={logOut} >Logout</Nav.Link>}
                        {!isLoggedIn && <Nav.Link href="/login">Log in</Nav.Link>}
                        {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
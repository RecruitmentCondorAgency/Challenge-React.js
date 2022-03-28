import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar,Nav,Container } from 'react-bootstrap';

function NavLinkLog(props){
    if(props.loged){
        return (
            <>
                <Nav.Link href="/profile" as={Link} to="/profile">
                    Profile
                </Nav.Link>
                <Nav.Link href="/logout" as={Link} to="/logout">
                    Logout
                </Nav.Link>
            </>
        )
    }else{
        return (
            <>
                <Nav.Link href="/login" as={Link} to="/login">
                    Login
                </Nav.Link>
            </>
        )
    }
}

export default function Header(props){

    const image = require('src/assets/img/logo.png');
    const location = useLocation();

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="py-2 shadow-sm">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={image} width="45" height="45" className="d-inline-block align-top" alt="React Bootstrap logo"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav activeKey={location.pathname}>
                        <Nav.Link href="/search" as={Link} to="/search">
                            Search
                        </Nav.Link>
                        <NavLinkLog loged={props.loged}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
 

class Header extends Component {
    state = { }
    render() {
        return (
            <Container>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Navbar.Brand href="#home">DATN_WEB</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/Home">Home</Nav.Link>
                  <Nav.Link href="/About">About</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
          </Container>
          );
    }
}

export default Header;
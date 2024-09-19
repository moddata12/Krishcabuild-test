import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';  

const Navbarhead = () => {
  const navigate = useNavigate();  

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/api/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error: ", err);
      });
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className='text-white'>
        <Navbar.Brand href="/" className='text-white fw-3'>ENERGY MONITORING SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-white fw-medium">
            <Nav.Link href="/home" className="text-white">Home</Nav.Link>
            <Nav.Link href="/view" className="text-white">Dashboard</Nav.Link>
            <Nav.Link href="/details" className="text-white">Details</Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-white">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarhead;

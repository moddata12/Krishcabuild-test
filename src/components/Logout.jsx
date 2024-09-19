// Logout.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
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
    <button
      onClick={handleLogout}
      className="nav-link btn btn-primary fw-medium text-white"
    >
      Logout
    </button>
  );
};

export default Logout;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import "../assets/css/navbarhead.css"

// const Navbarhead = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("Logged out");
//     navigate("/login");
//   };

//   return (
//     <Navbar expand="lg" className="bg-primary">
//       <Container className='text-white'>
//         <Navbar.Brand href="/" className='text-white fw-3'>ENERGY MONITORING SYSTEM</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto text-white fw-medium">
//             <button onClick={() => navigate("/home")} className="btn btn-custom">Home</button>
//             <button onClick={() => navigate("/view")} className="btn btn-custom">Dashboard</button>
//             <button onClick={() => navigate("/details")} className="btn btn-custom">Details</button>
//             <button onClick={handleLogout} className="btn btn-custom">Logout</button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navbarhead;

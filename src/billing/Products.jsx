import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar3 from "../components/layouts/Navbar3";
import Footer from "../components/layouts/Footer";

const Products = () => {
  return (
    <>
      <Navbar3 />
      <div className="p-3">
        <Card className="mb-3 border-3 border-success">
          <Card.Body><div className="bg-secondary text-white text-start p-2 rounded"> 
            <Card.Title>Products</Card.Title>
            </div>
            <div className="bg-light text-dark mt-1 mb-1 text-start p-2 rounded"> 
            <Card.Text>
              <strong className="fs-5">Electrical Panel Board</strong>
              <br />
              <strong className="fs-5">List of Products:</strong>
              <ul>
                <li>MAIN MV PANEL</li>
                <li>POWER CONTROL CENTRE PANEL</li>
                <li>MOTOR CONTROL CENTRE PANEL</li>
                <li>APFC PANEL</li>
                <li>SYN PANEL</li>
                <li>EB METERING PANEL</li>
                <li>AMF PANEL</li>
                <li>DOUBLE TIER PANEL</li>
                <li>POWER DISTRIBUTION BOARD</li>
                <li>BUS DUCTS</li>
                <li>RAISING MAINS</li>
              </ul>
            </Card.Text>
            </div>
            <Button variant="success" as={Link} to="/projects">
              View Projects
            </Button>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Products;

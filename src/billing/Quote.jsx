import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar3 from "../components/layouts/Navbar3";
import Footer from "../components/layouts/Footer";
import Carousel from "react-material-ui-carousel";

const Quote = () => {
  return (
    <div>
      <Navbar3 />
      <Card className="mb-3 border-3 border-success">
        <Card.Body>
          <Card.Title>Products</Card.Title>
          <Card.Text>
            <strong>Electrical Panel Board</strong>
            <br />
            <br />
            List of Products:
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
          <Button variant="success" as={Link} to="/projects">
            View Projects
          </Button>
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
};

export default Quote;

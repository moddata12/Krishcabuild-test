import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar3 from "../components/layouts/Navbar3";
import Footer from "../components/layouts/Footer"; 
import Carousel from "react-material-ui-carousel";


const Welcome = () => {
  return (
    <div>
      <Navbar3 />

      <div className="rounded mx-auto mt-3 mb-3" style={{ maxWidth: "95%" }}>
        <div className="bg-white shadow rounded p-2 border border-light border-1 mx-auto mb-2">
          <Carousel animation="slide">
            <img
              src="https://www.sgen.in/content_images/MVpanel.jpg"
              alt="MV Panel"
              style={{ width: "100%", height: "400px" }}
            />
            <img
              src="https://www.sgen.in/content_images/powercontrol.jpg"
              alt="Power Control"
              style={{ width: "100%", height: "400px" }}
            />
            <img
              src="https://www.sgen.in/content_images/motorcontrol.jpg"
              alt="Motor Control"
              style={{ width: "100%", height: "400px" }}
            />
            <img
              src="https://www.sgen.in/content_images/apfc.jpg"
              alt="APFC"
              style={{ width: "100%", height: "400px" }}
            />
          </Carousel>
        </div>
        {/* <div className="d-flex justify-content-between">
          <h5 className="text-secondary">*Valid test report</h5>
          <h5 className="text-danger">*Expired test report</h5>
        </div> */}
      </div>

      <div className="container bg-light vh-auto mt-3 mb-3 p-3 border-3 border border-secondary rounded">
        <div className="row">
          <div className="col-md-6">
            <Card className="mb-3 border-3 border-success">
              <Card.Body>
                <Card.Title>
                  Energy Monitoring System
                </Card.Title>
                <Card.Text>
                Our Energy Monitoring System offers real-time insights and analytics for efficient energy management. 
      With advanced monitoring capabilities, you can track energy consumption, identify inefficiencies, 
      and optimize usage patterns across your infrastructure.
                </Card.Text>
                <Button variant="success">Learn More</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
          <Card className="mb-3 border-3 border-success">
  <Card.Body>
    <Card.Title>Products</Card.Title>
    <Card.Text>
    We are the leading manufacturer, supplier and trader of Control Panel. This product is ideal for a wide number of machine and industrial plants to control and monitor the operations.
    </Card.Text>
    <Button variant="success" as={Link} to="/projects">
      View Products
    </Button>
  </Card.Body>
</Card>

          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Card className="mb-3 border-3 border-success">
              <Card.Body>
                <Card.Title>Services</Card.Title>
                <Card.Text>
                  We offer a wide range of services to meet your energy and
                  infrastructure needs.
                </Card.Text>
                <Button variant="success" as={Link} to="/services">
                  View Services
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Welcome;

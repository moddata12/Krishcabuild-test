import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component
import "../components/table/css/report.css";
import bgImg from "../assets/bg-img.jpg";
import axios from "axios";

const Details = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/detailsvisitor")
      .then((res) => {
        if (res.data === "Success") {
          axios
            .get("http://localhost:3001/api/info/detailtable")
            .then((res) => {
              setDetails(res.data);
              setLoading(false); // Set loading to false once data is fetched
            })
            .catch((err) => {
              console.log("Error fetching details:", err);
              setLoading(false); // Set loading to false in case of error
            });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }}
    >
      <Navbar />

      <div className="container text-center mt-2 mb-2 bg-light border border-primary border-1 rounded p-4">
        <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
          Details
        </h3>
        <div className="bg-white shadow fw-medium fs-1 mt-2 mb-3 border border-primary border-1 rounded">
          <div className="text-primary">
            <p className="fs-3 mb-2">KRISHCA STRAPING SOLUTIONS PVT LTD,</p>
            <p className="fs-5 mt-2 text-muted">
              BUILDING 01B, CASA GRANDE DISTRIPARK, <br />
              SATHARAI VILLAGE, MAPPEDU, <br />
              THIRUVALLUR DISTRICT, <br />
              TAMILNADU - 631 203.
            </p>
          </div>
        </div>

        <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
          {loading ? ( // Render spinner if loading is true
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table striped bordered hover size="sm">
              <>
                <thead
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                  className="fs-5 p-3"
                  id="header"
                >
                  <tr>
                    <th style={{ backgroundColor: "#007bff", color: "#fff" }}>
                      Incoming Side
                    </th>
                    <th style={{ backgroundColor: "#007bff", color: "#fff" }}>
                      Source
                    </th>
                    <th style={{ backgroundColor: "#007bff", color: "#fff" }}>
                      Busduct/Cable
                    </th>
                    <th style={{ backgroundColor: "#007bff", color: "#fff" }}>
                      VCB/ACB
                    </th>
                    <th style={{ backgroundColor: "#007bff", color: "#fff" }}>
                      Outgoing to
                    </th>
                  </tr>
                </thead>
              </>
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.incomingSide}</td>
                    <td>{detail.source}</td>
                    <td>{detail.busductCable}</td>
                    <td>{detail.vcbAcb}</td>
                    <td>{detail.outgoingTo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;

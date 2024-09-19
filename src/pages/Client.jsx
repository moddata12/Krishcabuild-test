import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/layouts/Navbar1";
import Footer from "../components/layouts/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../components/table/css/report.css";
import bgImg from "../assets/bg-img.jpg";

const Client = () => {
  const [details, setDetails] = useState([]);
  const [editDetail, setEditDetail] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Fetch data from the server
    axios
      .get("http://localhost:3001/api/client")
      .then((res) => {
        if (res.data === "Success") {
          // Fetch details data if verification succeeds
          axios
            .get("http://localhost:3001/api/info/details")
            .then((res) => {
              setDetails(res.data);
            })
            .catch((err) => {
              console.log("Error fetching details:", err);
            });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/"); // Navigate to the homepage or login page if there's an error
      });
  }, [navigate]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/info/details/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setDetails(details.filter((detail) => detail._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting detail:", error);
      });
  };

  const handleEdit = (detail) => {
    setEditDetail(detail);
  };

  const handleSave = () => {
    if (editDetail._id) {
      axios
        .put(
          `http://localhost:3001/api/info/details/${editDetail._id}`,
          editDetail,
          { withCredentials: true }
        )
        .then((response) => {
          setDetails(
            details.map((detail) =>
              detail._id === editDetail._id ? response.data : detail
            )
          );
          setEditDetail(null);
        })
        .catch((error) => {
          console.error("Error updating detail:", error);
        });
    } else {
      axios
        .post(`http://localhost:3001/api/info/details`, editDetail, {
          withCredentials: true,
        })
        .then((response) => {
          setDetails([...details, response.data]);
          setEditDetail(null);
        })
        .catch((error) => {
          console.error("Error creating detail:", error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }}
    >
      <Navbar1 />

      <div className="container text-center mt-2 mb-2 bg-light border border-primary border-3 rounded p-5">
        <div className="bg-white fw-medium fs-1 mt-2 mb-2 border border-primary border-3 rounded">
          <p className="fs-3 mb-2">KRISHCA STRAPING SOLUTIONS PVT LTD,</p>
          <p className="fs-5 mt-2 text-muted">
            BUILDING 01B, CASA GRANDE DISTRIPARK, <br />
            SATHARAI VILLAGE, MAPPEDU, <br />
            THIRUVALLUR DISTRICT, <br />
            TAMILNADU - 631 203.
          </p>
        </div>

        <div className="bg-white border border-primary border-3 rounded p-2 mt-2 mb-2">
          <Table striped bordered hover size="sm">
            <thead className="fs-5 p-3 text-primary" id="header">
              <tr>
                <th>Incoming Side</th>
                <th>Source</th>
                <th>Busduct/Cable</th>
                <th>VCB/ACB</th>
                <th>Outgoing to</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail, index) => (
                <tr key={index}>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <input
                        value={editDetail.incomingSide}
                        onChange={(e) =>
                          setEditDetail({
                            ...editDetail,
                            incomingSide: e.target.value,
                          })
                        }
                      />
                    ) : (
                      detail.incomingSide
                    )}
                  </td>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <input
                        value={editDetail.source}
                        onChange={(e) =>
                          setEditDetail({
                            ...editDetail,
                            source: e.target.value,
                          })
                        }
                      />
                    ) : (
                      detail.source
                    )}
                  </td>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <input
                        value={editDetail.busductCable}
                        onChange={(e) =>
                          setEditDetail({
                            ...editDetail,
                            busductCable: e.target.value,
                          })
                        }
                      />
                    ) : (
                      detail.busductCable
                    )}
                  </td>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <input
                        value={editDetail.vcbAcb}
                        onChange={(e) =>
                          setEditDetail({
                            ...editDetail,
                            vcbAcb: e.target.value,
                          })
                        }
                      />
                    ) : (
                      detail.vcbAcb
                    )}
                  </td>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <input
                        value={editDetail.outgoingTo}
                        onChange={(e) =>
                          setEditDetail({
                            ...editDetail,
                            outgoingTo: e.target.value,
                          })
                        }
                      />
                    ) : (
                      detail.outgoingTo
                    )}
                  </td>
                  <td>
                    {editDetail && editDetail._id === detail._id ? (
                      <Button onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(detail)}>Edit</Button>
                        <Button onClick={() => handleDelete(detail._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    value={editDetail?.incomingSide || ""}
                    onChange={(e) =>
                      setEditDetail({
                        ...editDetail,
                        incomingSide: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editDetail?.source || ""}
                    onChange={(e) =>
                      setEditDetail({ ...editDetail, source: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editDetail?.busductCable || ""}
                    onChange={(e) =>
                      setEditDetail({
                        ...editDetail,
                        busductCable: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editDetail?.vcbAcb || ""}
                    onChange={(e) =>
                      setEditDetail({ ...editDetail, vcbAcb: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editDetail?.outgoingTo || ""}
                    onChange={(e) =>
                      setEditDetail({
                        ...editDetail,
                        outgoingTo: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <Button onClick={handleSave}>Add</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Client;

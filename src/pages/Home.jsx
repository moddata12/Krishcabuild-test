import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Carousel from "react-material-ui-carousel";
import moment from "moment";
import bgImg from "../assets/bg-img.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    serviceRequest: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ success: null, message: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/homevisitor", { withCredentials: true })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error during authentication check: ", err);
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/equipmenttable", {
        withCredentials: true,
      })
      .then((res) => {
        setEquipments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching equipment data: ", err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/send-email", formData)
      .then((res) => {
        setFormStatus({ success: true, message: "Request sent successfully" });
        setFormData({ email: "", serviceRequest: "", message: "" });

        // Clear form status message after 5 seconds
        setTimeout(() => {
          setFormStatus({ success: null, message: "" });
        }, 5000);
      })
      .catch((err) => {
        setFormStatus({ success: false, message: "Error sending request" });
        console.error("Error sending email: ", err);

        // Clear form status message after 5 seconds
        setTimeout(() => {
          setFormStatus({ success: null, message: "" });
        }, 5000);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="container border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
        <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
          Home
        </h3>
        <h4 className="mt-3 mb-3 text-primary text-center">
          Site Test Report Status
        </h4>
        <div className="rounded mx-auto" style={{ maxWidth: "800px" }}>
          <div
            className="bg-white shadow rounded p-3 border border-primary border-1 mx-auto mb-2"
            style={{ maxWidth: "800px" }}
          >
            {equipments.length > 0 ? (
              <Carousel>
                {equipments.map((equipment) => {
                  const isDue = moment(
                    equipment.nextServiceDate
                  ).isSameOrBefore(moment(), "day");
                  let remarks = equipment.remarks;

                  // If the due date is reached, update remarks to "Contact Service Vendor"
                  if (isDue) {
                    remarks = "Please contact service vendor.";
                  }

                  return (
                    <div key={equipment._id} className="text-center p-3">
                      <h2
                        className={`text-white rounded ${
                          isDue ? "bg-danger" : "bg-secondary"
                        }`}
                      >
                        {equipment.equipment}
                      </h2>
                      <div className="text-primary bg-light rounded p-2 text-bold">
                        <p>
                          Testing Date:{" "}
                          {moment(equipment.testingDate).format("MMMM Do YYYY")}
                        </p>
                        <p>
                          Next Service Date:{" "}
                          {moment(equipment.nextServiceDate).format(
                            "MMMM Do YYYY"
                          )}
                        </p>
                        <p className={isDue ? "text-danger" : ""}>
                          Remarks: {remarks}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="text-center text-danger">
                <p>Please try again.</p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <h5 className="text-secondary">*Valid test report</h5>
            <h5 className="text-danger">*Expired test report</h5>
          </div>
        </div>

        <h4 className="mt-3 mb-3 text-primary text-center">Contact Us</h4>
        <div
          className="bg-white shadow rounded p-3 border border-primary border-1 mx-auto mb-2"
          style={{ maxWidth: "1000px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h4 className="mt-2 mb-3 text-primary">Service Request</h4>
              <label htmlFor="email" className="form-label">
                Please Enter Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceRequest" className="form-label">
                Service Request
              </label>
              <select
                className="form-select"
                id="serviceRequest"
                name="serviceRequest"
                value={formData.serviceRequest}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Service Request</option>
                <option value="VCB Testing">VCB Testing</option>
                <option value="ACB Testing">ACB Testing</option>
                <option value="Transformer Testing">Transformer Testing</option>
                <option value="Energy Auditing">Energy Auditing</option>
                <option value="Industrial Wiring">Industrial Wiring</option>
                <option value="LT and HT Panel Service">
                  LT and HT Panel Service
                </option>
                <option value="SLD Drawing">SLD Drawing</option>
                <option value="Demand Increase Approval">
                  Demand Increase Approval
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {formStatus.message && (
              <div
                className={`mt-3 ${
                  formStatus.success ? "text-success" : "text-danger"
                }`}
              >
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

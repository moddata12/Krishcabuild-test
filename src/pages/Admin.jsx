import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/layouts/Navbar1";
import Footer from "../components/layouts/Footer";

function Admin() {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [power, setPower] = useState("");
  const [reactivepower, setReactivepower] = useState("");
  const [powerfactor, setPowerfactor] = useState("");
  const [frequency, setFrequency] = useState("");
  const [panelname, setPanelname] = useState("");
  const [location, setLocation] = useState("");
  const [mid, setMeterId] = useState("");
  const [datetime, setDatetime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/input", {
        voltage,
        current,
        power,
        reactivepower,
        powerfactor,
        frequency,
        panelname,
        location,
        mid,
        datetime
      });
      console.log(response.data);
      navigate("/admin");//here we navigate other page
    } catch (error) {
      setError("Error occurred while saving data.");
      console.error("Error:", error);
    }
  };
  return (
    <div>                              
    <Navbar1 />
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-200 p-5">
      
      <div className=" bg-white p-3 rounded w-50">
        <h2>Enter the data's</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="voltage">
              <strong>Voltage</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Voltage"
              autoComplete="off"
              name="voltage"
              className="form-control rounded-0"
              onChange={(e) => setVoltage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="current">
              <strong>Current</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Current"
              autoComplete="off"
              name="current"
              className="form-control rounded-0"
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="power">
              <strong>Power</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Power"
              name="power"
              className="form-control rounded-0"
              onChange={(e) => setPower(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reactivepower">
              <strong>Reactive Power</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Reactive Power"
              name="reactivepower"
              className="form-control rounded-0"
              onChange={(e) => setReactivepower(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="powerfactor">
              <strong>Power Factor</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Power Factor"
              name="powerfactor"
              className="form-control rounded-0"
              onChange={(e) => setPowerfactor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="frequency">
              <strong>Frequency</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Frequency"
              name="frequency"
              className="form-control rounded-0"
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="panelname">
              <strong>Panel Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Panel Name"
              name="panelname"
              className="form-control rounded-0"
              onChange={(e) => setPanelname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location">
              <strong>Location</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Location"
              name="location"
              className="form-control rounded-0"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mid">
              <strong>Mater Id</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Meter' Id"
              name="mid"
              className="form-control rounded-0"
              onChange={(e) => setMeterId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="datetime">
              <strong>Date-Time</strong>
            </label>
            <input
              type="datetime-local"
              placeholder="Enter Datetime"
              name="datetime"
              className="form-control rounded-0"
              onChange={(e) => setDatetime(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-10">
            Save
          </button>
          <p>Click Here to Save</p>
          <Link to="/login" className="btn btn-default border w-100 bg-warning mb-2">
          Login
          </Link>
          <Link to="/view" className="btn btn-default border w-100 bg-success mt-2">
            Dashboard
          </Link>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Admin;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";
import Navbar1 from "../components/layouts/Navbar1";
import Footer from "../components/layouts/Footer";

const Service = () => {
  const [equipments, setEquipments] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    equipment: "",
    testingDate: "",
    nextServiceDate: "",
    remarks: "",
  });
  const [editingEquipment, setEditingEquipment] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/service")
      .then((res) => {
        if (res.data === "Success") {
          fetchEquipments();
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/equipments", {
        withCredentials: true,
      });
      setEquipments(response.data);
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEquipment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingEquipment) {
        await axios.put(
          `http://localhost:3001/api/equipments/${editingEquipment._id}`,
          newEquipment,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post("http://localhost:3001/api/equipments", newEquipment, {
          withCredentials: true,
        });
      }
      setNewEquipment({
        equipment: "",
        testingDate: "",
        nextServiceDate: "",
        remarks: "",
      });
      setEditingEquipment(null);
      fetchEquipments();
    } catch (error) {
      console.error("Error creating/updating equipment:", error);
    }
  };

  const handleEdit = (equipment) => {
    setNewEquipment({
      equipment: equipment.equipment,
      testingDate: equipment.testingDate.split("T")[0],
      nextServiceDate: equipment.nextServiceDate.split("T")[0],
      remarks: equipment.remarks,
    });
    setEditingEquipment(equipment);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/equipments/${id}`, {
        withCredentials: true,
      });
      fetchEquipments();
    } catch (error) {
      console.error("Error deleting equipment:", error);
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

      <div className="container mt-4 p-3 border border-primary border-3 rounded bg-light">
        <h1 className="d-flex justify-content-center text-primary">
          Equipment Management System
        </h1>
        <div className="row">
          <div className="col-md-6">
            <h2>{editingEquipment ? "Edit Equipment" : "Add New Equipment"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Equipment</label>
                <input
                  type="text"
                  className="form-control"
                  name="equipment"
                  value={newEquipment.equipment}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Testing Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="testingDate"
                  value={newEquipment.testingDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Next Service Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="nextServiceDate"
                  value={newEquipment.nextServiceDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <textarea
                  className="form-control"
                  name="remarks"
                  value={newEquipment.remarks}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                {editingEquipment ? "Update Equipment" : "Add Equipment"}
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Equipment List</h2>
            <ul className="list-group">
              {equipments.map((equipment) => (
                <li key={equipment._id} className="list-group-item">
                  <strong>{equipment.equipment}</strong>
                  <br />
                  Testing Date:{" "}
                  {new Date(equipment.testingDate).toLocaleDateString()}
                  <br />
                  Next Service Date:{" "}
                  {new Date(equipment.nextServiceDate).toLocaleDateString()}
                  <br />
                  Remarks: {equipment.remarks}
                  <div className="mt-2">
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleEdit(equipment)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(equipment._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;

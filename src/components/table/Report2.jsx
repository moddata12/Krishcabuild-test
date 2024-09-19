import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as XLSX from "xlsx";
import Spinner from "react-bootstrap/Spinner";
import "./css/report.css";
import bgImg from '../../assets/bg-img.jpg';
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

// Define a function to convert UTC date strings to Indian Standard Time format
function convertToIndianTime(utcDateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Indian Standard Time
  };

  const date = new Date(utcDateString);
  const indianTime = date.toLocaleString("en-IN", options);
  return indianTime;
}

function Report() {
  const [selectedPanel, setSelectedPanel] = useState("  Select Panel  ");
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/Report2Data");
        const data = await response.json();
        setTableData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePanelSelect = (panel) => {
    setSelectedPanel(panel);
  };

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFromDate("");
    setToDate("");
  };

  const handleOkClick = async () => {
    try {
      // Fetch filtered data based on selected date range
      const response = await fetch(
        `http://localhost:3001/api/report2Date?start_date=${fromDate}&end_date=${toDate}`
      );
      const filteredData = await response.json();

      // Calculate the day difference between start and end dates
      const startDateObj = new Date(fromDate);
      const endDateObj = new Date(toDate);
      const dayDifference = Math.ceil(
        (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
      );

      // Check if the day difference exceeds 15 days
      if (dayDifference > 15) {
        // Show alert message
        alert("Date range exceeds the maximum allowed gap of 15 days.");
      } else {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert the fetched data to a worksheet
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Define column headers
        const headers = [
          "Date/Time",
          "Voltage",
          "Current",
          "Power",
          "Reactive Power",
          "Power Factor",
          "Frequency",
          "Panel Name",
          "Location",
        ];

        // Add headers to the worksheet
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Report");

        // Save the workbook as an Excel file
        XLSX.writeFile(wb, "Filtered_Report.xlsx");

        // Close the modal
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExportClick = async () => {
    try {
      // Fetch data from the '/ReportExport' endpoint
      const response = await fetch("http://localhost:3001/api/exportReport2");
      const tableData = await response.json();

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Convert the fetched data to a worksheet
      const ws = XLSX.utils.json_to_sheet(tableData);

      // Define column headers
      const headers = [
        "Date/Time",
        "Voltage",
        "Current",
        "Power",
        "Reactive Power",
        "Power Factor",
        "Frequency",
        "Panel Name",
        "Location",
      ];

      // Add headers to the worksheet
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

      // Format datetime field to Indian time
      tableData.forEach((item, rowIndex) => {
        ws[XLSX.utils.encode_cell({ r: rowIndex + 1, c: 0 })].v =
          convertToIndianTime(item["Date/Time"]);
      });

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Report");

      // Save the workbook as an Excel file
      XLSX.writeFile(wb, "Report.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  // Render the component
  return (
    <div style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "auto",
    }}>
      <Navbar />

      <div className="container bg-light p-3 border border-primary border-3 rounded mt-2 mb-2">
        <h3 className="bg-primary text-center text-white rounded p-2">
          Reports
        </h3>

        <div className="mt-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedPanel}
              variant="success"
            >
              <Dropdown.Item onClick={() => handlePanelSelect("DG1 Panel")}>
                <Link
                  to="/table/report0"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  DG1 Panel
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("DG2 Panel")}>
                <Link
                  to="/table/report1"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  DG2 Panel
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("Main MV Panel")}>
                <Link
                  to="/table/report2"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Main MV Panel
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handlePanelSelect("MSB (Old.MV.Panel)")}
              >
                <Link
                  to="/table/report3"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  MSB (Old.MV.Panel)
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("SSB-1")}>
                <Link
                  to="/table/report4"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SSB-1
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("SSB-2")}>
                <Link
                  to="/table/report5"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SSB-2
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("SSB-3")}>
                <Link
                  to="/table/report6"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SSB-3
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("SSB-4")}>
                <Link
                  to="/table/report7"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SSB-4
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("PDB-1")}>
                <Link
                  to="/table/report8"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  PDB-1
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("PDB-2")}>
                <Link
                  to="/table/report9"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  PDB-2
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("PDB-3")}>
                <Link
                  to="/table/report10"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  PDB-3
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("LDB-1")}>
                <Link
                  to="/table/report11"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  LDB-1
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("MLSB")}>
                <Link
                  to="/table/report12"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  MLSB
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("ACDB-1")}>
                <Link
                  to="/table/report13"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ACDB-1
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("APFC Panel-1")}>
                <Link
                  to="/table/report14"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  APFC Panel-1
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePanelSelect("TRF-1 & TRF-2")}>
                <Link
                  to="/table/report15"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  TRF-1 & TRF-2
                </Link>
              </Dropdown.Item>
            </DropdownButton>
            <div className="ms-md-auto">
              <Button
                variant="success"
                className="btn btn-success me-md-2"
                onClick={handleExportClick}
              >
                Export
              </Button>
              <Button
                variant="success"
                className="btn btn-success me-md-2"
                onClick={handleDownloadClick}
              >
                Download
              </Button>
            </div>
          </div>

          <div
            className="table-container mt-3"
            style={{ maxHeight: "500px", overflow: "auto" }}
          >
            {loading ? (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                <div>
                  <Spinner animation="border" variant="primary" />
                </div>
              </div>
            ) : (
              <table className="table bg-primary mt-3 border border-primary rounded">
                <thead style={{ borderRadius: "10px" }}>
                  <tr>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Date/Time
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Voltage
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Current
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Power
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Reactive Power
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Power Factor
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Frequency
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Panel Name
                    </th>
                    <th style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{convertToIndianTime(item.datetime)}</td>
                      <td>{item.measurements[0].voltage}</td>
                      <td>{item.measurements[0].current}</td>
                      <td>{item.measurements[0].power}</td>
                      <td>{item.measurements[0].reactivepower}</td>
                      <td>{item.measurements[0].powerfactor}</td>
                      <td>{item.measurements[0].frequency}</td>
                      <td>{item.measurements[0].panelname}</td>
                      <td>{item.measurements[0].location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="fromDate" className="form-label">
              From Date
            </label>
            <input
              type="date"
              className="form-control"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="toDate" className="form-label">
              To Date
            </label>
            <input
              type="date"
              className="form-control"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOkClick}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Report;

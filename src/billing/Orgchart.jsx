import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./tree.css";
import "./treetable.css";

function Orgchart() {
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getMeters")
      .then((response) => {
        setMeters(response.data); // Assuming response.data is an array of objects
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Energy Monitoring System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/Orgchart"
                  className="nav-link btn btn-primary text-white"
                >
                  Orgchart
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/details"
                  className="nav-link btn btn-primary text-white"
                >
                  Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/report"
                  className="nav-link btn btn-primary text-white"
                >
                  Report
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/edit"
                  className="nav-link btn btn-primary text-white"
                >
                  Edit
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link btn btn-primary text-white"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mt-3 mb-3 bg-light">
        <div className="tree">
          <ul>
            {meters.map((meter, index) => (
              <li key={index}>
                <a href="#">
                  <span>
                    <table border="1">
                      <thead>
                        <tr>
                          <th colSpan="3">
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].location}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].voltage}
                          </td>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].voltage}
                          </td>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].voltage}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].current}
                          </td>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].current}
                          </td>
                          <td>
                            {meter.measurements.length > 0 &&
                              meter.measurements[0].current}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3">{meter.datetime}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </span>
                </a>
                <ul>
                  <li>
                    <a href="#">
                      <span>
                        <table border="1">
                          <thead>
                            <tr>
                              <th colSpan="3">
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].location}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="3">{meter.datetime}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </span>
                    </a>
                    <ul>
                      <li>
                        <a href="#">
                          <span>
                            <table border="1">
                              <thead>
                                <tr>
                                  <th colSpan="3">
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].location}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan="3">{meter.datetime}</td>
                                </tr>
                              </tfoot>
                            </table>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>
                            <table border="1">
                              <thead>
                                <tr>
                                  <th colSpan="3">
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].location}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].voltage}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                  <td>
                                    {meter.measurements.length > 0 &&
                                      meter.measurements[0].current}
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan="3">{meter.datetime}</td>
                                </tr>
                              </tfoot>
                            </table>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <table border="1">
                          <thead>
                            <tr>
                              <th colSpan="3">
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].location}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].voltage}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                              <td>
                                {meter.measurements.length > 0 &&
                                  meter.measurements[0].current}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="3">{meter.datetime}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Orgchart;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Accordion from "react-bootstrap/Accordion";

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

function millisecondsToDHMS(milliseconds) {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}


const MyAccordion = () => {
    const [measurementData, setMeasurementData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/totalTimeDifference");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMeasurementData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Convert total running time of DG1 and DG2 to days, hours, minutes, and seconds format
const dg1RunningTime = millisecondsToDHMS(measurementData.totalTimeDifference11_13 || 0);
const dg2RunningTime = millisecondsToDHMS(measurementData.totalTimeDifference12_13 || 0);


    return (
      <div className="mt-3 mb-3 container p-1 rounded border border-primary border-1 shadow">
      <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0" className="accordion-item">
              <Accordion.Header className="accordion-header"><h5 className="d-flex justify-content-center text-white bg-primary p-2 rounded">Consumption Time of DG in Site</h5></Accordion.Header>
              <Accordion.Body>
                  <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                          <Accordion.Header><h5 className="d-flex justify-content-center text-dark">DG1 Running Time</h5></Accordion.Header> 
                          <Accordion.Body><h6 className="bg-light p-3 text-dark rounded">
                              Last updated time of DG1 Panel -{" "}
                              {convertToIndianTime(measurementData.lastUpdatedMid11)} <br />
                              Last updated time of Main MV Panel -{" "}
                              {convertToIndianTime(measurementData.lastUpdatedMid13)} <br />
                              Total Running time of DG1 -{" "}
                              {dg1RunningTime.days} days, {dg1RunningTime.hours} hours, {dg1RunningTime.minutes} minutes, {dg1RunningTime.seconds} seconds
                              </h6>
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                          <Accordion.Header><h5 className="d-flex justify-content-center text-dark">DG2 Running Time</h5></Accordion.Header>
                          <Accordion.Body><h6 className="bg-light p-3 text-dark rounded">
                              Last updated time of DG2 Panel -{" "}
                              {convertToIndianTime(measurementData.lastUpdatedMid12)} <br />
                              Last updated time of Main MV Panel -{" "}
                              {convertToIndianTime(measurementData.lastUpdatedMid13)} <br />
                              Total Running time of DG2 -{" "}
                              {dg2RunningTime.days} days, {dg2RunningTime.hours} hours, {dg2RunningTime.minutes} minutes, {dg2RunningTime.seconds} seconds
                          </h6></Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
              </Accordion.Body>
          </Accordion.Item>
      </Accordion>
  </div>
    );
};

export default MyAccordion;

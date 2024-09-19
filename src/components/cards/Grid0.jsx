import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsExclamationTriangle } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';

function Grid0() {
  const [voltage, setVoltage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getCard0");
        if (response.data && response.data.length > 0) {
          setVoltage(response.data[0].measurements[0].voltage);
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataInterval = setInterval(fetchData, 5000);
    fetchData();
    return () => clearInterval(fetchDataInterval);
  }, []);

  return (
    <div className="col">
      <div className="col">
      <div className="card bg-secondary border border-dark border-1 p-2 shadow">
      <h5 className="card-title fs-3 text-warning">
            <BsExclamationTriangle />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">Average Voltage</h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
          {loading ? (
            <Spinner animation="grow" variant="warning" />
          ) : (
            voltage !== null ? `${voltage} V` : "V"
          )}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Grid0;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsLightningCharge } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

const Grid2 = () => {
  const [power, setPower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getCard0");
        if (response.data && response.data.length > 0) {
          setPower(response.data[0].measurements[0].power);
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
            <BsLightningCharge />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">Average Power</h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
            {loading ? (
              <Spinner animation="grow" variant="warning" />
            ) : power !== null ? (
              `${power} kWh`
            ) : (
              "kWh"
            )}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Grid2;

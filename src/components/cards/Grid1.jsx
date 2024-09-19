import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsLightning } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

const Grid1 = () => {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getCard0");
        if (response.data && response.data.length > 0) {
          setCurrent(response.data[0].measurements[0].current);
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
            <BsLightning />
          </h5>
          <h6 className="card-subtitle mb-2 text-white fs-5">Average Current</h6>
          <h6 className="card-subtitle mb-2 text-warning fs-3">
            {loading ? (
              <Spinner animation="grow" variant="warning" />
            ) : current !== null ? (
              `${current} A`
            ) : (
              "A"
            )}
            
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Grid1;

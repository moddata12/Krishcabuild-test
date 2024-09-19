import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ["Voltage(V)", "Current(A)", "Powerfactor()", "Frequency(Hz)"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(127, 0, 66, 0.5)",
          "rgba(85, 136, 106, 0.5)",
        ],
        hoverOffset: 4,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchLatestMeterData, 5000);
    // Fetch data immediately when component mounts
    fetchLatestMeterData();
    return () => clearInterval(fetchDataInterval);
  }, []);

  const fetchLatestMeterData = () => {
    axios
      .get("http://localhost:3001/api/getLatestMeterData")
      .then((response) => {
        const { data } = response;
        //console.log("Fetched data:", data);
        if (data && data.length > 0 && data[0].measurements.length > 0) {
          const latestMeasurement = data[0].measurements[0];
          const { voltage, current, powerfactor, frequency } = latestMeasurement;
          //console.log("Latest measurement:", latestMeasurement);
          setDoughnutChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: [voltage, current, powerfactor, frequency],
              },
            ],
          }));
          setError(null); // Reset error state if data is fetched successfully
        }
      })
      .catch((error) => {
        console.error("Error fetching latest meter data:", error);
        setError("Please try again."); // Set error message
      });
  };

  return (
    <div className="chart mt-3 mb-3" style={{ width: "100%", height: "60vh" }}>
      {error && <div className="error text-danger">{error}</div>}
      <h4>Overall</h4>
      <Doughnut data={doughnutChartData} />
    </div>
  );
};

export default DoughnutChart;

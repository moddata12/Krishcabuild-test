import React, { useEffect, useState } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  Filler,
  RadialLinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  RadialLinearScale
);

// Function to get the last 12 months' names
function getLast12Months() {
  const now = new Date();
  const months = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 12; i++) {
    const monthIndex = (now.getMonth() - i + 12) % 12;
    const year = now.getFullYear() - Math.floor((now.getMonth() - i + 12) / 12);
    months.push(monthNames[monthIndex] + " " + year);
  }
  return months.reverse();
}

const Radarchart = () => {
  const [radarChartData, setRadarChartData] = useState({
    labels: getLast12Months(),
    datasets: [
      {
        label: "Power (kWh)",
        data: Array(12).fill(0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "green",
        borderWidth: 2,
        pointBackgroundColor: "green",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "green",
      },
      {
        label: "Reactive Power (kVAR)",
        data: Array(12).fill(0),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "red",
        borderWidth: 2,
        pointBackgroundColor: "red",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "red",
      },
      {
        label: "Power Factor",
        data: Array(12).fill(0),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "blue",
        borderWidth: 2,
        pointBackgroundColor: "blue",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "blue",
      }
    ],
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/maxmonth")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const powerData = data.map((item) => item.maxPower);
          const reactivePowerData = data.map((item) => item.maxReactivePower);
          const powerFactorData = data.map((item) => item.maxPowerFactor);
          setRadarChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: powerData,
              },
              {
                ...prevState.datasets[1],
                data: reactivePowerData,
              },
              {
                ...prevState.datasets[2],
                data: powerFactorData,
              }
            ],
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Please try again.");
      });
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div className="chart mt-3 mb-3" style={{ width: "100%", height: "60vh" }}>
        <h4>Main Panel</h4>
        <Radar data={radarChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Radarchart;

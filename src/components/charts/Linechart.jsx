import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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
  Filler
);

// Function to convert UTC date/time to Indian Standard Time
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

const Linechart = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Power (kWh)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "green",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Reactive Power (kVAR)",
        data: [],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "red",
        tension: 0.4,
        fill: false,
      },
    ],
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchData, 5000);
    fetchData();
    return () => clearInterval(fetchDataInterval);
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/measurements")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const labels = data.map((item) =>
            convertToIndianTime(item.datetime)
          );
          const powerData = data.map((item) => item.measurements[0].power);
          const reactivePowerData = data.map((item) =>
            item.measurements[0].reactivepower
          );
          setLineChartData({
            ...lineChartData,
            labels: labels,
            datasets: [
              {
                ...lineChartData.datasets[0],
                data: powerData,
              },
              {
                ...lineChartData.datasets[1],
                data: reactivePowerData,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Please try again.");
      });
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Power (kWh) / Reactive Power (kVAR)', // Title for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time', // Title for the x-axis
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // Adjust position as needed
      },
      tooltip: {
        enabled: true,
        mode: 'index', // display one tooltip per data point
        intersect: false,
      },
    },
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div className="chart mt-3 mb-3" style={{ width: "100%", height: "60vh" }}>
        <h4>Main Panel</h4>
        <Line data={lineChartData} options={chartOptions} />
      </div>
      {/* <div className="datetime">
        {lineChartData.labels.map((label, index) => (
          <p key={index}>{label}</p>
        ))}
      </div> */}
    </div>
  );
};

export default Linechart;

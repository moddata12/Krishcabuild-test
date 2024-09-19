import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS } from "chart.js/auto";

const Barchart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Power (kWh)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "green",
        borderWidth: 2,
      },
      {
        label: "Reactive Power (kVAR)",
        data: [],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "red",
        borderWidth: 2,
      },
      {
        label: "Power Factor",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setBarChartData((prevState) => ({
            ...prevState,
            labels: data.map((item) => item.month), // Assuming API returns month data
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
              },
            ],
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    const chart = new ChartJS(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [barChartData]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="chart mt-3 mb-3" style={{ width: "auto", height: "60vh" }}>
        <h4>Main Panel</h4>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Barchart;

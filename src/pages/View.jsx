import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import bgImg from "../assets/bg-img.jpg";
import axios from "axios";
import Grid0 from "../components/cards/Grid0";
import Grid1 from "../components/cards/Grid1";
import Grid2 from "../components/cards/Grid2";
import Grid3 from "../components/cards/Grid3";
import Grid4 from "../components/cards/Grid4";
import Card0 from "../components/cards/Card0";
import Card1 from "../components/cards/Card1";
import Card2 from "../components/cards/Card2";
import Card3 from "../components/cards/Card3";
import Card4 from "../components/cards/Card4";
import Card5 from "../components/cards/Card5";
import Card6 from "../components/cards/Card6";
import Card7 from "../components/cards/Card7";
import Card8 from "../components/cards/Card8";
import Card9 from "../components/cards/Card9";
import Card10 from "../components/cards/Card10";
import Card11 from "../components/cards/Card11";
import Card12 from "../components/cards/Card12";
import Card13 from "../components/cards/Card13";
import Card14 from "../components/cards/Card14";
import Card15 from "../components/cards/Card15";
import Linechart from "../components/charts/Linechart";
import Barchart from "../components/charts/Barchart";
import Doughnutchart from "../components/charts/Doughnutchart";
import Accordion from "../components/popup/Accordion";
import Carousel from "react-material-ui-carousel";

function View() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/viewvisitor", { withCredentials: true })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/view");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }}
    >
      <Navbar />
      <div className="container text-center mt-2 mb-2 bg-light border border-primary border-3 rounded p-4">
        <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
          Dashboard
        </h3>
        <div className="row w-900 p-1 g-2">
          <Grid0 />

          <Grid1 />

          <Grid2 />

          <Grid3 />

          <Grid4 />
        </div>

        <div className="row">
          <div
            className="col-8 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
            style={{ width: "730px" }}
          >
            <Linechart />
          </div>

          <div
            className="col-4 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
            style={{ width: "350px" }}
          >
            <Doughnutchart />
          </div>
        </div>

        <Accordion />

        <div className="row">
          <div
            className="col-8 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
            style={{ width: "730px" }}
          >
            <Barchart />
          </div>

          <div
            className="col-4 mt-3 border border-primary border-1 rounded mx-auto p-3 bg-white shadow"
            style={{ width: "350px", overflowY: "auto" }}
          >
            <h5 className="text-primary mb-2">All Panels</h5>
            <Carousel>
              <Card0 />
              <Card1 />
              <Card2 />
              <Card3 />
              <Card4 />
              <Card5 />
              <Card6 />
              <Card7 />
              <Card8 />
              <Card9 />
              <Card10 />
              <Card11 />
              <Card12 />
              <Card13 />
              <Card14 />
              <Card15 />
            </Carousel>
            <div className="d-flex justify-content-between">
              <h5 className="text-success fs-5">*Online</h5>
              <h5 className="text-danger fs-5">*Offline</h5>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default View;

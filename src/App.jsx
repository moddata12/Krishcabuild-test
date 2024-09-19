import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Products from "./billing/Products"
import Home from "./pages/Home";
import Service from "./pages/Service";
import View from "./pages/View";
import Details from "./pages/Details";
import Admin from "./pages/Admin";
import Control from "./pages/Control";
import Client from "./pages/Client";
import Quote from "./billing/Quote";
import Orgchart from "./billing/Orgchart";
import Work from "./billing/Work";
import Invoice from "./billing/Invoice";
import Report0 from "./components/table/Report0";
import Report1 from "./components/table/Report1";
import Report2 from "./components/table/Report2";
import Report3 from "./components/table/Report3";
import Report4 from "./components/table/Report4";
import Report5 from "./components/table/Report5";
import Report6 from "./components/table/Report6";
import Report7 from "./components/table/Report7";
import Report8 from "./components/table/Report8";
import Report9 from "./components/table/Report9";
import Report10 from "./components/table/Report10";
import Report11 from "./components/table/Report11";
import Report12 from "./components/table/Report12";
import Report13 from "./components/table/Report13";
import Report14 from "./components/table/Report14";
import Report15 from "./components/table/Report15";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/control' element={<Control />}></Route>
        <Route path='/quote' element={<Quote />}></Route>
        <Route path='/orgchart' element={<Orgchart />}></Route>
        <Route path='/invoice' element={<Invoice />}></Route>
        <Route path='/details' element={<Details />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/client' element={<Client />}></Route>
        <Route path='/service' element={<Service />}></Route>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/view' element={<View />}></Route>
        <Route path='/work' element={<Work />}></Route>
        <Route path='/table/report0' element={<Report0 />}></Route>
        <Route path='/table/report1' element={<Report1 />}></Route>
        <Route path='/table/report2' element={<Report2 />}></Route>
        <Route path='/table/report3' element={<Report3 />}></Route>
        <Route path='/table/report4' element={<Report4 />}></Route>
        <Route path='/table/report5' element={<Report5 />}></Route>
        <Route path='/table/report6' element={<Report6 />}></Route>
        <Route path='/table/report7' element={<Report7 />}></Route>
        <Route path='/table/report8' element={<Report8 />}></Route>
        <Route path='/table/report9' element={<Report9 />}></Route>
        <Route path='/table/report10' element={<Report10 />}></Route>
        <Route path='/table/report11' element={<Report11 />}></Route>
        <Route path='/table/report12' element={<Report12 />}></Route>
        <Route path='/table/report13' element={<Report13 />}></Route>
        <Route path='/table/report14' element={<Report14 />}></Route>
        <Route path='/table/report15' element={<Report15 />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

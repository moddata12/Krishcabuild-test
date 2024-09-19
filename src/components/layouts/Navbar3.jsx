import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Navbar3 = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success opacity-85 mb-3">
      <div className="container-fluid">
        <a className="navbar-brand fw-medium text-warning p-1 rounded" href="/">
          <img src={logo} alt="Logo" style={{ width: "30px", marginRight: "10px" }} />
          S-GEN ENERGY AND INFRA PRIVATE LIMITED
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link to="/home" className="nav-link btn btn-dark text-warning fw-medium">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link btn btn-dark text-warning fw-medium">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quote" className="nav-link btn btn-dark text-warning fw-medium">
                New Quote
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/invoice" className="nav-link btn btn-dark text-warning fw-medium">
                Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/work" className="nav-link btn btn-dark text-warning fw-medium">
                Services
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/login" className="nav-link btn btn-dark text-warning fw-medium">
                EMS - Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar3;

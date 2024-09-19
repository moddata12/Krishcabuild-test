import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../../components/layouts/MetaData";
import Footer from "../layouts/Footer";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/v1/login', { email, password });
      // Store token and role in localStorage or cookies
      localStorage.setItem('token', data.token); 
      localStorage.setItem('role', data.role); // Assuming response contains role

      // Redirect based on role
      if (data.role === 'admin') {
        navigate("/control");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary opacity-85">
        <div className="container-fluid">
          <a className="navbar-brand fw-medium text-white p-1 rounded" href="/">
            ENERGY MONITORING SYSTEM
          </a>
        </div>
      </nav>
      <MetaData title={'Login'} />
      <div className="d-flex justify-content-start align-items-center vh-100 p-5">
        <div className="bg-light p-4 rounded w-25 border border-primary border-3">
          <h2>Login</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-10">
              Login
            </button>
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="btn btn-default border w-100 bg-light"
            >
              Sign Up
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

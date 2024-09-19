import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("visitor"); // Default user type
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/verify/register",
        {
          name,
          email,
          password,
          role,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError("Error registering user");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary opacity-85">
        <div className="container-fluid">
          <a className="navbar-brand fw-medium text-white p-1 rounded" href="/">
            ENERGY MONITORING SYSTEM
          </a>
        </div>
      </nav>

      <div className="d-flex justify-content-start align-items-center vh-100 p-5">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="role">
                <strong>User Type</strong>
              </label>
              <select
                className="form-control rounded-0"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="visitor">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-10">
              Register
            </button>
            <p>Already Have an Account</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light">
              Login
            </Link>
          </form>
        </div>
      </div>

      <footer className="footer mt-auto p-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">
            SGen Energy and Infra Private Limited - 2024.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Signup;

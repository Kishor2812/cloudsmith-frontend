import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {

  const { user, logout } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <nav className="navbar navbar-expand-lg cloud-navbar">

      <div className="container">

        {/* LOGO */}

        <Link
          className="navbar-brand logo-text"
          to="/"
        >
          CLOUD<span>SMITH</span>
        </Link>

        {/* MOBILE BUTTON */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        {/* NAV LINKS */}

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/services"
              >
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/industries"
              >
                Industries
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/materials"
              >
                Materials
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/quote"
              >
                Quote
              </Link>
            </li>

          </ul>

          {/* RIGHT SIDE */}

          <div className="d-flex align-items-center">

            {user ? (

              <>

                <Link
                  to="/dashboard"
                  className="btn btn-outline-light me-2"
                >
                  Dashboard
                </Link>

                <button
                  className="btn btn-warning"
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="btn btn-outline-light me-2"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-warning me-3"
                >
                  Signup
                </Link>

              </>

            )}

            <Link
              to="/quote"
              className="quote-btn"
            >
              Quotation Generator

              <FaArrowRight
                className="ms-2"
              />

            </Link>

          </div>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;
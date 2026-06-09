import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaFileInvoice,
  FaBoxOpen,
  FaBell,
  FaUser,
  FaFolderOpen,
  FaPlusCircle,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const location = useLocation();

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";
  };

  const activeStyle = {
    background: "#ffbe0b",
    color: "#000",
    borderRadius: "10px",
    padding: "12px"
  };

  const normalStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "12px",
    display: "block"
  };

  return (

    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: "25px",
        borderRight: "2px solid #ffbe0b"
      }}
    >

      <h2
        style={{
          color: "#ffbe0b",
          fontWeight: "900",
          marginBottom: "40px"
        }}
      >
        CLOUDSMITH
      </h2>

      <ul
        className="list-unstyled"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        <li>
          <Link
            to="/dashboard"
            style={
              location.pathname === "/dashboard"
                ? activeStyle
                : normalStyle
            }
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/quote"
            style={
              location.pathname === "/quote"
                ? activeStyle
                : normalStyle
            }
          >
            <FaPlusCircle className="me-2" />
            New Quote
          </Link>
        </li>

        <li>
          <Link
            to="/quotes"
            style={
              location.pathname === "/quotes"
                ? activeStyle
                : normalStyle
            }
          >
            <FaFileInvoice className="me-2" />
            My Quotes
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            style={
              location.pathname === "/orders"
                ? activeStyle
                : normalStyle
            }
          >
            <FaBoxOpen className="me-2" />
            Orders
          </Link>
        </li>

        <li>
          <Link
            to="/notifications"
            style={
              location.pathname === "/notifications"
                ? activeStyle
                : normalStyle
            }
          >
            <FaBell className="me-2" />
            Notifications
          </Link>
        </li>

        <li>
          <Link
            to="/files"
            style={
              location.pathname === "/files"
                ? activeStyle
                : normalStyle
            }
          >
            <FaFolderOpen className="me-2" />
            My Files
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            style={
              location.pathname === "/profile"
                ? activeStyle
                : normalStyle
            }
          >
            <FaUser className="me-2" />
            Profile
          </Link>
        </li>

      </ul>

      <div
        style={{
          marginTop: "50px"
        }}
      >

        <button
          className="btn btn-warning w-100"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;
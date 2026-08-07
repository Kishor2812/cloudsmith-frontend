import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaChartLine,
  FaUsers,
  FaFileInvoice,
  FaBoxOpen,
  FaSignOutAlt
} from "react-icons/fa";

function AdminSidebar() {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

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
      {/* LOGO */}

      <h2
        style={{
          color: "#ffbe0b",
          fontWeight: "900",
          marginBottom: "40px"
        }}
      >
        CLOUDSMITH
      </h2>

      {/* MENU */}

      <ul
        className="list-unstyled"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >

        <li>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: "#fff",
              display: "block",
              padding: "12px",
              borderRadius: "10px",
              background:
                isActive("/admin")
                  ? "#ffbe0b"
                  : "transparent",
              color:
                isActive("/admin")
                  ? "#000"
                  : "#fff"
            }}
          >
            <FaChartLine className="me-2" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin-quotes"
            style={{
              textDecoration: "none",
              // color: "#fff",
              display: "block",
              padding: "12px",
              borderRadius: "10px",
              background:
                isActive("/admin-quotes")
                  ? "#ffbe0b"
                  : "transparent",
              color:
                isActive("/admin-quotes")
                  ? "#000"
                  : "#fff"
            }}
          >
            <FaFileInvoice className="me-2" />
            Quotes
          </Link>
        </li>

        <li>
          <Link
            to="/admin-orders"
            style={{
              textDecoration: "none",
              color: "#fff",
              display: "block",
              padding: "12px",
              borderRadius: "10px",
              background:
                isActive("/admin-orders")
                  ? "#ffbe0b"
                  : "transparent",
              color:
                isActive("/admin-orders")
                  ? "#000"
                  : "#fff"
            }}
          >
            <FaBoxOpen className="me-2" />
            Orders
          </Link>
        </li>

        <li>
          <Link
            to="/admin-users"
            style={{
              textDecoration: "none",
              color: "#fff",
              display: "block",
              padding: "12px",
              borderRadius: "10px",
              background:
                isActive("/admin-users")
                  ? "#ffbe0b"
                  : "transparent",
              color:
                isActive("/admin-users")
                  ? "#000"
                  : "#fff"
            }}
          >
            <FaUsers className="me-2" />
            Users
          </Link>
        </li>

        <li>
        <Link
          className="nav-link text-white"
          to="/admin-analytics"
        >
          📈 Analytics
        </Link>
      </li>

      </ul>

      {/* LOGOUT */}

      <div
        style={{
          marginTop: "50px"
        }}
      >
        <button
          className="btn btn-warning w-100"
          onClick={() => {

            localStorage.clear();

            window.location.href =
              "/login";
          }}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

    </div>
  );
}

export default AdminSidebar;
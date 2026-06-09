import React, {
  useState,
  useContext
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await axios.post(
          "http://localhost:8080/api/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        response.data
      );

      localStorage.setItem(
        "email",
        formData.email
      );

      login({
        email:
          formData.email
      });

      alert(
        "Login Successful"
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      if (
        error.response
      ) {

        alert(
          typeof error.response.data
            === "string"
            ? error.response.data
            : JSON.stringify(
                error.response.data
              )
        );

      } else {

        alert(
          "Server Connection Failed"
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "#0f0f0f"
      }}
    >

      <div
        className="card shadow-lg p-5"
        style={{
          width: "450px",
          background:
            "#1a1a1a",
          color: "white",
          border:
            "1px solid #333"
        }}
      >

        <h2
          className="text-center mb-4"
          style={{
            color:
              "#ffc107"
          }}
        >
          CloudSmith Login
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-warning w-100"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

        <p className="text-center mt-3">

          Don't have an account?

          <Link
            to="/signup"
            className="ms-1"
            style={{
              color:
                "#ffc107"
            }}
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
import React, { useState } from "react";
//import axios from "axios";
import api from "../services/api";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Signup() {

  const [sendingOtp, setSendingOtp] = useState(false);

  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpVerified,
    setOtpVerified] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const sendOtp = async () => {

  if (!email.includes("@")) {
    alert("Enter Valid Email");
    return;
  }

  setSendingOtp(true);

  try {

    await api.post(`/auth/send-otp?email=${email}`);

    alert("OTP Sent Successfully");

  } catch (error) {

    if (error.response) {
      alert(error.response.data);
    } else {
      alert("Server Connection Failed");
    }

  } finally {
    setSendingOtp(false);
  }
};

  const verifyOtp = async () => {

    try {

      const response =
        // await axios.post(
        //   `http://localhost:8080/api/auth/verify-otp?email=${email}&otp=${otp}`
        // );

        await api.post(
  `/auth/verify-otp?email=${email}&otp=${otp}`
);

      if (
        response.data ===
        "OTP Verified"
      ) {

        setOtpVerified(true);

      }

      alert(response.data);

    } catch (error) {

  if (error.response) {

    const data = error.response.data;

    if (typeof data === "string") {

      alert(data);

    } else if (data.message) {

      alert(data.message);

    } else {

      alert("OTP Verification Failed");

    }

  } else {

    alert("Server Connection Failed");

  }

}
  };

  const register =
    async () => {

    if (
      !/^[6-9][0-9]{9}$/
      .test(mobile)
    ) {

      alert(
        "Enter Valid Mobile Number"
      );

      return;
    }

    if (
      password.length < 6
    ) {

      alert(
        "Password must be at least 6 characters"
      );

      return;
    }

    if (
      !otpVerified
    ) {

      alert(
        "Please Verify OTP First"
      );

      return;
    }

    setLoading(true);

    try {

      const user = {

        fullName,
        mobile,
        email,
        password

      };

      // await axios.post(
      //   "http://localhost:8080/api/auth/register",
      //   user
      // );

      await api.post(
  "/auth/register",
  user
);

      alert(
        "Account Created Successfully"
      );

      navigate("/login");

    } catch (error) {

       if (error.response) {

    const data = error.response.data;

    if (typeof data === "string") {

      alert(data);

    } else if (data.message) {

      alert(data.message);

    } else if (data.error) {

      alert(data.error);

    } else {

      alert("Registration Failed");

    }  

  } else {

    alert("Server Connection Failed");

  }

}finally {

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
        className="card shadow-lg p-4"
        style={{
          width: "500px",
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
          Create Account
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
            )
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* <button
          className="btn btn-warning w-100 mb-3"
          onClick={sendOtp}
        >
          Send OTP
        </button> */}

  <button
  className="btn btn-warning w-100 mb-3"
  onClick={sendOtp}
  disabled={sendingOtp || otpVerified}
>
  {sendingOtp ? "Sending OTP..." : "Send OTP"}
</button>

        <input
          className="form-control mb-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
        />

        {/* <button
          className="btn btn-warning w-100 mb-3"
          onClick={verifyOtp}
        >
          Verify OTP
        </button> */}

        <button
  className="btn btn-warning w-100 mb-3"
  onClick={verifyOtp}
  disabled={otpVerified}
>
  Verify OTP
</button>

        {otpVerified && (

          <div
            className="alert alert-success"
          >
            OTP Verified Successfully
          </div>

        )}

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-warning w-100"
          onClick={register}
          disabled={loading}
        >

          {loading
            ? "Creating Account..."
            : "Create Account"}

        </button>

        <p className="text-center mt-3">

          Already have an account?

          <Link
            to="/login"
            className="ms-1"
            style={{
              color:
                "#ffc107"
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;
import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";

function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [totalQuotes, setTotalQuotes] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [pending, setPending] = useState(0);

 useEffect(() => {

  const loadDashboard = async () => {

    try {

      const email = localStorage.getItem("email");

const response = await API.get(
    `/dashboard/stats?email=${email}`
);

      setTotalQuotes(
  response.data.totalQuotes
);

setApproved(
  response.data.approvedQuotes
);

setRejected(
  response.data.rejectedQuotes
);

setPending(
  response.data.pendingQuotes
);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  loadDashboard();

}, []);

  if (loading) {

    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "#000",
          color: "#ffbe0b"
        }}
      >
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
  <div
    className="d-flex"
    style={{
        background:"#000",
        minHeight:"100vh",
        color:"#fff"
    }}
>

    <Sidebar />

    <div
        className="container-fluid p-4"
        style={{
            background:"#000",
            minHeight:"100vh",
            color:"#fff"
        }}
    >
        <div>

          <h1
            className="fw-bold mb-4"
            style={{
              color: "#ffbe0b"
            }}
          >
            My Dashboard
          </h1>

          <div className="row g-4">

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-warning shadow-lg"
                style={{
                  background: "#111",
                  color: "#fff"
                }}
              >
                <div className="card-body text-center">

                  <h5>Total Quotes</h5>

                  <h2
                    style={{
                      color: "#ffbe0b"
                    }}
                  >
                    {totalQuotes}
                  </h2>

                </div>
              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-success shadow-lg"
                style={{
                  background: "#111",
                  color: "#fff"
                }}
              >
                <div className="card-body text-center">

                  <h5>Approved</h5>

                  <h2 className="text-success">
                    {approved}
                  </h2>

                </div>
              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-danger shadow-lg"
                style={{
                  background: "#111",
                  color: "#fff"
                }}
              >
                <div className="card-body text-center">

                  <h5>Rejected</h5>

                  <h2 className="text-danger">
                    {rejected}
                  </h2>

                </div>
              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-warning shadow-lg"
                style={{
                  background: "#111",
                  color: "#fff"
                }}
              >
                <div className="card-body text-center">

                  <h5>Pending</h5>

                  <h2
                    style={{
                      color: "#ffbe0b"
                    }}
                  >
                    {pending}
                  </h2>

                </div>
              </div>

            </div>

          </div>

          {/* Welcome Section */}

          <div
            className="card mt-5 border-warning shadow-lg"
            style={{
              background: "#111",
              color: "#fff"
            }}
          >
            <div className="card-body">

              <h3
                style={{
                  color: "#ffbe0b"
                }}
              >
                Welcome to CloudSmith
              </h3>

              <p>
                Track your manufacturing quotes,
                monitor approvals, manage orders,
                and download invoices from one place.
              </p>

            </div>
          </div>

             </div>

      </div>

    </div>
  );
}

export default Dashboard;
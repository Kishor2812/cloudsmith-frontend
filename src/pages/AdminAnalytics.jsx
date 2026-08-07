import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function AdminAnalytics() {

  const [stats, setStats] = useState({
    totalQuotes: 0,
    revenue: 0,
    approvedQuotes: 0,
    pendingQuotes: 0,
    rejectedQuotes: 0,
    paidOrders: 0
  });

useEffect(() => {

  loadAnalytics();

}, []);

const loadAnalytics = async () => {

  try {

    const response =
      await API.get(
        "/analytics/dashboard"
      );

    setStats(response.data);

  } catch (error) {

    console.error(error);

  }

};
  const chartData = [
    {
      name: "Approved",
      value: stats.approvedQuotes
    },
    {
      name: "Pending",
      value: stats.pendingQuotes
    },
    {
      name: "Rejected",
      value: stats.rejectedQuotes
    },
    {
      name: "Paid",
      value: stats.paidOrders
    }
  ];

  return (

    <div
      className="d-flex"
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#fff"
      }}
    >

      <AdminSidebar />

      <div className="container-fluid p-4">

        <h1
          className="mb-4"
          style={{
            color: "#ffbe0b"
          }}
        >
          CloudSmith Analytics
        </h1>

        {/* KPI CARDS */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">

            <div
              className="card border-warning"
              style={{
                background: "#111"
              }}
            >

              <div className="card-body text-center">

                <h5>Total Quotes</h5>

                <h2
                  style={{
                    color: "#ffbe0b"
                  }}
                >
                  {stats.totalQuotes}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-success"
              style={{
                background: "#111"
              }}
            >

              <div className="card-body text-center">

                <h5>Total Revenue</h5>

                <h2 className="text-success">
                  ₹{Number(stats.revenue).toLocaleString()}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-primary"
              style={{
                background: "#111"
              }}
            >

              <div className="card-body text-center">

                <h5>Paid Orders</h5>

                <h2 className="text-primary">
                  {stats.paidOrders}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-danger"
              style={{
                background: "#111"
              }}
            >

              <div className="card-body text-center">

                <h5>Rejected Quotes</h5>

                <h2 className="text-danger">
                  {stats.rejectedQuotes}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div
          className="card p-4"
          style={{
            background: "#111"
          }}
        >

          <h4 className="mb-4">
            Quote Statistics
          </h4>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <BarChart
              data={chartData}
            >

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#ffbe0b"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
}

export default AdminAnalytics;
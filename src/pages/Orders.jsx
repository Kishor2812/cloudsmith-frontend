import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const email =
        localStorage.getItem("email");

      const response =
        await API.get(
   `/quotes/customer/${email}`
);

      const validOrders =
        response.data.filter(
          (quote) =>
            quote.status === "Approved" ||
            quote.status === "Accepted"
        );

      setOrders(validOrders);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

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
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (

    <div
      className="d-flex"
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#fff"
      }}
    >

      <Sidebar />

      <div className="container-fluid p-4">

        <h1
          className="mb-4"
          style={{
            color: "#ffbe0b"
          }}
        >
          My Orders
        </h1>

        <div
          className="card border-warning"
          style={{
            background: "#111"
          }}
        >

          <div
            className="card-header"
            style={{
              background: "#ffbe0b",
              color: "#000"
            }}
          >
            <h4 className="mb-0">
              Order Tracking
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-dark table-hover">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>Material</th>
                    <th>Process</th>
                    <th>Quantity</th>
                    <th>Quote Status</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Track</th>
                  </tr>

                </thead>

                <tbody>

                  {orders.length > 0 ? (

                    orders.map((order) => (

                      <tr key={order.id}>

                        <td>{order.id}</td>

                        <td>
                          {order.fileName}
                        </td>

                        <td>
                          {order.material}
                        </td>

                        <td>
                          {order.processName}
                        </td>

                        <td>
                          {order.quantity}
                        </td>

                        <td>

                          <span
                            className={
                              order.status === "Accepted"
                                ? "badge bg-primary"
                                : "badge bg-success"
                            }
                          >
                            {order.status}
                          </span>

                        </td>

                        <td>

                          <span
                            className={
                              order.paymentStatus === "Paid"
                                ? "badge bg-success"
                                : "badge bg-warning text-dark"
                            }
                          >
                            {order.paymentStatus}
                          </span>

                        </td>
                        <td>

                        {order.orderStatus === "Created" && (
                        <span className="badge bg-secondary">
                        Created
                        </span>
                        )}

                        {order.orderStatus === "Assigned" && (
                        <span className="badge bg-info">
                        Assigned
                        </span>
                        )}

                        {order.orderStatus === "Manufacturing" && (
                        <span className="badge bg-warning text-dark">
                        Manufacturing
                        </span>
                        )}

                        {order.orderStatus === "Quality Check" && (
                        <span className="badge bg-primary">
                        Quality Check
                        </span>
                        )}

                        {order.orderStatus === "Shipped" && (
                        <span className="badge bg-success">
                        Shipped
                        </span>
                        )}

                        {order.orderStatus === "Delivered" && (
                        <span className="badge bg-dark">
                        Delivered
                        </span>
                        )}

                        </td>

                        <td>

  <button
    className="btn btn-info btn-sm"
    onClick={() =>
      window.location = `/track-order/${order.id}`
    }
  >
    Track
  </button>

</td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center"
                      >
                        No Orders Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Orders;
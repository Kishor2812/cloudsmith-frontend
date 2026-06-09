import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import API from "../services/api";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const response =
        await API.get("/api/quotes/all");

      const filteredOrders =
        response.data.filter(
          (quote) =>
            quote.status === "Approved" ||
            quote.status === "Accepted"
        );

      setOrders(filteredOrders);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const updateOrderStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/api/quotes/order-status/${id}/${status}`
      );

      fetchOrders();

    } catch (error) {

      console.error(error);

    }
  };

  const filteredOrders =
    orders.filter((order) =>
      order.fileName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {

    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (

    <div className="d-flex">

      <AdminSidebar />

      <div
        className="container-fluid p-4"
        style={{
          background: "#f8f9fa",
          minHeight: "100vh"
        }}
      >

        <h1 className="mb-4">
          Admin Orders
        </h1>

        <div className="card shadow mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search File Name..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="card shadow">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>File Name</th>
                    <th>Material</th>
                    <th>Process</th>
                    <th>Quantity</th>
                    <th>Quote Status</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.length > 0 ? (

                    filteredOrders.map(
                      (order) => (

                      <tr key={order.id}>

                        <td>{order.id}</td>
                        <td>{order.email}</td>
                        <td>{order.fileName}</td>
                        <td>{order.material}</td>
                        <td>{order.processName}</td>
                        <td>{order.quantity}</td>

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

                          <span className="badge bg-info">
                            {order.orderStatus}
                          </span>

                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Quality Check"
                              )
                            }
                          >
                            Quality Check
                          </button>

                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Shipped"
                              )
                            }
                          >
                            Shipped
                          </button>

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Delivered"
                              )
                            }
                          >
                            Delivered
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="10"
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

export default AdminOrders;
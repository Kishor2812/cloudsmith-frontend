import React, { useEffect, useState } from "react";

function ManufacturerDashboard() {

  const [orders, setOrders] = useState([]);

  const manufacturerId =
    localStorage.getItem("manufacturerId");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/quotes/manufacturer/${manufacturerId}`
      );

      const data = await response.json();

      setOrders(data);

    } catch (error) {

      console.error(error);

    }
  };

  const updateStatus = async (
    quoteId,
    status
  ) => {

    try {

      await fetch(
        `http://localhost:8080/api/quotes/order-status/${quoteId}/${status}`,
        {
          method: "PUT"
        }
      );

      alert(
        "Status Updated Successfully"
      );

      loadOrders();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Update Status"
      );
    }
  };

  return (

    <div
      className="container-fluid p-4"
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff"
      }}
    >

      <h1
        className="mb-4"
        style={{
          color: "#ffbe0b"
        }}
      >
        Manufacturer Dashboard
      </h1>

      <div className="card bg-dark border-warning">

        <div
          className="card-header"
          style={{
            background: "#ffbe0b",
            color: "#000"
          }}
        >
          Assigned Orders
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-dark table-hover">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>File</th>
                  <th>Material</th>
                  <th>Process</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {orders.length > 0 ? (

                  orders.map((order) => (

                    <tr key={order.id}>

                      <td>{order.id}</td>

                      <td>{order.email}</td>

                      <td>{order.fileName}</td>

                      <td>{order.material}</td>

                      <td>{order.processName}</td>

                      <td>{order.quantity}</td>

                      <td>
                        ₹{order.price}
                      </td>

                      <td>

                        <span className="badge bg-info">

                          {order.orderStatus}

                        </span>

                      </td>

                      <td>

                        <select
                          className="form-select"
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >

                          <option>
                            Change Status
                          </option>

                          <option value="In Production">
                            In Production
                          </option>

                          <option value="Quality Check">
                            Quality Check
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      className="text-center"
                    >
                      No Orders Assigned
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ManufacturerDashboard;
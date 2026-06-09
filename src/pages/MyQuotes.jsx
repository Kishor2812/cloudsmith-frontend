import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function MyQuotes() {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {

    try {

      const response = await API.get(
        `/api/quotes/${email}`
      );

      setQuotes(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const acceptQuote = async (id) => {

    try {

      await API.put(
        `/api/quotes/${id}/Accepted`
      );

      alert("Quote Accepted Successfully");

      loadQuotes();

    } catch (error) {

      console.error(error);

      alert("Failed To Accept Quote");
    }
  };

  const payNow = async (id) => {

    try {

      await API.put(
        `/api/quotes/pay/${id}`
      );

      alert("Payment Successful");

      loadQuotes();

    } catch (error) {

      console.error(error);

      alert("Payment Failed");
    }
  };

  const downloadInvoice = (id) => {

    window.open(
      `http://localhost:8080/api/invoice/${id}`,
      "_blank"
    );
  };

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.fileName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

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
        <h2>Loading Quotes...</h2>
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
          My Quotes
        </h1>

        <div
          className="card border-warning mb-4"
          style={{
            background: "#111"
          }}
        >
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
              Quote History
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-dark table-hover">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Invoice No</th>
                    <th>File Name</th>
                    <th>Material</th>
                    <th>Process</th>
                    <th>Quantity</th>
                    <th>Factor</th>
                    <th>Delivery</th>
                    <th>Version</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                    <th>Invoice</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredQuotes.length > 0 ? (

                    filteredQuotes.map(
                      (quote) => (

                        <tr key={quote.id}>

                          <td>{quote.id}</td>

                          <td>
                            {quote.invoiceNumber || "N/A"}
                          </td>

                          <td>
                            {quote.fileName}
                          </td>

                          <td>
                            {quote.material}
                          </td>

                          <td>
                            {quote.processName}
                          </td>

                          <td>
                            {quote.quantity}
                          </td>

                          <td>
                            {quote.manufacturingFactor || 1.0}
                          </td>

                          <td>
                            {quote.deliveryDays
                              ? `${quote.deliveryDays} Days`
                              : "7 Days"}
                          </td>

                          <td>
                            {quote.quotationVersion || 1}
                          </td>

                          <td>

                            <span
                              className={
                                quote.status === "Approved"
                                  ? "badge bg-success"
                                  : quote.status === "Rejected"
                                  ? "badge bg-danger"
                                  : quote.status === "Accepted"
                                  ? "badge bg-primary"
                                  : "badge bg-warning text-dark"
                              }
                            >
                              {quote.status}
                            </span>

                          </td>

                          <td>
                            {quote.price
                              ? `₹${quote.price}`
                              : "Waiting"}
                          </td>

                          <td>

                            <span
                              className={
                                quote.paymentStatus === "Paid"
                                  ? "badge bg-success"
                                  : "badge bg-warning text-dark"
                              }
                            >
                              {quote.paymentStatus || "Pending"}
                            </span>

                          </td>

                          <td>

                            <span className="badge bg-info">
                              {quote.orderStatus || "Waiting"}
                            </span>

                          </td>

                          <td>

                            {quote.status === "Approved"
                              && quote.price ? (

                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  acceptQuote(
                                    quote.id
                                  )
                                }
                              >
                                Accept
                              </button>

                            ) : null}

                            {quote.status === "Accepted"
                              && quote.paymentStatus === "Pending" ? (

                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() =>
                                  payNow(
                                    quote.id
                                  )
                                }
                              >
                                Pay Now
                              </button>

                            ) : null}

                          </td>

                          <td>

                            {quote.paymentStatus === "Paid" ? (

                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() =>
                                  downloadInvoice(
                                    quote.id
                                  )
                                }
                              >
                                Download
                              </button>

                            ) : (

                              <span className="text-muted">
                                Not Available
                              </span>

                            )}

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="15"
                        className="text-center"
                      >
                        No Quotes Found
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

export default MyQuotes;
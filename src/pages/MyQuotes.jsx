import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function MyQuotes() {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const email = localStorage.getItem("email");

 useEffect(() => {
  loadOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const loadQuotes = async () => {

    try {

     const response = await API.get(`/quotes/customer/${email}`);

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
    `/quotes/${id}/Accepted`
);

      alert("Quote Accepted Successfully");

      loadQuotes();

    } catch (error) {

      console.error(error);

      alert("Failed To Accept Quote");
    }
  };

//   const payNow = async (id) => {

//     try {

//      await API.put(
//     `/quotes/pay/${id}`
// );
//       alert("Payment Successful");

//       loadQuotes();

//     } catch (error) {

//       console.error(error);

//       alert("Payment Failed");
//     }
//   };

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

  <div
  className="table-responsive"
  style={{
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
    maxWidth: "calc(100vw - 300px)"
  }}
>

   <table
  className="table table-dark table-hover"
  style={{
    width: "max-content",
    minWidth: "100%"
  }}
>

                <thead>
{/* 
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
                    <th>Manufacturer</th>
                    <th>Complexity</th>
                    <th>Setup Cost</th>
                    <th>Bend Cost</th>
                    <th>Material Cost</th>
                    <th>Manufacturing Cost</th>
                    <th>GST</th>
                    <th>Final Amount</th>
                  </tr> */}


                  <tr>
  <th>ID</th>
  <th>Invoice No</th>
  <th>File Name</th>
  <th>Material</th>
  <th>Process</th>

  <th>Manufacturer</th>
  <th>Complexity</th>
  <th>Setup Cost</th>
  <th>Bend Cost</th>
  <th>Material Cost</th>
  <th>Manufacturing Cost</th>
  <th>GST</th>
  <th>Final Amount</th>

  <th>Quantity</th>
  <th>Factor</th>
  <th>Delivery</th>
  <th>Version</th>

  <th>Status</th>
  <th>Price</th>
  <th>Payment Status</th>
<th>Payment Method</th>
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

                          <td>{quote.manufacturerName || "-"}</td>

                          <td>{quote.complexityLevel || "-"}</td>

                          <td>
                            ₹{quote.setupCost?.toFixed(2) || "0.00"}
                          </td>

                          <td>
                            ₹{quote.bendCost?.toFixed(2) || "0.00"}
                          </td>

                          <td>
                            ₹{quote.materialCost?.toFixed(2) || "0.00"}
                          </td>

                          <td>
                            ₹{quote.manufacturingCost?.toFixed(2) || "0.00"}
                          </td>

                          <td>
                            ₹{quote.gstAmount?.toFixed(2) || "0.00"}
                          </td>

                          <td className="fw-bold text-warning">
                            ₹{quote.finalAmount?.toFixed(2) || quote.price}
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
  <span className="badge bg-secondary">
    {quote.paymentMethod || "Cash On Delivery"}
  </span>
</td>

                          <td>

                            <span
                                className={
                                    quote.orderStatus === "Delivered"
                                        ? "badge bg-success"
                                        : quote.orderStatus === "Shipped"
                                        ? "badge bg-primary"
                                        : quote.orderStatus === "Manufacturing"
                                        ? "badge bg-warning text-dark"
                                        : quote.orderStatus === "Assigned"
                                        ? "badge bg-info"
                                        : "badge bg-secondary"
                                }
                                >
                                {quote.orderStatus || "Waiting"}
                                </span>

                          </td>
                          <td>

                            {quote.status === "Approved" &&
                              quote.price && (

                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => acceptQuote(quote.id)}
                              >
                                Accept
                              </button>

                            )}

                            {/* {quote.status === "Accepted" &&
                              quote.paymentStatus === "Pending" && (

                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => payNow(quote.id)}
                              >
                                Pay Now
                              </button>

                            )} */}

                            {quote.orderStatus && (

                              <button
                                className="btn btn-info btn-sm me-2"
                                onClick={() =>
                                  window.location =
    `/track-order/${quote.id}`
                                }
                              >
                                Track
                              </button>

                            )}

                            {quote.filePath && (

                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() =>
                                  window.open(
                                    quote.filePath,
                                    "_blank"
                                  )
                                }
                              >
                                CAD
                              </button>

                            )}

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
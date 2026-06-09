import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import API from "../services/api";

function AdminQuotes() {

  const [quotes, setQuotes] = useState([]);
  const [prices, setPrices] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {

    try {

      const response =
        await API.get("/api/quotes/all");

      setQuotes(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      let url = "";

      if (status === "Approved") {

        url =
          `/api/quotes/approve/${id}`;

      } else {

        url =
          `/api/quotes/reject/${id}`;

      }

      await API.put(url);

      fetchQuotes();

    } catch (error) {

      console.error(error);

    }
  };

  const savePrice = async (id) => {

    try {

      const price =
        prices[id];

      if (!price) {

        alert(
          "Please Enter Price"
        );

        return;
      }

      await API.put(
        `/api/quotes/price/${id}/${price}`
      );

      alert(
        "Price Saved Successfully"
      );

      fetchQuotes();

    } catch (error) {

      console.error(error);

    }
  };

  const filteredQuotes =
    quotes.filter(
      (quote) =>
        quote.fileName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        quote.email
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
          height: "100vh"
        }}
      >
        <h2>Loading Quotes...</h2>
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
          Admin Quotes
        </h1>

        <div className="card shadow mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Email or File Name..."
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
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredQuotes.length > 0 ? (

                    filteredQuotes.map(
                      (quote) => (

                      <tr key={quote.id}>

                        <td>{quote.id}</td>
                        <td>{quote.email}</td>
                        <td>{quote.fileName}</td>
                        <td>{quote.material}</td>
                        <td>{quote.processName}</td>
                        <td>{quote.quantity}</td>

                        <td>

                          {quote.status === "Approved" && (
                            <span className="badge bg-success">
                              Approved
                            </span>
                          )}

                          {quote.status === "Rejected" && (
                            <span className="badge bg-danger">
                              Rejected
                            </span>
                          )}

                          {quote.status === "Pending" && (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          )}

                          {quote.status === "Accepted" && (
                            <span className="badge bg-primary">
                              Accepted
                            </span>
                          )}

                        </td>

                        <td>

                          {quote.price
                            ? `₹${quote.price}`
                            : "Not Set"}

                          <input
                            type="number"
                            className="form-control mt-2"
                            placeholder="Price"
                            value={
                              prices[quote.id] || ""
                            }
                            onChange={(e) =>
                              setPrices({
                                ...prices,
                                [quote.id]:
                                  e.target.value
                              })
                            }
                          />

                          <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() =>
                              savePrice(
                                quote.id
                              )
                            }
                          >
                            Save
                          </button>

                        </td>

                        <td>

                          <span
                            className={
                              quote.paymentStatus === "Paid"
                                ? "badge bg-success"
                                : "badge bg-warning text-dark"
                            }
                          >
                            {quote.paymentStatus}
                          </span>

                        </td>

                        <td>

                          <span className="badge bg-info">
                            {quote.orderStatus}
                          </span>

                        </td>

                        <td>

                          {quote.status === "Pending" && (

                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  updateStatus(
                                    quote.id,
                                    "Approved"
                                  )
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  updateStatus(
                                    quote.id,
                                    "Rejected"
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>

                          )}

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="11"
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

export default AdminQuotes;
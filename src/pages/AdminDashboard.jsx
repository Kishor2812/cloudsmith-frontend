import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminDashboard() {

  const [loading, setLoading] = useState(true);

  const [totalQuotes, setTotalQuotes] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [pending, setPending] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [paidOrders, setPaidOrders] = useState(0);

  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    Promise.all([
      fetch("http://localhost:8080/api/quotes/count")
        .then(res => res.json()),

      fetch("http://localhost:8080/api/quotes/approved-count")
        .then(res => res.json()),

      fetch("http://localhost:8080/api/quotes/rejected-count")
        .then(res => res.json()),

      fetch("http://localhost:8080/api/quotes/pending-count")
        .then(res => res.json()),

      fetch("http://localhost:8080/api/quotes/all")
        .then(res => res.json())

    ])
      .then(([total, approved, rejected, pending, quotes]) => {

        setTotalQuotes(total);
        setApproved(approved);
        setRejected(rejected);
        setPending(pending);
        setQuotes(quotes);

        const revenue =
  quotes
    .filter(
      q => q.paymentStatus === "Paid"
    )
    .reduce(
      (sum, q) =>
        sum + (q.price || 0),
      0
    );

const paid =
  quotes.filter(
    q => q.paymentStatus === "Paid"
  ).length;

setTotalRevenue(revenue);
setPaidOrders(paid);

        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

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

  const filteredQuotes = quotes.filter(
    quote =>
      quote.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

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
          className="mb-4 fw-bold"
          style={{ color: "#ffbe0b" }}
        >
          CloudSmith Admin Dashboard
        </h1>

        {/* STATISTICS */}

        <div className="row">

          <div className="col-lg-3 col-md-6 mb-4">
            <div
              className="card border-warning shadow-lg"
              style={{
                background: "#111",
                color: "#fff"
              }}
            >
              <div className="card-body text-center">
                <h5>Total Quotes</h5>
                <h2 className="text-warning">
                  {totalQuotes}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
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

          <div className="col-lg-3 col-md-6 mb-4">
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

          <div className="col-lg-3 col-md-6 mb-4">
            <div
              className="card border-warning shadow-lg"
              style={{
                background: "#111",
                color: "#fff"
              }}
            >
              <div className="card-body text-center">
                <h5>Pending</h5>
                <h2 className="text-warning">
                  {pending}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-info shadow-lg"
    style={{
      background: "#111",
      color: "#fff"
    }}
  >
    <div className="card-body text-center">
      <h5>Total Revenue</h5>
      <h2 className="text-info">
        ₹{totalRevenue}
      </h2>
    </div>
  </div>
</div>

<div className="col-lg-3 col-md-6 mb-4">
  <div
    className="card border-primary shadow-lg"
    style={{
      background: "#111",
      color: "#fff"
    }}
  >
    <div className="card-body text-center">
      <h5>Paid Orders</h5>
      <h2 className="text-primary">
        {paidOrders}
      </h2>
    </div>
  </div>
</div>

        </div>

        {/* SEARCH */}

        <div className="card bg-dark border-warning shadow-lg mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        {/* QUOTES TABLE */}

        <div className="card bg-dark border-warning shadow-lg">

          <div
            className="card-header"
            style={{
              background: "#ffbe0b",
              color: "#000"
            }}
          >
            <h4 className="mb-0 fw-bold">
              Recent Quotes
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-dark table-hover align-middle">

                <thead>

                  <tr>
                    <th>ID</th>
<th>ID</th>
<th>Invoice</th>
<th>Email</th>
<th>File Name</th>
<th>Material</th>
<th>Process</th>
<th>Qty</th>
<th>Factor</th>
<th>Delivery</th>
<th>Price</th>
<th>Status</th>
<th>Payment</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredQuotes
                    .slice(0, 20)
                    .map((quote) => (

                    <tr key={quote.id}>

                      <td>{quote.id}</td>

<td>
  {quote.invoiceNumber || "N/A"}
</td>

<td>{quote.email}</td>

<td>{quote.fileName}</td>

<td>{quote.material}</td>

<td>{quote.processName}</td>

<td>{quote.quantity}</td>

<td>
  {quote.manufacturingFactor || 1.0}
</td>

<td>
  {quote.deliveryDays || 7} Days
</td>

<td>
  ₹{quote.price || 0}
</td>

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

                      </td>

                      <td>

                        {quote.paymentStatus === "Paid" ? (
                          <span className="badge bg-success">
                            Paid
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
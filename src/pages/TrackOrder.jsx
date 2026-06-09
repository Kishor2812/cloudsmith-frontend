import React, { useState } from "react";

function TrackOrder() {

  const [trackingNumber,
          setTrackingNumber] =
          useState("");

  const [shipment,
          setShipment] =
          useState(null);

  const [loading,
          setLoading] =
          useState(false);

  const searchShipment =
    async () => {

      if (!trackingNumber) {

        alert(
          "Enter Tracking Number"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            `http://localhost:8080/api/shipment/tracking/${trackingNumber}`
          );

        if (!response.ok) {

          throw new Error(
            "Shipment Not Found"
          );
        }

        const data =
          await response.json();

        setShipment(data);

      } catch (error) {

        console.error(error);

        alert(
          "Shipment Not Found"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div
      className="container py-5"
      style={{
        minHeight: "100vh"
      }}
    >

      <h1
        className="text-center mb-5"
      >
        Track Order
      </h1>

      <div
        className="card shadow p-4"
      >

        <div className="row">

          <div className="col-md-9">

            <input
              type="text"
              className="form-control"
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) =>
                setTrackingNumber(
                  e.target.value
                )
              }
            />

          </div>

          <div className="col-md-3">

            <button
              className="btn btn-warning w-100"
              onClick={
                searchShipment
              }
            >
              Track
            </button>

          </div>

        </div>

      </div>

      {loading && (

        <div
          className="text-center mt-4"
        >
          Loading...
        </div>

      )}

      {shipment && (

        <div
          className="card shadow mt-4 p-4"
        >

          <h3>
            Tracking Details
          </h3>

          <hr />

          <p>
            <strong>
              Tracking Number:
            </strong>
            {" "}
            {shipment.trackingNumber}
          </p>

          <p>
            <strong>
              Courier:
            </strong>
            {" "}
            {shipment.courierName}
          </p>

          <p>
            <strong>
              Status:
            </strong>
            {" "}
            {shipment.shipmentStatus}
          </p>

          <hr />

          <div>

            <div
              className={
                shipment.shipmentStatus
                  === "Shipped"
                ||
                shipment.shipmentStatus
                  === "In Transit"
                ||
                shipment.shipmentStatus
                  === "Out For Delivery"
                ||
                shipment.shipmentStatus
                  === "Delivered"
                  ? "text-success"
                  : ""
              }
            >
              ✔ Shipped
            </div>

            <div
              className={
                shipment.shipmentStatus
                  === "In Transit"
                ||
                shipment.shipmentStatus
                  === "Out For Delivery"
                ||
                shipment.shipmentStatus
                  === "Delivered"
                  ? "text-success"
                  : ""
              }
            >
              ✔ In Transit
            </div>

            <div
              className={
                shipment.shipmentStatus
                  === "Out For Delivery"
                ||
                shipment.shipmentStatus
                  === "Delivered"
                  ? "text-success"
                  : ""
              }
            >
              ✔ Out For Delivery
            </div>

            <div
              className={
                shipment.shipmentStatus
                  === "Delivered"
                  ? "text-success"
                  : ""
              }
            >
              ✔ Delivered
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TrackOrder;
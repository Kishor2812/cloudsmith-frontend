import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./TrackOrder.css";

function TrackOrder() {
  const { id } = useParams();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  loadOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const loadOrder = async () => {
    try {
      const response = await API.get(`/orders/tracking/${id}`);
      setShipment(response.data);
    } catch (error) {
      alert("Order Not Found");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = () => {

  switch (shipment?.orderStatus) {

    case "Created":
      return 25;

    case "Quality Check":
      return 50;

    case "Shipped":
      return 75;

    case "Delivered":
      return 100;

    default:
      return 0;
  }
};

 const steps = [
  "Created",
  "Quality Check",
  "Shipped",
  "Delivered",
];

  const completed = (step) =>
    steps.indexOf(shipment?.orderStatus) >= steps.indexOf(step);

  if (loading)
    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );

  if (!shipment)
    return (
      <div className="text-center mt-5">
        <h3>Order Not Found</h3>
      </div>
    );

  return (
    <div className="container py-5">

      <h2 className="text-center text-warning mb-4">
        Track Order
      </h2>

      <div className="card bg-dark text-white border-warning shadow">

        <div className="card-body">

          <h4 className="text-warning mb-4">
            Tracking Details
          </h4>

          <div className="row">

            <div className="col-md-6">

              <p><strong>Order ID :</strong> {shipment.id}</p>

              <p><strong>Quote ID :</strong> {shipment.quoteId}</p>

              <p><strong>Manufacturer :</strong> {shipment.manufacturerName || "Not Assigned"}</p>

              <p><strong>Customer :</strong> {shipment.customerEmail}</p>

            </div>

            <div className="col-md-6">

              <p><strong>Tracking No :</strong> {shipment.trackingNumber || "Not Generated"}</p>

              <p><strong>Courier :</strong> {shipment.courierName || "Not Assigned"}</p>

              <p><strong>Status :</strong> {shipment.orderStatus}</p>

              <p><strong>Delivery :</strong> {shipment.estimatedDeliveryDate || "Pending"}</p>

            </div>

          </div>

          <hr />

          <h5 className="text-warning">
            Progress
          </h5>

          <div className="progress mb-4">

            <div
              className="progress-bar bg-warning text-dark"
              style={{ width: `${getProgress()}%` }}
            >
              {getProgress()}%
            </div>

          </div>

          <h5 className="text-warning">
            Order Timeline
          </h5>

          <ul className="list-group">

            {steps.map((step) => (

              <li
                key={step}
                className={`list-group-item ${
                  completed(step)
                    ? "list-group-item-success"
                    : ""
                }`}
              >
                {step}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default TrackOrder;
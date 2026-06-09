import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications = async () => {

    try {

      const email =
        localStorage.getItem("email");

      const response =
        await API.get(
          `/api/notifications/${email}`
        );

      setNotifications(response.data);

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
        <h2>Loading Notifications...</h2>
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
          Notifications
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
              Recent Updates
            </h4>
          </div>

          <div className="card-body">

            {notifications.length > 0 ? (

              <ul className="list-group">

                {notifications.map((n) => (

                  <li
                    key={n.id}
                    className="list-group-item"
                    style={{
                      background: "#1a1a1a",
                      color: "#fff",
                      border: "1px solid #333"
                    }}
                  >
                    🔔 {n.message}
                  </li>

                ))}

              </ul>

            ) : (

              <div className="text-center py-4">

                <h5>No Notifications Found</h5>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;
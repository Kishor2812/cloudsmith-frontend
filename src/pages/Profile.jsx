import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const email =
        localStorage.getItem("email");

      const response =
        await API.get(
          `/api/auth/profile?email=${email}`
        );

      setUser(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const saveProfile = async () => {

    try {

      await API.put(
        "/api/auth/update-profile",
        user
      );

      alert(
        "Profile Updated Successfully"
      );

      setEditing(false);

    } catch (error) {

      console.error(error);

      alert(
        "Update Failed"
      );

    }
  };

  if (!user) {

    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "#000",
          color: "#ffbe0b"
        }}
      >
        <h2>Loading Profile...</h2>
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

        <div
          className="card border-warning shadow-lg"
          style={{
            background: "#111"
          }}
        >

          <div className="card-body">

            {/* Header */}

            <div className="text-center mb-4">

              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "#ffbe0b",
                  color: "#000",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "0 auto 15px"
                }}
              >
                {user.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <h2
                style={{
                  color: "#ffbe0b"
                }}
              >
                My Profile
              </h2>

            </div>

            <div className="row">

              <div className="col-md-6">

                <h5>Full Name</h5>

                {editing ? (

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        fullName:
                          e.target.value
                      })
                    }
                  />

                ) : (

                  <p>{user.fullName}</p>

                )}

              </div>

              <div className="col-md-6">

                <h5>Email</h5>

                <p>{user.email}</p>

              </div>

            </div>

            <div className="row">

              <div className="col-md-6">

                <h5>Mobile</h5>

                {editing ? (

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={user.mobile || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        mobile:
                          e.target.value
                      })
                    }
                  />

                ) : (

                  <p>{user.mobile}</p>

                )}

              </div>

              <div className="col-md-6">

                <h5>Role</h5>

                <span
                  className={
                    user.role === "ADMIN"
                      ? "badge bg-danger"
                      : "badge bg-success"
                  }
                >
                  {user.role}
                </span>

              </div>

            </div>

            <hr />

            {editing ? (

              <button
                className="btn btn-warning"
                onClick={saveProfile}
              >
                Save Changes
              </button>

            ) : (

              <button
                className="btn btn-warning"
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;
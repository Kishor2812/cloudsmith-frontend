import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import API from "../services/api";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    try {

      const response =
        await API.get("/api/auth/all-users");

      setUsers(response.data);

    } catch (error) {

      console.error(error);
      alert("Failed to load users");

    } finally {

      setLoading(false);

    }
  };

  const deleteUser = async (id) => {

    if (!window.confirm(
      "Delete this user?"
    )) {
      return;
    }

    try {

      await API.delete(
        `/api/auth/delete-user/${id}`
      );

      alert("User Deleted");

      loadUsers();

    } catch (error) {

      console.error(error);
      alert("Delete Failed");

    }
  };

  const filteredUsers =
    users.filter(user =>
      user.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
      ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
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
        <h2>Loading Users...</h2>
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

      <AdminSidebar />

      <div className="container-fluid p-4">

        <h1
          className="mb-4 fw-bold"
          style={{
            color: "#ffbe0b"
          }}
        >
          User Management
        </h1>

        {/* Search */}

        <div className="card bg-dark border-warning shadow-lg mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search User..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* Table */}

        <div className="card bg-dark border-warning shadow-lg">

          <div
            className="card-header"
            style={{
              background: "#ffbe0b",
              color: "#000"
            }}
          >
            <h4 className="mb-0">
              All Users
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-dark table-hover">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map(
                    (user) => (

                    <tr key={user.id}>

                      <td>{user.id}</td>

                      <td>
                        {user.fullName}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>

                        <span
                          className={
                            user.role === "ADMIN"
                              ? "badge bg-danger"
                              : "badge bg-success"
                          }
                        >
                          {user.role}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteUser(
                              user.id
                            )
                          }
                        >
                          Delete
                        </button>

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

export default AdminUsers;
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
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
    `/auth/profile?email=${email}`
);

      setUser(response.data);
      const addressResponse = await API.get(
    `/address?email=${email}`
);

setAddress(addressResponse.data);

    } catch (error) {

      console.error(error);

    }
  };

 const saveProfile = async () => {

  if (!/^[6-9][0-9]{9}$/.test(user.mobile)) {

    alert("Enter a valid mobile number");

    return;

  }

  try {

    await API.put(
      "/auth/update-profile",
      user
    );

    await API.post(
  "/address/save",
  address
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

            <div className="row mt-4">

  <div className="col-md-6">

    <h5>Company</h5>

    {editing ? (
  <input
    className="form-control mb-3"
    value={address?.company || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        company: e.target.value
      })
    }
  />
) : (
  <p>{address?.company || "-"}</p>
)}

  </div>

  <div className="col-md-6">

    <h5>Address Line 1</h5>

   {editing ? (
  <input
    className="form-control mb-3"
    value={address?.addressLine1 || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        addressLine1: e.target.value
      })
    }
  />
) : (
  <p>{address?.addressLine1 || "-"}</p>
)}

  </div>

</div>

<div className="row">

  <div className="col-md-6">

    <h5>Address Line 2</h5>

    {editing ? (
  <input
    className="form-control mb-3"
    value={address?.addressLine2 || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        addressLine2: e.target.value
      })
    }
  />
) : (
  <p>{address?.addressLine2 || "-"}</p>
)}

  </div>

  <div className="col-md-6">

    <h5>City</h5>

    {editing ? (
  <input
    className="form-control mb-3"
    value={address?.city || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        city: e.target.value
      })
    }
  />
) : (
  <p>{address?.city || "-"}</p>
)}

  </div>

</div>

<div className="row">

  <div className="col-md-4">

    <h5>State</h5>

    {editing ? (
  <input
    className="form-control mb-3"
    value={address?.state || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        state: e.target.value
      })
    }
  />
) : (
  <p>{address?.state || "-"}</p>
)}

  </div>

  <div className="col-md-4">

    <h5>Country</h5>

{editing ? (
  <input
    className="form-control mb-3"
    value={address?.country || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        country: e.target.value
      })
    }
  />
) : (
  <p>{address?.country || "-"}</p>
)}

  </div>

  <div className="col-md-4">

    <h5>Pincode</h5>

    {editing ? (
  <input
    className="form-control mb-3"
    value={address?.pincode || ""}
    onChange={(e) =>
      setAddress({
        ...address,
        pincode: e.target.value
      })
    }
  />
) : (
  <p>{address?.pincode || "-"}</p>
)}

  </div>

</div>

            <hr />

            {editing ? (

  <>
    <button
      className="btn btn-warning"
      onClick={saveProfile}
    >
      Save Changes
    </button>

    <button
      className="btn btn-secondary ms-2"
      onClick={() => {

        setEditing(false);

        loadProfile();

      }}
    >
      Cancel
    </button>
  </>

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
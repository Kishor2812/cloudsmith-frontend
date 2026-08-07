import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import API from "../services/api";

function FileManager() {

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [files, setFiles] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const email =
    localStorage.getItem("email");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {

    try {

      const response =
        // await API.get(
        //   `/api/files/${email}`
        // );

        await API.get(
    `/files/${email}`
);

      setFiles(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const uploadFile = async () => {

    if (!selectedFile) {

      alert("Please Select File");
      return;

    }

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      formData.append(
        "email",
        email
      );

      // await API.post(
      //   "/api/upload",

      await API.post(
    "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert(
        "File Uploaded Successfully"
      );

      setSelectedFile(null);

      loadFiles();

    } catch (error) {

      console.error(error);

      alert("Upload Failed");

    }
  };

  const deleteFile = async (id) => {

    if (!window.confirm(
      "Delete this file?"
    )) {
      return;
    }

    try {

      // await API.delete(
      //   `/api/files/delete/${id}`
      // );

      await API.delete(
    `/files/delete/${id}`
);

      loadFiles();

    } catch (error) {

      console.error(error);

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
        <h2>Loading Files...</h2>
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
          My CAD Files
        </h1>

        <div
          className="card mb-4 border-warning"
          style={{
            background: "#111"
          }}
        >

          <div className="card-body">

            <h4 className="mb-3">
              Upload File
            </h4>

            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files[0]
                )
              }
            />

            <button
              className="btn btn-warning"
              onClick={uploadFile}
            >
              Upload
            </button>

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
              Uploaded Files
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-dark table-hover">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {files.length > 0 ? (

                    files.map((file) => (

                      <tr key={file.id}>

                        <td>{file.id}</td>

                        <td>
                          {file.fileName}
                        </td>

                        <td>
                          {file.fileType}
                        </td>

                        <td>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              window.open(
                                `http://localhost:8080/api/upload/download/${file.fileName}`
                              )
                            }
                          >
                            Download
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteFile(
                                file.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center"
                      >
                        No Files Found
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

export default FileManager;
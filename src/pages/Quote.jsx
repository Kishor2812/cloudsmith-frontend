import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Quote() {

  const [file, setFile] = useState(null);

  const [generatedPrice, setGeneratedPrice] =
    useState(0);

    const [cadAnalysis, setCadAnalysis] =
  useState(null);

  const [previewPrice, setPreviewPrice] =
    useState(0);

  const [manufacturingFactor] =
    useState(1.0);

  const [formData, setFormData] = useState({
    process: "",
    material: "",
    quantity: 1
  });

  useEffect(() => {

    if (
      formData.material &&
      formData.process &&
      formData.quantity
    ) {

      axios
        .get(
          "http://localhost:8080/api/quotes/preview",
          {
            params: {
              material:
                formData.material,

              process:
                formData.process,

              quantity:
                formData.quantity,

              factor:
                manufacturingFactor
            }
          }
        )
        .then((response) => {

          setPreviewPrice(
            response.data
          );

        })
        .catch(console.error);
    }

  }, [
    formData.material,
    formData.process,
    formData.quantity,
    manufacturingFactor
  ]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };
const handleFileChange = async (e) => {

  const selectedFile =
    e.target.files[0];

  setFile(selectedFile);

  try {

    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );

    formData.append(
      "email",
      localStorage.getItem(
        "email"
      )
    );

    const response =
      await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    loadCadAnalysis(
      response.data.fileName
    );

  } catch (error) {

    console.error(error);

    alert(
      "File Upload Failed"
    );
  }
};

  const loadCadAnalysis =
  async (fileName) => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/cad/file/${fileName}`
        );

      setCadAnalysis(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {

      alert(
        "Please Upload CAD File"
      );

      return;
    }

    try {

      const quoteData = {

        email:
          localStorage.getItem(
            "email"
          ),

        fileName:
          file.name,

        material:
          formData.material,

        processName:
          formData.process,

        quantity:
          parseInt(
            formData.quantity
          ),

        manufacturingFactor:
          manufacturingFactor
      };

      const response =
        await axios.post(
          "http://localhost:8080/api/quotes/save",
          quoteData
        );

      setGeneratedPrice(
        response.data.price
      );

      alert(
        "Quote Generated Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Generate Quote"
      );
    }
  };

  return (
    <>
      <Navbar />

      <section className="container py-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Instant Manufacturing Quote
          </h1>

          <p className="text-muted">
            Upload your CAD file and
            generate an automatic quote.
          </p>

        </div>

        <div className="row">

          {/* LEFT SECTION */}

          <div className="col-lg-8">

            <div className="card shadow border-0 p-4">

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Upload CAD File
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    onChange={
                      handleFileChange
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Manufacturing Process
                  </label>

                  <select
                    className="form-select"
                    name="process"
                    value={
                      formData.process
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Process
                    </option>

                    <option value="CNC Machining">
                      CNC Machining
                    </option>

                    <option value="3D Printing">
                      3D Printing
                    </option>

                    <option value="Injection Molding">
                      Injection Molding
                    </option>

                    <option value="Laser Cutting">
                      Laser Cutting
                    </option>

                  </select>

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Material
                  </label>

                  <select
                    className="form-select"
                    name="material"
                    value={
                      formData.material
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Material
                    </option>

                    <option value="Aluminum">
                      Aluminum
                    </option>

                    <option value="Steel">
                      Steel
                    </option>

                    <option value="Titanium">
                      Titanium
                    </option>

                    <option value="ABS Plastic">
                      ABS Plastic
                    </option>

                  </select>

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="quantity"
                    value={
                      formData.quantity
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-warning px-4 fw-bold"
                >
                  Generate Quote
                </button>

              </form>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="col-lg-4">

            <div className="card shadow border-0 p-4">

              <h3 className="mb-4">
                Quote Summary
              </h3>

              <p>
                <strong>File:</strong>{" "}
                {file
                  ? file.name
                  : "Not Uploaded"}
              </p>

              <p>
                <strong>Process:</strong>{" "}
                {formData.process ||
                  "Not Selected"}
              </p>

              <p>
                <strong>Material:</strong>{" "}
                {formData.material ||
                  "Not Selected"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {formData.quantity}
              </p>

              <p>
                <strong>
                  Manufacturing Factor:
                </strong>{" "}
                {manufacturingFactor}
              </p>

              <p>
                <strong>
                  Delivery:
                </strong>{" "}
                7 Days
              </p>

              <hr />

              <h5>
                Estimated Price
              </h5>

              <h2 className="text-warning fw-bold">
                ₹{previewPrice}
              </h2>

              {generatedPrice > 0 && (
                <div className="mt-3">

                  <h6>
                    Generated Quote
                  </h6>

                  <h4 className="text-success">
                    ₹{generatedPrice}
                  </h4>

                </div>
              )}

              {cadAnalysis && (

  <div className="mt-4">

    <hr />

    <h5>
      CAD Analysis
    </h5>

    <p>
      <strong>Volume:</strong>{" "}
      {cadAnalysis.volume}
    </p>

    <p>
      <strong>Surface Area:</strong>{" "}
      {cadAnalysis.surfaceArea}
    </p>

    <p>
      <strong>Width:</strong>{" "}
      {cadAnalysis.width}
    </p>

    <p>
      <strong>Height:</strong>{" "}
      {cadAnalysis.height}
    </p>

    <p>
      <strong>Depth:</strong>{" "}
      {cadAnalysis.depth}
    </p>

    <p>
      <strong>Face Count:</strong>{" "}
      {cadAnalysis.faceCount}
    </p>

    <p>
      <strong>Edge Count:</strong>{" "}
      {cadAnalysis.edgeCount}
    </p>

    <p>
      <strong>Complexity:</strong>{" "}
      {cadAnalysis.complexityScore}
    </p>

  </div>

)}

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Quote;
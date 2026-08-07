import React, { useState, useEffect } from "react";
//import axios from "axios";
import API from "../services/api";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AddressModal from "../components/AddressModal";

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

    const [quotePreview, setQuotePreview] = useState(null);

  const [formData, setFormData] = useState({
    process: "",
    material: "",
    quantity: 1
  });

  const [uploadedFileName,
       setUploadedFileName] =
useState("");

const [showAddressModal, setShowAddressModal] = useState(false);

const [addressData, setAddressData] = useState({
  company: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  pincode: ""
});

  useEffect(() => {

    if (
      formData.material &&
      formData.process &&
      formData.quantity
    ) {

      API
    .get(
        "/quotes/preview",
          {
   params: {
  material: formData.material,
  process: formData.process,
  quantity: formData.quantity,
  volume: cadAnalysis ? cadAnalysis.volume : 1,
  surfaceArea: cadAnalysis ? cadAnalysis.surfaceArea : 0,
  holeCount: cadAnalysis ? cadAnalysis.holeCount : 0,
  deliveryType: "Standard"
}
          }
        )
      .then((response) => {

  console.log(response.data);

  setQuotePreview(response.data);

  setPreviewPrice(
    response.data.finalAmount
  );

})
        .catch(console.error);
    }

  }, [
    formData.material,
    formData.process,
    formData.quantity,
    manufacturingFactor,
    cadAnalysis
]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleAddressChange = (e) => {

  setAddressData({
    ...addressData,
    [e.target.name]: e.target.value
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

setUploadedFileName(
  response.data.fileName
);

// AUTO SELECT PROCESS
setFormData(prev => ({
  ...prev,
  process:
    response.data.recommendedProcess
}));

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
        await API.get(
    `/cad/file/${fileName}`
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

      const email = localStorage.getItem("email");

const checkResponse = await API.get("/address/check", {
  params: { email }
});

if (!checkResponse.data) {
  setShowAddressModal(true);
  return;
}


      const quoteData = {

        email:
          localStorage.getItem(
            "email"
          ),

        fileName:
  uploadedFileName,

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
        await API.post(
    "/quotes/save",
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

  const saveAddress = async () => {

  try {

    await API.post("/address/save", {

      email: localStorage.getItem("email"),

      company: addressData.company,

      addressLine1: addressData.addressLine1,

      addressLine2: addressData.addressLine2,

      city: addressData.city,

      state: addressData.state,

      country: addressData.country,

      pincode: addressData.pincode

    });

    setShowAddressModal(false);

    alert("Address Saved Successfully");

  } catch (error) {

    console.error(error);

    alert("Failed To Save Address");

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

                  <input
  type="text"
  className="form-control"
  value={
    formData.process ||
    "Analyzing CAD File..."
  }
  readOnly
/>

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
                ₹{Number(previewPrice).toFixed(2)}
              </h2>

              {quotePreview && (

  <div className="mt-3">

    <hr />

    <h5>Cost Breakdown</h5>

    <p>
      <strong>Material Cost:</strong>
      ₹{quotePreview.materialCost?.toFixed(2)}
    </p>

    <p>
      <strong>Manufacturing Cost:</strong>
      ₹{quotePreview.manufacturingCost?.toFixed(2)}
    </p>

    <p>
      <strong>Profit Margin:</strong>
      ₹{quotePreview.profitMargin?.toFixed(2)}
    </p>

    <p>
      <strong>GST:</strong>
      ₹{quotePreview.gstAmount?.toFixed(2)}
    </p>

    <h5 className="text-success">
      Final Amount:
      ₹{quotePreview.finalAmount?.toFixed(2)}
    </h5>

  </div>

)}

              {generatedPrice > 0 && (
                <div className="mt-3">

                  <h6>
                    Generated Quote
                  </h6>

                  <h4 className="text-success">
                    ₹{Number(generatedPrice).toFixed(2)}
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
  {Number(cadAnalysis.volume).toFixed(2)} mm³
</p>

<p>
  <strong>Surface Area:</strong>{" "}
  {Number(cadAnalysis.surfaceArea).toFixed(2)} mm²
</p>

<p>
  <strong>Width:</strong>{" "}
  {Number(cadAnalysis.width).toFixed(2)} mm
</p>

<p>
  <strong>Height:</strong>{" "}
  {Number(cadAnalysis.height).toFixed(2)} mm
</p>

<p>
  <strong>Depth:</strong>{" "}
  {Number(cadAnalysis.depth).toFixed(2)} mm
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

    <p>
  <strong>Triangle Count:</strong>{" "}
  {cadAnalysis.triangleCount}
</p>

<p>
  <strong>Estimated Machining Time:</strong>{" "}
  {Number(cadAnalysis.estimatedMachiningTime).toFixed(2)} Hours
</p>

<p>
  <strong>Recommended Process:</strong>{" "}
  {cadAnalysis.recommendedProcess}
</p>

<p>
  <strong>Part Category:</strong>{" "}
  {cadAnalysis.partCategory}
</p>





  </div>

)}

            </div>

          </div>

        </div>

      </section>

<AddressModal
    show={showAddressModal}
    addressData={addressData}
    handleAddressChange={handleAddressChange}
    handleSave={saveAddress}
    handleClose={() => setShowAddressModal(false)}
/>

<Footer />
    </>
  );
}

export default Quote;
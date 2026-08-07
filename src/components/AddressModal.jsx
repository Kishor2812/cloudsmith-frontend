import React from "react";

function AddressModal({
  show,
  addressData,
  handleAddressChange,
  handleSave,
  handleClose
}) {

  if (!show) return null;

  return (

    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Delivery Address
            </h5>

          </div>

          <div className="modal-body">

            <div className="mb-3">

              <label>Company (Optional)</label>

              <input
                type="text"
                className="form-control"
                name="company"
                value={addressData.company}
                onChange={handleAddressChange}
              />

            </div>

            <div className="mb-3">

              <label>Address Line 1</label>

              <input
                type="text"
                className="form-control"
                name="addressLine1"
                value={addressData.addressLine1}
                onChange={handleAddressChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Address Line 2</label>

              <input
                type="text"
                className="form-control"
                name="addressLine2"
                value={addressData.addressLine2}
                onChange={handleAddressChange}
              />

            </div>

            <div className="row">

              <div className="col-md-6">

                <label>City</label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  required
                />

              </div>

              <div className="col-md-6">

                <label>State</label>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={addressData.state}
                  onChange={handleAddressChange}
                  required
                />

              </div>

            </div>

            <br />

            <div className="row">

              <div className="col-md-6">

                <label>Country</label>

                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={addressData.country}
                  onChange={handleAddressChange}
                  required
                />

              </div>

              <div className="col-md-6">

                <label>Pincode</label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={addressData.pincode}
                  onChange={handleAddressChange}
                  required
                />

              </div>

            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-warning"
              onClick={handleSave}
            >
              Save & Continue
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AddressModal;
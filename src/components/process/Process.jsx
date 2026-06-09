import React from "react";
import {
  FaCloudUploadAlt,
  FaCube,
  FaFileInvoice,
  FaTruck
} from "react-icons/fa";

import "./Process.css";

function Process() {

  return (

    <section className="process-section">

      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-3">

            <h2 className="process-title">
              How CloudSmith Works
            </h2>

            <p className="process-desc">
              From CAD upload to manufacturing and delivery in four simple steps.
            </p>

          </div>

          <div className="col-lg-9">

            <div className="row text-center">

              <div className="col-md-3">
                <div className="process-card">

                  <div className="process-number">1</div>

                  <FaCloudUploadAlt className="process-icon" />

                  <h5>Upload CAD File</h5>

                  <p>
                    Upload your design files securely.
                  </p>

                </div>
              </div>

              <div className="col-md-3">
                <div className="process-card">

                  <div className="process-number">2</div>

                  <FaCube className="process-icon" />

                  <h5>Select Material</h5>

                  <p>
                    Choose materials and manufacturing process.
                  </p>

                </div>
              </div>

              <div className="col-md-3">
                <div className="process-card">

                  <div className="process-number">3</div>

                  <FaFileInvoice className="process-icon" />

                  <h5>Review Quote</h5>

                  <p>
                    Review pricing and approve your order.
                  </p>

                </div>
              </div>

              <div className="col-md-3">
                <div className="process-card">

                  <div className="process-number">4</div>

                  <FaTruck className="process-icon" />

                  <h5>Production & Delivery</h5>

                  <p>
                    Parts are manufactured and delivered.
                  </p>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}

export default Process;
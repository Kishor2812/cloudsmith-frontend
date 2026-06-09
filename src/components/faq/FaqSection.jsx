import React from "react";
import "./FaqSection.css";

function FaqSection() {
  return (
    <section className="faq-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="faq-title">
            Frequently Asked Questions
          </h2>

          <p className="faq-subtitle">
            Everything you need to know about CloudSmith.
          </p>

        </div>

        <div className="accordion" id="faqAccordion">

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                How do I get a quote?
              </button>
            </h2>

            <div
              id="faq1"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Upload your CAD file and choose materials to receive a quote.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
              >
                Which file formats are supported?
              </button>
            </h2>

            <div
              id="faq2"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                STEP, STL, DWG, DXF and many more CAD formats.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
              >
                How long does manufacturing take?
              </button>
            </h2>

            <div
              id="faq3"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Delivery depends on manufacturing complexity and quantity.
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default FaqSection;
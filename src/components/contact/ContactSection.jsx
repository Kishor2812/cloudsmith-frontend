import React from "react";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section">

      <div className="container">

        <div className="row">

          <div className="col-lg-6">

            <h2>Contact Us</h2>

            <p>
              Reach out to our manufacturing experts today.
            </p>

          </div>

          <div className="col-lg-6">

            <form>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Name"
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Your Email"
              />

              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Message"
              ></textarea>

              <button className="contact-btn">
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactSection;
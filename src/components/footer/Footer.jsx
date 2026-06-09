import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          <div className="col-lg-4">

            <h3>CloudSmith</h3>

            <p>
              Premium Manufacturing Marketplace Platform.
            </p>

          </div>

          <div className="col-lg-4">

            <h5>Quick Links</h5>

            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>Industries</li>
              <li>Quote</li>
            </ul>

          </div>

          <div className="col-lg-4">

            <h5>Contact</h5>

            <p>support@cloudsmith.com</p>

            <p>+91 9876543210</p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
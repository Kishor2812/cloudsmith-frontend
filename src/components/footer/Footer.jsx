import React from "react";
import { Link } from "react-router-dom";

import {
  // FaFacebookF,
  FaLinkedinIn,
  // FaGithub,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="container">

        <div className="row gy-4">

          {/* Company */}

          <div className="col-lg-4 col-md-6">

            <h3 className="footer-logo">
              CLOUD<span>SMITH</span>
            </h3>

            <p className="footer-description">

              CloudSmith is a digital manufacturing
              marketplace that provides instant CAD
              quotations, CNC machining, 3D printing,
              sheet metal fabrication, injection molding
              and end-to-end manufacturing solutions.

            </p>

            {/* <div className="footer-social">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaGithub />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

            </div> */}

            <div className="footer-social">

  <a
    href="https://www.linkedin.com/company/cloudsmithmanufacturing"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedinIn />
  </a>

  <br />

  <a
    href="https://www.instagram.com/the_reverseengineer"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>

</div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-4 col-md-6">

            <h5 className="footer-heading">

              Quick Links

            </h5>

            <ul className="footer-links">

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/services">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/industries">
                  Industries
                </Link>
              </li>

              <li>
                <Link to="/materials">
                  Materials
                </Link>
              </li>

              <li>
                <Link to="/quote">
                  Get Quote
                </Link>
              </li>

              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-4 col-md-12">

            <h5 className="footer-heading">

              Contact Us

            </h5>

            <p>

              <FaEnvelope className="me-2" />

              cloudsmith.ai@gmail.com

            </p>

            <p>

              <FaPhoneAlt className="me-2" />

             +91 6383298406

            </p>

            <p>

              <FaMapMarkerAlt className="me-2" />

              Pudukkottai, Tamil Nadu, India

            </p>

          </div>

        </div>

        <hr className="footer-divider" />

        <div className="text-center">

          <p className="copyright">

            © 2026 CloudSmith Manufacturing Platform.
            All Rights Reserved.

          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;


// import React from "react";
// import "./Footer.css";

// function Footer() {
//   return (
//     <footer className="footer">

//       <div className="container">

//         <div className="row">

//           <div className="col-lg-4">

//             <h3>CloudSmith</h3>

//             <p>
//               Premium Manufacturing Marketplace Platform.
//             </p>

//           </div>

//           <div className="col-lg-4">

//             <h5>Quick Links</h5>

//             <ul>
//               <li>Home</li>
//               <li>Services</li>
//               <li>Industries</li>
//               <li>Quote</li>
//             </ul>

//           </div>

//           <div className="col-lg-4">

//             <h5>Contact</h5>

//             <p>support@cloudsmith.com</p>

//             <p>+91 9876543210</p>

//           </div>

//         </div>

//       </div>

//     </footer>
//   );
// }

// export default Footer;
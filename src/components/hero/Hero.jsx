import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

import "./Hero.css";

function Hero() {

  return (

    <section className="hero-section">

      <div className="container">

        <div className="row align-items-center">

          {/* LEFT CONTENT */}

          <div className="col-lg-6">

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <span className="hero-badge">
                CLOUDSMITH DIGITAL MANUFACTURING
              </span>

              <h1 className="hero-title">
                Upload CAD Files &
                Get Instant Quotes
                for <span>Custom Parts</span>
              </h1>

              <p className="hero-description">
                CNC Machining, 3D Printing, Sheet Metal,
                Injection Molding and more.
                Fast pricing, quality manufacturing,
                and reliable delivery.
              </p>

              <div className="hero-features">

                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  Instant Online Quotation
                </div>

                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  Fast Production & Delivery
                </div>

                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  Trusted Manufacturing Network
                </div>

              </div>

              <div className="hero-buttons">

                <Link
                  to="/quote"
                  className="primary-btn"
                >
                  Get Instant Quote
                  <FaArrowRight className="ms-2" />
                </Link>

                <Link
                  to="/services"
                  className="secondary-btn ms-3"
                >
                  Explore Services
                </Link>

              </div>

            </motion.div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-6">

            <motion.div
              className="hero-image-wrapper"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <img
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop"
                alt="CloudSmith Manufacturing"
                className="hero-image"
              />

            </motion.div>

          </div>

        </div>

      </div>

    </section>

  );
}

export default Hero;
import React from "react";
import {
  FaCubes,
  FaCog,
  FaTruck,
  FaShieldAlt
} from "react-icons/fa";

import "./PricingSection.css";

import { Link } from "react-router-dom";

function PricingSection() {

  const factors = [
    {
      icon: <FaCubes />,
      title: "Material Selection",
      description:
        "Pricing varies based on metal, plastic and engineering materials."
    },
    {
      icon: <FaCog />,
      title: "Manufacturing Process",
      description:
        "CNC machining, 3D printing, molding and fabrication affect cost."
    },
    {
      icon: <FaTruck />,
      title: "Lead Time",
      description:
        "Faster delivery options may impact manufacturing cost."
    },
    {
      icon: <FaShieldAlt />,
      title: "Quality Requirements",
      description:
        "Tolerance, finishing and inspection requirements influence pricing."
    }
  ];

  return (

    <section className="pricing-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="pricing-title">
            Transparent Manufacturing Pricing
          </h2>

          <p className="pricing-subtitle">
            Every project is unique. Pricing is calculated based on your design,
            materials, quantity and manufacturing requirements.
          </p>

        </div>

        <div className="row g-4">

          {factors.map((item, index) => (

            <div
              className="col-lg-3 col-md-6"
              key={index}
            >

              <div className="pricing-factor-card">

                <div className="pricing-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-5">

          {/* <a
            href="/quote"
            className="pricing-btn"
          >
            Request a Quote
          </a> */}

          <Link
    to="/quote"
    className="pricing-btn"
>
    Request a Quote
</Link>

        </div>

      </div>

    </section>

  );
}

export default PricingSection;
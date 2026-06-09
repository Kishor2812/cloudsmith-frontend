import React from "react";
import {
  FaClock,
  FaBullseye,
  FaShieldAlt,
  FaDollarSign
} from "react-icons/fa";

import "./Stats.css";

function Stats() {

  const stats = [
    {
      icon: <FaClock />,
      title: "Fast Delivery",
      description:
        "Rapid production and on-time delivery for all manufacturing projects."
    },
    {
      icon: <FaBullseye />,
      title: "High Precision",
      description:
        "CNC machining and manufacturing with exceptional accuracy."
    },
    {
      icon: <FaShieldAlt />,
      title: "Quality Assured",
      description:
        "Every part undergoes strict inspection and quality control."
    },
    {
      icon: <FaDollarSign />,
      title: "Cost Effective",
      description:
        "Competitive pricing without compromising quality or reliability."
    }
  ];

  return (

    <section className="stats-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="stats-title">
            Why Choose CloudSmith?
          </h2>

          <p className="stats-subtitle">
            Trusted digital manufacturing solutions for businesses of every size.
          </p>

        </div>

        <div className="row g-4">

          {stats.map((item, index) => (

            <div
              className="col-lg-3 col-md-6"
              key={index}
            >

              <div className="stat-card">

                <div className="stat-icon">
                  {item.icon}
                </div>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Stats;
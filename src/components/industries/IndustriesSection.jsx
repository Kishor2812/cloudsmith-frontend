import React from "react";
import {
  FaCar,
  FaPlane,
  FaHeartbeat,
  FaMicrochip,
  FaRobot,
  FaShieldAlt
} from "react-icons/fa";

import "./IndustriesSection.css";

function IndustriesSection() {

  const industries = [
    {
      icon: <FaCar />,
      title: "Automotive",
      description:
        "Custom manufacturing solutions for automotive parts and assemblies."
    },
    {
      icon: <FaPlane />,
      title: "Aerospace",
      description:
        "High-precision components for aerospace and aviation applications."
    },
    {
      icon: <FaHeartbeat />,
      title: "Medical",
      description:
        "Manufacturing services for medical devices and healthcare equipment."
    },
    {
      icon: <FaMicrochip />,
      title: "Electronics",
      description:
        "Precision enclosures, housings and electronic components."
    },
    {
      icon: <FaRobot />,
      title: "Robotics",
      description:
        "Rapid prototyping and production for robotics innovation."
    },
    {
      icon: <FaShieldAlt />,
      title: "Industrial Equipment",
      description:
        "Reliable manufacturing for industrial machinery and equipment."
    }
  ];

  return (
    <section className="industries-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="industries-title">
            Industries We Serve
          </h2>

          <p className="industries-subtitle">
            Trusted by startups, SMEs and enterprises across multiple industries.
          </p>

        </div>

        <div className="row g-4">

          {industries.map((industry, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="industry-card">

                <div className="industry-icon">
                  {industry.icon}
                </div>

                <h4>{industry.title}</h4>

                <p>{industry.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default IndustriesSection;
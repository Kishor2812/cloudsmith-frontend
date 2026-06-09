import React from "react";
import {
  FaCogs,
  FaPrint,
  FaIndustry,
  FaTools,
  FaCut,
  FaWrench
} from "react-icons/fa";

import "./ServicesSection.css";

function ServicesSection() {

  const services = [
    {
      icon: <FaCogs />,
      title: "CNC Machining",
      description:
        "Precision CNC milling and turning for custom metal and plastic parts."
    },
    {
      icon: <FaPrint />,
      title: "3D Printing",
      description:
        "Rapid prototyping and additive manufacturing for product development."
    },
    {
      icon: <FaIndustry />,
      title: "Injection Molding",
      description:
        "Scalable production of high-quality plastic components."
    },
    {
      icon: <FaTools />,
      title: "Sheet Metal Fabrication",
      description:
        "Custom sheet metal bending, forming and fabrication services."
    },
    {
      icon: <FaCut />,
      title: "Laser Cutting",
      description:
        "High-precision laser cutting for industrial applications."
    },
    {
      icon: <FaWrench />,
      title: "Welding & Assembly",
      description:
        "Professional welding and assembly solutions for complex projects."
    }
  ];

  return (
    <section className="services-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="services-title">
            Manufacturing Services
          </h2>

          <p className="services-subtitle">
            End-to-end manufacturing solutions from prototype to production.
          </p>

        </div>

        <div className="row g-4">

          {services.map((service, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="service-card">

                <div className="service-icon">
                  {service.icon}
                </div>

                <h4>{service.title}</h4>

                <p>{service.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ServicesSection;
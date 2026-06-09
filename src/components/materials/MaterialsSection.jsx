import React from "react";
import {
  FaCube,
  FaIndustry,
  FaAtom,
  FaBolt,
  FaFlask,
  FaLayerGroup
} from "react-icons/fa";

import "./MaterialsSection.css";

function MaterialsSection() {

  const materials = [
    {
      icon: <FaCube />,
      title: "Aluminum",
      description:
        "Lightweight, corrosion-resistant and widely used in manufacturing."
    },
    {
      icon: <FaIndustry />,
      title: "Stainless Steel",
      description:
        "Durable, corrosion-resistant material for industrial applications."
    },
    {
      icon: <FaAtom />,
      title: "Titanium",
      description:
        "Premium material with excellent strength-to-weight ratio."
    },
    {
      icon: <FaBolt />,
      title: "Copper",
      description:
        "High electrical and thermal conductivity for engineering projects."
    },
    {
      icon: <FaFlask />,
      title: "ABS Plastic",
      description:
        "Reliable thermoplastic ideal for prototypes and production parts."
    },
    {
      icon: <FaLayerGroup />,
      title: "Nylon",
      description:
        "Strong engineering plastic with excellent wear resistance."
    }
  ];

  return (
    <section className="materials-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="materials-title">
            Materials Catalog
          </h2>

          <p className="materials-subtitle">
            Explore a wide range of industrial-grade metals and plastics.
          </p>

        </div>

        <div className="row g-4">

          {materials.map((material, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="material-card">

                <div className="material-icon">
                  {material.icon}
                </div>

                <h4>{material.title}</h4>

                <p>{material.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default MaterialsSection;
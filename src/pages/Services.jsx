import React from "react";

import Navbar from "../components/navbar/Navbar";
import ServicesSection from "../components/services/ServicesSection";
import Footer from "../components/footer/Footer";

function Services() {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="section-title">
            Manufacturing Services
          </h1>

          <p className="section-subtitle mx-auto">
            Explore our complete range of manufacturing solutions
            including CNC machining, 3D printing, injection molding,
            laser cutting, and more.
          </p>
        </div>
      </div>

      <ServicesSection />

      <Footer />
    </>
  );
}

export default Services;
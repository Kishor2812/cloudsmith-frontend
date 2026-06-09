import React from "react";

import Navbar from "../components/navbar/Navbar";
import MaterialsSection from "../components/materials/MaterialsSection";
import Footer from "../components/footer/Footer";

function Materials() {
  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="section-title">
            Materials Catalog
          </h1>

          <p className="section-subtitle mx-auto">
            Choose from industrial-grade metals and plastics
            optimized for precision manufacturing.
          </p>

        </div>

      </div>

      <MaterialsSection />

      <Footer />

    </>
  );
}

export default Materials;
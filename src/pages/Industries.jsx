import React from "react";

import Navbar from "../components/navbar/Navbar";
import IndustriesSection from "../components/industries/IndustriesSection";
import Footer from "../components/footer/Footer";

function Industries() {
  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="section-title">
            Industries We Serve
          </h1>

          <p className="section-subtitle mx-auto">
            CloudSmith supports startups, SMEs and enterprises
            across multiple industries worldwide.
          </p>

        </div>

      </div>

      <IndustriesSection />

      <Footer />

    </>
  );
}

export default Industries;
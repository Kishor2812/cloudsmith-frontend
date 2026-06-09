import React from "react";

import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import TrustedSection from "../components/trusted/TrustedSection";
import Stats from "../components/stats/Stats";
import Process from "../components/process/Process";
import ServicesSection from "../components/services/ServicesSection";
import IndustriesSection from "../components/industries/IndustriesSection";
import MaterialsSection from "../components/materials/MaterialsSection";
import PricingSection from "../components/pricing/PricingSection";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import FaqSection from "../components/faq/FaqSection";
import ContactSection from "../components/contact/ContactSection";
import Footer from "../components/footer/Footer";

function Home() {

  return (

    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        color: "#ffffff"
      }}
    >

      <Navbar />

      <Hero />

      <TrustedSection />

      <Stats />

      <Process />

      <ServicesSection />

      <IndustriesSection />

      <MaterialsSection />

      <PricingSection />

      <TestimonialsSection />

      <FaqSection />

      <ContactSection />

      <Footer />

    </div>

  );
}

export default Home;
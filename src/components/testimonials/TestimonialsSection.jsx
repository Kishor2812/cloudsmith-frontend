import React from "react";
import { FaStar } from "react-icons/fa";

import "./TestimonialsSection.css";

function TestimonialsSection() {

  const testimonials = [
    {
      name: "Manufacturing Engineer",
      company: "Automotive Industry",
      review:
        "CloudSmith simplified our manufacturing workflow and helped us reduce lead times."
    },
    {
      name: "Product Designer",
      company: "Industrial Design",
      review:
        "The quote request process is simple and the platform is easy to use."
    },
    {
      name: "Operations Manager",
      company: "Electronics Manufacturing",
      review:
        "A professional platform for managing custom manufacturing projects."
    }
  ];

  return (

    <section className="testimonials-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="testimonial-title">
            What Our Customers Say
          </h2>

          <p className="testimonial-subtitle">
            Helping manufacturers, engineers and innovators bring ideas to life.
          </p>

        </div>

        <div className="row g-4">

          {testimonials.map((item, index) => (

            <div
              className="col-lg-4"
              key={index}
            >

              <div className="testimonial-card">

                <div className="stars">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                <p className="review">
                  "{item.review}"
                </p>

                <h5>{item.name}</h5>

                <span>{item.company}</span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default TestimonialsSection;
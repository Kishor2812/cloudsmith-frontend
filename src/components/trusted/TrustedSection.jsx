import React from "react";
import "./TrustedSection.css";

function TrustedSection() {

  const stats = [
    {
      number: "10,000+",
      title: "Parts Manufactured"
    },
    {
      number: "500+",
      title: "Manufacturing Partners"
    },
    {
      number: "50+",
      title: "Materials Available"
    },
    {
      number: "99.8%",
      title: "Quality Score"
    }
  ];

  return (
    <section className="trusted-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="trusted-title">
            Trusted Manufacturing Network
          </h2>

          <p className="trusted-subtitle">
            Helping businesses manufacture smarter,
            faster and more efficiently.
          </p>

        </div>

        <div className="logo-container">

          <div className="logo-box">AUTOMOTIVE</div>
          <div className="logo-box">AEROSPACE</div>
          <div className="logo-box">ELECTRONICS</div>
          <div className="logo-box">MEDICAL</div>
          <div className="logo-box">INDUSTRIAL</div>

        </div>

        <div className="row mt-5 g-4">

          {stats.map((item, index) => (

            <div
              className="col-lg-3 col-md-6"
              key={index}
            >

              <div className="counter-card">

                <h2>{item.number}</h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TrustedSection;
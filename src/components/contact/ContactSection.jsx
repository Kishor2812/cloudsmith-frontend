import React, { useState } from "react";
import "./ContactSection.css";
import API from "../services/api";

function ContactSection() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!formData.message.trim()) {
      alert("Please enter your message.");
      return;
    }

    setLoading(true);

    try {

    await API.post(
     "/api/contact",
    formData
);

      alert(
        "Thank you! Your message has been received."
      );

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {

      alert(
        "Failed to send message."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="contact-section">

      <div className="container">

        <div className="row align-items-center">

          {/* LEFT */}

          <div className="col-lg-6 mb-4">

            <h2 className="contact-title">
              Contact Us
            </h2>

            <p className="contact-description">
              Have questions about manufacturing,
              quotations or custom production?
              Our CloudSmith experts are ready to help.
            </p>

          </div>

          {/* RIGHT */}

          <div className="col-lg-6">

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                rows="5"
                name="message"
                className="form-control mb-3"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="contact-btn"
                disabled={loading}
              >

                {
                  loading
                    ? "Sending..."
                    : "Send Message"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );
}

export default ContactSection;




// import React from "react";
// import "./ContactSection.css";

// function ContactSection() {
//   return (
//     <section className="contact-section">

//       <div className="container">

//         <div className="row">

//           <div className="col-lg-6">

//             <h2>Contact Us</h2>

//             <p>
//               Reach out to our manufacturing experts today.
//             </p>

//           </div>

//           <div className="col-lg-6">

//             <form>

//               <input
//                 type="text"
//                 className="form-control mb-3"
//                 placeholder="Your Name"
//               />

//               <input
//                 type="email"
//                 className="form-control mb-3"
//                 placeholder="Your Email"
//               />

//               <textarea
//                 className="form-control mb-3"
//                 rows="5"
//                 placeholder="Message"
//               ></textarea>

//               <button className="contact-btn">
//                 Send Message
//               </button>

//             </form>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default ContactSection;
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';



const ContactUs = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.learnitfy.com/api/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert("Thanks for contacting us! We'll get back to you soon.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert('Failed to submit the form: ' + errorData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const themeColor = 'rgb(255, 112, 10)';

  return (
    <>
      <Helmet>
        <link rel="icon" href="/logo.png" />
        <title>Contact Us | Learnitfy – Get in Touch Today


        </title>
        <meta name="description" content="Connect with Learnitfy to learn more about our Corporate IT training programs or to get expert assistance from our support team." />
        <meta name="keywords" content="Learnitfy, courses, education" />
      </Helmet>
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .contact-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, ${themeColor} 0%, #ff8c42 100%);
          color: white;
          padding: 3rem 1rem;
          text-align: center;
        }

        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .main-section {
          background: #f9fafb;
          padding: 3rem 1rem;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          outline: none;
          transition: all 0.2s ease-in-out;
          background: #fff;
        }

        .form-input:focus {
          border-color: ${themeColor};
          box-shadow: 0 0 0 3px rgba(255, 112, 10, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background-color: ${themeColor};
          color: white;
          border: none;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .submit-button:hover {
          background-color: #e6640a;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 112, 10, 0.3);
        }

        .right-section {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          height: fit-content;
        }

        .map-container {
          width: 100%;
          height: 350px;
          position: relative;
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .contact-info-section {
          padding: 1rem;
          background: #fff;
          border-top: 1px solid #e5e7eb;
        }

        .contact-info-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid ${themeColor};
          padding-bottom: 0.5rem;
        }

        .contact-info {
          line-height: 1.6;
        }

        .contact-info p {
          margin: 0.75rem 0;
          color: #4b5563;
          font-size: 0.95rem;
        }

        .contact-info strong {
          color: #1f2937;
          font-weight: 600;
        }

        .email-link {
          color: ${themeColor};
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .email-link:hover {
          color: #e6640a;
          text-decoration: underline;
        }

        .phone-number {
          color: ${themeColor};
          font-weight: 600;
          font-size: 1.1rem;
        }

        /* Mobile Contact Info Section */
        .mobile-contact-info {
          display: none;
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 1.5rem;
        }

        .mobile-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .contact-item {
          text-align: center;
          padding: 1rem;
          border-radius: 0.5rem;
          background: #f8f9fa;
        }

        .contact-icon {
          font-size: 1.5rem;
          color: ${themeColor};
          margin-bottom: 0.5rem;
        }

        .contact-item h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .contact-item p {
          font-size: 0.8rem;
          color: #4b5563;
          margin: 0;
          line-height: 1.4;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .main-section {
            padding: 2rem 1rem;
          }

          .form-container {
            padding: 1.5rem;
            order: 2;
          }

          .map-container {
            height: 250px;
          }

          .right-section {
            order: 3;
          }

          /* Show mobile contact info */
          .mobile-contact-info {
            display: block;
            order: 1;
          }

          /* Hide desktop contact info section on mobile */
          .contact-info-section {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 2rem 1rem;
          }

          .hero-title {
            font-size: 1.75rem;
          }

          .main-section {
            padding: 1.5rem 0.75rem;
          }

          .form-container {
            padding: 1.25rem;
          }

          .form-input {
            padding: 0.75rem;
            font-size: 0.95rem;
          }

          .submit-button {
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
          }

          .map-container {
            height: 200px;
          }

          .mobile-contact-info {
            padding: 1.25rem;
          }

          .mobile-contact-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .contact-item {
            padding: 0.75rem;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Fill out the form below to get in touch with our team.
          </p>
        </section>

        {/* Main Content Section */}
        <section className="main-section">
          <div className="contact-container">
            {/* Mobile Contact Information - Shows only on mobile */}
            <div className="mobile-contact-info">
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem',
                textAlign: 'center',
                borderBottom: `2px solid ${themeColor}`,
                paddingBottom: '0.5rem'
              }}>
                Contact Information
              </h2>
              <div className="mobile-contact-grid">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <h4>Address</h4>
                  <p>115, Crown Square, 1st Floor<br />Gandhi Path, Vaishali Nagar<br />Jaipur, 302021, India</p>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <h4>Phone</h4>
                  <p style={{ color: themeColor, fontWeight: '600' }}>+91 998-3969-869</p>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:info@learnitfy.com" style={{
                      color: themeColor,
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      info@learnitfy.com
                    </a>
                  </p>
                </div>
                {/* <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <h4>Business Hours</h4>
                  <p>Mon-Fri: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                </div> */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number *
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input form-textarea"
                    placeholder="Tell us more about your inquiry..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map and Contact Information - Desktop */}
            <div className="right-section">
              {/* Map Section */}
              <div className="map-container">
                <iframe
                  className="map-iframe"
                  title="Google Maps - Learnitfy Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.7096558668325!2d75.74276264959961!3d26.90530964898532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db49bb5a72b39%3A0x4b2a16b4ad946ddf!2sGandhi%20Path%20W%2C%20Girnar%20Colony%2C%20Scheme%20Number%208%2C%20Girnar%20Colony%20South%2C%20Sanjay%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302021!5e0!3m2!1sen!2sin!4v1749541441041!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact Information Section - Desktop Only */}
              <div className="contact-info-section">
                <h2 className="contact-info-title">Contact Information</h2>
                <div className="contact-info">
                  <p><strong>Address:</strong></p>
                  <p>115, Crown Square, 1st Floor,<br />
                    Gandhi Path, Vaishali Nagar,<br />
                    Jaipur, 302021, India</p>

                  <p><strong>Email:</strong></p>
                  <p>
                    <a href="mailto:info@learnitfy.com" className="email-link">
                      info@learnitfy.com
                    </a>
                  </p>

                  <p><strong>Phone:</strong></p>
                  <p className="phone-number">+91 998-3969-869</p>


                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;

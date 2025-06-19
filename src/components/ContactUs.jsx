import React, { useState } from 'react';
import logo from './Assets/PNG-01.png'

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

  // Input style
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out'
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, #ff8c42 100%)`,
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact Us</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          We'd love to hear from you. Fill out the form below to get in touch.
        </p>
      </section>

      {/* Form & Map Section */}
      <section
        style={{
          background: '#f9fafb',
          padding: '4rem 1rem',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          className="contact-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%'
          }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              width: '100%',
              maxWidth: '600px',
              flex: '1 1 0',
              minWidth: '300px'
            }}
          >
            {/* First Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem' }}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="First Name "
              />
            </div>
            {/* Last Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Last Name "
              />
            </div>
            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="your.email@example.com"
              />
            </div>
            {/* Mobile */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="mobile" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Your MobileNumber"
              />
            </div>
            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Tell us more about your inquiry..."
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: themeColor,
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? '0 8px 15px rgba(255, 107, 0, 0.2)'
                  : '0 2px 4px rgba(255, 107, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              Submit
            </button>
          </form>
            
             <div
            style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              width: '100%',
              maxWidth: '600px',
              flex: '1 1 0',
              minWidth: '300px',
              height: '400px',
              minHeight: '400px'
            }}
          >
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.7096558668325!2d75.74276264959961!3d26.90530964898532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db49bb5a72b39%3A0x4b2a16b4ad946ddf!2sGandhi%20Path%20W%2C%20Girnar%20Colony%2C%20Scheme%20Number%208%2C%20Girnar%20Colony%20South%2C%20Sanjay%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302021!5e0!3m2!1sen!2sin!4v1749541441041!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen=""
              loading="lazy"
            />
            <div>
            <div className="col-12 col-lg-4 mb-4 mb-lg-0">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                paddingTop: '100px', 
                textAlign: 'left',
                padding: '20px',
              }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: '300px',
                    height: 'auto',
                    marginRight: '20px',
                  }}
                />
                <div style={{ 
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: 'black',
                }}>
                   <p style={{ marginBottom: '0px' }}>
                    Email: <a href="mailto:info@learnitfy.com" style={{ color: '#ff6b00', textDecoration: 'none' }}>
                    info@learnitfy.com
                    </a>
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    Phone: <span style={{ color: '#ff6b00',fontSize:'20px' }}>+91 9983969869</span>
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;


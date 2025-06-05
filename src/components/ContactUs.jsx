import React, { useState } from 'react';

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
      const response = await fetch('http://15.206.189.17:4000/api/user/contact', {
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
                placeholder="John"
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
                placeholder="Doe"
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
                placeholder="john.doe@example.com"
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
                placeholder="+91 9876543210"
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

          {/* Map */}
          {/* <div
            style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              width: '100%',
              maxWidth: '600px',
              flex: '1 1 0',
              minWidth: '300px',
              height: '680px',
              minHeight: '400px'
            }}
          >
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.889030874918!2d77.21751321508217!3d28.61305898242903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a99b6f9fa7%3A0x83a25e55f0af1c82!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1629882345678"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div> */}
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

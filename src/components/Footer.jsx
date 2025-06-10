import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/PNG-01.png'; // Update with your actual file name

export default function Footer() {
  return (
    <footer style={{ background: '#2c2e34', color: 'rgb(255, 137, 27)', fontSize: '0.85rem', letterSpacing: '.01em', padding: '1rem 0' }}>
      <div className="container py-3">
        <div className="row gy-2">
          {/* Logo and Address */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: '100px', height: 'auto', marginRight: '3px', display: 'block', filter: 'none', opacity: 1 }}
              />
            </Link>
            <p style={{ color: '#999', marginBottom: '0.5rem', lineHeight: '1.3', fontSize: '0.85em' }}>
              Educational Technology Solutions
              <br />
              123 Learning Plaza, Knowledge Park
              <br />
              Tech City, Digital State - 100001
              <br />
              India
              <br />
              <br />
              +1 1133223332332
            </p>
          </div>
          
          {/* About Us */}
          <div className="col-6 col-md-2 text-center text-md-start">
            <h5 style={{ color: '#bfc0c4', fontWeight: 600, letterSpacing: '.04em', marginBottom: '0.7rem', textTransform: 'uppercase', fontSize: '.85rem' }}>
              <Link to="/about" style={{ color: '#f5f5f5', textDecoration: 'none' }}>
                About Us
              </Link>
            </h5>
            <ul className="list-unstyled" style={{ lineHeight: '1.5', color: '#999' }}>
              <li>
                <small>
                  We create innovative educational technology solutions to empower learners and educators worldwide.
                </small>
              </li>
              <li>
                <small>
                  Our mission is to make learning accessible, engaging, and effective.
                </small>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="col-6 col-md-2 text-center text-md-start">
            <h5 style={{ color: '#bfc0c4', fontWeight: 600, letterSpacing: '.04em', marginBottom: '0.7rem', textTransform: 'uppercase', fontSize: '.85rem' }}>
              <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>
                Contact Us
              </Link>
            </h5>
            <ul className="list-unstyled" style={{ lineHeight: '1.5', color: '#999' }}>
              <li>
                <small>
                  Have questions? Reach out to our support team.
                </small>
              </li>
              <li>
                <small>
                  Email: support@edtechsolutions.com
                </small>
              </li>
              <li>
                <small>
                  Phone: +1 1133223332332
                </small>
              </li>
            </ul>
          </div>
          
          {/* Map and Social Media Icons on the right */}
          <div className="col-12 col-md-4 d-flex align-items-stretch justify-content-center justify-content-md-end">
            <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', minHeight: '180px' }}>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.7096558668325!2d75.74276264959961!3d26.90530964898532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db49bb5a72b39%3A0x4b2a16b4ad946ddf!2sGandhi%20Path%20W%2C%20Girnar%20Colony%2C%20Scheme%20Number%208%2C%20Girnar%20Colony%20South%2C%20Sanjay%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302021!5e0!3m2!1sen!2sin!4v1749541441041!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0, minHeight: '180px', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginLeft: '1rem' }}>
              <SocialMediaIcon platform="instagram" />
              <SocialMediaIcon platform="twitter" />
              <SocialMediaIcon platform="linkedin" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialMediaIcon = ({ platform }) => {
  const icons = {
    instagram: 'bi-instagram',
    twitter: 'bi-twitter',
    linkedin: 'bi-linkedin',
  };

  return (
    <a
      href={`https://${platform}.com`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: '#ff6b00',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(255,107,0,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,107,0,0.2)';
      }}
    >
      <i className={`bi ${icons[platform]}`}></i>
    </a>
  );
};

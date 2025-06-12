import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from './Assets/PNG-01.png';

const SocialMediaIcon = ({ platform }) => {
  const icons = {
    instagram: faInstagram,
    x: faXTwitter,
    linkedin: faLinkedin,
  };
  const links = {
    instagram: 'https://instagram.com',
    x: 'https://x.com',
    linkedin: 'https://linkedin.com',
  };
  
  return (
    <a
      href={links[platform]}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: '#ff6b00',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        margin: '0 8px',
        transition: 'all 0.2s ease',
      }}
      aria-label={platform}
    >
      <FontAwesomeIcon icon={icons[platform]} size="lg" />
    </a>
  );
};

export default function Footer() {
  return (
    <footer style={{ background: '#2c2e34', color: '#fff', padding: '0' }}>
      {/* Main Footer Content */}
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="row">
            {/* Company Info - Full width on mobile */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0">
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: '150px',
                      height: 'auto',
                      marginBottom: '0px',
                    }}
                  />
                </Link>
                <div style={{ 
                  color: '#bbb', 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  <p style={{ margin: '0 0 5px 0' }}>115, Crown Square, 1st Floor,</p>
                  <p style={{ margin: '0 0 5px 0' }}> Gandhi Path, Vaishali Nagar, Jaipur, 302021</p>
                  <p style={{ margin: '0 0 15px 0' }}>India</p>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="col-12 col-sm-6 col-lg-2 mb-4 mb-lg-0">
              <div style={{ textAlign: 'center', textAlign: 'left' }}>
                <h5 style={{ 
                  color: '#ff891b', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  <Link to="/about" style={{ color: '#ff891b', textDecoration: 'none' }}>
                    About Us
                  </Link>
                </h5>
                <div style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.5' }}>
                  <p style={{ marginBottom: '10px' }}>
                    We create innovative educational technology solutions to empower learners worldwide.
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    Our mission is to make learning accessible and effective.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us */}  
            <div className="col-12 col-sm-6 col-lg-2 mb-4 mb-lg-0">
              <div style={{ textAlign: 'center', textAlign: 'left' }}>
                <h5 style={{ 
                  color: '#ff891b', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  <Link to="/contact" style={{ color: '#ff891b', textDecoration: 'none' }}>
                    Contact Us
                  </Link>
                </h5>
                <div style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.5' }}>
                  <p style={{ marginBottom: '8px' }}>
                    Have questions? Reach out to our support team.
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    Email: <a href="mailto:support@edtechsolutions.com" style={{ color: '#ff6b00', textDecoration: 'none' }}>
                      support@edtechsolutions.com
                    </a>
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    Phone: <span style={{ color: '#ff6b00' }}>+1 1133223332332</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Map and Social */}
            <div className="col-12 col-lg-4">
              <div style={{ textAlign: 'center' }}>
                {/* Map */}
                <div style={{
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto 20px auto',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '150px'
                }}>
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.7096558668325!2d75.74276264959961!3d26.90530964898532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db49bb5a72b39%3A0x4b2a16b4ad946ddf!2sGandhi%20Path%20W%2C%20Girnar%20Colony%2C%20Scheme%20Number%208%2C%20Girnar%20Colony%20South%2C%20Sanjay%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302021!5e0!3m2!1sen!2sin!4v1749541441041!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                
                {/* Social Icons */}
                <div style={{ marginTop: '10px' }}>
                  <SocialMediaIcon platform="instagram" />
                  <SocialMediaIcon platform="x" />
                  <SocialMediaIcon platform="linkedin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ 
        borderTop: '1px solid #444', 
        padding: '20px 0',
        background: '#1a1c20'
      }}>
        <div className="container">
          <div className="text-center" style={{ 
            color: '#999', 
            fontSize: '13px'
          }}>
            &copy; {new Date().getFullYear()} Learnitfy. All rights reserved.
          </div>
        </div>
      </div>

      {/* Mobile-First CSS */}
      <style>{`
        @media (max-width: 991.98px) {
          footer .col-12:not(:last-child) {
            border-bottom: 1px solid #444;
            padding-bottom: 30px !important;
            margin-bottom: 30px !important;
          }
        }
        
        @media (max-width: 767.98px) {
          footer .container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          footer h5 {
            font-size: 15px !important;
          }
          
          footer p {
            font-size: 12px !important;
          }
          
          footer .col-12 > div {
            text-align: center !important;
          }
        }
        
        @media (max-width: 575.98px) {
          footer {
            padding: 0 !important;
          }
          
          footer .container {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
          
          footer h4 {
            font-size: 16px !important;
          }
          
          footer h5 {
            font-size: 14px !important;
          }
          
          footer p {
            font-size: 11px !important;
          }
        }
      `}</style>
    </footer>
  );
}

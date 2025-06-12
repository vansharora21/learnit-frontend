import React, { useState, useEffect } from 'react';
import CourseCards from './CourseCards';
import Timeline from './Tmeline';
import SearchBar from './SearchBar';

const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    headline: "Unlock Your Potential",
    subtext: "Expert-led courses for every learner.",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    headline: "Learn In-Demand Skills",
    subtext: "Stay ahead with industry-relevant programs.",
  },
  {
    src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "Transform Your Career",
    subtext: "Join thousands of successful graduates.",
  },
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = sliderImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (idx) => setCurrent(idx);

  return (
    <div className="position-relative w-100 overflow-hidden" style={{ minHeight: '70vh', height: '90vh', maxHeight: '800px' }}>
      {sliderImages.map((img, idx) => (
        <div
          key={idx}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 2 : 1,
            transition: 'opacity 0.9s ease',
          }}
        >
          <img
            src={img.src}
            alt={img.headline}
            className="w-100 h-100 object-fit-cover"
            style={{ filter: 'brightness(0.7)' }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center p-3 p-md-5"
            style={{
              color: '#fff',
              background: 'linear-gradient(90deg, rgba(33,37,41,0.7) 0%, rgba(33,37,41,0.2) 100%)',
            }}
          >
            <div className="text-center mb-4 mb-lg-5" style={{ width: '100%' }}>
              <h1 className="display-1 fw-bold mb-3" style={{ lineHeight: 1.1, fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
                {(() => {
                  const words = img.headline.split(' ');
                  return (
                    <>
                      {words.slice(0, -1).join(' ')}{' '}
                      <span style={{ color: 'orange' }}>{words[words.length - 1]}</span>
                    </>
                  );
                })()}
              </h1>
              <p className="fs-3 mb-4" style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}>{img.subtext}</p>
            </div>
          </div>
        </div>
      ))}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2"
        style={{ zIndex: 3 }}
      >
      </div>
      <style>{`
        .custom-search-bar {
          display: flex;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(60, 60, 60, 0.10);
          padding: 0.5 rem 0.5rem 0.5rem 1.2rem;
          max-width: 700px;
          width: 650px;

          transition: box-shadow 0.25s;
        }
        .custom-search-bar:focus-within {
          box-shadow: 0 4px 24px rgba(60, 60, 60, 0.18);
        }
        .custom-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1.15rem;
          background: transparent;
          color: #222;
          padding: 0.6rem 0;
        }
        .custom-search-input::placeholder {
          color: #b0b0b0;
          font-style: italic;
        }
        .custom-search-btn {
          display: flex;
          border-radius: 1px;
          align-items: center;
          background:rgb(249, 169, 30);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.2rem;
          margin-left: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.18s;
          box-shadow: 0 1px 3px rgba(60, 60, 60, 0.10);
        }
        .custom-search-btn:hover,
        .custom-search-btn:focus {
          background:rgb(254, 173, 51);
        }
        .custom-search-icon {
          display: flex;
          align-items: center;
          margin-right: 0.5rem;
        }
        @media (max-width: 700px) {
          .custom-search-bar {
            max-width: 98vw;
            padding: 0.4rem 0.4rem 0.4rem 0.7rem;
          }
          .custom-search-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.98rem;
          }
          .custom-search-input {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Hero Section with Image Slider */}
      <div className="bg-dark text-white position-relative overflow-hidden" style={{ minHeight: '70vh', height: '90vh', maxHeight: '800px' }}>
        <ImageSlider />
        {/* Search Bar positioned on top of the ImageSlider */}
        <div className="search-bar-container position-absolute top-50 start-50 translate-middle-x" style={{ zIndex: 3, marginTop: '100px' }}>
          <SearchBar />
        </div>
      </div>

      {/* Course Categories Section */}
      <div style={{ background: "#f5f5f5", paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <h3 className="text-center fw-semibold mb-5 text-dark">
            Explore Our Popular Course Categories
          </h3>
          <CourseCards />
          <Timeline />
        </div>
      </div>

      {/* Stats and Training Modes Section */}
      <section className="training-modes-section py-5" style={{ background: "#f5f5f5" }}>
  <div className="container">
    {/* Section Header */}
    <div className="text-center mb-5">
      <p className="text-dark fs-6 mb-1">
        Choose your own comfortable learning experience.
      </p>
      <h2 className="fw-bold fs-3 mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
        <span style={{ color: 'rgb(249, 169, 30)' }}>Training</span> Patterns
      </h2>
    </div>

    {/* Training Cards Grid */}
    <div className="row g-4">
      {/* Live Virtual Training Card */}
      <div className="col-12 col-md-6 col-lg-6">
        <div className="training-card position-relative overflow-hidden rounded-4 shadow-lg h-100" 
             style={{ 
               minHeight: '400px',
               background: 'linear-gradient(135deg, rgba(249, 169, 30, 0.9), rgba(255, 140, 0, 0.8)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               cursor: 'pointer',
               transition: 'all 0.3s ease'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-8px)';
               e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
             }}>
          
          {/* Card Content */}
          <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
            <h3 className="fw-bold fs-2 mb-2 text-white" 
                style={{ 
                  fontFamily: 'Ubuntu, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '1px'
                }}>
              LIVE VIRTUAL TRAINING
            </h3>
            <p className="mb-3 text-white" style={{ 
              fontSize: '1rem', 
              opacity: '0.9',
              fontWeight: '500',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              (Group-focused)
            </p>
            
            {/* Features List */}
            <div className="training-features">
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Join collaborative group sessions from anywhere
              </div>
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Fixed schedules with peer interaction
              </div>
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Instructor-led with real-world lab simulations
              </div>
              <div className="feature-item d-flex align-items-center mb-3" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Certification support and team-based project work
              </div>
            </div>

            {/* CTA Button */}
            <button className="btn btn-light fw-semibold px-4 py-2 rounded-pill" 
                    style={{ 
                      border: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}>
              Learn More →
            </button>
          </div>

          {/* Overlay Gradient */}
          <div className="position-absolute top-0 start-0 w-100 h-100" 
               style={{ 
                 background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                 pointerEvents: 'none'
               }}></div>
        </div>
      </div>

      {/* Live 1 on 1 Training Card */}
      <div className="col-12 col-md-6 col-lg-6">
        <div className="training-card position-relative overflow-hidden rounded-4 shadow-lg h-100" 
             style={{ 
               minHeight: '400px',
               background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.9), rgba(0, 123, 255, 0.8)), url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               cursor: 'pointer',
               transition: 'all 0.3s ease'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-8px)';
               e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
             }}>
          
          {/* Card Content */}
          <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
            <h3 className="fw-bold fs-2 mb-2 text-white" 
                style={{ 
                  fontFamily: 'Ubuntu, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '1px'
                }}>
              LIVE 1 ON 1 <br />TRAINING
            </h3>
            <p className="mb-3 text-white" style={{ 
              fontSize: '1rem', 
              opacity: '0.9',
              fontWeight: '500',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              (Personalized)
            </p>
            
            {/* Features List */}
            <div className="training-features">
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                One-on-one sessions tailored to your goals
              </div>
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Fully flexible timing and pacing
              </div>
              <div className="feature-item d-flex align-items-center mb-2" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Customized curriculum with hands-on mentoring
              </div>
              <div className="feature-item d-flex align-items-center mb-3" 
                   style={{ fontSize: '0.95rem', opacity: '0.95' }}>
                <span className="me-2" style={{ color: '#fff', fontSize: '1.2rem' }}>✅</span>
                Work on advanced, portfolio-ready projects
              </div>
            </div>

            {/* CTA Button */}
            <button className="btn btn-light fw-semibold px-4 py-2 rounded-pill" 
                    style={{ 
                      border: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}>
              Learn More →
            </button>
          </div>

          {/* Overlay Gradient */}
          <div className="position-absolute top-0 start-0 w-100 h-100" 
               style={{ 
                 background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                 pointerEvents: 'none'
               }}></div>
        </div>
      </div>
    </div>
  </div>

  {/* Additional CSS for animations */}
  <style jsx>{`
    .training-card {
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .training-card:hover .training-features {
      animation: slideInUp 0.3s ease;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0.8;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 768px) {
      .training-card {
        min-height: 380px !important;
      }
      
      .training-card h3 {
        font-size: 1.4rem !important;
        line-height: 1.3 !important;
      }
      
      .feature-item {
        font-size: 0.85rem !important;
        margin-bottom: 0.5rem !important;
      }
    }
    
    @media (max-width: 576px) {
      .training-card {
        min-height: 360px !important;
      }
      
      .training-card .p-4 {
        padding: 1.5rem !important;
      }
      
      .feature-item {
        font-size: 0.8rem !important;
      }
    }
  `}</style>
</section>
    </div>
  );
}

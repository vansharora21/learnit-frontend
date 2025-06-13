import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/Learnitfy_Logo.jpg';

function AboutUsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="about-us-page" style={{
      fontFamily: "'Open Sans', sans-serif",
      color: '#333',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '0 0.5rem' : '0 1rem',
    }}>
      {/* Hero Section */}
      <section className="hero" style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '2rem 0' : '4rem 0',
        gap: isMobile ? '1.5rem' : '2rem',
        background: '#fff',
      }}>
        <div className="hero-text" style={{ 
          flex: 1,
          order: isMobile ? 2 : 1,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 'bold',
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: '1rem',
            color: '#333',
            lineHeight: '1.2'
          }}>Empowering Teams, One Skill at a Time</h1>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 3vw, 1.1rem)' : 'clamp(1.1rem, 2.5vw, 1.2rem)',
            marginBottom: '2rem',
            color: '#555',
            maxWidth: isMobile ? '100%' : '600px',
            lineHeight: '1.6'
          }}>At Learnitfy, our mission is to empower professionals and organizations by delivering high-end IT training that drives growth, performance, and digital transformation. In this technology-driven world, success will depend only on the ability to adapt, evolve, and stay ahead of the curve. We help businesses and individuals by equipping them with the skills and knowledge needed to develop in a constantly changing digital landscape.</p>
          <Link to="/" className="cta-button" style={{
            
            background: '#FF6B00',
            color: '#fff',
            padding: isMobile ? '1rem 2rem' : '0.8rem 2rem',
            borderRadius: '30px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            border: '2px solid #FF6B00',
            fontSize: isMobile ? '1rem' : '0.9rem',
            minHeight: isMobile ? '48px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '280px' : 'none',
            margin: isMobile ? '0 auto' : '0'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#FF6B00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF6B00';
              e.currentTarget.style.color = '#fff';
            }}>
            Discover Our Programs
          </Link>
        </div>
        <div className="hero-animation" style={{ 
          flex: 1, 
          minWidth: isMobile ? '100%' : '300px',
          height: isMobile ? 'auto' : '300px',
          background: 'rgba(255, 255, 255, 0)', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          order: isMobile ? 1 : 2
        }}>
          <img src={logo} alt="EdTech Illustration" style={{
            maxWidth: '100%',
            height: 'auto',
            width: isMobile ? '100%' : isTablet ? '400px' : '515px',
            borderRadius: '16px',
            objectFit: 'contain'
          }} />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission" style={{
        background: '#F4F4F4',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        borderRadius: '16px',
        margin: '3rem 0',
      }}>
        <div className="mission-content" style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2rem' : '3rem',
          alignItems: 'flex-start',
        }}>
          <div className="mission-values" style={{ 
            flex: 1, 
            paddingLeft: '0',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h2 style={{ 
              fontFamily: "'Poppins', sans-serif", 
              marginBottom: '1.5rem', 
              color: '#333', 
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 4vw, 3rem)'
            }}>Our Mission</h2>
            <br />
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Innovation', 'Impact', 'Integrity'].map((value, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  marginTop: '0',
                  paddingLeft: isMobile ? '1rem' : '2rem',
                  fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  opacity: 0,
                  animation: `fadeInUp 0.5s ${idx * 0.2}s forwards`,
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    background: '#FF6B00',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    flexShrink: 0,
                  }}></span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mission-text" style={{ 
            flex: 1, 
            paddingLeft: '0',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <br />
            <br />
            <p style={{ 
              fontSize: isMobile ? 'clamp(1rem, 3vw, 1.1rem)' : 'clamp(1.1rem, 2.5vw, 1.2rem)', 
              lineHeight: '1.6' 
            }}>
              The Learnitfy experience goes just beyond knowledge transfer. Our training programs focus on practical, hands-on learning through live projects, real-time case studies, and interactive labs, ensuring that learners are not only certified but they are also project-ready.
              We leverage the latest tools and platforms to deliver a seamless learning experience—whether live instructor-led sessions, on-site / offline training, or blended learning paths.
              In an era where skills are the new currency, Learnitfy is not just another training company — we are your strategic learning partner....
            </p>
          </div>
        </div>
      </section>

      {/* Core Values & Philosophy Section */}
      <section className="offerings" style={{ margin: '3rem 0' }}>
        <h2 style={{ 
          fontFamily: "'Poppins', sans-serif", 
          marginBottom: '2rem', 
          color: '#333',
          fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)',
          textAlign: isMobile ? 'center' : 'left'
        }}>Core Values & Philosophy – Learnitfy</h2>
        <div className="cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '1rem' : '2rem',
        }}>
          {[
            { title: '🎓 Learner-Centric Approach', description: 'Every learner/trainee is unique. We design training curriculums that are flexible, personalized, and aligned with real-world project roles. Our focus is not just on knowledge delivery, but on learner success and measurable results.' },
            { title: '🛠️ Practical Learning Over Theory', description: 'We believe that genuine expertise comes from making your hands dirty, not just knowing. That\'s why our courses highlight hands-on training, live projects, and real-time problem-solving—providing that skills are ready to be applied from day one.' },
            { title: '🚀 Innovation-Driven', description: 'Technology grows swiftly—and so do we. We redefine our course structure and learning methods to stay ahead of industry trends, to ensure our learners are always provided with the latest technologies and techniques.' },
            { title: '🤝 Integrity and Transparency', description: 'We are 100% committed to our promises and clear in our communication. Be it setting expectations or measuring progress, we value transparency and build trust with every client and learner.' },
            { title: '🌍 Impact-Oriented', description: 'Our goal is not just to train, but to make an ever-lasting impact. We count our success by how well our learners perform, grow, and contribute to their organizations post our training.' },
            { title: '🤝 Partnership Mindset', description: 'We are not just another training vendor, we are your strategic partner, invested in your long-term success—because when you grow, we grow. This mindset drives us every day at Learnitfy—to make IT learning smarter, sharper, and more significant.' },
          ].map((item, idx) => (
            <div key={idx} className="card" style={{
              background: '#fff',
              borderRadius: '12px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              minHeight: isMobile ? 'auto' : '200px'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}>
              <h3 style={{ 
                fontFamily: "'Poppins', sans-serif", 
                marginBottom: '0.5rem', 
                color: '#333',
                fontSize: isMobile ? 'clamp(1.1rem, 4vw, 1.3rem)' : 'clamp(1.2rem, 2.5vw, 1.4rem)'
              }}>{item.title}</h3>
              <p style={{ 
                color: '#666',
                fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.1rem)',
                lineHeight: '1.5'
              }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="journey-section" style={{ margin: '3rem 0' }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          marginBottom: '2rem',
          color: '#333',
          textAlign: 'center',
          fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 600
        }}>
          Our Journey
        </h2>
        <div className="journey" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(2, 1fr)',
          gridTemplateRows: isMobile ? 'none' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '0 0.5rem' : '0'
        }}>
          {[
            'Learnitfy was born out of a real-world challenge that many IT professionals face—keeping pace with rapidly changing technologies while working full-time. Having the availability of other online courses, there was a prominent gap between theoretical learning and real industry demands.',
            'The idea for Learnitfy emerged during a large enterprise project, where teams across different regions struggled even after they took the training. The reason, due to lack of proper, structured training. It became clear that now businesses needed more than just training—they needed customized, hands-on learning experiences that aligned with real-time projects.',
            'In 2025, Learnitfy was founded with a clear mission: to bridge the gap between technical knowledge and practical application through industry-oriented, expert-led training. Every course that we design reflects our core belief: learning should be practical, flexible, and immediately applicable.',
            'That\'s why Learnitfy continues to focus on interactive, instructor-led sessions, live projects, and personalized support which makes learning more engaging and outcome-driven. Today, we stand for more than just training—it represents a dedication to helping individuals and organizations stay ahead to lead the digital future with confidence.'
          ].map((text, idx) => (
            <div key={idx} className="journey-card" style={{
              background: '#fff',
              borderRadius: '12px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s',
              border: '2px solid transparent',
              cursor: 'pointer',
              minHeight: isMobile ? 'auto' : '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff6b00';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,0,0.18)';
                e.currentTarget.style.background = '#fff7ef';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                e.currentTarget.style.background = '#fff';
              }}>
              <p style={{ 
                fontSize: isMobile ? 'clamp(1rem, 3vw, 1.08rem)' : 'clamp(1.08rem, 2vw, 1.2rem)', 
                lineHeight: '1.6', 
                color: '#333', 
                margin: 0,
                textAlign: isMobile ? 'left' : 'center'
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta" style={{
        background: 'linear-gradient(90deg, #FF6B00, #ff9e4f)',
        color: '#fff',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        borderRadius: '16px',
        margin: '3rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <h2 style={{ 
          fontFamily: "'Poppins', sans-serif", 
          marginBottom: '1rem', 
          fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)'
        }}>Ready to Level Up Your Team?</h2>
        <Link to="/contact" style={{
          display: 'inline-block',
          background: '#FF6B00',
          color: '#fff',
          padding: isMobile ? '1rem 2rem' : '0.8rem 2rem',
          borderRadius: '30px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: '2px solid #fff',
          position: 'relative',
          overflow: 'hidden',
          fontSize: isMobile ? '1rem' : '0.9rem',
          minHeight: isMobile ? '48px' : 'auto',
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '300px' : 'none',
          margin: isMobile ? '0 auto' : '0'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#FF6B00';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF6B00';
            e.currentTarget.style.color = '#fff';
          }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px', height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            zIndex: 0,
          }}></div>
          <span style={{ position: 'relative', zIndex: 1 }}>
            Talk to Our Learning Advisor
          </span>
        </Link>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
        }

        /* Additional responsive styles */
        @media (max-width: 480px) {
          .hero {
            padding: 1rem 0 !important;
          }
          .mission {
            padding: 1.5rem 0.5rem !important;
          }
          .footer-cta {
            padding: 1.5rem 0.5rem !important;
          }
          .cards-grid {
            gap: 0.8rem !important;
          }
          .journey {
            padding: 0 0.25rem !important;
          }
        }

        @media (max-width: 320px) {
          .hero h1 {
            font-size: 1.3rem !important;
          }
          .hero p {
            font-size: 0.9rem !important;
          }
        }

        /* Touch-friendly hover effects for mobile */
        @media (hover: none) and (pointer: coarse) {
          .card:hover {
            transform: none !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
          }
          .journey-card:hover {
            border-color: transparent !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
            background: #fff !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutUsPage;

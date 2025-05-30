import React from 'react';
import { Link } from 'react-router-dom';

function AboutUsPage() {
  return (
    <div className="about-us-page" style={{
      fontFamily: "'Open Sans', sans-serif",
      color: '#333',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    }}>
      {/* Hero Section */}
      <section className="hero" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem 0',
        gap: '2rem',
        background: '#fff',
      }}>
        <div className="hero-text" style={{ flex: 1 }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 'bold',
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333',
          }}>Empowering Teams, One Skill at a Time</h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: '#555',
            maxWidth: '600px',
          }}>Learnitfy is your partner in workforce transformation through targeted, high-impact corporate training solutions.</p>
          <Link to="/programs" className="cta-button" style={{
            display: 'inline-block',
            background: '#FF6B00',
            color: '#fff',
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            border: '2px solid #FF6B00',
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
        <div className="hero-animation" style={{ flex: 1, minWidth: '300px', height: '300px', background: '#F4F4F4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Placeholder for Lottie/SVG animation */}
          <p style={{ color: '#999', fontStyle: 'italic' }}>Animation: Growing bars/graphs symbolizing growth</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission" style={{
        background: '#F4F4F4',
        padding: '4rem 2rem',
        borderRadius: '16px',
        margin: '3rem 0',
      }}>
        <div className="mission-content" style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '3rem',
          alignItems: 'flex-start',
        }}>
          <div className="mission-values" style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '1.5rem', color: '#333' }}>Our Mission</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Innovation', 'Empowerment', 'Excellence'].map((value, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  opacity: 0,
                  animation: `fadeInUp 0.5s ${idx * 0.2}s forwards`,
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
          <div className="mission-text" style={{ flex: 1 }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              We bridge skill gaps by designing personalized training journeys for teams across industries. From tech bootcamps to leadership development, we drive capability and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="offerings" style={{ margin: '3rem 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif', sans-serif", marginBottom: '2rem', color: '#333' }}>What We Offer</h2>
        <div className="cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { icon: '📚', title: 'Technical Training' },
            { icon: '🧠', title: 'Leadership Programs' },
            { icon: '🧩', title: 'Customized Curricula' },
            { icon: '💼', title: 'Real-World Case Studies' },
            { icon: '🎓', title: 'Certifications' },
            { icon: '📊', title: 'Performance Analytics' },
          ].map((item, idx) => (
            <div key={idx} className="card" style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem', color: '#333' }}>{item.title}</h3>
              <p style={{ color: '#666' }}>Short description or benefit here.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team" style={{ margin: '3rem 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '2rem', color: '#333' }}>Meet Our Team</h2>
        <div className="team-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { name: 'Alex Chen', role: 'Founder & CEO', funFact: 'Loves hiking and coding at sunrise 🌄' },
            { name: 'Priya Sharma', role: 'Head of Training', funFact: 'Former pro chess player ♟️' },
            { name: 'Jamal Roberts', role: 'Curriculum Designer', funFact: 'Speaks 4 languages' },
            { name: 'Maria Lopez', role: 'Learning Advisor', funFact: 'Avid reader and writer' },
          ].map((member, idx) => (
            <div key={idx} className="team-card" style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              animation: `fadeIn 0.5s ${idx * 0.2}s forwards`,
            }}>
              <div style={{
                width: '100%',
                height: '180px',
                background: '#F4F4F4',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontStyle: 'italic',
              }}>Photo</div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem', color: '#333' }}>{member.name}</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{member.role}</p>
              <p style={{ color: '#FF6B00', fontSize: '0.9rem' }}>{member.funFact}</p>
              <div className="team-overlay" style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(255,107,0,0.8)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                <p style={{ padding: '1rem', textAlign: 'center' }}>“Empowering teams is my passion.”</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="testimonials" style={{ margin: '3rem 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '2rem', color: '#333' }}>Success Stories</h2>
        <div className="testimonial-card" style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>
            “Learnitfy’s training transformed our team’s capabilities and boosted our productivity by 30%.”
          </p>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Sarah Johnson</p>
          <p style={{ color: '#666' }}>Director of Learning, TechCorp</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ width: '80px', height: '40px', background: '#F4F4F4', borderRadius: '4px' }}></div>
            <div style={{ width: '80px', height: '40px', background: '#F4F4F4', borderRadius: '4px' }}></div>
            <div style={{ width: '80px', height: '40px', background: '#F4F4F4', borderRadius: '4px' }}></div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta" style={{
        background: 'linear-gradient(90deg, #FF6B00, #ff9e4f)',
        color: '#fff',
        padding: '3rem 2rem',
        borderRadius: '16px',
        margin: '3rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '1rem', fontSize: '2rem' }}>Ready to Level Up Your Team?</h2>
        <Link to="/contact" className="cta-button" style={{
          display: 'inline-block',
          background: '#fff',
          color: '#FF6B00',
          padding: '0.8rem 2rem',
          borderRadius: '30px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: '2px solid #fff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#FF6B00';
        }}>
          Talk to a Learning Advisor
        </Link>
        <div className="pulse" style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          zIndex: 0,
        }}></div>
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
      `}</style>
    </div>
  );
}

export default AboutUsPage;

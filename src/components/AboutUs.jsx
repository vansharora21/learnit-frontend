import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/3D.png';
// Sample images for team members
// const teamImages = {
//   'Alex Chen': 'https://via.placeholde r.com/150', // Replace with actual image URLs
//   'Priya Sharma': 'https://via.placeholder.com/150',
//   'Jamal Roberts': 'https://via.placeholder.com/150',
//   'Maria Lopez': 'https://via.placeholder.com/150',
// };

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
          }}>At Learnitfy, our mission is to empower professionals and organizations by delivering high-end IT training that drives growth, performance, and digital transformation. In this technology-driven world, success will depend only on the ability to adapt, evolve, and stay ahead of the curve. We help businesses and individuals by equipping them with the skills and knowledge needed to develop in a constantly changing digital landscape.</p>
          <Link to="/" className="cta-button" style={{
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
          <img src={logo} alt="EdTech Illustration" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '16px' }} />
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
          <div className="mission-values" style={{ flex: 1, paddingLeft: '0' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '1.5rem', color: '#333', fontSize: '3rem' }}>Our Mission</h2>
            <br></br>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Innovation', 'Impact', 'Integrity'].map((value, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  marginTop: '0',
                  paddingLeft: '2rem',
                  fontSize: '2rem',
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

          <div className="mission-text" style={{ flex: 1, paddingLeft: '0' }}>
            <br />
            <br />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              The Learnitfy experience goes just beyond knowledge transfer. Our training programs focus on practical, hands-on learning through live projects, real-time case studies, and interactive labs, ensuring that learners are not only certified but they are also project-ready.
              We leverage the latest tools and platforms to deliver a seamless learning experience—whether live instructor-led sessions, on-site / offline training, or blended learning paths.
              In an era where skills are the new currency, Learnitfy is not just another training company — we are your strategic learning partner.



            </p>
          </div>
        </div>
      </section>

      {/* Core Values & Philosophy Section */}
      <section className="offerings" style={{ margin: '3rem 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '2rem', color: '#333' }}>Core Values & Philosophy – Learnitfy</h2>
        <div className="cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
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
              <h3 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem', color: '#333' }}>{item.title}</h3>
              <p style={{ color: '#666' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Meet Our Team */}
      {/* <section className="team" style={{ margin: '3rem 0' }}>
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
              <img src={teamImages[member.name]} alt={member.name} style={{
                width: '100%',
                height: '180px',
                borderRadius: '8px',
                marginBottom: '1rem',
                objectFit: 'cover',
              }} />
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
      </section> */}



      {/* Our Journey Section */}
      <section className="journey-section" style={{ margin: '3rem 0' }}>
  <h2 style={{
    fontFamily: "'Poppins', sans-serif",
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 600
  }}>
    Our Journey
  </h2>
  <div className="journey" style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '1.5rem',
    maxWidth: '900px',
    margin: '0 auto'
  }}>
    <div className="journey-card">
      <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
        Learnitfy was born out of a real-world challenge that many IT professionals face—keeping pace with rapidly changing technologies while working full-time. Having the availability of other online courses, there was a prominent gap between theoretical learning and real industry demands.
      </p>
    </div>
    <div className="journey-card">
      <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
        The idea for Learnitfy emerged during a large enterprise project, where teams across different regions struggled even after they took the training. The reason, due to lack of proper, structured training. It became clear that now businesses needed more than just training—they needed customized, hands-on learning experiences that aligned with real-time projects.
      </p>
    </div>
    <div className="journey-card">
      <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
        In 2025, Learnitfy was founded with a clear mission: to bridge the gap between technical knowledge and practical application through industry-oriented, expert-led training. Every course that we design reflects our core belief: learning should be practical, flexible, and immediately applicable.
      </p>
    </div>
    <div className="journey-card">
      <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
        That's why Learnitfy continues to focus on interactive, instructor-led sessions, live projects, and personalized support which makes learning more engaging and outcome-driven. Today, we stand for more than just training—it represents a dedication to helping individuals and organizations stay ahead to lead the digital future with confidence.
      </p>
    </div>
  </div>
  <style jsx>{`
    .journey-card {
      background: #fff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s;
      border: 2px solid transparent;
      cursor: pointer;
      min-height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .journey-card:hover {
      border-color: #ff6b00;
      box-shadow: 0 6px 20px rgba(255,107,0,0.18);
      background: #fff7ef;
    }
    @media (max-width: 800px) {
      .journey {
        grid-template-columns: 1fr;
        grid-template-rows: none;
      }
    }
  `}</style>
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
        <Link to="/contact" style={{
          display: 'inline-block',
          background: '#FF6B00',
          color: '#fff',
          padding: '0.8rem 2rem',
          borderRadius: '30px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: '2px solid #fff',
          position: 'relative',
          overflow: 'hidden',
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
          Talk to Our Learning Advisor
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
      `}</style>
    </div>
  );
}

export default AboutUsPage;

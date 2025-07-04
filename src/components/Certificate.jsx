import React, { useState } from 'react';
import logo from './Assets/certificate.jpeg';

const tabContent = [
  {
    label: "How Does It Work?",
    content: (
      <ul>
        <li>Select a course based on your goals and interests.</li>
        <li>Join live or self-paced sessions led by expert instructors.</li>
        <li>Engage in hands-on learning through projects and labs.</li>
        <li>Get access to learning materials, community, and mentorship.</li>
        <li>Earn a certificate of completion or achievement (if applicable).</li>
      </ul>
    ),
  },
  {
    label: "What Will You Do?",
    content: (
      <ul>
        <li>Participate in interactive sessions and group activities</li>
        <li>Complete assignments, exercises, or real-world projects</li>
        <li>Apply concepts to hands-on labs or use case scenarios</li>
        <li>Receive feedback and personalized guidance from instructors</li>
      </ul>
    ),
  },
  {
    label: "What You'll Learn",
    content: (
      <ul>
        <li>Foundational and advanced concepts in the subject area</li>
        <li>Real-world tools, platforms, and technologies</li>
        <li>Best practices, workflows, and industry standards</li>
        <li>Problem-solving skills through practical applications</li>
        <li>
          <span style={{ color: "#888" }}>
            (Topics vary by course – e.g., development, cloud, data, design)
          </span>
        </li>
      </ul>
    ),
  },
  {
    label: "Who Is It For?",
    content: (
      <>
        <div style={{ marginBottom: 8 }}>
          <b>Ideal Learners:</b>
          <ul>
            <li>Students or recent graduates starting their careers</li>
            <li>Professionals aiming to upgrade or switch roles</li>
            <li>Freelancers or entrepreneurs building practical skills</li>
            <li>Anyone who prefers guided, structured learning</li>
          </ul>
        </div>
        <div>
          {/* <b>Popular Course Categories:</b>
          <ul>
            <li>Cloud & DevOps</li>
            <li>Software Development</li>
            <li>Data & Business Analytics</li>
            <li>Project & Product Management</li>
            <li>Cybersecurity & IT Fundamentals</li>
          </ul> */}
        </div>
      </>
    ),
  },
];

const CertificateSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="cert-main-flex">
      {/* Left: Tabbed Info */}
      <div className="cert-card-with-tabs">
        <div className="cert-card-header">
          <h2>Certification Guide </h2>
          <p>
            Enroll in a professional course and validate your expertise with industry-recognized certifications.
          </p>
        </div>
        <div className="cert-tabs-grid">
          {tabContent.map((tab, idx) => (
            <button
              key={tab.label}
              className={`cert-tab-btn${activeTab === idx ? ' active' : ''}`}
              onClick={() => setActiveTab(idx)}
              tabIndex={0}
              aria-label={tab.label}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="cert-tab-content">
          {tabContent[activeTab].content}
        </div>
        <div className="cert-card-footer">
          <h4>Preparation Tips</h4>
          <ul>
            <li>Take a structured course with hands-on practice</li>
            <li>Complete exercises, quizzes, and mock tests</li>
            <li>Work on real-world projects to build confidence</li>
            <li>Review official documentation and certification guides</li>
          </ul>
        </div>
      </div>

      {/* Right: Demo Certificate */}
      <div className="cert-demo-col">
        <div className="cert-demo-img-frame">
          <img
            src={logo}
            alt="Demo Certificate"
            className="cert-demo-img"
          />
        </div>
        <div className="cert-demo-caption">
          *Sample certificate for illustration only
        </div>
      </div>

      <style jsx>{`
        .cert-main-flex {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 100px;
          margin: 48px 0;
          flex-wrap: wrap;
          background: #fff;
          border-radius: 14px;
          padding: 0px;
          border: none;
        }
        
        .cert-card-with-tabs {
          flex: 1 1 420px;
          min-width: 320px;
          max-width: 700px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e1e4e8;
          padding: 32px 24px 24px 24px;
          display: flex;
          flex-direction: column;
        }
        
        .cert-card-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }
        
        .cert-card-header p {
          color: #444;
          font-size: 1.08rem;
          margin-bottom: 18px;
        }
        
        .cert-tabs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }
        
        .cert-tab-btn {
          background: #f6f8fa;
          border: 1px solid #e1e4e8;
          border-radius: 10px;
          font-size: 1.08rem;
          font-weight: 600;
          color: #333;
          padding: 16px 10px;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }
        
        .cert-tab-btn.active,
        .cert-tab-btn:focus,
        .cert-tab-btn:hover {
          background: #fff7ef;
          border-color: #ff6b00;
          color: #ff6b00;
          box-shadow: 0 4px 12px rgba(255,107,0,0.08);
        }
        
        .cert-tab-content {
          background: #fafbfc;
          border-radius: 10px;
          border: 1px solid #eee;
          padding: 20px 16px;
          min-height: 120px;
          margin-bottom: 18px;
          color: #222;
          font-size: 1rem;
        }
        
        .cert-card-footer h4 {
          font-size: 1.08rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .cert-card-footer ul {
          margin: 0 0 0 18px;
          color: #444;
          font-size: 1rem;
        }
        
        .cert-demo-col {
          flex: 0 0 340px;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 12px;
          padding: 0;
          border: none;
          box-shadow: none;
        }
        
        .cert-demo-img-frame {
          border: 6px solid #2d3242;
          height: 350px;
          border-radius: 6px;
          width: 400px;
          padding: 10px;
          background: #fff;
          box-shadow: 0 2px 16px rgba(44,50,66,0.09);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cert-demo-img {
          height: 300px;
          border-radius: 6px;
          width: 100%;
          max-width: 400px;
          border-radius: 2px;
          display: block;
          object-fit: contain;
          object-position: center;
        }
        
        .cert-demo-caption {
          font-size: 0.92rem;
          color: #888;
          margin-top: 10px;
          text-align: center;
        }
        
        /* Enhanced responsive design */
        @media (max-width: 1200px) {
          .cert-main-flex {
            gap: 60px;
          }
        }
        
        @media (max-width: 1000px) {
          .cert-main-flex {
            flex-direction: column;
            align-items: center;
            gap: 40px;
            padding: 20px 16px;
          }
          
          .cert-demo-col,
          .cert-card-with-tabs {
            max-width: 100%;
            width: 100%;
          }
          
          .cert-demo-img-frame {
            margin: 0 auto;
            width: min(400px, 90vw);
            height: auto;
            aspect-ratio: 400/350;
          }
          
          .cert-demo-img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        
        @media (max-width: 768px) {
          .cert-main-flex {
            gap: 30px;
            padding: 15px 12px;
          }
          
          .cert-card-with-tabs {
            padding: 24px 16px;
          }
          
          .cert-card-header h2 {
            font-size: 1.3rem;
          }
          
          .cert-card-header p {
            font-size: 1rem;
          }
          
          .cert-tabs-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .cert-tab-btn {
            font-size: 1rem;
            padding: 14px 12px;
          }
          
          .cert-tab-content {
            padding: 16px 12px;
            font-size: 0.95rem;
          }
          
          .cert-demo-img-frame {
            width: min(350px, 85vw);
            padding: 8px;
          }
          
          .cert-demo-img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        
        @media (max-width: 600px) {
          .cert-main-flex {
            margin: 24px 0;
            padding: 12px 8px;
            gap: 24px;
          }
          
          .cert-card-with-tabs {
            padding: 20px 12px;
            min-width: 280px;
          }
          
          .cert-card-header h2 {
            font-size: 1.2rem;
          }
          
          .cert-card-header p {
            font-size: 0.95rem;
          }
          
          .cert-tabs-grid {
            gap: 10px;
          }
          
          .cert-tab-btn {
            font-size: 0.95rem;
            padding: 12px 8px;
          }
          
          .cert-tab-content {
            padding: 14px 10px;
            min-height: 100px;
            font-size: 0.9rem;
          }
          
          .cert-card-footer h4 {
            font-size: 1rem;
          }
          
          .cert-card-footer ul {
            font-size: 0.95rem;
          }
          
          .cert-demo-img-frame {
            width: min(300px, 80vw);
            padding: 6px;
          }
          
          .cert-demo-img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        
        @media (max-width: 480px) {
          .cert-main-flex {
            padding: 8px 4px;
          }
          
          .cert-card-with-tabs {
            padding: 16px 8px;
            min-width: 260px;
          }
          
          .cert-card-header h2 {
            font-size: 1.1rem;
          }
          
          .cert-card-header p {
            font-size: 0.9rem;
          }
          
          .cert-tab-btn {
            font-size: 0.9rem;
            padding: 10px 6px;
          }
          
          .cert-tab-content {
            padding: 12px 8px;
            font-size: 0.85rem;
          }
          
          .cert-card-footer h4 {
            font-size: 0.95rem;
          }
          
          .cert-card-footer ul {
            font-size: 0.9rem;
          }
          
          .cert-demo-img-frame {
            width: min(280px, 75vw);
            border-width: 4px;
            padding: 5px;
          }
        }
        
        @media (max-width: 360px) {
          .cert-main-flex {
            margin: 16px 0;
            padding: 4px 2px;
          }
          
          .cert-card-with-tabs {
            padding: 12px 6px;
            min-width: 240px;
          }
          
          .cert-card-header h2 {
            font-size: 1rem;
          }
          
          .cert-card-header p {
            font-size: 0.85rem;
          }
          
          .cert-tab-btn {
            font-size: 0.85rem;
            padding: 8px 4px;
          }
          
          .cert-tab-content {
            padding: 10px 6px;
            font-size: 0.8rem;
          }
          
          .cert-card-footer h4 {
            font-size: 0.9rem;
          }
          
          .cert-card-footer ul {
            font-size: 0.85rem;
          }
          
          .cert-demo-img-frame {
            width: min(260px, 70vw);
            border-width: 3px;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateSection;
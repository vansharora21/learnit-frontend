import React, { useState } from 'react';
import logo from './Assets/certificate.png';

const tabContent = [
  {
    label: "How to Get Certified?",
    content: (
      <ul>
        <li>Enroll in a professional training course to gain required skills.</li>
        <li>Format and requirements vary by course. </li>
      </ul>
    ),
  },
  {
    label: "What Does the Exam Include?",
    content: (
      <ul>
        <li>Multiple-choice questions (MCQs)</li>
        <li>Coding assessments or practical tasks</li>
        <li>Case studies or final projects (in some cases)</li>
      </ul>
    ),
  },
  {
    label: "Key Topics Covered",
    content: (
      <ul>
        <li>Core concepts of the subject</li>
        <li>Practical applications and tools</li>
        <li>Real-world problem solving</li>
        <li>Industry-relevant best practices</li>
        <li>
          <span style={{ color: "#888" }}>
            (Specific topics depend on course: e.g., web development, cloud computing, cybersecurity)
          </span>
        </li>
      </ul>
    ),
  },
  {
    label: "Who & Popular Certifications",
    content: (
      <>
        <div style={{ marginBottom: 8 }}>
          <b>Who Should Take This?</b>
          <ul>
            <li>Students or graduates seeking skill validation</li>
            <li>Working professionals aiming for upskilling</li>
            <li>Anyone interested in structured, guided learning</li>
          </ul>
        </div>
        <div>
          <b>Popular Certifications (2025):</b>
          <ul>
            <li>Entry-level, Associate, and Advanced options</li>
            <li>Vendor-specific (Microsoft, Google, AWS) or vendor-neutral</li>
            <li>Online and offline exam formats available</li>
          </ul>
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
          <h2>Certification Exam Guide 2025</h2>
          <p>
            Enroll in a professional course and validate your expertise with industry-recognized certification exams.
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
          gap:100px;
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
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
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
          height:350px;
          border-radius: 6px;
          width: 450px;
          padding: 10px;
          background: #fff;
          box-shadow: 0 2px 16px rgba(44,50,66,0.09);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cert-demo-img {
          height:300px;
          border-radius: 6px;
          width: 400px;
          border-radius: 2px;
          display: block;
        }
        .cert-demo-caption {
          font-size: 0.92rem;
          color: #888;
          margin-top: 10px;
          text-align: center;
        }
        @media (max-width: 1000px) {
          .cert-main-flex {
            flex-direction: column;
            align-items: stretch;
            gap: 28px;
            padding: 22px 6px;
          }
          .cert-demo-col,
          .cert-card-with-tabs {
            max-width: 100%;
          }
          .cert-demo-img-frame {
            margin: 0 auto;
          }
        }
        @media (max-width: 600px) {
          .cert-card-with-tabs {
            padding: 18px 6px 14px 6px;
          }
          .cert-tabs-grid {
            gap: 8px;
          }
          .cert-tab-btn {
            font-size: 0.97rem;
            padding: 12px 6px;
          }
          .cert-tab-content {
            padding: 12px 6px;
          }
          .cert-demo-img-frame {
            padding: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateSection;

import React from "react";

// Timeline data for advantages of corporate training
const timelineData = [
  {
    period: "Skill Enhancement",
    title: "Up-to-date Workforce",
    desc: "Corporate training ensures employees continually upgrade their skills, keeping your team current with the latest industry trends and technologies.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    side: "left"
  },
  {
    period: "Productivity",
    title: "Boosted Efficiency",
    desc: "Well-trained employees perform tasks more efficiently and with greater confidence, leading to improved productivity and higher-quality results.",
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    side: "right"
  },
  {
    period: "Engagement",
    title: "Employee Retention",
    desc: "Providing learning opportunities increases job satisfaction and loyalty, helping retain top talent and reducing turnover.",
    img: "https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg",
    side: "left"
  },
  {
    period: "Innovation",
    title: "Culture of Growth",
    desc: "Continuous learning fosters creative thinking and adaptability, empowering teams to innovate and drive business growth.",
    img: "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg",
    side: "right"
  }
];

export default function CorporateTrainingTimeline() {
  return (
    <div style={{ background: "#f5f5f5", padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            Advantages of Corporate Training
          </h2>
          <h5 className="text-secondary fw-normal fst-italic" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Discover how training transforms your organization
          </h5>
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper position-relative">
          {/* Timeline Line */}
          <div className="timeline-line"></div>
          
          {timelineData.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-image">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-circle border border-4 border-white shadow"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className={`timeline-text ${item.side}`}>
                  <h5 style={{ color: '#00c9ff' }}>{item.period}</h5>
                  <h5 className="fw-semibold mb-3">{item.title}</h5>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-wrapper {
          position: relative;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #00c9ff, #92fe9d);
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          min-height: 120px;
        }

        .timeline-content {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .timeline-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          background: #f5f5f5;
          border-radius: 50%;
          padding: 4px;
        }

        .timeline-text {
          width: 41.666667%; /* equivalent to col-5 */
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }

        .timeline-text.left {
          margin-right: auto;
          text-align: right;
          margin-left: 0;
        }

        .timeline-text.right {
          margin-left: auto;
          text-align: left;
          margin-right: 0;
        }

        .timeline-text.left::after {
          content: '';
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        .timeline-text.right::after {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-right: 10px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        /* Large Desktop */
        @media (max-width: 1200px) {
          .timeline-text {
            padding: 1.25rem;
          }
        }

        /* Desktop */
        @media (max-width: 992px) {
          .timeline-text {
            width: 45%;
            padding: 1rem;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .timeline-line {
            left: 40px;
          }

          .timeline-image {
            left: 40px;
            transform: translateX(-50%);
          }

          .timeline-text {
            width: calc(100% - 100px);
            margin-left: 100px !important;
            margin-right: 0 !important;
            text-align: left !important;
          }

          .timeline-text.left::after,
          .timeline-text.right::after {
            left: -10px;
            right: auto;
            border-left: none;
            border-right: 10px solid white;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .timeline-wrapper {
            padding: 1rem 0;
          }

          .timeline-line {
            left: 30px;
          }

          .timeline-image {
            left: 30px;
          }

          .timeline-image img {
            width: 60px !important;
            height: 60px !important;
          }

          .timeline-text {
            width: calc(100% - 80px);
            margin-left: 80px !important;
            padding: 1rem;
            font-size: 0.9rem;
          }

          .timeline-text h5 {
            font-size: 1rem !important;
            margin-bottom: 0.5rem !important;
          }

          .timeline-text p {
            font-size: 0.85rem;
            line-height: 1.4;
          }

          .timeline-item {
            margin-bottom: 2rem;
            min-height: 100px;
          }
        }

        /* Small Mobile */
        @media (max-width: 360px) {
          .timeline-line {
            left: 25px;
          }

          .timeline-image {
            left: 25px;
          }

          .timeline-image img {
            width: 50px !important;
            height: 50px !important;
          }

          .timeline-text {
            width: calc(100% - 70px);
            margin-left: 70px !important;
            padding: 0.75rem;
          }

          .timeline-text h5 {
            font-size: 0.9rem !important;
          }

          .timeline-text p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

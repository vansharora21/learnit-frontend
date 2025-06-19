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
      <div className="container" style={{ maxWidth: '1200px', padding: '0 1rem' }}>
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
          {timelineData.map((item, idx) => (
            <div key={idx} className="row mb-5 position-relative align-items-center">
              {item.side === "left" ? (
                <>
                  <div className="col-5 text-end pe-4">
                    <h5 style={{ color: '#00c9ff' }}>{item.period}</h5>
                    <h5 className="fw-semibold mb-3">{item.title}</h5>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                  <div className="col-2 text-center">
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
                  <div className="col-5"></div>
                </>
              ) : (
                <>
                  <div className="col-5"></div>
                  <div className="col-2 text-center">
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
                  <div className="col-5 ps-4">
                    <h5 style={{ color: '#00c9ff' }}>{item.period}</h5>
                    <h5 className="fw-semibold mb-3">{item.title}</h5>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

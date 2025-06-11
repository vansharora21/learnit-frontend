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
          {/* Desktop Timeline */}
          <div className="d-none d-lg-block">
            {/* Vertical Line for Desktop */}
            <div
              className="position-absolute top-0 start-50 translate-middle-x bg-secondary"
              style={{
                width: '3px',
                height: '100%',
                zIndex: 1
              }}
            ></div>

            {timelineData.map((item, idx) => (
              <div key={idx} className="row mb-5 position-relative align-items-center">
                {item.side === "left" ? (
                  <>
                    <div className="col-5 text-end pe-4">
                      <h5 className="fw-bold text-primary mb-2">{item.period}</h5>
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
                          position: 'relative',
                          zIndex: 2
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
                          position: 'relative',
                          zIndex: 2
                        }}
                      />
                    </div>
                    <div className="col-5 ps-4">
                      <h5 className="fw-bold text-primary mb-2">{item.period}</h5>
                      <h5 className="fw-semibold mb-3">{item.title}</h5>
                      <p className="text-muted mb-0">{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Desktop Welcome Aboard - Centered */}
            <div className="text-center mt-4">
              <div
                className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle border border-4 border-white shadow fw-bold"
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '1.5rem',
                  lineHeight: '1.2',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                Lets<br />Learn
              </div>
            </div>
          </div>

          {/* Mobile Timeline - Simplified Single Column */}
          <div className="d-lg-none">
            {/* Mobile Timeline Line */}
            <div
              className="mobile-timeline-line position-absolute bg-secondary"
              style={{
                width: '2px',
                height: 'calc(100% - 80px)', // Adjust height to account for welcome button
                left: '30px',
                top: '0',
                zIndex: 1
              }}
            ></div>

            {timelineData.map((item, idx) => (
              <div key={idx} className="d-flex mb-4 position-relative" style={{ paddingLeft: '0' }}>
                {/* Timeline Dot */}
                <div
                  className="position-absolute bg-primary rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    left: '24px',
                    top: '20px',
                    zIndex: 2
                  }}
                ></div>

                {/* Image */}
                <div className="flex-shrink-0 me-3 mobile-image-container" style={{ marginLeft: '60px' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-circle border border-3 border-white shadow"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <h6 className="fw-bold text-primary mb-1" style={{ fontSize: '0.95rem' }}>
                    {item.period}
                  </h6>
                  <h6 className="fw-semibold mb-2" style={{ fontSize: '1.1rem' }}>
                    {item.title}
                  </h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Mobile Welcome Aboard - Aligned with timeline */}
            <div className="d-flex align-items-center mt-4 mobile-welcome-container">
              {/* Final Timeline Dot */}
              <div
                className="position-absolute bg-primary rounded-circle"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '24px',
                  zIndex: 2
                }}
              ></div>

              {/* Welcome Button aligned with content */}
              <div style={{ marginLeft: '60px' }}>
                <div
                  className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle border border-4 border-white shadow fw-bold"
                  style={{
                    width: 'clamp(80px, 20vw, 100px)',
                    height: 'clamp(80px, 20vw, 100px)',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                    lineHeight: '1.2',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  Lets<br />Learn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile-First CSS */}
      <style>{`
        /* Base Mobile Styles */
        .timeline-wrapper {
          width: 100%;
          overflow: hidden;
        }

        /* Mobile Specific Fixes */
        @media (max-width: 991.98px) {
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .timeline-wrapper {
            padding-left: 0;
            margin-left: 0;
          }
          
          /* Ensure content doesn't overflow */
          .flex-grow-1 {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }

          /* Mobile Welcome Button Positioning */
          .mobile-welcome-container {
            position: relative;
            padding-left: 0;
          }
        }

        /* Small Mobile Devices */
        @media (max-width: 575.98px) {
          .container {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .d-flex.mb-4 {
            margin-bottom: 2rem !important;
          }
          
          .mobile-image-container {
            margin-left: 50px !important;
            margin-right: 0.75rem !important;
          }
          
          .mobile-timeline-line {
            left: 25px !important;
          }
          
          .position-absolute.bg-primary {
            left: 19px !important;
          }

          /* Adjust welcome button for small screens */
          .mobile-welcome-container > div {
            margin-left: 50px !important;
          }

          .mobile-welcome-container .position-absolute {
            left: 19px !important;
          }
        }

        /* Tablet Adjustments */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .mobile-image-container {
            margin-left: 70px;
            margin-right: 1.5rem;
          }
          
          .mobile-image-container img {
            width: 70px !important;
            height: 70px !important;
          }

          .mobile-welcome-container > div {
            margin-left: 70px;
          }
        }

        /* Hover Effects for Interactive Elements */
        .rounded-circle {
          transition: transform 0.3s ease;
        }
        
        .rounded-circle:hover {
          transform: scale(1.05);
        }

        /* Welcome button hover effect */
        .bg-primary.rounded-circle {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bg-primary.rounded-circle:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
        }

        /* Ensure proper spacing and alignment */
        .d-flex.mb-4 {
          align-items: flex-start;
        }
        
        /* Fix any potential Bootstrap conflicts */
        .timeline-wrapper .row {
          margin-left: 0;
          margin-right: 0;
        }
        
        .timeline-wrapper [class*="col-"] {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

        /* Mobile timeline line height adjustment */
        @media (max-width: 991.98px) {
          .mobile-timeline-line {
            height: calc(100% - 60px) !important;
          }
        }
      `}</style>
    </div>
  );
}

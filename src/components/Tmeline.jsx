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
    <div style={{background: "#f5f5f5", paddingTop:'1rem' , paddingBottom:'1rem'}}>
      <div className="container" style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
        {/* Header */}
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold">Advantages of Corporate Training</h2>
            <h5 className="text-secondary fw-normal fst-italic mt-3">
              Discover how training transforms your organization
            </h5>
          </div>
        </div>

        {/* Timeline */}
        <div className="position-relative">
          {/* Vertical Line */}
          <div 
            className="position-absolute top-0 start-50 translate-middle-x bg-secondary"
            style={{
              width: '3px',
              height: '100%',
              zIndex: 1
            }}
          ></div>

          {timelineData.map((item, idx) => (
            <div key={idx} className="row mb-5 position-relative">
              {item.side === "left" ? (
                <>
                  {/* Left Content */}
                  <div className="col-md-5 offset-md-0 text-md-end d-flex flex-column justify-content-center">
                    <div className="pe-md-4">
                      <h5 className="fw-bold text-primary mb-2">{item.period}</h5>
                      <h5 className="fw-semibold mb-3">{item.title}</h5>
                      <p className="text-muted mb-0">{item.desc}</p>
                    </div>
                  </div>
                  {/* Center Image */}
                  <div className="col-md-2 text-center position-relative">
                    <div className="position-relative d-inline-block">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="rounded-circle border border-4 border-dark-subtle"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          position: 'relative',
                          zIndex: 2
                        }}
                      />
                    </div>
                  </div>
                  {/* Right Spacer */}
                  <div className="col-md-5"></div>
                </>
              ) : (
                <>
                  {/* Left Spacer */}
                  <div className="col-md-5"></div>
                  {/* Center Image */}
                  <div className="col-md-2 text-center position-relative">
                    <div className="position-relative d-inline-block">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="rounded-circle border border-4 border-dark-subtle"
                        style={{
                          width: '80px',
                          height: '80px', 
                          objectFit: 'cover',
                          position: 'relative',
                          zIndex: 2
                        }}
                      />
                    </div>
                  </div>
                  {/* Right Content */}
                  <div className="col-md-5 d-flex flex-column justify-content-center">
                    <div className="ps-md-4">
                      <h5 className="fw-bold text-primary mb-2">{item.period}</h5>
                      <h5 className="fw-semibold mb-3">{item.title}</h5>
                      <p className="text-muted mb-0">{item.desc}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Final Circle - "Welcome Aboard" */}
          <div className="row">
            <div className="col-12 text-center">
              <div 
                className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle border border-4 border-dark-subtle fw-bold"
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '1.1rem',
                  lineHeight: '1.2',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                Welcome<br/>Aboard
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for responsive behavior */}
      <style>{`
        @media (max-width: 767px) {
          .position-absolute.start-50 {
            left: 60px !important;
            transform: none !important;
          }
          .col-md-5.offset-md-0 {
            margin-left: 100px;
          }
          .col-md-5:not(.offset-md-0) {
            margin-left: 100px;
          }
          .col-md-2 {
            position: absolute;
            left: 20px;
            width: auto;
          }
          .text-md-end {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}

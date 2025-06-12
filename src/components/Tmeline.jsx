import React from "react";
import { motion } from "framer-motion";

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

// Animation variants for different elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const leftSlideVariants = {
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const rightSlideVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const welcomeVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  }
};

export default function CorporateTrainingTimeline() {
  return (
    <div style={{ background: "#f5f5f5", padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', padding: '0 1rem' }}>
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="fw-bold mb-3" 
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            variants={itemVariants}
          >
            Advantages of Corporate Training
          </motion.h2>
          <motion.h5 
            className="text-secondary fw-normal fst-italic" 
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
            variants={itemVariants}
          >
            Discover how training transforms your organization
          </motion.h5>
        </motion.div>

        {/* Timeline Container */}
        <div className="timeline-wrapper position-relative">
          {/* Desktop Timeline */}
          <div className="d-none d-lg-block">
            {/* Animated Vertical Line for Desktop */}
            <motion.div
              className="position-absolute top-0 start-50 translate-middle-x bg-secondary"
              style={{
                width: '3px',
                height: '100%',
                zIndex: 1
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            ></motion.div>

            {timelineData.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="row mb-5 position-relative align-items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.2 }}
              >
                {item.side === "left" ? (
                  <>
                    <motion.div 
                      className="col-5 text-end pe-4"
                      variants={leftSlideVariants}
                    >
                      <motion.h5 
                        className="fw-bold text-primary mb-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        {item.period}
                      </motion.h5>
                      <motion.h5 
                        className="fw-semibold mb-3"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                      >
                        {item.title}
                      </motion.h5>
                      <motion.p 
                        className="text-muted mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.4 }}
                      >
                        {item.desc}
                      </motion.p>
                    </motion.div>
                    <motion.div 
                      className="col-2 text-center"
                      variants={imageVariants}
                    >
                      <motion.img
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
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </motion.div>
                    <div className="col-5"></div>
                  </>
                ) : (
                  <>
                    <div className="col-5"></div>
                    <motion.div 
                      className="col-2 text-center"
                      variants={imageVariants}
                    >
                      <motion.img
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
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: -5,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </motion.div>
                    <motion.div 
                      className="col-5 ps-4"
                      variants={rightSlideVariants}
                    >
                      <motion.h5 
                        className="fw-bold text-primary mb-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        {item.period}
                      </motion.h5>
                      <motion.h5 
                        className="fw-semibold mb-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                      >
                        {item.title}
                      </motion.h5>
                      <motion.p 
                        className="text-muted mb-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.4 }}
                      >
                        {item.desc}
                      </motion.p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}

            {/* Desktop Welcome Aboard - Centered with Animation */}
            <motion.div 
              className="text-center mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={welcomeVariants}
            >
              <motion.div
                className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle border border-4 border-white shadow fw-bold"
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '1.5rem',
                  lineHeight: '1.2',
                  position: 'relative',
                  zIndex: 2
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                Lets<br />Learn
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Timeline - Simplified Single Column */}
          <div className="d-lg-none">
            {/* Mobile Timeline Line with Animation */}
            <motion.div
              className="mobile-timeline-line position-absolute bg-secondary"
              style={{
                width: '2px',
                height: 'calc(100% - 80px)',
                left: '30px',
                top: '0',
                zIndex: 1,
                transformOrigin: "top"
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            ></motion.div>

            {timelineData.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="d-flex mb-4 position-relative" 
                style={{ paddingLeft: '0' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.15 }}
              >
                {/* Animated Timeline Dot */}
                <motion.div
                  className="position-absolute bg-primary rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    left: '24px',
                    top: '20px',
                    zIndex: 2
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                ></motion.div>

                {/* Animated Image */}
                <motion.div 
                  className="flex-shrink-0 me-3 mobile-image-container" 
                  style={{ marginLeft: '60px' }}
                  variants={imageVariants}
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="rounded-circle border border-3 border-white shadow"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>

                {/* Animated Content */}
                <motion.div 
                  className="flex-grow-1" 
                  style={{ minWidth: 0 }}
                  variants={rightSlideVariants}
                >
                  <motion.h6 
                    className="fw-bold text-primary mb-1" 
                    style={{ fontSize: '0.95rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {item.period}
                  </motion.h6>
                  <motion.h6 
                    className="fw-semibold mb-2" 
                    style={{ fontSize: '1.1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.1 }}
                  >
                    {item.title}
                  </motion.h6>
                  <motion.p 
                    className="text-muted mb-0" 
                    style={{ fontSize: '0.9rem', lineHeight: '1.5' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}

            {/* Mobile Welcome Aboard with Animation */}
            <motion.div 
              className="d-flex align-items-center mt-4 mobile-welcome-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={welcomeVariants}
            >
              {/* Final Timeline Dot */}
              <motion.div
                className="position-absolute bg-primary rounded-circle"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '24px',
                  zIndex: 2
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
              ></motion.div>

              {/* Welcome Button aligned with content */}
              <div style={{ marginLeft: '60px' }}>
                <motion.div
                  className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle border border-4 border-white shadow fw-bold"
                  style={{
                    width: 'clamp(80px, 20vw, 100px)',
                    height: 'clamp(80px, 20vw, 100px)',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                    lineHeight: '1.2',
                    position: 'relative',
                    zIndex: 2
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  Lets<br />Learn
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile-First CSS with Animation Support */}
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

        /* Enhanced Hover Effects for Interactive Elements */
        .rounded-circle {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .rounded-circle:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Welcome button enhanced hover effect */
        .bg-primary.rounded-circle {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bg-primary.rounded-circle:hover {
          box-shadow: 0 10px 30px rgba(13, 110, 253, 0.4);
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

        /* Smooth scrolling for better animation experience */
        html {
          scroll-behavior: smooth;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

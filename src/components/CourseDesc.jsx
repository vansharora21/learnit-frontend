import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiDownload, FiMonitor, FiFileText, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CertificateSection from './Certificate';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// CourseDropdown (unchanged)
const CourseDropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '10px', overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', padding: '15px', backgroundColor: '#f9f9f9', border: 'none', textAlign: 'left', fontSize: '16px',
          fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}
      >
        <span style={{ fontWeight: '500', color: '#333' }}>{title}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div style={{ padding: '15px' }}>{children}</div>}
    </div>
  );
};

// FAQItem (accordion)
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ borderBottom: '1px solid #ddd', padding: '12px ', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', fontSize: '16px', color: '#333' }}>
        {question}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && (
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#555', lineHeight: '1.4' }}>
          {answer}
        </div>
      )}
    </div>
  );
};

// FAQsSection (accordion)
const FAQsSectionIntegrated = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const [faqs, setFaqs] = useState([]);
  console.log(courseId)

  const getFaqGet = async () => {
    try {
      const response = await axios.get(`https://api.learnitfy.com/api/faq/get?courseId=${courseId}`);
      console.log("API response message:", response.data.message);
      setFaqs(response.data.faqOfCourse?.[0]?.faq || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error.message);
    }
  };

  useEffect(() => {
    if (courseId) {
      getFaqGet();
    }
  }, [courseId]);

  return (
    <div style={{ padding: '20px 0' }}>
      <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#222' }}>FAQs</h4>
      <div style={{ borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', maxWidth: '700px' }}>
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

// AboutSection
const AboutSection = () => {
  const [courseNotes, setCourseNotes] = useState([]);

  const aboutAPICall = async () => {
    try {
      const response = await axios.get(
        'https://api.learnitfy.com/api/admin/get/courses?courseId=CI93914177'
      );
      const notes = response.data?.data?.coursesList || [];
      setCourseNotes(Array.isArray(notes) ? notes : []);
    } catch (error) {
      console.error('API call error:', error);
      setCourseNotes([]); // fallback in case of error
    }
  };

  useEffect(() => {
    aboutAPICall();
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <h4
        style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '15px',
          color: '#222',
        }}
      >
        About this combo
      </h4>
      <div
        style={{
          fontSize: '15px',
          color: '#444',
          lineHeight: '1.5',
          marginBottom: '15px',
          maxWidth: '600px',
        }}
      >
        {Array.isArray(courseNotes) &&
          courseNotes.map((course, index) => {
            const notes = course.notes || {};
            return (
              <ul key={index}>
                {Object.keys(notes).map((key) => (
                  <li key={key}>{notes[key]}</li>
                ))}
              </ul>
            );
          })}
      </div>
    </div>
  );
};


// TabbedSection (About/FAQs)
const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState('About');
  const tabs = ['About', 'FAQs'];
  return (
    <div style={{ maxWidth: '800px', marginTop: '40px' }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '12px 0', border: 'none',
              borderBottom: activeTab === tab ? '3px solid #26A9E0' : '3px solid transparent',
              backgroundColor: 'transparent', fontWeight: activeTab === tab ? '700' : '500',
              fontSize: '16px', cursor: 'pointer', color: activeTab === tab ? '#26A9E0' : '#555',
              transition: 'color 0.3s, border-bottom 0.3s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'About' && <AboutSection />}
        {activeTab === 'FAQs' && <FAQsSectionIntegrated />}
      </div>
    </div>
  );
};

const CourseDescription = () => {
  // For sidebar forms
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [courseInquiry, setCourseInquiry] = useState('');
  const formRef = useRef(null);
  const brochureFormRef = useRef(null);
  const courseContentRef = useRef(null);

  // For pricing card dropdown
  const [isEnrollDropdownOpen, setIsEnrollDropdownOpen] = useState(false);
  const [enrollName, setEnrollName] = useState('');
  const [enrollMobile, setEnrollMobile] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollInquiry, setEnrollInquiry] = useState('');
  const [courseDataList, setCourseDataList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [moreCourseContent, setMoreCourseContent] = useState();


  // const mapobjet = moreCourseContent.Activities;

  console.log("moreCourseContentmoreCourseContent----------", moreCourseContent)

  const { title } = useParams();
  const location = useLocation();
  // console.log("-=-=-=-==--==--=courseDataList-=-=-=-=-=-=", location.state);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setCourseDataList(location.state.courseContent || []);
    }
  }, [location.state]);

  const courseName = location.state.courseName;
  const CourseDescription = location.state.description;
  const courseContent = location.state.courseContent;
  const SelecyedCourseId = location.state.courseId;
  const courseSelectImage = location.state.image;
  const courseModel = location.state.courseContent;
  const courseID = location.state.courseId;

  const moreContent = async () => {
    try {
      const response = await axios.get(
        'https://api.learnitfy.com/api/admin/get/courses?courseId=CI93914177'
      );
      const notes = response.data?.data?.coursesList || [];
      console.log('API notes value:', notes);
      setMoreCourseContent(notes[0].moreAboutCourse || []);
    } catch (error) {
      console.error('API call error:', error);
      setMoreCourseContent([]);
    }
  };

  useEffect(() => {
    moreContent()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
      if (brochureFormRef.current && !brochureFormRef.current.contains(event.target)) {
        setIsBrochureFormOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef, brochureFormRef]);

  const scrollToCourseContent = (e) => {
    e.preventDefault();
    if (courseContentRef.current) {
      courseContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.learnitfy.com/api/user/enroll', {
        name: fullName,
        mobile: mobile,
        email: email,
        courseId: SelecyedCourseId,
        inquiry: courseInquiry,
      });
      alert(`Enrollment successful! Response: ${response.data.message}`);
      setEmail('');
      setFullName('');
      setMobile('');
      setCourseInquiry('');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error enrolling:', error.response ? error.response.data : error.message);
      alert('There was an error enrolling. Please try again later.');
    }
  };

  const handleBrochureRequest = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://api.learnitfy.com/api/user/send/brochure", {
        courseId: SelecyedCourseId,
        email: brochureEmail,
      });
      alert(`Brochure will be sent to: ${brochureEmail}`);
      setBrochureEmail('');
      setIsBrochureFormOpen(false);
      console.log("here is the send data brochure:", response);
    } catch (error) {
      console.error('Error sending brochure:', error.response ? error.response.data : error.message);
      alert('There was an error sending the brochure. Please try again later.');
    }
  };

  // Example courses data (use your real data here)
  const courses = {
    "sitecore-content-management-training-certification-course": {
      title: "Sitecore Content Management Training",
      description: "Are you ready to take your skills to the next level? Join our transformative course and embark on a journey of personal and professional growth like never before.",
      rating: 4.8,
      reviews: 132,
      tutor: "Sarah Doe",
      hours: 16,
      price: "23,940.00",
      modules: [
        "Module 1 - About Content Hub / Exploring your sandbox",
        "Module 2 - Assets and Their Lifecycle",
        "Module 3 - Content Hub Schema and Architecture",
        "Module 4 - Fulfilling the Requirements: Adding New Properties",
        "Module 5 - Taxonomies and Categorization",
        "Module 6 - Introduction to Security",
        "Module 7 - Introduction to Scripting"
      ],
      moduleContents: [
        "Learn about Content Hub basics and explore the sandbox environment.",
        "Understand asset management and lifecycle stages in Sitecore.",
        "Deep dive into Content Hub schema and architecture principles.",
        "Learn how to add custom properties to fulfill business requirements.",
        "Master taxonomy creation and content categorization strategies.",
        "Understand security models and user permission management.",
        "Introduction to basic scripting for automation in Content Hub."
      ],
      includes: [
        { icon: "hours", text: "16+ hours video" },
        { icon: "modules", text: "7+ Modules" },
        { icon: "activities", text: "50+ activities" },
        { icon: "resources", text: "100+ downloadable resources" },
        { icon: "access", text: "Lifetime access" },
        { icon: "certificate", text: "Certificate of completion" }
      ]
    },
  };

  const defaultCourse = {
    title: "Sitecore Training Certification Course",
    description: "Master the leading digital experience platform with our comprehensive Sitecore training. This program combines theory, labs, assignments, and projects to make you an expert in building cutting-edge content management solutions.",
    rating: 4.7,
    reviews: 132,
    tutor: "Sarah Doe",
    hours: 20,
    price: "65,940.00",
    modules: [
      "Module 1 - Sitecore Fundamentals",
      "Module 2 - Templates in Sitecore",
      "Module 3 - Layout and sub-layouts",
      "Module 4 - Items in Sitecore",
      "Module 5 - Working with Items",
      "Module 6 - Data Validation"
    ],
    moduleContents: [
      "Introduction to Sitecore platform and core concepts.",
      "Learn how to create and manage templates in Sitecore.",
      "Master layout and sub-layout implementation techniques.",
      "Understanding items and their properties in Sitecore.",
      "Advanced item management and manipulation strategies.",
      "Implementing data validation in Sitecore forms and fields."
    ],
    includes: [
      { icon: "hours", text: "20+ hours video" },
      { icon: "modules", text: "25+ Modules" },
      { icon: "activities", text: "50+ activities" },
      { icon: "resources", text: "100+ downloadable resources" },
      { icon: "access", text: "Lifetime access" },
      { icon: "certificate", text: "Certificate of completion" }
    ]
  };

  const courseData = courses[title] || defaultCourse;

  useEffect(() => {
    setCourseInquiry(courseData.title);
    setEnrollInquiry(courseData.title);
  }, [courseData.title]);

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'hours': return <FiClock />;
      case 'modules': return <FiMonitor />;
      case 'activities': return <FiFileText />;
      case 'resources': return <FiDownload />;
      case 'access': return <FiClock />;
      case 'certificate': return <FiAward />;
      default: return <FiClock />;
    }
  };

  // Pricing section Enroll Now form submit
  const handlePricingEnrollSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.learnitfy.com/api/user/enroll', {
        name: enrollName,
        mobile: enrollMobile,
        email: enrollEmail,
        inquiry: enrollInquiry,
      });

      alert(`Enrollment successful! Response: ${response.data.message}`);

      setEnrollName('');
      setEnrollMobile('');
      setEnrollEmail('');
      setIsEnrollDropdownOpen(false);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('There was an error enrolling. Please try again later.');
    }
  };

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#26A9E0',
        color: 'white',
        padding: '30px 20px 40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ flex: '1 1 500px', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: 'normal' }}>{courseName}</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', opacity: '0.9' }}>{CourseDescription}</p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={scrollToCourseContent}
              style={{
                backgroundColor: '#FBB03B',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px'
              }}
            >
              View Syllabus
            </button>
          </div>
        </div>
        <div style={{ flex: '0 1 350px' }}>
          <img
            src={courseSelectImage}
            alt="Course Preview"
            style={{ width: '100%', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', height: '200px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', gap: '30px' }}>
        {/* Left Column - About and FAQs */}
        <div style={{ flex: '1 1 650px' }}>
          <TabbedSection />
          <div ref={courseContentRef}>
            <h2 style={{ marginBottom: '20px', fontSize: '22px', color: '#333' }}>Course Content</h2>
            {courseModel.map((model, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fff',
                }}
              >
                <h4
                  onClick={() => toggleDropdown(index)}
                  style={{
                    margin: 0,
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#333',
                    borderBottom: openIndex === index ? '1px solid #eee' : 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                >
                  📘 Course: {model.moduleTitle}
                </h4>
                {openIndex === index && (
                  <div
                    style={{
                      padding: '16px',
                      fontSize: '14px',
                      color: '#ff8800',
                      backgroundColor: '#fffaf0',
                      borderTop: '1px solid #eee',
                    }}
                  >
                    📖 Description: {model.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Updated Training Cards Section */}
          <div style={{
            display: 'flex',
            gap: '16px',
            margin: '40px 0',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}>
            {/* Live Virtual Training Card */}
            <div style={{
              flex: '1 1 320px',
              minWidth: '320px',
              background: 'linear-gradient(135deg, #FFA726 0%, #FF8F00 100%)',
              borderRadius: '16px',
              padding: '32px 28px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  letterSpacing: '0.5px',
                  lineHeight: '1.2'
                }}>
                  Structured Online Learning Program
                </h3>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Certification Upon Completion
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Customized Training Delivery Model
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Flexible Schedule with Peer Interaction
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Dedicated Learning Pathways
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Join Collaborative Group Sessions From Anywhere
                  </div>
                </div>

                <div ref={formRef}>
                  <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: 'white',
                      color: '#FF8F00',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    <span>Enroll Now</span>
                    {isFormOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {isFormOpen && (
                    <div style={{
                      marginTop: '10px',
                      padding: '15px',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '15px' }}>
                          <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                            Full Name:
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            required
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                            Email Address:
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your-email@example.com"
                            required
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <label htmlFor="mobile" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                            Mobile Number:
                          </label>
                          <input
                            type="tel"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="+91 9876543210"
                            required
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <label htmlFor="courseInquiry" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                            Inquiry About:
                          </label>
                          <input
                            type="text"
                            id="courseInquiry"
                            value={courseName}
                            onChange={(e) => setCourseInquiry(e.target.value)}
                            placeholder={courseData.title}
                            required
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            border: 'none',
                            padding: '15px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            alignSelf: 'flex-start'
                          }}
                        >
                          Submit Inquiry
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Onsite Classroom Training Card */}
            <div style={{
              flex: '1 1 320px',
              minWidth: '320px',
              background: 'linear-gradient(135deg, #29B6F6 0%, #1976D2 100%)',
              borderRadius: '16px',
              padding: '32px 28px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  letterSpacing: '0.5px',
                  lineHeight: '1.2'
                }}>
                  Team-Based Corporate Upskilling
                </h3>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Structured & Tailored Learning Experience
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Enhanced Interaction and Collaboration
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Hands-On Practical Learning
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Immediate Feedback and Clarification
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                    Peer-to-peer Learning
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    backgroundColor: 'white',
                    color: '#1976D2',
                    fontWeight: '600',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Course Details */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '30px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>This course includes:</h3>
            <ul className="list-group mb-4">
              {moreCourseContent &&
                Object.entries(moreCourseContent).map(([key, value]) => (
                  <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-capitalize fw-semibold">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="badge bg-primary rounded-pill">{value}</span>
                  </li>
                ))}
            </ul>
            {/* Brochure Request Dropdown */}
            <div ref={brochureFormRef} style={{ marginTop: '20px', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
              <button
                onClick={() => setIsBrochureFormOpen(!isBrochureFormOpen)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: '#26A9E0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}
              >
                <span>Course Brochure</span>
                {isBrochureFormOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isBrochureFormOpen && (
                <div style={{ padding: '15px', backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '15px' }}>
                  <p style={{ marginBottom: '15px', color: '#555', fontSize: '14px' }}>
                    Enter your email address to receive the course brochure.
                  </p>
                  <form onSubmit={handleBrochureRequest} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="brochureEmail" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                        Email Address:
                      </label>
                      <input
                        type="email"
                        id="brochureEmail"
                        value={brochureEmail}
                        onChange={(e) => setBrochureEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        alignSelf: 'flex-start'
                      }}
                    >
                      Send Brochure
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CertificateSection />
    </div>
  );
};

export default CourseDescription;

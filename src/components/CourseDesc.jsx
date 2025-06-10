import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiClock, FiDownload, FiMonitor, FiFileText, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CertificateSection from './Certificate';
import axios from 'axios';

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
  const faqs = [
    {
      question: 'What is included in this combo product?',
      answer: 'The product consists of a test series, which would be accessible for a fixed duration, as well as physical notes, which will be delivered to your door if the title and components of the purchased product include physical notes.',
    },
    {
      question: 'Am I eligible for physical notes?',
      answer: 'Please check the description of the combo to check the eligibility of physical notes.',
    },
    {
      question: 'How long will it take to receive the physical notes?',
      answer: 'This is applicable only if the purchased product contains physical notes. After sharing the address, the books will be dispatched within 72 hours, post that it will take 5 to 7 working days for the order to be delivered depending upon the delivery partner & service area.',
    },
    {
      question: 'Can I track the delivery of the physical notes?',
      answer: 'This is applicable only if the purchased product contains physical notes. Yes, you can track the status of the delivery in real-time on the Unacademy platform.',
    },
    {
      question: 'Can I purchase the components separately?',
      answer: 'No, the components cannot be purchased separately. In certain cases, the test series will be available separately as well.',
    },
  ];
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
  const [readMore, setReadMore] = useState(false);
  const bulletPoints = [
    '650+ Live interactive lectures',
    '14 Minor & 4 Major full length tests',
    'ELP & QFT solving masterclass',
    'Small Group Learning: Rank-Producing Educators in small personalized batches (1:150)',
    '2 Way Interactions Enabled: 2-Way Interactive Video Classes for Real-Time Doubt Solving',
    'Mentorship Unlimited: Complete Access to Plus & Iconic with Unlimited Mentorship',
    'Learn, Revise & Practice: Physical QFT100, Flashcards & Access to Physical Notes...',
  ];
  return (
    <div style={{ padding: '20px 0' }}>
      <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#222' }}>About this combo</h4>
      <div style={{ fontSize: '15px', color: '#444', lineHeight: '1.5', marginBottom: '15px', maxWidth: '600px' }}>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {(readMore ? bulletPoints : bulletPoints.slice(0, 5)).map((point, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{point}</li>
          ))}
        </ul>
        <span
          onClick={() => setReadMore(!readMore)}
          style={{ color: '#26A9E0', cursor: 'pointer', fontWeight: '600', userSelect: 'none' }}
        >
          {readMore ? 'Read less' : 'Read more'}
        </span>
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
  const { title } = useParams();

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
    courseContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://15.206.189.17:4000/api/user/enroll', {
        name: fullName,
        mobile: mobile,
        email: email,
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
      const response = await axios.post("http://15.206.189.17:4000/api/user/send/brochure", {
        email: brochureEmail,
      });
      alert(`Brochure will be sent to: ${brochureEmail}`);
      setBrochureEmail('');
      setIsBrochureFormOpen(false);
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
    // ... (add other courses as needed)
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
      const response = await axios.post('http://15.206.189.17:4000/api/user/enroll', {
        name: enrollName,
        mobile: enrollMobile,
        email: enrollEmail,
        inquiry: enrollInquiry,
      });

      // Handle the response as needed
      alert(`Enrollment successful! Response: ${response.data.message}`);
      
      // Reset form fields
      setEnrollName('');
      setEnrollMobile('');
      setEnrollEmail('');
      setIsEnrollDropdownOpen(false);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('There was an error enrolling. Please try again later.');
    }
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
          <h1 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: 'normal' }}>{courseData.title}</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', opacity: '0.9' }}>{courseData.description}</p>
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
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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
            {courseData.modules && courseData.modules.map((module, index) => (
              <CourseDropdown key={index} title={module}>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {courseData.moduleContents && courseData.moduleContents[index] ?
                    courseData.moduleContents[index] :
                    `Content for ${module} goes here. This includes detailed lessons, practical exercises, quizzes, and downloadable resources to help you master this topic.`
                  }
                </p>
              </CourseDropdown>
            ))}
          </div>

          {/* Pricing & Training Options Section - Under Modules */}
          <div style={{
            display: 'flex',
            gap: '24px',
            margin: '40px 0',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}>
            {/* Online Classroom Program */}
            <div style={{
              flex: '1 1 320px',
              minWidth: '320px',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              background: '#fff',
              padding: '28px 26px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <div style={{ fontWeight: 700, fontSize: '20px', marginBottom: '14px', letterSpacing: '0.5px', color: '#222' }}>
                ONLINE CLASS ROOM PROGRAM
              </div>

              <div style={{ marginBottom: '18px' }}>
                {/* <span style={{
                  background: '#23b26d',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                  padding: '6px 14px',
                  borderRadius: '18px',
                  display: 'inline-block'
                }}>
                  100% Money Back Guarantee
                </span> */}
              </div>
              <ul style={{ listStyle: 'none', paddingBottom:'10px' , margin: 0, fontSize: '15px', color: '#444', marginBottom: '12px' }}>
                <li style={{ marginBottom: '8px' }}>✓ Duration : 40 Hrs</li> {/* APPLY THE API CALL FOR NOW ITS STATIC */}
                <li style={{ marginBottom: '8px' }}>✓ Plus Self Paced</li>
                <li></li>
              </ul>
              {/* Enroll Now Button with dropdown */}
          <div ref={formRef}>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#26A9E0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                      value={courseInquiry}
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
            {/* Corporate Training */}
            <div style={{
              flex: '1 1 320px',
              minWidth: '320px',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              background: '#fff',
              padding: '28px 26px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <div style={{ fontWeight: 700, fontSize: '20px', marginBottom: '18px', letterSpacing: '0.5px', color: '#222' }}>
                CORPORATE TRAINING
              </div>
              <div style={{ textAlign: 'center', marginBottom: '18px', width: '100%' }}>
                <span style={{ fontSize: '38px', color: '#2563eb' }}>👥</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '16px', color: '#222', marginBottom: '22px' }}>
                <li style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#23b26d', marginRight: '7px', fontSize: '18px', verticalAlign: 'middle' }}>✔️</span>
                  Customized Training Delivery Model
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#23b26d', marginRight: '7px', fontSize: '18px', verticalAlign: 'middle' }}>✔️</span>
                  Flexible Training Schedule Options
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#23b26d', marginRight: '7px', fontSize: '18px', verticalAlign: 'middle' }}>✔️</span>
                  Industry Experienced Trainers
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#23b26d', marginRight: '7px', fontSize: '18px', verticalAlign: 'middle' }}>✔️</span>
                  24x7 Support
                </li>
              </ul>
              <button
                style={{
                  width: '100%',
                  padding: '14px 0',
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: 'auto'
                }}
              >
                Contact Us
              </button>
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
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {courseData.includes && courseData.includes.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#555', fontSize: '14px' }}>
                  <span style={{ marginRight: '10px', color: '#555' }}>{getIcon(item.icon)}</span>
                  {item.text}
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
                <span> Course Brochure</span>
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

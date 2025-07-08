import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiClock, FiDownload, FiMonitor, FiFileText, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CertificateSection from './Certificate';
import axios from 'axios';
import { Helmet } from 'react-helmet';

// FAQItem (accordion)
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="faq-item"
      style={{ 
        borderBottom: '1px solid #ddd', 
        padding: '12px', 
        cursor: 'pointer'
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="faq-question" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontWeight: '600', 
        fontSize: '16px', 
        color: '#333'
      }}>
        {question}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && (
        <div className="faq-answer" style={{ 
          marginTop: '8px', 
          fontSize: '14px', 
          color: '#555', 
          lineHeight: '1.4'
        }}>
          <span style={{ fontSize: '20px', color: '#26A9E0', marginRight: '10px' }}>✅ </span>{answer}
        </div>
      )}
    </div>
  );
};

// FAQsSection (accordion)
const FAQsSectionIntegrated = () => {
  const { courseSlug, title } = useParams();
  const location = useLocation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get courseId from location.state or fetch it
  const courseId = location.state?.courseId;

  const getFaqGet = async () => {
    try {
      setLoading(true);
      
      let finalCourseId = courseId;
      
      // If no courseId from location.state, fetch it using slug and title
      if (!finalCourseId) {
        const categoryName = courseSlug.replace(/-/g, ' ');
        const courseTitleFormatted = title.replace(/-/g, ' ');
        
        // First get all courses in the category
        const categoryResponse = await axios.get(
          `https://api.learnitfy.com/api/admin/get/courses?categoryName=${categoryName}`
        );
        
        // Find the specific course by title
        const courseData = categoryResponse.data?.data?.coursesList?.find(course => 
          course.courseName.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
        );
        
        if (courseData?.courseId) {
          finalCourseId = courseData.courseId;
        } else {
          throw new Error('Course not found');
        }
      }
      
      // Fetch FAQs using the courseId
      const response = await axios.get(
        `https://api.learnitfy.com/api/faq/get?courseId=${finalCourseId}`
      );
      setFaqs(response.data.faqOfCourse?.[0]?.faq || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error.message);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqGet();
  }, [courseSlug, title, courseId]);

  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <h4 className="faq-title" style={{ 
        fontSize: '20px', 
        fontWeight: '700', 
        marginBottom: '15px', 
        color: '#222'
      }}>FAQs</h4>
      {faqs.length > 0 ? (
        <div className="faq-container" style={{ 
          borderTop: '1px solid #ddd', 
          borderLeft: '1px solid #ddd', 
          borderRight: '1px solid #ddd', 
          borderRadius: '4px', 
          overflow: 'hidden', 
          maxWidth: '700px'
        }}>
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      ) : (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '4px',
          maxWidth: '700px'
        }}>
          No FAQs available for this course.
        </div>
      )}
    </div>
  );
};

// AboutSection
const AboutSection = () => {
  const { courseSlug, title } = useParams();
  const location = useLocation();
  const [courseNotes, setCourseNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllPoints, setShowAllPoints] = useState(false);
  
  // Get courseId from location.state or fetch it
  const courseId = location.state?.courseId;

  const aboutAPICall = async () => {
    try {
      setLoading(true);
      
      let apiUrl;
      if (courseId) {
        // Use existing courseId if available
        apiUrl = `https://api.learnitfy.com/api/admin/get/courses?courseId=${courseId}`;
      } else {
        // Fetch course data using slug and title
        const categoryName = courseSlug.replace(/-/g, ' ');
        const courseTitleFormatted = title.replace(/-/g, ' ');
        
        // First get all courses in the category
        const categoryResponse = await axios.get(
          `https://api.learnitfy.com/api/admin/get/courses?categoryName=${categoryName}`
        );
        
        // Find the specific course by title
        const courseData = categoryResponse.data?.data?.coursesList?.find(course => 
          course.courseName.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
        );
        
        if (courseData?.courseId) {
          apiUrl = `https://api.learnitfy.com/api/admin/get/courses?courseId=${courseData.courseId}`;
        } else {
          throw new Error('Course not found');
        }
      }
      
      const response = await axios.get(apiUrl);
      const notes = response.data?.data?.coursesList || [];
      setCourseNotes(Array.isArray(notes) ? notes : []);
    } catch (error) {
      console.error('API call error:', error);
      setCourseNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    aboutAPICall();
  }, [courseSlug, title, courseId]);

  // Rest of your AboutSection component remains the same...
  const firstCourse = courseNotes[0];
  const courseDetail = firstCourse?.courseDetail;

  const handleReadLess = () => {
    setShowAllPoints(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div>Loading course details...</div>;
  }

  return (
    <div style={{ padding: '0px 0' }}>
      {courseDetail && (
        <div>
          <h1 className="course-heading" style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '0px',
            color: '#222',
            wordWrap: 'break-word',
            maxWidth: '75ch'
          }}>
            {courseDetail.heading}
          </h1>

          {courseDetail.aboutCourse && (
            <div className="about-course-container" >
              <p className="about-course-text" style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                marginBottom: '20px', 
                color: '#555',
                textAlign:'justify'
              }}>
                {courseDetail.aboutCourse}
              </p>
            </div>
          )}

          {courseDetail.subHeading && (
            <h2 className="course-subheading" style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '15px', 
              color: '#333', 
              maxWidth: "400px"
            }}>
              {courseDetail.subHeading}
            </h2>
          )}
          
          <div style={{ marginTop: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(() => {
                const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                  .map(num => courseDetail[`point${num}`])
                  .filter(Boolean);
                const pointsToShow = showAllPoints ? points : points.slice(0, 3);
                return pointsToShow.map((pointValue, idx) => (
                  <li key={idx} className="course-point-item" style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: '1px', 
                    padding: '8px 0px 0px 20px'
                  }}>
                    <span style={{ 
                      backgroundColor: 'black', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '8px', 
                      height: '8px', 
                      marginTop: '8px', 
                      marginRight: '12px', 
                      flexShrink: 0
                    }}></span>
                    <span className="course-point-text" style={{ 
                      fontSize: '16px', 
                      color: '#333', 
                      lineHeight: '1.5', 
                      flex: 1
                    }}>{pointValue}</span>
                  </li>
                ));
              })()}
            </ul>
            
            {(() => {
              const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                .map(num => courseDetail[`point${num}`])
                .filter(Boolean);
              return !showAllPoints && points.length > 3 ? (
                <button
                  className="read-more-btn"
                  style={{
                    marginTop: '10px',
                    background: '#26A9E0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    marginBottom: '30px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '8px 16px'
                  }}
                  onClick={() => setShowAllPoints(true)}
                >
                  Read More
                </button>
              ) : null;
            })()}
          </div>
          
          {showAllPoints && (
            <>
              <div style={{ marginTop: '20px' }}>
                <h1 className="section-title" style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '15px', 
                  color: '#222'
                }}>
                  Who Should Enroll:
                </h1>
                <ul className="enroll-list" style={{ 
                  listStyleType: 'disc', 
                  paddingLeft: '20px'
                }}>
                  {[1, 2, 3, 4]
                    .map(num => courseDetail.whoShouldEnroll?.[`point${num}`])
                    .filter(Boolean)
                    .map((point, index) => (
                      <li key={index} className="enroll-item" style={{ 
                        marginBottom: '8px', 
                        color: '#222'
                      }}>
                        {point}
                      </li>
                    ))}
                </ul>
              </div>
              
              <div style={{ marginTop: '20px', marginBottom: '80px' }}>
                <h1 className="section-title" style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '15px', 
                  color: '#222'
                }}>
                  Prerequisites:
                </h1>
                <ul className="prerequisites-list" style={{ 
                  listStyleType: 'disc', 
                  paddingLeft: '20px'
                }}>
                  {[1, 2, 3, 4]
                    .map(num => courseDetail.Prerequisites?.[`point${num}`])
                    .filter(Boolean)
                    .map((point, index) => (
                      <li key={index} className="prerequisites-item" style={{ 
                        marginBottom: '8px', 
                        color: '#222'
                      }}>
                        {point}
                      </li>
                    ))}
                </ul>
                
                <button
                  className="read-less-btn"
                  style={{
                    marginTop: '2px',
                    background: '#ee9b00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    marginBottom: '0px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '8px 16px'
                  }}
                  onClick={handleReadLess}
                >
                  Read Less
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// TabbedSection (About/FAQs)
const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState('About');
  const tabs = ['About', 'FAQs'];

  return (
    <div className="tabbed-section" style={{ 
      maxWidth: '800px', 
      marginTop: '40px'
    }}>
      <div className="tab-buttons" style={{ 
        display: 'flex', 
        borderBottom: '2px solid #ddd', 
        marginBottom: '20px'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className="tab-button"
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, 
              padding: '12px 0', 
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #26A9E0' : '3px solid transparent',
              backgroundColor: 'transparent', 
              fontWeight: activeTab === tab ? '700' : '500',
              fontSize: '16px', 
              cursor: 'pointer', 
              color: activeTab === tab ? '#26A9E0' : '#555',
              transition: 'color 0.3s, border-bottom 0.3s'
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

const CourseDescriptionComponent = () => {
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

  const { courseSlug, title } = useParams(); // Get both parameters
  const location = useLocation();
  const navigate = useNavigate();

  // State for course data
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to get data from location.state first, then fetch if needed
  useEffect(() => {
    if (location.state) {
      // Data passed from navigation
      setCourseData(location.state);
      setCourseDataList(location.state.courseContent || []);
      setLoading(false);
    } else {
      // Fetch data based on route parameters
      fetchCourseData();
    }
  }, [courseSlug, title, location.state]);

  const fetchCourseData = async () => {
    try {
      // Convert slug back to readable format
      const categoryName = courseSlug.replace(/-/g, ' ');
      const response = await axios.get(
        `https://api.learnitfy.com/api/admin/get/courses?categoryName=${categoryName}`
      );
      
      // Filter courses by title slug
      const titleFormatted = title.replace(/-/g, ' ');
      const courseData = response.data.data.coursesList.find(course => 
        course.courseName.toLowerCase().replace(/\s+/g, '-') === title
      );
      
      if (courseData) {
        setCourseData(courseData);
        setCourseDataList(courseData.courseContent || []);
      } else {
        navigate(`/${courseSlug}`);
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      navigate(`/${courseSlug}`);
    } finally {
      setLoading(false);
    }
  };
  

  // Extract data with fallback
  const courseName = courseData?.courseName || 'Course Name';
  const CourseDescription = courseData?.description || 'Course Description';
  const SelectedCourseId = courseData?.courseId || '';
  const courseSelectImage = courseData?.image || '';
  const courseModel = courseData?.courseContent || [];
  const courseID = courseData?.courseId || '';
  const metaTag = courseData?.metaTag || 'Course';

  const moreContent = async () => {
    try {
      const response = await axios.get(`https://api.learnitfy.com/api/admin/get/courses?courseId=${courseID}`);
      const notes = response.data?.data?.coursesList || [];
      setMoreCourseContent(notes[0]?.moreAboutCourse);
    } catch (error) {
      console.error('API call error:', error);
      setMoreCourseContent([]);
    }
  };

  useEffect(() => {
    if (courseID) {
      moreContent();
    }
  }, [courseID]);

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

  const scrollToCourseContent = () => {
    const offset = -100;
    const element = courseContentRef.current;
    const top = element.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.learnitfy.com/api/user/enroll', {
        name: fullName,
        mobile: mobile,
        email: email,
        courseId: SelectedCourseId,
        inquiry: courseInquiry,
      });
      alert(`Enrollment successful! for the course ${courseName}`);
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
        courseId: SelectedCourseId,
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

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{metaTag}</title>
        <meta name="description" content={CourseDescription} />
        <meta name="keywords" content={`course, learn, ${courseName}`} />
        <link rel="icon" href="/logo.png" />
      </Helmet>
      
      <style jsx>{`
        /* Enhanced Mobile First Approach - Base styles for mobile */
        .main-container {
          padding: 0 10px;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .header-section {
          background-color: #26A9E0;
          color: white;
          padding: 15px 10px 25px;
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 15px;
          align-items: center;
        }
        
        .header-content {
          flex: 1;
          width: 100%;
          max-width: 100%;
          margin-bottom: 15px;
        }
        
        .header-title {
          font-size: 20px;
          margin-bottom: 12px;
          font-weight: 700;
          line-height: 1.3;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        .header-description {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
          opacity: 0.95;
          word-wrap: break-word;
        }
        
        .header-image {
          width: 100%;
          max-width: 300px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
        }
        
        .view-syllabus-btn {
          background-color: #FBB03B;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          transition: background-color 0.3s ease;
          white-space: nowrap;
        }
        
        .view-syllabus-btn:hover {
          background-color: #e09a2a;
        }
        
        .main-content {
          display: flex;
          flex-direction: column;
          padding: 15px 10px;
          max-width: 1400px;
          margin: 0 auto;
          gap: 20px;
        }
        
        .left-column {
          flex: 1;
          width: 100%;
          order: 1;
        }
        
        .right-column {
          flex: 1;
          width: 100%;
          order: 2;
          padding-top: 0;
        }
        
        .tabbed-section {
          width: 100%;
          max-width: 100%;
          margin-top: 20px;
        }
        
        .tab-buttons {
          display: flex;
          flex-direction: row;
          border-bottom: 2px solid #ddd;
          margin-bottom: 20px;
          width: 100%;
        }
        
        .tab-button {
          flex: 1;
          padding: 12px 8px;
          border: none;
          border-bottom: 3px solid transparent;
          background-color: transparent;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          color: #555;
          transition: all 0.3s ease;
          text-align: center;
          white-space: nowrap;
        }
        
        .tab-button.active {
          border-bottom: 3px solid #26A9E0;
          font-weight: 700;
          color: #26A9E0;
        }
        
        .course-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #222;
          word-wrap: break-word;
          line-height: 1.4;
          hyphens: auto;
        }
        
        .about-course-container {
          width: 100%;
        }
        
        .about-course-text {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #555;
          text-align: justify;
          word-wrap: break-word;
        }
        
        .course-subheading {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
          word-wrap: break-word;
          line-height: 1.4;
        }
        
        .course-point-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          padding: 6px 0px 0px 15px;
        }
        
        .course-point-text {
          font-size: 14px;
          color: #333;
          line-height: 1.5;
          flex: 1;
          word-wrap: break-word;
        }
        
        .read-more-btn, .read-less-btn {
          margin-top: 15px;
          border: none;
          border-radius: 6px;
          margin-bottom: 25px;
          font-weight: bold;
          cursor: pointer;
          padding: 8px 16px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .read-more-btn:hover {
          background: #1e90d0 !important;
        }
        
        .read-less-btn:hover {
          background: #d48806 !important;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #222;
          word-wrap: break-word;
        }
        
        .enroll-list, .prerequisites-list {
          list-style-type: disc;
          padding-left: 20px;
          margin-bottom: 20px;
        }
        
        .enroll-item, .prerequisites-item {
          margin-bottom: 8px;
          color: #222;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }
        
        .faq-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #222;
        }
        
        .faq-container {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
        }
        
        .faq-item {
          border-bottom: 1px solid #ddd;
          padding: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .faq-item:hover {
          background-color: #f8f9fa;
        }
        
        .faq-item:last-child {
          border-bottom: none;
        }
        
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          word-wrap: break-word;
          line-height: 1.4;
        }
        
        .faq-answer {
          margin-top: 10px;
          font-size: 13px;
          color: #555;
          line-height: 1.5;
          word-wrap: break-word;
        }
        
        .training-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 30px 0;
          width: 100%;
        }
        
        .training-card {
          width: 100%;
          background: linear-gradient(135deg, #FFA726 0%, #FF8F00 100%);
          border-radius: 16px;
          padding: 20px;
          color: white;
          position: relative;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .training-card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
          line-height: 1.3;
          word-wrap: break-word;
        }
        
        .training-card-feature {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }
        
        .course-content-item {
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .course-content-header {
          padding: 15px;
          background-color: #f8f9fa;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          transition: background-color 0.2s ease;
          word-wrap: break-word;
          line-height: 1.4;
        }
        
        .course-content-header:hover {
          background-color: #e9ecef;
        }
        
        .course-content-points {
          padding: 15px 20px;
          background-color: #fff;
        }
        
        .course-content-points h6 {
          margin-bottom: 8px;
          font-size: 13px;
          color: #555;
          line-height: 1.4;
          word-wrap: break-word;
        }
        
        .sticky-sidebar {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          background-color: #f9f9f9;
          width: 100%;
        }
        
        .sidebar-title {
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          word-wrap: break-word;
        }
        
        .list-group {
          margin-bottom: 20px;
        }
        
        .list-group-item {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-size: 14px;
          border-radius: 6px !important;
          margin-bottom: 8px;
          padding: 12px;
          word-wrap: break-word;
        }
        
        .list-group-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 12px;
          white-space: nowrap;
        }
        
        .form-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #26A9E0;
          box-shadow: 0 0 0 2px rgba(38, 169, 224, 0.2);
        }
        
        .submit-btn {
          background-color: #ff8c00;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          transition: background-color 0.3s ease;
          width: 100%;
        }
        
        .submit-btn:hover {
          background-color: #e07b00;
        }
        
        /* Small Mobile Styles (320px - 480px) */
        @media (max-width: 480px) {
          .main-container {
            padding: 0 8px;
          }
          
          .header-section {
            padding: 12px 8px 20px;
            gap: 12px;
          }
          
          .header-title {
            font-size: 18px;
            margin-bottom: 10px;
          }
          
          .header-description {
            font-size: 13px;
            margin-bottom: 12px;
          }
          
          .header-image {
            max-width: 280px;
          }
          
          .view-syllabus-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .main-content {
            padding: 12px 8px;
            gap: 15px;
          }
          
          .course-heading {
            font-size: 16px;
          }
          
          .about-course-text {
            font-size: 13px;
          }
          
          .course-subheading {
            font-size: 15px;
          }
          
          .course-point-text {
            font-size: 13px;
          }
          
          .training-card {
            padding: 16px;
            min-height: 280px;
          }
          
          .training-card-title {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .training-card-feature {
            font-size: 13px;
            margin-bottom: 10px;
          }
          
          .course-content-header {
            padding: 12px;
            font-size: 13px;
          }
          
          .course-content-points {
            padding: 12px 16px;
          }
          
          .course-content-points h6 {
            font-size: 12px;
          }
          
          .sticky-sidebar {
            padding: 16px;
          }
          
          .sidebar-title {
            font-size: 16px;
          }
          
          .list-group-item {
            font-size: 13px;
            padding: 10px;
          }
          
          .badge {
            font-size: 10px;
            padding: 3px 6px;
          }
        }
        
        /* Large Mobile / Small Tablet Styles (481px - 767px) */
        @media (min-width: 481px) and (max-width: 767px) {
          .main-container {
            padding: 0 12px;
          }
          
          .header-section {
            padding: 18px 12px 28px;
            gap: 18px;
          }
          
          .header-title {
            font-size: 22px;
          }
          
          .header-description {
            font-size: 15px;
          }
          
          .header-image {
            max-width: 320px;
          }
          
          .view-syllabus-btn {
            padding: 10px 20px;
            font-size: 14px;
          }
          
          .main-content {
            padding: 18px 12px;
          }
          
          .course-heading {
            font-size: 20px;
          }
          
          .about-course-text {
            font-size: 15px;
          }
          
          .course-subheading {
            font-size: 18px;
          }
          
          .course-point-text {
            font-size: 15px;
          }
          
          .training-card-title {
            font-size: 20px;
          }
          
          .training-card-feature {
            font-size: 15px;
          }
        }
        
        /* Tablet Styles (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .main-container {
            padding: 0 20px;
          }
          
          .header-section {
            padding: 25px 20px 35px;
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
            align-items: center;
          }
          
          .header-content {
            flex: 1;
            max-width: 60%;
            margin-bottom: 0;
            padding-right: 20px;
          }
          
          .header-title {
            font-size: 26px;
            text-align: left;
          }
          
          .header-description {
            font-size: 16px;
            text-align: left;
          }
          
          .header-image {
            flex: 0 0 300px;
            max-width: 300px;
            width: 300px;
          }
          
          .view-syllabus-btn {
            padding: 12px 24px;
            font-size: 15px;
          }
          
          .main-content {
            flex-direction: row;
            padding: 25px 20px;
            gap: 30px;
          }
          
          .left-column {
            flex: 2;
            max-width: 65%;
            order: 1;
          }
          
          .right-column {
            flex: 1;
            max-width: 35%;
            order: 2;
            padding-top: 0;
          }
          
          .tabbed-section {
            max-width: 100%;
            margin-top: 30px;
          }
          
          .tab-button {
            font-size: 16px;
            padding: 14px 0;
          }
          
          .course-heading {
            font-size: 24px;
          }
          
          .about-course-text {
            font-size: 16px;
          }
          
          .course-subheading {
            font-size: 20px;
          }
          
          .course-point-item {
            padding: 8px 0px 0px 20px;
          }
          
          .course-point-text {
            font-size: 16px;
          }
          
          .section-title {
            font-size: 22px;
          }
          
          .enroll-item, .prerequisites-item {
            font-size: 15px;
          }
          
          .faq-title {
            font-size: 20px;
          }
          
          .faq-question {
            font-size: 15px;
          }
          
          .faq-answer {
            font-size: 14px;
          }
          
          .training-cards {
            flex-direction: column;
            gap: 25px;
            margin: 40px 0;
          }
          
          .training-card {
            padding: 28px;
            min-height: 320px;
          }
          
          .training-card-title {
            font-size: 22px;
            margin-bottom: 24px;
          }
          
          .training-card-feature {
            font-size: 16px;
            margin-bottom: 14px;
          }
          
          .course-content-header {
            padding: 16px 20px;
            font-size: 16px;
          }
          
          .course-content-points {
            padding: 16px 24px;
          }
          
          .course-content-points h6 {
            font-size: 14px;
          }
          
          .sticky-sidebar {
            position: sticky;
            top: 20px;
            padding: 24px;
          }
          
          .sidebar-title {
            font-size: 20px;
          }
          
          .list-group-item {
            font-size: 15px;
            padding: 14px;
          }
          
          .badge {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
        
        /* Desktop Styles (1024px - 1199px) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .main-container {
            padding: 0 30px;
          }
          
          .header-section {
            padding: 30px 30px 40px;
          }
          
          .header-content {
            max-width: 65%;
          }
          
          .header-title {
            font-size: 28px;
          }
          
          .header-image {
            flex: 0 0 350px;
            max-width: 350px;
            width: 350px;
          }
          
          .main-content {
            padding: 30px;
            gap: 40px;
          }
          
          .left-column {
            max-width: 68%;
          }
          
          .right-column {
            max-width: 32%;
          }
          
          .training-cards {
            flex-direction: row;
            gap: 20px;
          }
          
          .training-card {
            flex: 1;
            min-width: 300px;
            padding: 32px;
            min-height: 350px;
          }
          
          .training-card-title {
            font-size: 24px;
          }
          
          .sticky-sidebar {
            top: 30px;
          }
        }
        
        /* Large Desktop Styles (1200px+) */
        @media (min-width: 1200px) {
          .main-container {
            padding: 0 40px;
          }
          
          .header-section {
            padding: 35px 40px 45px;
          }
          
          .header-title {
            font-size: 32px;
          }
          
          .header-description {
            font-size: 18px;
          }
          
          .main-content {
            padding: 40px;
            gap: 50px;
          }
          
          .left-column {
            max-width: 70%;
          }
          
          .right-column {
            max-width: 30%;
          }
          
          .tabbed-section {
            margin-top: 50px;
          }
          
          .course-heading {
            font-size: 28px;
          }
          
          .about-course-text {
            font-size: 17px;
          }
          
          .course-subheading {
            font-size: 22px;
          }
          
          .section-title {
            font-size: 26px;
          }
          
          .training-cards {
            margin: 50px 0;
            gap: 30px;
          }
          
          .training-card {
            padding: 36px;
            min-height: 380px;
          }
          
          .training-card-title {
            font-size: 26px;
            margin-bottom: 28px;
          }
          
          .training-card-feature {
            font-size: 17px;
            margin-bottom: 16px;
          }
          
          .sticky-sidebar {
            top: 40px;
            padding: 28px;
          }
          
          .sidebar-title {
            font-size: 22px;
          }
          
          .list-group-item {
            font-size: 16px;
            padding: 16px;
          }
          
          .badge {
            font-size: 13px;
            padding: 8px 12px;
          }
        }
        
        /* Ultra Wide Screens (1400px+) */
        @media (min-width: 1400px) {
          .main-container {
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .header-section {
            padding: 40px 50px 50px;
          }
          
          .main-content {
            padding: 50px;
          }
        }
        
        /* Hover and Focus Effects */
        .hover-effect:hover {
          background-color: #f8f9fa;
        }
        
        .training-card .background-pattern-1 {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          z-index: 1;
        }
        
        .training-card .background-pattern-2 {
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          z-index: 1;
        }
        
        .training-card .content {
          position: relative;
          z-index: 2;
        }
        
        /* Accessibility improvements */
        .tab-button:focus,
        .view-syllabus-btn:focus,
        .submit-btn:focus,
        .form-input:focus {
          outline: 2px solid #26A9E0;
          outline-offset: 2px;
        }
        
        /* Print styles */
        @media print {
          .training-cards,
          .sticky-sidebar {
            display: none;
          }
          
          .main-content {
            flex-direction: column;
          }
          
          .left-column {
            max-width: 100%;
          }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .header-image {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
      `}</style>
      
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header Section */}
        <div className="header-section">
          <div className="header-content">
            <h1 className="header-title">
              {courseName}
            </h1>
            <p className="header-description">
              {CourseDescription}
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="view-syllabus-btn"
                onClick={scrollToCourseContent}
              >
                View Syllabus
              </button>
            </div>
          </div>
          <div style={{ flex: '0 1 350px' }}>
            <img
              className="header-image"
              src={courseSelectImage}
              alt="Course Preview"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-container main-content">
          {/* Left Column - About and FAQs */}
          <div className="left-column">
            <TabbedSection />
            <div ref={courseContentRef}>
              <h2 style={{ 
                marginBottom: '20px', 
                fontSize: '22px', 
                color: '#222',
                wordWrap: 'break-word'
              }}>
                Course Content
              </h2>
              {courseModel.map((model, index) => (
                <div
                  key={index}
                  className="course-content-item"
                >
                  <div
                    className="course-content-header"
                    onClick={() => toggleDropdown(index)}
                    style={{
                      backgroundColor: openIndex === index ? '#fff' : '#f8f9fa',
                      borderBottom: openIndex === index ? '1px solid #ddd' : 'none'
                    }}
                  >
                    📘 Lesson {index + 1}: {model.moduleTitle}
                  </div>
                  {openIndex === index && (
                    <div className="course-content-points">
                      {model.points.map((poi, index) => {
                        return (
                          <h6 key={index}>
                            {index + 1}. {poi}
                          </h6>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Updated Training Cards Section */}
            <div className="training-cards">
              {/* Live Virtual Training Card */}
              <div className="training-card">
                {/* Background Pattern */}
                <div className="background-pattern-1"></div>
                <div className="background-pattern-2"></div>

                <div className="content">
                  <h3 className="training-card-title">
                    Structured Online Learning Program
                  </h3>

                  <div style={{ marginBottom: '24px' }}>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Certification Upon Completion
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Customized Training Delivery Model
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Flexible Schedule with Peer Interaction
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Dedicated Learning Pathways
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Join Collaborative Group Sessions From Anywhere
                    </div>
                  </div>

                  <div ref={formRef}>
                    <button
                      onClick={() => setIsFormOpen(!isFormOpen)}
                      style={{
                        width: '100%',
                        padding: '12px',
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
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>Enroll Now</span>
                      {isFormOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {isFormOpen && (
                      <div style={{
                        marginTop: '12px',
                        padding: '16px',
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }}>
                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="fullName" style={{ 
                              display: 'block', 
                              marginBottom: '6px', 
                              fontSize: '14px', 
                              color: '#333',
                              fontWeight: '500'
                            }}>
                              Full Name:
                            </label>
                            <input
                              className="form-input"
                              type="text"
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email" style={{ 
                              display: 'block', 
                              marginBottom: '6px', 
                              fontSize: '14px', 
                              color: '#333',
                              fontWeight: '500'
                            }}>
                              Email Address:
                            </label>
                            <input
                              className="form-input"
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your-email@example.com"
                              required
                            />
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="mobile" style={{ 
                              display: 'block', 
                              marginBottom: '6px', 
                              fontSize: '14px', 
                              color: '#333',
                              fontWeight: '500'
                            }}>
                              Mobile Number:
                            </label>
                            <input
                              className="form-input"
                              type="tel"
                              id="mobile"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="+91 9876543210"
                              required
                            />
                          </div>

                          <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="courseInquiry" style={{ 
                              display: 'block', 
                              marginBottom: '6px', 
                              fontSize: '14px', 
                              color: '#333',
                              fontWeight: '500'
                            }}>
                              Inquiry About:
                            </label>
                            <input
                              className="form-input"
                              type="text"
                              id="courseInquiry"
                              value={courseName}
                              onChange={(e) => setCourseInquiry(e.target.value)}
                              placeholder={courseName}
                              required
                            />
                          </div>

                          <button
                            className="submit-btn"
                            type="submit"
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
              <div className="training-card" style={{
                background: 'linear-gradient(135deg, #29B6F6 0%, #1976D2 100%)'
              }}>
                {/* Background Pattern */}
                <div className="background-pattern-1"></div>
                <div className="background-pattern-2"></div>

                <div className="content">
                  <h3 className="training-card-title">
                    Team-Based Corporate Upskilling
                  </h3>

                  <div style={{ marginBottom: '24px' }}>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Structured & Tailored Learning Experience
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Enhanced Interaction and Collaboration
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Hands-On Practical Learning
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Immediate Feedback and Clarification
                    </div>
                    <div className="training-card-feature">
                      <span style={{ marginRight: '12px', fontSize: '18px' }}>✓</span>
                      Peer-to-peer Learning
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/Contact-Us')}
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
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Course Details */}
          <div className="right-column">
            <div className="sticky-sidebar">
              <h3 className="sidebar-title">
                This course includes:
              </h3>
              <ul className="list-group mb-4">
                {/* Time/Duration */}
                {moreCourseContent?.duration && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3">
                    <span className="fw-semibold d-flex align-items-center">
                      <FiClock className="me-2" /> Duration
                    </span>
                    <span className="badge bg-gradient text-black rounded-pill p-2 shadow-sm" style={{ 
                      background: 'linear-gradient(45deg, #6a11cb, #2575fc)', 
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      {moreCourseContent.duration}
                    </span>
                  </li>
                )}
                {/* Number of Modules */}
                {moreCourseContent?.noOfModules && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect">
                    <span className="text-capitalize fw-semibold text-dark d-flex align-items-center">
                      <FiFileText className="me-2" /> Modules
                    </span>
                    <span className="badge bg-gradient text-white rounded-pill p-2 shadow-sm" style={{ 
                      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)', 
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      {moreCourseContent.noOfModules}
                    </span>
                  </li>
                )}

                {/* Certificate */}
                {moreCourseContent?.certificate && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect">
                    <span className="text-capitalize fw-semibold text-dark d-flex align-items-center">
                      <FiAward className="me-2" /> Certificate
                    </span>
                    <span className="badge bg-gradient text-white rounded-pill p-2 shadow-sm" style={{ 
                      background: 'linear-gradient(45deg, #10ac84, #00d2d3)', 
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      {moreCourseContent.certificate}
                    </span>
                  </li>
                )}

                {/* Access */}
                {moreCourseContent?.access && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect">
                    <span className="text-capitalize fw-semibold text-dark d-flex align-items-center">
                      <FiMonitor className="me-2" /> Access
                    </span>
                    <span className="badge bg-gradient text-white rounded-pill p-2 shadow-sm" style={{ 
                      background: 'linear-gradient(45deg, #a55eea, #26de81)', 
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      {moreCourseContent.access}
                    </span>
                  </li>
                )}

                {/* Downloads */}
                {moreCourseContent?.downloads && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect">
                    <span className="text-capitalize fw-semibold text-dark d-flex align-items-center">
                      <FiDownload className="me-2" /> Downloads
                    </span>
                    <span className="badge bg-gradient text-white rounded-pill p-2 shadow-sm" style={{ 
                      background: 'linear-gradient(45deg, #fd79a8, #fdcb6e)', 
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                      {moreCourseContent.downloads}
                    </span>
                  </li>
                )}
              </ul>

              {/* Brochure Download Section */}
              <div ref={brochureFormRef}>
                <button
                  onClick={() => setIsBrochureFormOpen(!isBrochureFormOpen)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#26A9E0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(38, 169, 224, 0.3)',
                    transition: 'all 0.3s ease',
                    marginBottom: '10px'
                  }}
                >
                  <span>Download Brochure</span>
                  {isBrochureFormOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {isBrochureFormOpen && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <form onSubmit={handleBrochureRequest} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="brochureEmail" style={{ 
                          display: 'block', 
                          marginBottom: '6px', 
                          fontSize: '14px', 
                          color: '#333',
                          fontWeight: '500'
                        }}>
                          Email Address:
                        </label>
                        <input
                          className="form-input"
                          type="email"
                          id="brochureEmail"
                          value={brochureEmail}
                          onChange={(e) => setBrochureEmail(e.target.value)}
                          placeholder="your-email@example.com"
                          required
                        />
                      </div>

                      <button
                        className="submit-btn"
                        type="submit"
                        style={{
                          backgroundColor: '#26A9E0'
                        }}
                      >
                        Send Brochure
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Certificate Section */}
              <div style={{ marginTop: '20px' }}>
                <CertificateSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDescriptionComponent;

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

  // Show error state if no course data
  // if (!courseData) {
  //   return <div>Course not found dfds</div>;
  // }


 

  

  return (
    <>
      <Helmet>
        <title>{metaTag}</title>
        <meta name="description" content={CourseDescription} />
        <meta name="keywords" content={`course, learn, ${courseName}`} />
        <link rel="icon" href="/logo.png" />
      </Helmet>
      
      <style jsx>{`
        /* Mobile First Approach - Base styles for mobile */
        .main-container {
          padding: 0 15px;
        }
        
        .header-section {
          background-color: #26A9E0;
          color: white;
          padding: 20px 10px 30px;
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 20px;
        }
        
        .header-content {
          flex: 1;
          padding-right: 0;
          margin-bottom: 20px;
        }
        
        .header-title {
          font-size: 24px;
          margin-bottom: 15px;
          font-weight: normal;
        }
        
        .header-description {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 20px;
          opacity: 1.5;
        }
        
        .header-image {
          width: 100%;
          max-width: 350px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          height: 235px;
          object-fit: cover;
        }
        
        .view-syllabus-btn {
          background-color: #FBB03B;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        }
        
        .main-content {
          display: flex;
          flex-direction: column;
          padding: 0px 20px;
          max-width: 1200px;
          margin: 0 auto;
          gap: 10px;
        }
        
        .left-column {
          flex: 1;
          margin-bottom: 30px;
        }
        
        .right-column {
          flex: 1;
          padding-top: 0;
        }
        
        .tabbed-section {
          max-width: 100%;
          margin-top: 20px;
        }
        
        .tab-buttons {
          display: flex;
          flex-direction: column;
          border-bottom: 2px solid #ddd;
          margin-bottom: 20px;
        }
        
        .tab-button {
          flex: 1;
          padding: 10px 0;
          border: none;
          border-left: 3px solid transparent;
          background-color: transparent;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          color: #555;
          transition: color 0.3s, border-left 0.3s;
          text-align: left;
          padding-left: 10px;
        }
        
        .tab-button.active {
          border-left: 3px solid #26A9E0;
          font-weight: 700;
          color: #26A9E0;
        }
        
        .course-heading {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 0px;
          color: #222;
          word-wrap: break-word;
          max-width: 100%;
        }
        
        .about-course-container {
          width: 100%;
        }
        
        .about-course-text {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #555;
        }
        
        .course-subheading {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
          max-width: 100%;
        }
        
        .course-point-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1px;
          padding: 8px 0px 0px 10px;
        }
        
        .course-point-text {
          font-size: 14px;
          color: #333;
          line-height: 1.5;
          flex: 1;
        }
        
        .read-more-btn, .read-less-btn {
          margin-top: 10px;
          border: none;
          border-radius: 4px;
          margin-bottom: 30px;
          font-weight: bold;
          cursor: pointer;
          padding: 6px 12px;
          font-size: 14px;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #222;
        }
        
        .enroll-list, .prerequisites-list {
          list-style-type: disc;
          padding-left: 15px;
        }
        
        .enroll-item, .prerequisites-item {
          margin-bottom: 8px;
          color: #222;
          font-size: 14px;
        }
        
        .faq-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #222;
        }
        
        .faq-container {
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
          max-width: 100%;
        }
        
        .faq-item {
          border-bottom: 1px solid #ddd;
          padding: 8px;
          cursor: pointer;
        }
        
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }
        
        .faq-answer {
          margin-top: 8px;
          font-size: 12px;
          color: #555;
          line-height: 1.4;
        }
        
        .training-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 40px 0;
        }
        
        .training-card {
          flex: 1;
          min-width: 100%;
          background: linear-gradient(135deg, #FFA726 0%, #FF8F00 100%);
          border-radius: 16px;
          padding: 24px 20px;
          color: white;
          position: relative;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .training-card-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }
        
        .training-card-feature {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .course-content-item {
          margin-bottom: 8px;
          border-radius: 10px;
          border: 1px solid #ccc;
          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }
        
        .course-content-header {
          padding: 12px 15px;
          background-color: #dee2e6;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          color: #333;
          transition: background 0.2s ease;
        }
        
        .course-content-points {
          padding-left: 15px;
          padding-top: 10px;
          gap: 5px;
        }
        
        .sticky-sidebar {
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          position: relative;
          top: auto;
          padding: 20px;
          margin-bottom: 30px;
          background-color: #f9f9f9;
        }
        
        .sidebar-title {
          margin-bottom: 25px;
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }
        
        .list-group-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-size: 14px;
        }
        
        .list-group-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .badge {
          font-size: 12px;
          padding: 4px 8px;
        }
        
        .form-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .submit-btn {
          background-color: orange;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          align-self: flex-start;
          font-size: 14px;
        }
        
        /* Tablet Styles */
        @media (min-width: 768px) {
          .main-container {
            padding: 0 20px;
          }
          
          .header-section {
            padding: 30px 20px 40px;
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }
          
          .header-content {
            flex: 1 1 500px;
            padding-right: 20px;
            margin-bottom: 0;
          }
          
          .header-title {
            font-size: 28px;
          }
          
          .header-description {
            font-size: 16px;
          }
          
          .header-image {
            flex: 0 1 350px;
            width: 350px;
          }
          
          .view-syllabus-btn {
            padding: 10px 25px;
            font-size: 15px;
          }
          
          .main-content {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .left-column {
            flex: 1 1 650px;
            margin-bottom: 0;
          }
          
          .right-column {
            flex: 1 1 300px;
            padding-top: 11.4rem;
          }
          
          .tabbed-section {
            max-width: 800px;
            margin-top: 40px;
          }
          
          .tab-buttons {
            flex-direction: row;
          }
          
          .tab-button {
            flex: 1;
            padding: 12px 0;
            border-left: none;
            border-bottom: 3px solid transparent;
            text-align: center;
            padding-left: 0;
            font-size: 16px;
          }
          
          .tab-button.active {
            border-left: none;
            border-bottom: 3px solid #26A9E0;
          }
          
          .course-heading {
            font-size: 24px;
            max-width: 75ch;
          }
          
          .about-course-container {
            width: 600px;
          }
          
          .about-course-text {
            font-size: 16px;
          }
          
          .course-subheading {
            font-size: 20px;
            max-width: 400px;
          }
          
          .course-point-item {
            padding: 8px 0px 0px 20px;
          }
          
          .course-point-text {
            font-size: 16px;
          }
          
          .read-more-btn, .read-less-btn {
            padding: 8px 16px;
          }
          
          .section-title {
            font-size: 24px;
          }
          
          .enroll-list, .prerequisites-list {
            padding-left: 20px;
          }
          
          .enroll-item, .prerequisites-item {
            font-size: 16px;
          }
          
          .faq-title {
            font-size: 20px;
          }
          
          .faq-container {
            max-width: 700px;
          }
          
          .faq-item {
            padding: 12px;
          }
          
          .faq-question {
            font-size: 16px;
          }
          
          .faq-answer {
            font-size: 14px;
          }
          
          .training-cards {
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
          
          .training-card {
            flex: 1 1 320px;
            min-width: 320px;
            padding: 32px 28px;
            min-height: 320px;
            margin-bottom: 0;
          }
          
          .training-card-title {
            font-size: 24px;
          }
          
          .training-card-feature {
            font-size: 16px;
          }
          
          .course-content-item {
            margin-bottom: 12px;
          }
          
          .course-content-header {
            padding: 14px 18px;
            font-size: 16px;
          }
          
          .course-content-points {
            padding-left: 20px;
          }
          
          .sticky-sidebar {
            position: sticky;
            top: 100px;
          }
          
          .sidebar-title {
            font-size: 20px;
          }
          
          .list-group-item {
            font-size: 16px;
          }
          
          .badge {
            font-size: 14px;
            padding: 6px 12px;
          }
          
          .form-input {
            padding: 10px;
          }
          
          .submit-btn {
            padding: 15px;
          }
        }
        
        /* Desktop Styles */
        @media (min-width: 1200px) {
          .main-container {
            padding: 0 40px;
          }
        }
        
        /* Hover effects for interactive elements */
        .hover-effect:hover {
          background-color: #f8f9fa;
        }
        
        .course-content-header:hover {
          background-color: #eaeaea;
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
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
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
                marginBottom: '10px', 
                fontSize: '22px', 
                color: '#222'
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
                      backgroundColor: openIndex === index ? '#fff' : '#dee2e6',
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
                            <label htmlFor="fullName" style={{ 
                              display: 'block', 
                              marginBottom: '5px', 
                              fontSize: '14px', 
                              color: '#333' 
                            }}>
                              Full Name:
                            </label>
                            <input
                              className="form-input"
                              type="text"
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Name"
                              required
                            />
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email" style={{ 
                              display: 'block', 
                              marginBottom: '5px', 
                              fontSize: '14px', 
                              color: '#333' 
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
                              marginBottom: '5px', 
                              fontSize: '14px', 
                              color: '#333' 
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

                          <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="courseInquiry" style={{ 
                              display: 'block', 
                              marginBottom: '5px', 
                              fontSize: '14px', 
                              color: '#333' 
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
                    <span className="text-capitalize fw-semibold text-dark">
                      <FiMonitor className="me-2" /> Modules
                    </span>
                    <span
                      className="badge bg-gradient text-black rounded-pill p-2 shadow-sm d-flex align-items-center gap-2"
                      style={{
                        background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      {moreCourseContent.noOfModules}+ Modules
                    </span>
                  </li>
                )}

                {/* Activities */}
                {moreCourseContent?.Activities && (
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect">
                    <span className="text-capitalize fw-semibold text-dark">
                      <FiFileText className="me-2" /> Activities
                    </span>
                    <span
                      className="badge bg-gradient text-black rounded-pill p-2 shadow-sm d-flex align-items-center gap-2"
                      style={{
                        background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      {moreCourseContent.Activities}+ Activities
                    </span>
                  </li>
                )}

                {/* Dynamic rendering for any additional fields */}
                {moreCourseContent &&
                  Object.entries(moreCourseContent)
                    .filter(([key]) => !['duration', 'noOfModules', 'Activities'].includes(key))
                    .map(([key, value], index) => {
                      // Get icon based on key name or use default
                      const getIconForKey = (keyName) => {
                        const lowerKey = keyName.toLowerCase();
                        if (lowerKey.includes('time') || lowerKey.includes('duration')) return FiClock;
                        if (lowerKey.includes('module') || lowerKey.includes('course')) return FiMonitor;
                        if (lowerKey.includes('activity') || lowerKey.includes('exercise')) return FiFileText;
                        if (lowerKey.includes('download') || lowerKey.includes('resource')) return FiDownload;
                        if (lowerKey.includes('certificate') || lowerKey.includes('award')) return FiAward;
                        return FiClock; // Default icon
                      };

                      const Icon = getIconForKey(key);

                      return (
                        <li
                          key={key}
                          className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3 hover-effect"
                        >
                          <span className="text-capitalize fw-semibold text-dark">
                            <Icon className="me-2" /> {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span
                            className="badge bg-gradient text-black rounded-pill p-2 shadow-sm d-flex align-items-center gap-2"
                            style={{
                              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            {value}
                          </span>
                        </li>
                      );
                    })
                }

                {/* Static Lifetime Access */}
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light shadow-sm rounded mb-3">
                  <span className="fw-semibold">
                    <FiClock className="me-2" />Access
                  </span>
                  <span className="badge bg-gradient text-black rounded-pill p-2 shadow-sm" style={{ 
                    background: 'linear-gradient(45deg, #6a11cb, #2575fc)', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    Lifetime access
                  </span>
                </li>
              </ul>

              {/* Brochure Request Dropdown */}
              <div ref={brochureFormRef} style={{ 
                marginTop: '20px', 
                borderTop: '1px solid #e0e0e0', 
                paddingTop: '20px' 
              }}>
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
                  <div style={{ 
                    padding: '15px', 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '4px', 
                    marginBottom: '15px' 
                  }}>
                    <p style={{ 
                      marginBottom: '15px', 
                      color: '#555', 
                      fontSize: '14px'
                    }}>
                      Enter your email address to receive the course brochure.
                    </p>
                    <form onSubmit={handleBrochureRequest} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="brochureEmail" style={{ 
                          display: 'block', 
                          marginBottom: '5px', 
                          fontSize: '14px', 
                          color: '#333' 
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
      </div>
      <CertificateSection />
    </>
  );
};

export default CourseDescriptionComponent;

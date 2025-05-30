import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiClock, FiDownload, FiMonitor, FiFileText, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import FAQSection from './FAQSection';
const CourseDropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            marginBottom: '10px',
            overflow: 'hidden'
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <span style={{ fontWeight: '500', color: '#333' }}>{title}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {isOpen && (
                <div style={{ padding: '15px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

const CourseDescription = () => {
    const { title } = useParams();
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

    // Handle outside clicks to close dropdowns
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

    // Scroll to course content function
    const scrollToCourseContent = (e) => {
        e.preventDefault();
        courseContentRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        alert(`Inquiry received!\nName: ${fullName}\nEmail: ${email}\nMobile: ${mobile}\nInquiry About: ${courseInquiry}`);
        // Here you would typically make an API call to send the inquiry
        setEmail('');
        setFullName('');
        setMobile('');
        setCourseInquiry('');
        setIsFormOpen(false);
    };

    // Handle brochure request
    const handleBrochureRequest = (event) => {
        event.preventDefault();
        alert(`Brochure will be sent to: ${brochureEmail}`);
        // Here you would typically make an API call to send the brochure
        setBrochureEmail('');
        setIsBrochureFormOpen(false);
    };

    // Real Sitecore course data mapping
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
            ],
            leftFeatures: [
                "Learn Sitecore Content Hub architecture",
                "Master Data Asset Management (DAM) system",
                "Understand content lifecycle management",
                "Create and manage taxonomies"
            ],
            rightFeatures: [
                "Configure security and user permissions",
                "Learn basic scripting for automation",
                "Implement enterprise-level requirements",
                "Optimize content workflows"
            ]
        },
        "sitecore-training-certification-course-online": {
            title: "Sitecore Training Certification Course",
            description: "Master the leading digital experience platform with our comprehensive Sitecore training. This program combines theory, labs, assignments, and projects to make you an expert in building cutting-edge content management solutions.",
            rating: 4.5,
            reviews: 44,
            tutor: "John Smith",
            hours: 15,
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
                { icon: "hours", text: "15+ hours video" },
                { icon: "modules", text: "20+ Modules" },
                { icon: "activities", text: "40+ activities" },
                { icon: "resources", text: "80+ downloadable resources" },
                { icon: "access", text: "Lifetime access" },
                { icon: "certificate", text: "Certificate of completion" }
            ],
            leftFeatures: [
                "Gain firm understanding of CMS",
                "Learn to install and configure Sitecore",
                "Work with Sitecore Helix",
                "Understand MVC Visual Studio project"
            ],
            rightFeatures: [
                "Work with marketing functionality",
                "Master data templates and renderings",
                "Understand security components",
                "Learn database management in Sitecore"
            ]
        },
        "sitecore-javascript-services-jss-training-certification-course": {
            title: "Sitecore JavaScript Services (JSS) Training",
            description: "Learn how to build modern, headless Sitecore applications using JavaScript frameworks. This course will teach you everything you need to know about Sitecore JSS.",
            rating: 5.0,
            reviews: 45,
            tutor: "Michael Johnson",
            hours: 15,
            price: "65,940.00",
            modules: [
                "Module 1 - Introduction to Headless CMS",
                "Module 2 - Sitecore JSS Architecture",
                "Module 3 - Setting up JSS Development Environment",
                "Module 4 - Building Components with JSS",
                "Module 5 - Routing and Navigation",
                "Module 6 - Deployment and Integration"
            ],
            moduleContents: [
                "Understanding headless CMS architecture and benefits.",
                "Deep dive into Sitecore JSS architecture and components.",
                "Step-by-step guide to setting up your JSS development environment.",
                "Building reusable components with JSS and JavaScript frameworks.",
                "Implementing routing and navigation in JSS applications.",
                "Deployment strategies and integration with Sitecore backend."
            ],
            includes: [
                { icon: "hours", text: "15+ hours video" },
                { icon: "modules", text: "18+ Modules" },
                { icon: "activities", text: "35+ activities" },
                { icon: "resources", text: "70+ downloadable resources" },
                { icon: "access", text: "Lifetime access" },
                { icon: "certificate", text: "Certificate of completion" }
            ],
            leftFeatures: [
                "Master headless CMS architecture",
                "Build with React, Angular, or Vue",
                "Create reusable JSS components",
                "Implement content serialization"
            ],
            rightFeatures: [
                "Connect to Sitecore Layout Service",
                "Implement server-side rendering",
                "Configure routing and navigation",
                "Deploy JSS applications"
            ]
        },
        "sitecore-advanced-developer-training-certification-course": {
            title: "Sitecore Advanced Developer Training",
            description: "Take your Sitecore development skills to the next level with our advanced developer training. Learn best practices, advanced techniques, and enterprise-level implementation strategies.",
            rating: 4.7,
            reviews: 89,
            tutor: "Emily Chen",
            hours: 15,
            price: "65,940.00",
            modules: [
                "Module 1 - Sitecore structure and platform",
                "Module 2 - Security and user management",
                "Module 3 - Item management",
                "Module 4 - Layout and placeholders",
                "Module 5 - Components, controls, and renderings",
                "Module 6 - ASP.NET Core integration"
            ],
            moduleContents: [
                "Advanced understanding of Sitecore structure and platform capabilities.",
                "Implementing complex security models and user management strategies.",
                "Advanced item management techniques and best practices.",
                "Creating sophisticated layouts with dynamic placeholders.",
                "Building advanced components, controls, and custom renderings.",
                "Integrating Sitecore with ASP.NET Core applications."
            ],
            includes: [
                { icon: "hours", text: "15+ hours video" },
                { icon: "modules", text: "22+ Modules" },
                { icon: "activities", text: "45+ activities" },
                { icon: "resources", text: "90+ downloadable resources" },
                { icon: "access", text: "Lifetime access" },
                { icon: "certificate", text: "Certificate of completion" }
            ],
            leftFeatures: [
                "Master Sitecore architecture",
                "Implement security best practices",
                "Create custom renderings",
                "Work with Sitecore containers"
            ],
            rightFeatures: [
                "Implement Sitecore Content Serialization",
                "Integrate with ASP.NET Core",
                "Optimize performance",
                "Implement advanced workflows"
            ]
        },
        "sitecore-experience-acceleratorsxa": {
            title: "Sitecore Experience Accelerator (SXA) Training",
            description: "Learn how to rapidly build websites using Sitecore Experience Accelerator (SXA). This course covers all aspects of SXA development, from basic concepts to advanced techniques.",
            rating: 4.6,
            reviews: 76,
            tutor: "David Wilson",
            hours: 15,
            price: "65,940.00",
            modules: [
                "Module 1 - Introduction to SXA",
                "Module 2 - SXA Architecture",
                "Module 3 - Creating Sites with SXA",
                "Module 4 - Working with Renderings",
                "Module 5 - Theming in SXA",
                "Module 6 - Advanced SXA Techniques"
            ],
            moduleContents: [
                "Introduction to Sitecore Experience Accelerator and its benefits.",
                "Understanding SXA architecture and component structure.",
                "Step-by-step guide to creating sites with SXA.",
                "Working with SXA renderings and components.",
                "Creating and customizing themes in SXA.",
                "Advanced techniques for extending SXA functionality."
            ],
            includes: [
                { icon: "hours", text: "15+ hours video" },
                { icon: "modules", text: "20+ Modules" },
                { icon: "activities", text: "40+ activities" },
                { icon: "resources", text: "80+ downloadable resources" },
                { icon: "access", text: "Lifetime access" },
                { icon: "certificate", text: "Certificate of completion" }
            ],
            leftFeatures: [
                "Understand SXA architecture",
                "Create and manage SXA sites",
                "Work with SXA components",
                "Implement responsive design"
            ],
            rightFeatures: [
                "Create custom SXA renderings",
                "Implement SXA themes",
                "Configure site navigation",
                "Optimize SXA performance"
            ]
        },
        "sitecore-xm-cloud-training": {
            title: "Sitecore XM Cloud Training",
            description: "Get up to speed with Sitecore's cloud-native CMS. This course covers everything you need to know about Sitecore XM Cloud, from setup to advanced implementation.",
            rating: 4.9,
            reviews: 52,
            tutor: "Lisa Brown",
            hours: 15,
            price: "65,940.00",
            modules: [
                "Module 1 - Introduction to XM Cloud",
                "Module 2 - XM Cloud Architecture",
                "Module 3 - Setting up XM Cloud",
                "Module 4 - Content Management in XM Cloud",
                "Module 5 - Deployment and DevOps",
                "Module 6 - Integration and Extensions"
            ],
            moduleContents: [
                "Introduction to Sitecore XM Cloud and its capabilities.",
                "Understanding XM Cloud architecture and components.",
                "Step-by-step guide to setting up XM Cloud environments.",
                "Content management strategies in XM Cloud.",
                "Implementing deployment pipelines and DevOps practices.",
                "Integrating XM Cloud with other services and extending functionality."
            ],
            includes: [
                { icon: "hours", text: "15+ hours video" },
                { icon: "modules", text: "18+ Modules" },
                { icon: "activities", text: "35+ activities" },
                { icon: "resources", text: "70+ downloadable resources" },
                { icon: "access", text: "Lifetime access" },
                { icon: "certificate", text: "Certificate of completion" }
            ],
            leftFeatures: [
                "Understand cloud-native CMS architecture",
                "Set up and configure XM Cloud",
                "Manage content in XM Cloud",
                "Implement CI/CD pipelines"
            ],
            rightFeatures: [
                "Deploy to XM Cloud environments",
                "Integrate with other Sitecore services",
                "Implement security best practices",
                "Optimize performance in the cloud"
            ]
        }
    };

    // Fallback to default data if course not found
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
        ],
        leftFeatures: [
            "Gain firm understanding of CMS",
            "Learn to install and configure Sitecore",
            "Work with Sitecore Helix",
            "Understand MVC Visual Studio project"
        ],
        rightFeatures: [
            "Work with marketing functionality",
            "Master data templates and renderings",
            "Understand security components",
            "Learn database management in Sitecore"
        ]
    };

    const courseData = courses[title] || defaultCourse;

    // Set default course inquiry when component mounts or course changes
    useEffect(() => {
        setCourseInquiry(courseData.title);
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
                        style={{
                            width: '100%',
                            borderRadius: '5px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            height: '200px',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '30px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                gap: '30px'
            }}>
                {/* Left Column - Course Content */}
                <div style={{ flex: '1 1 650px' }}>
                    <div style={{ marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                        {/* <div style={{ flex: '1 1 300px' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {courseData.leftFeatures.map((feature, index) => (
                                    <li key={index} style={{
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        color: '#555',
                                        fontSize: '14px'
                                    }}>
                                        <span style={{
                                            marginRight: '10px',
                                            color: '#28a745',
                                            fontWeight: 'bold',
                                            fontSize: '18px'
                                        }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                        {/* <div style={{ flex: '1 1 300px' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {courseData.rightFeatures.map((feature, index) => (
                                    <li key={index} style={{
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        color: '#555',
                                        fontSize: '14px'
                                    }}>
                                        <span style={{
                                            marginRight: '10px',
                                            color: '#28a745',
                                            fontWeight: 'bold',
                                            fontSize: '18px'
                                        }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>

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

                                                <FAQSection/>
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
                                <li key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    color: '#555',
                                    fontSize: '14px'
                                }}>
                                    <span style={{ marginRight: '10px', color: '#555' }}>{getIcon(item.icon)}</span>
                                    {item.text}
                                </li>
                            ))}
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
                                <span> Course Brochure</span>
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

                        {/* Enroll Now Button */}
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
                                                padding: '10px 15px',
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
            </div>
        </div>
    );
};

export default CourseDescription;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseCard = ({ title, headerText }) => {
  return (
    <div className="card h-100 border shadow-sm transition-hover">
      <Link 
        to={`/CourseDesc/${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="text-decoration-none d-flex flex-column h-100"
      >
        <div className="bg-primary p-4 text-center d-flex justify-content-center align-items-center" style={{ height: '140px' }}>
          <h3 className="fs-6 text-white fw-bold text-uppercase text-center lh-base">
            {headerText}
          </h3>
        </div>
        
        <div className="p-3 d-flex flex-column flex-grow-1">
          <h3 className="fs-6 mb-3 text-dark fw-normal text-center">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const CourseCategories = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://15.206.189.17:4000/api/get/courses'); // Update with your actual API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback static data
        setCourses([
          { title: "Cloud Computing", headerText: "CLOUD COMPUTING" },
          { title: "Data Science & Analytics", headerText: "DATA SCIENCE & ANALYTICS" },
          { title: "Machine Learning & Gen AI", headerText: "MACHINE LEARNING & GEN AI" },
          { title: "ERP (Salesforce, SAP, Oracle)", headerText: "ERP (SALESFORCE, SAP, ORACLE)" },
          { title: "Networking (Cisco, Juniper, Nokia)", headerText: "NETWORKING (CISCO, JUNIPER, NOKIA)" },
          { title: "Content Management System", headerText: "CONTENT MANAGEMENT SYSTEM" },
          { title: "Software Development", headerText: "SOFTWARE DEVELOPMENT" },
          { title: "Web Technologies (React, Node, Angular)", headerText: "WEB TECHNOLOGIES (REACT, NODE, ANGULAR)" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();    
  }, []);

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 text-dark">
          Explore Our Popular Course Categories
        </h2>

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {courses.map((course, index) => (
              <div className="col" key={index}>
                <CourseCard
                  title={course.title}
                  headerText={course.headerText}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCategories;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { reverseGenerateSlug } from './CourseCards';
const CourseCard = ({ title, description, CourseName }) => {

  return (
    <div className="card h-100 border shadow-sm transition-hover">
      <Link 
        to={`/CourseDesc/${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="text-decoration-none d-flex flex-column h-100"
      >
        <div className="bg-primary p-4 text-center d-flex justify-content-center align-items-center" style={{ height: '140px' }}>
          <h3 className="fs-6 text-white fw-bold text-uppercase text-center lh-base">
            {title}
          </h3>
        </div>
        
        <div className="p-3 d-flex flex-column flex-grow-1">
          <h3 className="fs-6 mb-3 text-dark fw-normal text-center">
            {description}
          </h3>
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1">
          <h3 className="fs-6 mb-3 text-dark fw-normal text-center">
            {CourseName}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const CourseCategories = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
const params = useParams();
  console.log("params=-=-=-=--==-=-", params.courseSlug
);

  const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://15.206.189.17:4000/api/admin/get/courses?categoryName=${reverseGenerateSlug(params.courseSlug)}`);
        setCourses(response.data.data.coursesList);
        console.log(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCourses();    
  }, []);


console.log(params)
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
              <div className="col" key={course.courseId}>
                <CourseCard
                  title={course.courseName}
                  description={course.description}
                  CourseName ={course.categoryName}
                />
              </div>
            ))}
          <h1>{params.title}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCategories;
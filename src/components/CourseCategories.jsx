import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { reverseGenerateSlug } from './CourseCards';
import { param } from 'framer-motion/client';

const CourseCard = ({ title, description ,data, image}) => {
  return (
    <div className="card h-100 border shadow-sm transition-hover">
      <Link 
        to={`/CourseDesc/${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="text-decoration-none d-flex flex-column h-100"
        state={data}
      >
        <div className=" p-4 text-center d-flex justify-content-center align-items-center" style={{ height: '140px' }}>
          <img 
            src={image}
            alt={title}
            className="img-fluid"
            style={{ 
              maxHeight: '100%',
              width: 'auto'
            }}
          />
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
  // const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slugData, setSlugData]= useState([])
  console.log("here is the slug data", slugData.data)

  const params = useParams();
  console.log("params.courseSlug0-=-=-==-=-=-=:", params.courseSlug);

    let name = params.courseSlug;

  const fetchCourses = async () => {
    console.log("here is the anme of slug:", name)

    try {

      const test=`https://api.learnitfy.com/api/admin/get/courses?categoryName=${name}`;



      let res= name.toLowerCase()
      const response = await axios.get(`https://api.learnitfy.com/api/admin/get/courses?categoryName=${res}`);
      // const response = await axios.get(`https://api.learnitfy.com/admin/get/courses?categoryName=front end`);
      console.log("-----------response", response)
      setSlugData(response.data.data.coursesList);

    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [params.courseSlug]);

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
            {slugData.map((course, index) => (
              <div className="col" key={index}>
                <CourseCard
                  image ={course.image}
                  title={course.courseName}
                  description={course.description}
                  data={course}
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
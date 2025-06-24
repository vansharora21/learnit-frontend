import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { reverseGenerateSlug } from './CourseCards';

const CourseCard = ({ title, description, data, image }) => {
  const slug = title.replace(/\s+/g, '-').toLowerCase(); // e.g., React JS => react-js

  return (
    <Link
      to={`/${slug}`}
      className="infra-link"
      state={{
        courseName: title,
        description: description,
        courseContent: data.courseContent,
        courseId: data.courseId,
        image: image,
      }}
    >
      <div
        className="country"
        tabIndex={0}
        role="button"
        aria-label={title}
      >
        <img src={image} alt={`${title} icon`} />
        <div className="country-text">{title}</div>
      </div>
    </Link>
  );
};


const CourseCategories = () => {
  const [loading, setLoading] = useState(true);
  const [slugData, setSlugData] = useState([]);
  
  console.log("here is the slug data", slugData);

  const params = useParams();
  console.log("params.courseSlug:", params.courseSlug);

  // let name = params.courseSlug;
  let name = params.courseSlug.toLowerCase();


  const fetchCourses = async () => {
    console.log("here is the name of slug:", name);

    try {
      let res = name;
      const response = await axios.get(`https://api.learnitfy.com/api/admin/get/courses?categoryName=${res}`);
      console.log("-----------response", response);
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', background: "#f5f5f5" }}>
      <p style={{
        fontWeight: 400,
        fontSize: '1.125rem',
        lineHeight: '1.7',
        margin: '1.5rem auto 2.5rem',
        color: '#444',
        maxWidth: '800px',
        textAlign: 'center',
        padding: '0 1rem'
      }}>
        
      </p>

      <motion.div
        className="Course-img"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div className="country skeleton" key={i} />
          ))
        ) : slugData.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '2rem 1rem', color: '#555' }}>
            <p>No courses available in this category at the moment. Please check back later.</p>
          </div>
        ) : (
          slugData.map((course, index) => (
            <CourseCard
              key={course.courseId || index}
              image={course.image}
              title={course.courseName}
              description={course.description}
              data={course}
            />
          ))
        )}
      </motion.div>

      <style jsx>{`
        .Course-img {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          background: #f5f5f5;
        }
        
        .infra-link {
          text-decoration: none;
          outline: none;
        }
        
        .country {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 220px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e1e4e8;
        }
        
        .country:focus,
        .country:hover {
          box-shadow: 0 20px 18px rgba(44, 62, 80, 0.15);
          border: 3px solid #FBB03B;
          transform: translateY(-4px);
        }
        
        .country img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.25s ease;
        }
        
        .country:hover img {
          transform: scale(1.05);
        }
        
        .country-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          padding: 20px;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .country:hover .country-text {
          background: rgba(0,0,0,0.6);
          align-items: center;
          font-size: 1.2rem;
        }
        
        .skeleton {
          background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 37%, #f5f5f5 63%);
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease infinite;
          height: 220px;
          border: 1px solid #e1e4e8;
          border-radius: 12px;
        }
        
        @keyframes skeleton-loading {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        
        /* Large Desktop */
        @media (max-width: 1200px) {
          .Course-img {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
        }
        
        /* Desktop */
        @media (max-width: 1024px) {
          .Course-img {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 18px;
          }
          .country {
            height: 200px;
          }
          .skeleton {
            height: 200px;
          }
        }
        
        /* Tablet */
        @media (max-width: 768px) {
          .Course-img {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .country {
            height: 180px;
          }
          .country-text {
            font-size: 1rem;
            padding: 15px;
          }
          .country:hover .country-text {
            font-size: 1.1rem;
          }
          .skeleton {
            height: 180px;
          }
        }
        
        /* Mobile Large */
        @media (max-width: 640px) {
          .Course-img {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .country {
            height: 160px;
          }
          .country-text {
            font-size: 0.9rem;
            padding: 12px;
          }
          .country:hover .country-text {
            font-size: 1rem;
          }
          .skeleton {
            height: 160px;
          }
        }
        
        /* Mobile */
        @media (max-width: 480px) {
          .Course-img {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .country {
            height: 200px;
          }
          .country-text {
            font-size: 1rem;
            padding: 16px;
          }
          .country:hover .country-text {
            font-size: 1.1rem;
          }
          .skeleton {
            height: 200px;
          }
        }
        
        /* Small Mobile */
        @media (max-width: 360px) {
          .Course-img {
            gap: 12px;
          }
          .country {
            height: 180px;
          }
          .country-text {
            font-size: 0.9rem;
            padding: 14px;
          }
          .country:hover .country-text {
            font-size: 1rem;
          }
          .skeleton {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseCategories;

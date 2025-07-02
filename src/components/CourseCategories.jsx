import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet';

// If you need to reverse slug to readable text
export function reverseGenerateSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const CourseCard = ({ title, description, data, image, url, metaTag }) => (
  <Link
    to={`/${url}`}
    className="infra-link"
    state={{
      courseName: title,
      description: description,
      courseContent: data.courseContent,
      courseId: data.courseId,
      image: image,
      metaTag: metaTag,
    }}
  >
    <div className="country" tabIndex={0} role="button" aria-label={title}>
      <img src={image} alt={`${title} icon`} />
      <div className="country-text">{title}</div>
    </div>
  </Link>
);

const CourseCategories = () => {
  const [loading, setLoading] = useState(true);
  const [slugData, setSlugData] = useState([]);
  const params = useParams();
  const name = params.courseSlug.toLowerCase();

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `https://api.learnitfy.com/api/admin/get/courses?categoryName=${name}`
      );
      setSlugData(response.data.data.coursesList);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setSlugData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, [params.courseSlug]);

  return (
    <>
      <Helmet>
        <title>{params.courseSlug}</title>
        <meta name="description" content="Explore various course categories available on Learnitfy." />
        <meta name="keywords" content="courses, categories, learn" />
        <link rel="icon" href="/logo.png" />
      </Helmet>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          background: '#f5f5f5',
        }}
      >
        <motion.div
          className="Course-img"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', marginTop: '2rem' }}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div className="country skeleton" key={i} />
            ))
          ) : slugData.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                width: '100%',
                padding: '10rem 1rem',
                color: '#555',
              }}
            >
              <p>No courses available in this category at the moment. Please check back later.</p>
            </div>
          ) : (
            slugData.map((course, index) => (
              <div
                key={course.courseId || index}
                style={{
                  maxWidth: '300px',
                  margin: '0 auto',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  background: '#fff',
                }}
              >
                <CourseCard
                  image={course.image}
                  title={course.courseName}
                  description={course.description}
                  url={course.url}
                  data={course}
                  metaTag={course.metaTag}
                />
              </div>
            ))
          )}
        </motion.div>

        <style>{`
          .Course-img {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px; /* Reduced gap for tighter grid */
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
            height: 200px;
            object-fit:cover;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
            border: 1px solid rgb(255, 255, 255);
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
              gap: 10px;
            }
          }
          
          /* Desktop */
          @media (max-width: 1024px) {
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 8px;
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
              gap: 8px;
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
              gap: 8px;
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
              gap: 10px;
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
              gap: 8px;
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
    </>
  );
};

export default CourseCategories;

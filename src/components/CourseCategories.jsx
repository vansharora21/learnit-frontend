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
        `https://api.learnitfy.com/api/admin/get/courses?categoryName=${name.replace('-', ' ')}`
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
        <title>{reverseGenerateSlug(params.courseSlug)} - Learnitfy</title>
        <meta name="description" content={`Explore ${reverseGenerateSlug(params.courseSlug)} courses available on Learnitfy.`} />
        <meta name="keywords" content="courses, categories, learn" />
        <link rel="icon" href="/logo.png" />
      </Helmet>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto',marginTop:'10px', padding: '0 1rem', background: "white" }}>

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
                url={course.url}
                data={course}
                metaTag={course.metaTag}
              />
            ))
          )}
        </motion.div>

        <style jsx>{`
          .Course-img {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            background:rgb(255, 255, 255);
            padding: 0 10px;
          }
          
          .infra-link {
            text-decoration: none;
            outline: none;
          }
          
          .country {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border: 1px solid #e1e4e8;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .country:focus,
          .country:hover {
            box-shadow: 0 20px 18px rgba(44, 62, 80, 0.15);
            border: 4px solid rgb(247, 165, 32);
            transform: translateY(-4px);
          }
          
          .country img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
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
            width: 100%;
            height: 200px;
            border: 1px solid #e1e4e8;
            border-radius: 12px;
          }
          
          @keyframes skeleton-loading {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }
          
          /* Extra Large Desktop */
          @media (min-width: 1400px) {
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              gap: 30px;
            }
          }
          
          /* Large Desktop */
          @media (max-width: 1200px) {
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 25px;
            }
          }
          
          /* Desktop */
          @media (max-width: 1024px) {
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 20px;
            }
          }
          
          /* Tablet */
          @media (max-width: 768px) {
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 18px;
              padding: 0 5px;
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
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 15px;
              padding: 0;
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
              gap: 20px;
              padding: 0;
            }
            .country {
              height: 200px;
              max-width: 100%;
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
              gap: 15px;
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

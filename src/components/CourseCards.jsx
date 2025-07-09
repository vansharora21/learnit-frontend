import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import CourseNotFound from './CourseNotFounnd';

// If you need to reverse slug to readable text
export function reverseGenerateSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const CourseCard = ({ title, description, data, image, url, metaTag }) => {
  const { courseSlug } = useParams(); // Get the current courseSlug
  
  // Generate a proper slug from the title
  const titleSlug = title.toLowerCase().replaceAll(' ', '-');
  
  return (
    <Link
      to={`/${courseSlug}/${titleSlug}`} // Use the route structure
      className="infra-link"
      state={{
        courseName: title,
        description: description,
        courseContent: data.courseContent,
        courseId: data.courseId,
        image: image,
        metaTag: metaTag,
        test: "test"
      }}
    >
      <div className="country" tabIndex={0} role="button" aria-label={title}>
        <img src={image} alt={`${title} icon`} />
        <div className="country-text">{title}</div>
      </div>
    </Link>
  );
};

const CourseCategories = () => {
  const [loading, setLoading] = useState(true);
  const [slugData, setSlugData] = useState([]);
  const { courseSlug } = useParams(); // Use the exact parameter name from route
  
  const fetchCourses = async () => {
    try {
      // Convert slug back to readable format for API call
      const categoryName = courseSlug.replace(/-/g, ' ');
      const response = await axios.get(
        `https://api.learnitfy.com/api/admin/get/courses?categoryName=${categoryName}`
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
    if (courseSlug) {
      fetchCourses();
    }
  }, [courseSlug]);

  return (
    <>
      <Helmet>
        <title>{reverseGenerateSlug(courseSlug)} - Learnitfy</title>
        <meta name="description" content={`Explore ${reverseGenerateSlug(courseSlug)} courses available on Learnitfy.`} />
        <meta name="keywords" content="courses, categories, learn" />
        <link rel="icon" href="/logo.png" />
      </Helmet>

      <div className="main-container">
        {/* Description Section */}
        {!loading && slugData.length > 0 && (
          <div className="description-section">
            <p className="description-text">
              At Learnitfy, we offer hands-on, career-focused tech training to help you start or grow your IT career. Learn from experts, build real projects, and stay industry-ready.
            </p>
          </div>
        )}

        <motion.div
          className="Course-img"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="country skeleton" key={i} />
            ))
          ) : slugData.length === 0 ? (
            <div className="no-courses">
              <CourseNotFound />
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
          .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: rgb(255, 255, 255);
            min-height: 50vh;
          }

          .description-section {
            margin-bottom: 2.5rem;
            text-align: center;
          }

          .description-text {
            font-weight: 400;
            font-size: 1.125rem;
            line-height: 1.7;
            color: #444;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          .Course-img {
            display: flex;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(220px, auto);
            grid-auto-flow: row;
            gap: 25px;
            margin-bottom: 30rem;
            align-items: stretch;
          }
          
          .infra-link {
            text-decoration: none;
            outline: none;
            width: 100%;
          }
          
          .country {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 220px;
            overflow: hidden;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e1e4e8;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }
          
          .country:focus,
          .country:hover {
            box-shadow: 0 20px 25px rgba(44, 62, 80, 0.15);
            border: 4px solid rgb(247, 165, 32);
            transform: translateY(-6px);
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

          .no-courses {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem 1rem;
            color: #555;
          }
          
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
            background-size: 400% 100%;
            animation: skeleton-loading 1.4s ease infinite;
            width: 100%;
            height: 100%;
            min-height: 220px;
            border: 1px solid #e1e4e8;
            border-radius: 12px;
          }
          
          @keyframes skeleton-loading {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }

          /* Large Desktop - 3 columns */
          @media (min-width: 1025px) {
            .Course-img {
              grid-template-columns: repeat(3, 1fr);
              gap: 30px;
            }
          }

          /* Tablet - 2 columns */
          @media (max-width: 1024px) {
            .Course-img {
              grid-template-columns: repeat(2, 1fr);
              gap: 25px;
            }
            .country {
              min-height: 200px;
            }
            .skeleton {
              min-height: 200px;
            }
          }

          /* Mobile - 1 column */
          @media (max-width: 768px) {
            .Course-img {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .country {
              min-height: 180px;
            }
            .country-text {
              font-size: 1rem;
              padding: 15px;
            }
            .country:hover .country-text {
              font-size: 1.1rem;
            }
            .skeleton {
              min-height: 180px;
            }
            .description-text {
              font-size: 1rem;
              padding: 0 0.5rem;
            }
          }

          /* Small Mobile */
          @media (max-width: 480px) {
            .main-container {
              padding: 15px 10px;
            }
            .Course-img {
              gap: 15px;
            }
            .country {
              min-height: 160px;
            }
            .country-text {
              font-size: 0.9rem;
              padding: 12px;
            }
            .country:hover .country-text {
              font-size: 1rem;
            }
            .skeleton {
              min-height: 160px;
            }
            .description-text {
              font-size: 0.9rem;
              line-height: 1.6;
            }
            .description-section {
              margin-bottom: 1.5rem;
            }
          }

          /* Extra Small Mobile */
          @media (max-width: 360px) {
            .main-container {
              padding: 10px 5px;
            }
            .Course-img {
              gap: 12px;
            }
            .country {
              min-height: 140px;
            }
            .country-text {
              font-size: 0.8rem;
              padding: 10px;
            }
            .country:hover .country-text {
              font-size: 0.9rem;
            }
            .skeleton {
              min-height: 140px;
            }
            .description-text {
              font-size: 0.8rem;
              line-height: 1.5;
              padding: 0 0.25rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CourseCategories;

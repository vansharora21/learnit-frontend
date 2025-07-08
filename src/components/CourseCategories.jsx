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

const CourseCard = ({ title, description, data, image, url, metaTag }) => (
  <Link
    to={`/${url.toLowerCase().replaceAll(' ', '-')}`}
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
          className="course-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
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
            margin: 10px auto;
            padding: 0 1rem;
            background: white;
          }

          .description-section {
            margin-bottom: 2rem;
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

          .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 3rem;
          }

          .no-courses {
            grid-column: 1 / -1;
            text-align: center;
            padding: 2rem 1rem;
            color: #555;
            font-weight: bold;
          }

          .infra-link {
            text-decoration: none;
            outline: none;
            display: block;
            width: 100%;
          }

          .country {
            position: relative;
            width: 100%;
            height: 220px;
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
            height: 220px;
            border: 1px solid #e1e4e8;
            border-radius: 12px;
          }

          @keyframes skeleton-loading {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }

          /* Extra Large Desktop (1400px+) */
          @media (min-width: 1400px) {
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              gap: 30px;
            }
            .country {
              height: 250px;
            }
            .skeleton {
              height: 250px;
            }
          }

          /* Large Desktop (1200px - 1399px) */
          @media (max-width: 1399px) and (min-width: 1200px) {
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
              gap: 25px;
            }
            .country {
              height: 230px;
            }
            .skeleton {
              height: 230px;
            }
          }

          /* Desktop (1024px - 1199px) */
          @media (max-width: 1199px) and (min-width: 1024px) {
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
            }
            .country {
              height: 220px;
            }
            .skeleton {
              height: 220px;
            }
          }

          /* Tablet (768px - 1023px) */
          @media (max-width: 1023px) and (min-width: 768px) {
            .main-container {
              padding: 0 0.75rem;
            }
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 18px;
            }
            .country {
              height: 200px;
            }
            .country-text {
              font-size: 1rem;
              padding: 15px;
            }
            .country:hover .country-text {
              font-size: 1.1rem;
            }
            .skeleton {
              height: 200px;
            }
            .description-text {
              font-size: 1rem;
              padding: 0 0.5rem;
            }
          }

          /* Mobile Large (640px - 767px) */
          @media (max-width: 767px) and (min-width: 640px) {
            .main-container {
              padding: 0 0.5rem;
            }
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 15px;
            }
            .country {
              height: 180px;
            }
            .country-text {
              font-size: 0.95rem;
              padding: 12px;
            }
            .country:hover .country-text {
              font-size: 1rem;
            }
            .skeleton {
              height: 180px;
            }
            .description-text {
              font-size: 0.95rem;
              padding: 0;
            }
          }

          /* Mobile (480px - 639px) */
          @media (max-width: 639px) and (min-width: 480px) {
            .main-container {
              padding: 0 0.5rem;
            }
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
              gap: 15px;
            }
            .country {
              height: 170px;
            }
            .country-text {
              font-size: 0.9rem;
              padding: 10px;
            }
            .country:hover .country-text {
              font-size: 0.95rem;
            }
            .skeleton {
              height: 170px;
            }
            .description-text {
              font-size: 0.9rem;
              line-height: 1.6;
            }
          }

          /* Small Mobile (360px - 479px) */
          @media (max-width: 479px) and (min-width: 360px) {
            .main-container {
              padding: 0 0.5rem;
            }
            .course-grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }
            .country {
              height: 160px;
            }
            .country-text {
              font-size: 0.85rem;
              padding: 8px;
            }
            .country:hover .country-text {
              font-size: 0.9rem;
            }
            .skeleton {
              height: 160px;
            }
            .description-text {
              font-size: 0.85rem;
              line-height: 1.5;
            }
          }

          /* Extra Small Mobile (below 360px) */
          @media (max-width: 359px) {
            .main-container {
              padding: 0 0.25rem;
            }
            .course-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            .country {
              height: 150px;
            }
            .country-text {
              font-size: 0.8rem;
              padding: 6px;
            }
            .country:hover .country-text {
              font-size: 0.85rem;
            }
            .skeleton {
              height: 150px;
            }
            .description-text {
              font-size: 0.8rem;
              line-height: 1.4;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CourseCategories;

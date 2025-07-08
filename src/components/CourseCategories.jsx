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
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
            background:rgb(255, 255, 255);
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            justify-items: center;
            margin-bottom: 3rem;
          }
          
          .infra-link {
            text-decoration: none;
            outline: none;
            width: 100%;
            max-width: 400px;
          }
          
          .country {
            position: relative;
            width: 400px;
            height: 267px;
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
            width: 400px;
            height: 267px;
            border: 1px solid #e1e4e8;
            border-radius: 12px;
          }
          
          @keyframes skeleton-loading {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }

          /* 4K and Ultra-wide displays (2560px+) */
          @media (min-width: 2560px) {
            .main-container {
              max-width: 2000px;
              padding: 40px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
              gap: 40px;
            }
            .country {
              width: 450px;
              height: 300px;
            }
            .skeleton {
              width: 450px;
              height: 300px;
            }
            .description-text {
              font-size: 1.25rem;
            }
          }

          /* Large Desktop (1920px - 2559px) */
          @media (max-width: 2559px) and (min-width: 1920px) {
            .main-container {
              max-width: 1600px;
              padding: 30px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
              gap: 35px;
            }
            .country {
              width: 420px;
              height: 280px;
            }
            .skeleton {
              width: 420px;
              height: 280px;
            }
          }

          /* Standard Desktop (1440px - 1919px) */
          @media (max-width: 1919px) and (min-width: 1440px) {
            .main-container {
              max-width: 1400px;
              padding: 25px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
              gap: 30px;
            }
          }

          /* Desktop (1200px - 1439px) */
          @media (max-width: 1439px) and (min-width: 1200px) {
            .main-container {
              max-width: 1200px;
              padding: 20px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
              gap: 25px;
            }
            .country {
              width: 380px;
              height: 254px;
            }
            .skeleton {
              width: 380px;
              height: 254px;
            }
          }

          /* Medium Desktop (1024px - 1199px) */
          @media (max-width: 1199px) and (min-width: 1024px) {
            .main-container {
              padding: 20px 15px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
              gap: 20px;
            }
            .country {
  width: 100%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 3 / 2; /* or keep a fixed height with % padding trick */
}

            .skeleton {
              width: 360px;
              height: 240px;
            }
            .description-text {
              font-size: 1.05rem;
            }
          }

          /* Tablet Landscape (900px - 1023px) */
          @media (max-width: 1023px) and (min-width: 900px) {
            .main-container {
              padding: 15px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
              gap: 18px;
            }
            .country {
              width: 340px;
              height: 227px;
            }
            .skeleton {
              width: 340px;
              height: 227px;
            }
            .country-text {
              font-size: 1rem;
              padding: 15px;
            }
            .country:hover .country-text {
              font-size: 1.1rem;
            }
          }

          /* Tablet Portrait (768px - 899px) */
          @media (max-width: 899px) and (min-width: 768px) {
            .main-container {
              padding: 15px 10px;
            }
            .Course-img {
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
              gap: 15px;
            }
            .country {
              width: 320px;
              height: 213px;
            }
            .skeleton {
              width: 320px;
              height: 213px;
            }
            .country-text {
              font-size: 0.95rem;
              padding: 12px;
            }
            .country:hover .country-text {
              font-size: 1.05rem;
            }
            .description-text {
              font-size: 1rem;
              padding: 0 0.5rem;
            }
          }

          /* Large Mobile Landscape (640px - 767px) */
          @media (max-width: 767px) and (min-width: 640px) {
            .main-container {
              padding: 10px;
            }
            .Course-img {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .infra-link {
              max-width: 100%;
            }
            .country {
              width: 100%;
              max-width: 500px;
              height: 267px;
              margin: 0 auto;
            }
            .skeleton {
              width: 100%;
              max-width: 500px;
              height: 267px;
              margin: 0 auto;
            }
            .country-text {
              font-size: 1rem;
              padding: 15px;
            }
            .description-text {
              font-size: 0.95rem;
            }
          }

          /* Mobile Landscape (480px - 639px) */
          @media (max-width: 639px) and (min-width: 480px) {
            .main-container {
              padding: 10px 8px;
            }
            .Course-img {
              grid-template-columns: 1fr;
              gap: 15px;
            }
            .country {
              width: 100%;
              max-width: 450px;
              height: 240px;
              margin: 0 auto;
            }
            .skeleton {
              width: 100%;
              max-width: 450px;
              height: 240px;
              margin: 0 auto;
            }
            .country-text {
              font-size: 0.9rem;
              padding: 12px;
            }
            .country:hover .country-text {
              font-size: 1rem;
            }
            .description-text {
              font-size: 0.9rem;
              line-height: 1.6;
            }
          }

          /* Mobile Portrait (375px - 479px) */
          @media (max-width: 479px) and (min-width: 375px) {
            .main-container {
              padding: 8px 5px;
            }
            .Course-img {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            .country {
              width: 100%;
              max-width: 360px;
              height: 200px;
              margin: 0 auto;
            }
            .skeleton {
              width: 100%;
              max-width: 360px;
              height: 200px;
              margin: 0 auto;
            }
            .country-text {
              font-size: 0.85rem;
              padding: 10px;
            }
            .country:hover .country-text {
              font-size: 0.95rem;
            }
            .description-text {
              font-size: 0.85rem;
              line-height: 1.5;
              padding: 0 0.25rem;
            }
            .description-section {
              margin-bottom: 1.5rem;
            }
          }

          /* Small Mobile (320px - 374px) */
          @media (max-width: 374px) and (min-width: 320px) {
            .main-container {
              padding: 5px;
            }
            .Course-img {
              grid-template-columns: 1fr;
              gap: 10px;
            }
            .country {
              width: 100%;
              max-width: 310px;
              height: 180px;
              margin: 0 auto;
            }
            .skeleton {
              width: 100%;
              max-width: 310px;
              height: 180px;
              margin: 0 auto;
            }
            .country-text {
              font-size: 0.8rem;
              padding: 8px;
            }
            .country:hover .country-text {
              font-size: 0.9rem;
            }
            .description-text {
              font-size: 0.8rem;
              line-height: 1.4;
              padding: 0;
            }
          }

          /* Extra Small Mobile (below 320px) */
          @media (max-width: 319px) {
            .main-container {
              padding: 5px 2px;
            }
            .Course-img {
              grid-template-columns: 1fr;
              gap: 8px;
            }
            .country {
              width: 100%;
              max-width: 280px;
              height: 160px;
              margin: 0 auto;
            }
            .skeleton {
              width: 100%;
              max-width: 280px;
              height: 160px;
              margin: 0 auto;
            }
            .country-text {
              font-size: 0.75rem;
              padding: 6px;
            }
            .country:hover .country-text {
              font-size: 0.85rem;
            }
            .description-text {
              font-size: 0.75rem;
              line-height: 1.3;
            }
          }

          /* High DPI displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .country {
              box-shadow: 0 2px 6px rgba(0,0,0,0.08);
            }
            .country:hover {
              box-shadow: 0 15px 20px rgba(44, 62, 80, 0.12);
            }
          }

          /* Landscape orientation adjustments */
          @media (orientation: landscape) and (max-height: 600px) {
            .main-container {
              padding: 10px;
            }
            .description-section {
              margin-bottom: 1rem;
            }
            .description-text {
              font-size: 0.9rem;
            }
          }

          /* Print styles */
          @media print {
            .main-container {
              background: white;
              padding: 0;
            }
            .country {
              box-shadow: none;
              border: 1px solid #ccc;
            }
            .country:hover {
              transform: none;
              box-shadow: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CourseCategories;

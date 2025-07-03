import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export function reverseGenerateSlug(slug) {
  const result = slug.replace(/-/g, ' ');
  // const result = slug.replace(' ', /-/g);

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function CategoryCards() {
  const [infra, setInfra] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await axios.get('https://api.learnitfy.com/api/admin/get/category');
        console.log('API Response:', response.data);
        const data = response.data.data;

        if (Array.isArray(data)) {
          console.log('Number of courses:', data.length);
          const processedData = data.map(item => ({
            title: item.categoryName,
            icon: item.logo || null,
            slug: item.slug || generateSlug(item.categoryName),
            badge: item.badge || null,
          }));
          setInfra(processedData);
        } else {
          console.warn('API response data is not an array:', data);
          setInfra([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setInfra([]);
      } finally {
        setLoading(false);
      }
    };

    getCategoryData();
  }, []);

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
        At Learnitfy, we empower individuals and organizations to thrive in the digital age through high-quality, flexible, and career-focused IT training. Whether you're looking to start a new tech career or upskill your team, our expertly designed courses are built to meet the demands of today's fast-evolving IT landscape.
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
        ) : infra.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '2rem 1rem', color: '#555' }}>
            <p>No categories available at the moment. Please check back later.</p>
          </div>
        ) : (
          infra.map((item, index) => (
            <Link
              key={item.categoryId || index}
              to={`/courses/${item.slug}`}
              // to={`/courses/${item.slug.replace(' ', '-')}`}
              className="infra-link"
            >
              <div
                className="country"
                tabIndex={0}
                role="button"
                aria-label={item.title}
              >
                <img src={item.icon} alt={`${item.title} icon`} />
                <div className="country-text">{item.title}</div>
                {item.badge && (
                  <span className="infra-badge">{item.badge}</span>
                )}
              </div>
            </Link>
          ))
        )}
      </motion.div>

      <style jsx>{`
        .Course-img {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          background: #f5f5f5;
          padding: 0 10px;
        }
        
        .infra-link {
          text-decoration: none;
          outline: none;
        }
        
        .country {
          position: relative;
          width: 300px;
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
        
        .infra-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #2563eb;
          color: #fff;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 16px;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          z-index: 2;
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
          .country {
            height: 200px;
          }
          .skeleton {
            height: 200px;
          }
        }
        
        /* Large Desktop */
        @media (max-width: 1200px) {
          .Course-img {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
          }
          .country {
            height: 200px;
          }
          .skeleton {
            height: 200px;
          }
        }
        
        /* Desktop */
        @media (max-width: 1024px) {
          .Course-img {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
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
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 18px;
            padding: 0 5px;
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
        }
        
        /* Mobile Large */
        @media (max-width: 640px) {
          .Course-img {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
            padding: 0;
          }
          .country {
            height: 200px;
          }
          .country-text {
            font-size: 0.9rem;
            padding: 12px;
          }
          .country:hover .country-text {
            font-size: 1rem;
          }
          .skeleton {
            height: 200px;
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
            height: 200px;
          }
          .country-text {
            font-size: 0.9rem;
            padding: 14px;
          }
          .country:hover .country-text {
            font-size: 1rem;
          }
          .skeleton {
            height: 200px;
          }
          .infra-badge {
            font-size: 10px;
            padding: 3px 8px;
          }
        }
      `}</style>
    </div>
  );
}

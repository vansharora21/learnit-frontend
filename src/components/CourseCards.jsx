import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
}

// Static fallback data (optional – can be empty or include defaults)
const staticInfrastructure = [];

export default function InfrastructureGrid() {
  const [infra, setInfra] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await axios.get("http://15.206.189.17:4000/api/admin/get/category");
        const CatData = response.data.data;
        console.log("Fetched Category Data:", CatData);
        const image = CatData.logo;
        const processedData = Array.isArray(CatData)
          ? CatData.map(item => ({
              ...item,
              slug: item.slug || generateSlug(item.categoryName),
              icon: item.icon || (image)
            }))
          : staticInfrastructure;

        setInfra(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setInfra(staticInfrastructure);
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
        className="infra-grid-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div className="infra-card skeleton" key={i} />
          ))
        ) : infra.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '2rem 1rem', color: '#555' }}>
            <p>No categories available at the moment. Please check back later.</p>
          </div>
        ) : (
          infra.map((item, index) => (
            <Link
              key={index}
              to={`/courses/${item.slug}`}
              className="infra-link"
            >
              <div
                className={`infra-card${item.highlight ? ' highlight' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={item.categoryName}
              >
                <div className="infra-icon">
                  <img src={item.icon} alt={`${item.categoryName} icon`} />
                  {item.badge && (
                    <span className="infra-badge">{item.categoryName}</span>
                  )}
                </div>
                <div className="infra-title">{item.categoryName}</div>
              </div>
            </Link>
          ))
        )}
      </motion.div>

      <style jsx>{`
        .infra-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          background: #f5f5f5;
        }
        .infra-link {
          text-decoration: none;
          outline: none;
        }
        .infra-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 16px 20px;
          position: relative;
          transition: all 0.25s ease;
          outline: none;
          border: 1px solid #e1e4e8;
          cursor: pointer;
          min-height: 180px;
        }
        .infra-card:focus,
        .infra-card:hover {
          box-shadow: 0 6px 18px rgba(44, 62, 80, 0.15);
          border-color: #ff6b00;
          background: #fff7ef;
          transform: translateY(-4px);
        }
        .infra-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f6f8fa;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          position: relative;
        }
        .infra-icon img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .infra-badge {
          position: absolute;
          top: -10px;
          right: -16px;
          background: #2563eb;
          color: #fff;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 16px;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .infra-title {
          font-size: 1.1rem;
          color: #222;
          font-weight: 600;
          text-align: center;
          line-height: 1.4;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
        }
        .skeleton {
          background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 37%, #f5f5f5 63%);
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease infinite;
          min-height: 180px;
          border: 1px solid #e1e4e8;
          border-radius: 12px;
        }
        @keyframes skeleton-loading {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        @media (max-width: 1000px) {
          .infra-grid-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        @media (max-width: 700px) {
          .infra-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .infra-card {
            padding: 24px 12px 16px;
            min-height: 160px;
          }
          .infra-icon {
            width: 52px;
            height: 52px;
            margin-bottom: 12px;
          }
          .infra-icon img {
            width: 32px;
            height: 32px;
          }
          .infra-title {
            font-size: 1rem;
            min-height: 36px;
          }
        }
        @media (max-width: 480px) {
          .infra-grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

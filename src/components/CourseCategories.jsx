import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineClockCircle } from 'react-icons/ai';

const CourseCard = ({ title, price, hours, rating, image, headerText }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card h-100 border shadow-sm transition-hover">
      <Link 
        to={`/CourseDesc/${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="text-decoration-none d-flex flex-column h-100"
      >
        <div className="bg-danger p-4 text-center d-flex justify-content-center align-items-center" style={{ height: '140px' }}>
          <h3 className="fs-6 text-white fw-bold text-uppercase text-center lh-base">
            {headerText}
          </h3>
        </div>
        
        <div className="p-3 d-flex flex-column flex-grow-1">
          <h3 className="fs-6 mb-3 text-dark fw-normal">
            {title}
          </h3>
          
          <div className="d-flex justify-content-between align-items-center text-secondary mt-2">
            <div className="d-flex align-items-center">
              <AiOutlineClockCircle className="me-1" /> {hours} hours
            </div>
            <button 
              onClick={handleFavoriteClick} 
              className="btn btn-link p-0 border-0"
              style={{ color: isFavorite ? '#ff3333' : '#ccc' }}
            >
              <AiOutlineHeart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CourseCategories = () => {
  // Updated course data with your new fields
  const courses = [
    {
      title: "Cloud Computing",
      price: "24,900.00",
      hours: "20",
      headerText: "CLOUD COMPUTING",
      image: "/path-to-cloud-computing-image.png"
    },
    {
      title: "Data Science & Analytics",
      price: "27,900.00",
      hours: "22",
      rating: "4.7 (52)",
      headerText: "DATA SCIENCE & ANALYTICS",
      image: "/path-to-data-science-image.png"
    },
    {
      title: "Machine Learning & Gen AI",
      price: "29,900.00",
      hours: "24",
      headerText: "MACHINE LEARNING & GEN AI",
      image: "/path-to-ml-genai-image.png"
    },
    {
      title: "ERP (Salesforce, SAP, Oracle)",
      price: "26,900.00",
      hours: "21",
      headerText: "ERP (SALESFORCE, SAP, ORACLE)",
      image: "/path-to-erp-image.png"
    },
    {
      title: "Networking (Cisco, Juniper, Nokia)",
      price: "25,900.00",
      hours: "20",
      headerText: "NETWORKING (CISCO, JUNIPER, NOKIA)",
      image: "/path-to-networking-image.png"
    },
    {
      title: "Content Management System",
      price: "23,900.00",
      hours: "18",
      headerText: "CONTENT MANAGEMENT SYSTEM",
      image: "/path-to-cms-image.png"
    },
    {
      title: "Software Development",
      price: "28,900.00",
      hours: "23",
      headerText: "SOFTWARE DEVELOPMENT",
      image: "/path-to-software-dev-image.png"
    },
    {
      title: "Web Technologies (React, Node, Angular)",
      price: "27,900.00",
      hours: "22",
      headerText: "WEB TECHNOLOGIES (REACT, NODE, ANGULAR)",
      image: "/path-to-web-tech-image.png"
    }
  ];

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 text-dark">
          Explore Our Popular Course Categories
        </h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {courses.map((course, index) => (
            <div className="col" key={index}>
              <CourseCard
                title={course.title}
                price={course.price}
                hours={course.hours}
                rating={course.rating}
                image={course.image}
                headerText={course.headerText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CourseCategories;

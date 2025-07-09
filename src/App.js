import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs.jsx';
import ContactUs from './components/ContactUs.jsx';
import Footer from './components/Footer.jsx';
import CourseDescription from './components/CourseDesc.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './components/HomePage..jsx';
import CourseCategories from './components/CourseCategories.jsx';

function App() {
  const location = useLocation();

  console.log(location, "app location");

  const [slugData, setSlugData] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [location]); // Scro
  // 
  // 
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `https://api.learnitfy.com/api/admin/get/category`
      );
      console.log(response.data.data.coursesList);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setSlugData([]);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, []);
  const test = location?.state?.test;
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        {/* {
          test === 'test' && <>
            <Route path="/:title" element={<CourseDescription />} />
          </>
        } */}

<Route path="/:courseSlug/:title" element={<CourseDescription />} />

      <Route path="/:courseSlug" element={<CourseCategories />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

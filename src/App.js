import React, { useEffect } from 'react';
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [location]); // Scroll to top on route change

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/courses/:courseSlug" element={<CourseCategories />} /> {/* Dynamic route for course categories */}
        <Route path="/:title" element={<CourseDescription />} /> {/* New route for course description */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

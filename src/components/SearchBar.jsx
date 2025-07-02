import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to generate slug if missing
const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except dash and space
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with dash

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        performSearch(searchTerm);
      } else {
        setFilteredResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.learnitfy.com/api/admin/get/category');
      const categoriesData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchCourses = async (query = '') => {
    try {
      const response = await axios.get(
        `https://api.learnitfy.com/api/admin/get/courses?categoryName=${encodeURIComponent(query)}`
      );
      const coursesData = Array.isArray(response.data) ? response.data : response.data.data || [];
      return coursesData;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  };

  const performSearch = async (query) => {
    setIsLoading(true);
    try {
      // Filter categories by search term
      const matchedCategories = categories
        .filter((category) => {
          const categoryName = category.name || category.categoryName || '';
          const description = category.description || '';
          return (
            categoryName.toLowerCase().includes(query.toLowerCase()) ||
            description.toLowerCase().includes(query.toLowerCase())
          );
        })
        .map((category) => ({
          ...category,
          type: 'category',
          displayName: category.name || category.categoryName,
        }));

      // Fetch courses for the search term
      const coursesData = await fetchCourses(query);
      const matchedCourses = coursesData
        .filter((course) => {
          const courseName = course.name || course.courseName || course.title || '';
          const description = course.description || '';
          const instructor = course.instructor || course.instructorName || '';
          return (
            courseName.toLowerCase().includes(query.toLowerCase()) ||
            description.toLowerCase().includes(query.toLowerCase()) ||
            instructor.toLowerCase().includes(query.toLowerCase())
          );
        })
        .map((course) => ({
          ...course,
          type: 'course',
          displayName: course.name || course.courseName || course.title,
        }));

      // Combine and limit results
      const combinedResults = [...matchedCategories, ...matchedCourses].slice(0, 10);

      setFilteredResults(combinedResults);
      setShowDropdown(combinedResults.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setFilteredResults([]);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (filteredResults.length > 0) {
        handleResultClick(filteredResults[0]);
      } else {
        const slug = generateSlug(searchTerm);
        navigate(`/search/${slug}`);
      }
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.displayName);
    setShowDropdown(false);

    if (result.type === 'category') {
      // Use slug if available, else generate one
      const slug = result.slug || generateSlug(result.displayName);
      navigate(`/courses/${slug}`, {
        state: { categoryName: result.displayName, categoryData: result },
      });
    } else if (result.type === 'course') {
      const courseSlug = result.slug || result.courseSlug || '';
      if (courseSlug) {
        navigate(`/course/${courseSlug}`, {
          state: { courseData: result },
        });
      } else {
        const courseId = result.id || result._id;
        navigate(`/course/${courseId}`, {
          state: { courseData: result },
        });
      }
    }
  };

  const handleInputFocus = () => {
    if (filteredResults.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <>
      <style>{`
        /* Your existing styles here */
        .search-container {
          position: relative;
          width: 100%;
        }
        /* ... rest of your CSS ... */
      `}</style>

      <div className="search-container" ref={dropdownRef}>
        <form className="custom-search-bar" autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            className="custom-search-input"
            placeholder="e.g. Web Development"
            value={searchTerm}
            onChange={handleChange}
            onFocus={handleInputFocus}
            style={{
              paddingLeft: '10px',
              paddingTop: '3px',
              paddingBottom: '7px',
            }}
          />
          <button type="submit" className="custom-search-btn" disabled={isLoading}>
            <span className="custom-search-icon" aria-hidden="true">
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" />
                  <line x1="14.5" y1="14.5" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="custom-search-label">Search</span>
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showDropdown && (
          <div className="search-dropdown">
            {isLoading && (
              <div className="loading-indicator">
                <div className="loading-spinner"></div>
                <span style={{ marginLeft: '8px' }}>Searching...</span>
              </div>
            )}

            {!isLoading && filteredResults.length > 0 && (
              <>
                {/* Categories Section */}
                {filteredResults.some((item) => item.type === 'category') && (
                  <>
                    <div className="dropdown-section-header">📁 Categories</div>
                    {filteredResults
                      .filter((item) => item.type === 'category')
                      .map((category, index) => (
                        <div
                          key={`category-${category.id || category._id || index}`}
                          className="search-result-item"
                          onClick={() => handleResultClick(category)}
                        >
                          <div className="result-icon">📁</div>
                          <div className="result-content">
                            <div className="result-name">{category.displayName}</div>
                            <div className="result-type">Category</div>
                          </div>
                        </div>
                      ))}
                  </>
                )}

                {/* Courses Section */}
                {filteredResults.some((item) => item.type === 'course') && (
                  <>
                    <div className="dropdown-section-header">📚 Courses</div>
                    {filteredResults
                      .filter((item) => item.type === 'course')
                      .map((course, index) => (
                        <div
                          key={`course-${course.slug || course.id || course._id || index}`}
                          className="search-result-item"
                          onClick={() => handleResultClick(course)}
                        >
                          <div className="result-icon">📚</div>
                          <div className="result-content">
                            <div className="result-name">{course.displayName}</div>
                            <div className="result-type">
                              {course.instructor || course.instructorName || 'Course'}
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </>
            )}

            {!isLoading && filteredResults.length === 0 && searchTerm.length >= 2 && (
              <div className="no-results">No results found for "{searchTerm}"</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

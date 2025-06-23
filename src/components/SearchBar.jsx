import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounced search effect
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

  // Close dropdown when clicking outside
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

  const fetchCourses = async (categoryName = '') => {
    try {
      const response = await axios.get(`https://api.learnitfy.com/api/admin/get/courses?categoryName=${encodeURIComponent(categoryName)}`);
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
      const matchedCategories = categories.filter(category => {
        const categoryName = category.name || category.categoryName || '';
        const description = category.description || '';
        return categoryName.toLowerCase().includes(query.toLowerCase()) ||
               description.toLowerCase().includes(query.toLowerCase());
      }).map(category => ({
        ...category,
        type: 'category',
        displayName: category.name || category.categoryName
      }));

      // Fetch courses for the search term
      const coursesData = await fetchCourses(query);
      const matchedCourses = coursesData.filter(course => {
        const courseName = course.name || course.courseName || course.title || '';
        const description = course.description || '';
        const instructor = course.instructor || course.instructorName || '';
        return courseName.toLowerCase().includes(query.toLowerCase()) ||
               description.toLowerCase().includes(query.toLowerCase()) ||
               instructor.toLowerCase().includes(query.toLowerCase());
      }).map(course => ({
        ...course,
        type: 'course',
        displayName: course.name || course.courseName || course.title
      }));

      // Combine results and limit to 10 items
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
      // If there are filtered results, navigate to the first one
      if (filteredResults.length > 0) {
        handleResultClick(filteredResults[0]);
      } else {
        // Fallback: create slug from search term
        const slug = searchTerm.replace(/\s+/g, '-').toLowerCase();
        navigate(`/search/${slug}`);
      }
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.displayName);
    setShowDropdown(false);
    
    if (result.type === 'category') {
      const categoryId = result.id || result._id;
      const categoryName = result.displayName;
      navigate(`/category/${categoryId}`, { 
        state: { categoryName, categoryData: result } 
      });
    } else if (result.type === 'course') {
      const courseId = result.id || result._id;
      navigate(`/course/${courseId}`, { 
        state: { courseData: result } 
      });
    }
  };

  const handleInputFocus = () => {
    if (filteredResults.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <>
      <style jsx>{`
        .search-container {
          position: relative;
          width: 100%;
        }

        .search-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          max-height: 400px;
          overflow-y: auto;
          z-index: 1000;
          margin-top: 4px;
        }

        .dropdown-section-header {
          padding: 12px 16px 8px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-size: 12px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: sticky;
          top: 0;
        }

        .search-result-item {
          padding: 12px 16px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-result-item:hover {
          background-color: #f8f9fa;
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .result-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 16px;
        }

        .result-content {
          flex: 1;
          min-width: 0;
        }

        .result-name {
          font-weight: 500;
          color: #333;
          font-size: 14px;
          margin-bottom: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .result-type {
          font-size: 12px;
          color: #666;
          text-transform: capitalize;
        }

        .loading-indicator {
          padding: 16px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }

        .no-results {
          padding: 16px;
          text-align: center;
          color: #666;
          font-style: italic;
          font-size: 14px;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #ff6b35;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .search-dropdown {
            max-height: 300px;
          }
          
          .search-result-item {
            padding: 10px 12px;
          }
          
          .result-icon {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }
        }
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
              paddingBottom: '7px'
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
                {filteredResults.some(item => item.type === 'category') && (
                  <>
                    <div className="dropdown-section-header">
                      📁 Categories
                    </div>
                    {filteredResults
                      .filter(item => item.type === 'category')
                      .map((category, index) => (
                        <div
                          key={`category-${category.id || index}`}
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
                {filteredResults.some(item => item.type === 'course') && (
                  <>
                    <div className="dropdown-section-header">
                      📚 Courses
                    </div>
                    {filteredResults
                      .filter(item => item.type === 'course')
                      .map((course, index) => (
                        <div
                          key={`course-${course.id || index}`}
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
              <div className="no-results">
                No results found for "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

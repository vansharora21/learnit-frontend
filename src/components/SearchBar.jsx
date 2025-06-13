import React from 'react';

const SearchBar = () => {
  return (
    <form className="custom-search-bar" autoComplete="off">
      <input
        type="text"
        className="custom-search-input"
        placeholder="e.g. Web Development"
        style={{paddingLeft:'10px',paddingTop: '3px',
          paddingBottom: '7px'
        }}
      />
      <button type="submit" className="custom-search-btn">
        <span className="custom-search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" />
            <line x1="14.5" y1="14.5" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="custom-search-label">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;

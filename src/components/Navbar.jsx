import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/PNG-01.png'; // Update with your actual file name

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ padding: '0.25rem 0rem' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={logo}
                        alt="Logo"
                        style={{ width: '85px', height: 'auto', marginRight: '5px' }}
                    />
                </Link>
                
                <div className="nav-links" style={{ position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/" className="nav-item" style={{ position: 'relative', color: '#6a778e', textDecoration: 'none', padding: '0.75rem 1rem', transition: 'color 250ms ease', fontWeight: '600' }}>
                        <span className="nav-text" style={{ position: 'relative', display: 'inline-block', transition: 'transform 250ms ease' }}>Home</span>
                    </Link>
                    <Link to="/about" className="nav-item" style={{ position: 'relative', color: '#6a778e', textDecoration: 'none', padding: '0.75rem 1rem', transition: 'color 250ms ease', fontWeight: '600' }}>
                        <span className="nav-text" style={{ position: 'relative', display: 'inline-block', transition: 'transform 250ms ease' }}>About Us</span>
                    </Link>
                    <Link to="/contact" className="nav-item" style={{ position: 'relative', color: '#6a778e', textDecoration: 'none', padding: '0.75rem 1rem', transition: 'color 250ms ease', fontWeight: '600' }}>
                        <span className="nav-text" style={{ position: 'relative', display: 'inline-block', transition: 'transform 250ms ease' }}>Contact Us</span>
                    </Link>
                </div>
                
                <div className="d-flex align-items-center justify-content-end flex-grow-1" style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {/* Search Bar */}
                    <div style={{ flex: 'none', minWidth: '250px', maxWidth: '400px', margin: '0 1.5rem' }}>
                        <form
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#fff',
                                borderRadius: '22px',
                                boxShadow: '0 2px 8px rgba(44,46,52,0.09)',
                                width: '100%',
                                padding: '0.1rem 0.1rem 0.1rem 0.5rem',
                            }}
                            onSubmit={e => e.preventDefault()}
                        >
                            <input
                                type="search"
                                placeholder="e.g. Web Development"
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    padding: '0.5rem',
                                    background: 'transparent',
                                    color: '#444',
                                    fontStyle: 'italic',
                                    fontWeight: '400',
                                    minWidth: 0,
                                }}
                                className="custom-search-input"
                            />
                            <button
                                type="submit"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: '#ffb32d',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    padding: '0.4rem 1rem',
                                    cursor: 'pointer',
                                    marginLeft: '0',
                                    boxShadow: '0 2px 8px rgba(44,46,52,0.07)',
                                    transition: 'background 0.2s',
                                    height: '32px',
                                }}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                    style={{ display: 'block' }}
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                Search
                            </button>
                            {/* Placeholder styling for italic and gray */}
                            <style>
                                {`
                                    .custom-search-input::placeholder {
                                        color: #b4b4b4;
                                        font-style: italic;
                                        opacity: 1;
                                    }
                                `}
                            </style>
                        </form>
                    </div>

                    {/* Social Media Icons */}
                    <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#ff6b00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#ff6b00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#ff6b00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Embedded CSS for hover effects */}
            <style jsx>{`
                .nav-item {
                    position: relative;
                }
                .nav-item:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: rgb(227, 148, 28);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 250ms ease;
                }
                .nav-item:hover {
                    color: rgb(237, 123, 53);
                }
                .nav-item:hover:before {
                    transform: scaleX(1);
                }
                .nav-item:hover .nav-text {
                    transform: translateY(-2px);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;

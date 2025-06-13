import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/PNG-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const SocialMediaIcon = ({ platform }) => {
    const icons = {
        instagram: faInstagram,
        x: faXTwitter,
        linkedin: faLinkedin,
    };
    const links = {
        instagram: 'https://www.instagram.com/learnitfy/',
        x: 'https://x.com/learnitfy',
        linkedin: 'https://www.linkedin.com/company/learnitfy/',
    };
    
    return (
        <a
            href={links[platform]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                background: '#ff6b00',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                color: 'white ',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                margin: '0 8px',
                transition: 'all 0.2s ease',
            }}
            aria-label={platform}
        >
            <FontAwesomeIcon icon={icons[platform]} size="lg" />
        </a>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
            if (window.innerWidth > 992) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light  shadow-sm" 
             style={{ padding: '0.5rem 0', position: 'sticky', top: 0, zIndex: 1000,background:'#2C2E34' }}>
            <div className="container" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%', 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '0 clamp(0.5rem, 2vw, 1rem)' 
            }}>
                {/* Logo */}
                <Link className="navbar-brand" to="/" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flex: '0 0 auto'
                }}>
                    <img 
                        src={logo}
                        alt="Logo"
                        style={{ 
                            width: 'clamp(50px, 12vw, 80px)', 
                            height: 'auto', 
                            marginRight: '5px' 
                        }}
                    />
                </Link>
                
                {/* Desktop Navigation */}
                {!isMobile && (
                    <div className="nav-links" style={{ 
                        display: 'flex', 
                        gap: 'clamp(0.5rem, 2vw, 1.5rem)', 
                        alignItems: 'center',
                        flex: '1',
                        justifyContent: 'center'
                    }}>
                        <Link to="/" className="nav-item" style={navItemStyle}>
                            <span className="nav-text">Home</span>
                        </Link>
                        <Link to="/about" className="nav-item" style={navItemStyle}>
                            <span className="nav-text">About Us</span>
                        </Link>
                        <Link to="/contact" className="nav-item" style={navItemStyle}>
                            <span className="nav-text">Contact Us</span>
                        </Link>
                    </div>
                )}
                
                {/* Right Side Content */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'clamp(0.5rem, 2vw, 1rem)',
                    flex: '0 0 auto'
                }}>
                    {/* Search Bar - Hidden on mobile */}
                    {!isMobile && (
                        <div className="search-container" style={{ 
                            minWidth: 'clamp(180px, 25vw, 280px)',
                            maxWidth: '350px'
                        }}>
                            <SearchForm />
                        </div>
                    )}
                    
                    {/* Social Media Icons */}
                    <div className="social-icons" style={{ 
                        display: 'flex', 
                        gap: 'clamp(0.3rem, 1.5vw, 0.8rem)',
                        flexDirection: isMobile ? 'row' : 'row'
                    }}>
                        <SocialMediaIcon platform="instagram" />
                        <SocialMediaIcon platform="x" />
                        <SocialMediaIcon platform="linkedin" />
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    {isMobile && (
                        <button 
                            className="mobile-menu-toggle"
                            onClick={toggleMobileMenu}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                outline: 'none',
                                color: '#6a778e',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    )}
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMobile && (
                <div 
                    className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                        opacity: isMobileMenuOpen ? 1 : 0,
                        visibility: isMobileMenuOpen ? 'visible' : 'hidden',
                        transition: 'all 0.3s ease',
                        zIndex: 999
                    }}
                >
                    <div style={{ padding: '1rem' }}>
                        {/* Mobile Search */}
                        <div style={{ marginBottom: '1rem' }}>
                            <SearchForm />
                        </div>
                        
                        {/* Mobile Navigation Links */}
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '0.5rem' 
                        }}>
                            <Link 
                                to="/" 
                                className="mobile-nav-item"
                                onClick={() => {
                                    console.log("Navigating to Home");
                                    setIsMobileMenuOpen(false); // Close menu on link click
                                }}
                                style={mobileNavItemStyle}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/about" 
                                className="mobile-nav-item"
                                onClick={() => {
                                    console.log("Navigating to About Us");
                                    setIsMobileMenuOpen(false); // Close menu on link click
                                }}
                                style={mobileNavItemStyle}
                            >
                                About Us
                            </Link>
                            <Link 
                                to="/contact" 
                                className="mobile-nav-item"
                                onClick={() => {
                                    console.log("Navigating to Contact Us");
                                    setIsMobileMenuOpen(false); // Close menu on link click
                                }}
                                style={mobileNavItemStyle}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .mobile-nav-item:hover {
                    background-color:rgb(31, 32, 32);
                    color:rgb(87, 87, 87);
                }
                
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
                    background: #ff6b00;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 250ms ease;
                }
                .nav-item:hover {
                    color: #ff6b00;
                }
                .nav-item:hover:before {
                    transform: scaleX(1);
                }
                .nav-item:hover .nav-text {
                    transform: translateY(-2px);
                }

                @media screen and (max-width: 576px) {
                    .social-icons {
                        gap: 0.3rem !important;
                    }
                }
            `}</style>
        </nav>
    );
};

// Helper Components
const SearchForm = () => (
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
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                padding: 'clamp(0.3rem, 1vw, 0.5rem)',
                background: 'transparent',
                color: '#444',
                fontStyle: 'italic',
                fontWeight: '400',
                minWidth: 0,
            }}
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
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                fontWeight: '600',
                padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.5rem, 2vw, 1rem)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                height: 'clamp(28px, 6vw, 32px)',
            }}
        >
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
        </button>
    </form>
);

// Styles
const navItemStyle = {
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.5rem, 2vw, 1rem)',
    transition: 'color 250ms ease',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
};

const mobileNavItemStyle = {
    display: 'block',
    padding: '0.75rem 1rem',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    fontWeight: '500'
};

export default Navbar;

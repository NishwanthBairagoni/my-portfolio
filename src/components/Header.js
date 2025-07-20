import React, { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaBars, 
  FaTimes,
  FaFileAlt
} from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Social links data
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: FaGithub,
      color: 'github-hover'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: FaLinkedin,
      color: 'linkedin-hover'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/yourusername',
      icon: SiLeetcode,
      color: 'leetcode-hover'
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com/profile/yourusername',
      icon: SiCodeforces,
      color: 'codeforces-hover'
    }
  ];

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Coding Profiles', href: '#coding-profiles' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <a href="#home" className="logo-link">
              BN
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Social Links & Resume */}
          <div className="header-actions">
            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${social.color}`}
                  title={social.name}
                >
                  <social.icon className="social-icon" />
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href="https://your-resume-link.com" // Replace with your actual resume link
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              <FaFileAlt className="resume-icon" />
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={toggleMenu}
              className="menu-toggle"
            >
              {isMenuOpen ? (
                <FaTimes className="menu-icon" />
              ) : (
                <FaBars className="menu-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Social Links */}
              <div className="mobile-social-section">
                <div className="mobile-social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mobile-social-link ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="mobile-social-icon" />
                    </a>
                  ))}
                </div>
                
                {/* Mobile Resume Button */}
                <div className="mobile-resume-section">
                  <a
                    href="https://your-resume-link.com" // Replace with your actual resume link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-resume-button"
                  >
                    <FaFileAlt className="mobile-resume-icon" />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
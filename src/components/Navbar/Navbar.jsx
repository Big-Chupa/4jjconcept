import React, { useState, useEffect } from 'react';
import { Menu, X, User, ArrowRight, LogOut, ChevronRight, LayoutDashboard, ShieldCheck } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onOpenAuth, currentUser, onOpenDashboard, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Software & Tools', href: '#tools' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
              <rect width="40" height="40" rx="10" fill="#0A1128" />
              <path d="M12 28V12L22 20V12H28V28L18 20V28Z" fill="url(#logoGrad4JJClean)" />
              <circle cx="30" cy="12" r="3" fill="#00D2A0" />
              <defs>
                <linearGradient id="logoGrad4JJClean" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00D2A0" />
                  <stop offset="1" stopColor="#00B4D8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">4JJ<span className="brand-accent">CONCEPT</span></span>
            <span className="brand-sub">Global Research Services</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <a 
                  href={link.href} 
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons: Login / Sign Up or Logged in User Profile */}
        <div className="navbar-actions">
          {currentUser ? (
            <div className="nav-user-logged">
              <div className="user-welcome-chip">
                <div className="user-chip-avatar">
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck size={16} className="text-emerald" />
                  ) : (
                    <User size={15} />
                  )}
                </div>
                <div className="user-chip-text">
                  <span className="chip-name">{currentUser.name}</span>
                  <span className="chip-role">
                    {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </div>
              </div>

              <button 
                onClick={onOpenDashboard}
                className="btn btn-primary nav-dashboard-btn"
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </button>

              <button 
                onClick={onLogout} 
                className="nav-logout-btn" 
                title="Log out"
              >
                <LogOut size={16} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <button 
                onClick={() => onOpenAuth('login')}
                className="btn-nav-login"
              >
                Login
              </button>
              <button 
                onClick={() => onOpenAuth('register')} 
                className="btn btn-primary nav-signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="mobile-nav-item">
                <a 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} className="link-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu-actions">
            {currentUser ? (
              <>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="btn btn-primary w-100"
                >
                  <LayoutDashboard size={16} />
                  <span>Go to {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="btn btn-outline w-100"
                >
                  <LogOut size={16} />
                  <span>Logout ({currentUser.name})</span>
                </button>
              </>
            ) : (
              <div className="mobile-auth-grid">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="btn btn-outline w-100"
                >
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="btn btn-primary w-100"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

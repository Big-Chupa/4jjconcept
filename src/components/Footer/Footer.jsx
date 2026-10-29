import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, MessageSquare, ShieldCheck, UploadCloud } from 'lucide-react';
import './Footer.css';

const Footer = ({ onOpenAuth, onUploadClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
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
    <footer className="footer-section">
      <div className="container footer-top">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <a href="#" className="footer-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
                  <rect width="40" height="40" rx="10" fill="#121E3D" />
                  <path d="M12 28V12L22 20V12H28V28L18 20V28Z" fill="url(#footerLogoGrad4JJClean)" />
                  <circle cx="30" cy="12" r="3" fill="#00D2A0" />
                  <defs>
                    <linearGradient id="footerLogoGrad4JJClean" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00D2A0" />
                      <stop offset="1" stopColor="#00B4D8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-name text-white">4JJ<span className="brand-accent">CONCEPT</span></span>
                <span className="brand-sub">Global Research Services</span>
              </div>
            </a>

            <p className="footer-bio">
              Nigeria's premier academic data analytics and thesis consulting agency. Upload your Chapters 1 to 3; receive completed, defense-ready Chapter 4 (Data Analysis) and Chapter 5 (Discussion &amp; Recommendations) directly to your dashboard.
            </p>

            <div className="footer-trust-badge">
              <ShieldCheck size={18} className="badge-shield" />
              <span>100% Confidential • Chapters 4 &amp; 5 Specialization</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>Our Services</a></li>
              <li><a href="#tools" onClick={(e) => handleLinkClick(e, '#tools')}>Software &amp; Tools</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')}>Frequently Asked Questions</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact &amp; Inquiries</a></li>
            </ul>
          </div>

          {/* Student Portal Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Student Portal</h4>
            <ul className="footer-links">
              <li>
                <button 
                  onClick={onUploadClick} 
                  className="footer-action-link"
                >
                  Upload Chapters 1 - 3
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('login')} 
                  className="footer-action-link"
                >
                  Student Portal Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('register')} 
                  className="footer-action-link"
                >
                  Create New Account
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact &amp; Inquiries</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <Phone size={18} className="c-icon" />
                <a href="tel:+2348037696091">08037696091</a>
              </div>
              <div className="contact-item">
                <MessageSquare size={18} className="c-icon text-whatsapp" />
                <a 
                  href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-contact-link"
                >
                  WhatsApp: 08037696091
                </a>
              </div>
              <div className="contact-item">
                <Mail size={18} className="c-icon" />
                <a href="mailto:jesuniyi4wealth@gmail.com">jesuniyi4wealth@gmail.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={18} className="c-icon" />
                <span>School Gate, Federal University Lokoja, Adankolo Campus, Kogi State, Nigeria</span>
              </div>
            </div>

            <button 
              onClick={onUploadClick}
              className="btn btn-primary footer-cta-btn"
            >
              <UploadCloud size={16} />
              <span>Submit Chapters 1 to 3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>4JJCONCEPT Global Services</strong>. All Rights Reserved. Built with precision for Nigerian and global researchers.
          </p>

          <button onClick={scrollToTop} className="scroll-top-btn" title="Back to top">
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

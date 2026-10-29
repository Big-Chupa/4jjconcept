import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="floating-whatsapp-container">
      {showTooltip && (
        <div className="whatsapp-tooltip animate-float">
          <div className="tooltip-content">
            <span className="tooltip-title">Need fast Chapter 4 &amp; 5 analysis?</span>
            <span className="tooltip-sub">WhatsApp our Lead Statistician (08037696091)</span>
          </div>
          <button 
            className="tooltip-close" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a 
        href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20would%20like%20to%20inquire%20about%20your%20data%20analysis%20and%20research%20services." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float-btn"
        title="Chat with 4JJCONCEPT on WhatsApp (08037696091)"
      >
        <span className="whatsapp-ripple"></span>
        <MessageSquare size={28} className="whatsapp-btn-icon" />
      </a>
    </div>
  );
};

export default WhatsAppButton;

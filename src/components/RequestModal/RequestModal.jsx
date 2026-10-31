import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, CheckCircle2, Sparkles, UploadCloud } from 'lucide-react';
import './RequestModal.css';

const RequestModal = ({ isOpen, onClose, initialService = '', onDirectToUpload }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    level: 'B.Sc / HND',
    service: initialService || '1. Full Project Writing (Chapters 1 to 5 from Scratch)',
    tool: 'IBM SPSS',
    deadline: 'Within 1 Week',
    topic: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = `*New Research Project Request via 4JJCONCEPT Website:*
*Client Name:* ${formData.name}
*WhatsApp No:* ${formData.phone}
*Email:* ${formData.email || 'Not provided'}
*Degree Level:* ${formData.level}
*Service Requested:* ${formData.service}
*Preferred Tool:* ${formData.tool}
*Target Deadline:* ${formData.deadline}
*Research Topic / Brief:* ${formData.topic || 'Will discuss via chat'}`;

    const url = `https://wa.me/2348037696091?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {submitted ? (
          <div className="modal-success-view">
            <div className="success-pulse-icon">
              <CheckCircle2 size={44} />
            </div>
            <h3 className="modal-success-title">Inquiry Forwarded!</h3>
            <p className="modal-success-text">
              We have forwarded your inquiry to our lead consultant on WhatsApp (<strong>08037696091</strong>). You can also upload your <strong>project topic or proposal draft</strong> directly into your student account for immediate processing.
            </p>
            <button 
              onClick={() => {
                onClose();
                if (onDirectToUpload) onDirectToUpload();
              }}
              className="btn btn-primary w-100 mb-2"
            >
              <UploadCloud size={18} />
              <span>Proceed to Upload Topic / Draft</span>
            </button>
            <button 
              onClick={handleWhatsAppSubmit} 
              className="btn btn-whatsapp w-100 mb-3"
            >
              <MessageSquare size={18} />
              <span>Chat on WhatsApp (08037696091)</span>
            </button>
            <button 
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn btn-outline w-100"
            >
              <span>Done</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppSubmit} className="modal-form">
            <div className="modal-header">
              <div className="modal-badge">
                <Sparkles size={14} />
                <span>4JJCONCEPT Fast Project Assessment</span>
              </div>
              <h3 className="modal-title">Request Project Writing &amp; Research Support</h3>
              <p className="modal-subtitle">
                Fill this quick form and our lead consultant will provide an instant quote for your Full Project (Chapters 1 to 5), Chapter 4 &amp; 5 Analysis, or Proposal.
              </p>
            </div>

            <div className="modal-grid">
              <div className="modal-form-group">
                <label className="modal-label">Your Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. John Doe"
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">WhatsApp Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="08037696091"
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Degree / Academic Level</label>
                <select 
                  name="level" 
                  value={formData.level} 
                  onChange={handleChange} 
                  className="modal-input"
                >
                  <option value="B.Sc / HND">B.Sc / HND</option>
                  <option value="PGD">PGD</option>
                  <option value="M.Sc / M.Phil">M.Sc / M.Phil</option>
                  <option value="Ph.D">Ph.D</option>
                  <option value="Corporate / NGO">Corporate / NGO</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Preferred Software</label>
                <select 
                  name="tool" 
                  value={formData.tool} 
                  onChange={handleChange} 
                  className="modal-input"
                >
                  <option value="IBM SPSS">IBM SPSS</option>
                  <option value="R-Studio">R-Studio</option>
                  <option value="Python">Python</option>
                  <option value="STATA">STATA</option>
                  <option value="Advanced Excel">Advanced Excel</option>
                  <option value="Recommend for me">Recommend for me</option>
                </select>
              </div>

              <div className="modal-form-group full-width">
                <label className="modal-label">Service / Scope Needed</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  className="modal-input"
                >
                  <option value="1. Full Project Writing (Chapters 1 to 5 from Scratch)">1. Full Project Writing (Chapters 1 to 5 from Scratch)</option>
                  <option value="2. Chapter 4 & 5 Data Analysis & Discussion (From Ch 1-3 Upload)">2. Chapter 4 &amp; 5 Data Analysis &amp; Discussion (From Ch 1-3 Upload)</option>
                  <option value="3. Research Proposal & Synopsis Writing">3. Research Proposal &amp; Synopsis Writing</option>
                  <option value="Chapters 1 to 3 Methodology Review">Chapters 1 to 3 Methodology Review</option>
                  <option value="Plagiarism Reduction & Turnitin Clearance">Plagiarism Reduction &amp; Turnitin Clearance</option>
                  <option value="Questionnaire Design & Reliability">Questionnaire Design &amp; Reliability</option>
                  <option value="Oral Defense PowerPoint Deck">Oral Defense PowerPoint Deck</option>
                </select>
              </div>

              <div className="modal-form-group full-width">
                <label className="modal-label">Target Deadline</label>
                <select 
                  name="deadline" 
                  value={formData.deadline} 
                  onChange={handleChange} 
                  className="modal-input"
                >
                  <option value="Express 48 Hours">Express 48 Hours (Urgent)</option>
                  <option value="Within 1 Week">Within 1 Week</option>
                  <option value="2 to 3 Weeks">2 to 3 Weeks</option>
                  <option value="Flexible / Still writing">Flexible / Still writing</option>
                </select>
              </div>

              <div className="modal-form-group full-width">
                <label className="modal-label">Research Topic or Specific Requirements</label>
                <textarea 
                  name="topic" 
                  rows="3" 
                  value={formData.topic} 
                  onChange={handleChange} 
                  placeholder="e.g. Assessment of Corporate Governance on Financial Performance..."
                  className="modal-input"
                ></textarea>
              </div>
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn btn-whatsapp w-100 modal-submit-btn">
                <MessageSquare size={18} />
                <span>Submit &amp; Connect via WhatsApp (08037696091)</span>
              </button>
              <p className="modal-guarantee-note">
                🔒 Free quote • 100% Confidential • Direct Senior Analyst Consultation
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestModal;

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  UploadCloud 
} from 'lucide-react';
import './Contact.css';

const Contact = ({ onUploadClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'B.Sc / HND',
    service: 'Complete Chapter 4 & 5 Execution (From Ch 1-3 Upload)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const sendToWhatsApp = () => {
    const text = `Hello 4JJCONCEPT, I am reaching out from your website contact form:
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Level:* ${formData.level}
*Service:* ${formData.service}
*Project Details:* ${formData.message}`;

    const url = `https://wa.me/2348037696091?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Direct Communication</span>
          </div>
          <h2 className="section-title">
            Let's Discuss Your <span className="gradient-text">Chapter 1 to 5 Research</span>
          </h2>
          <p className="section-subtitle">
            Get in touch for an instant consultation, pricing quote, or guidance on submitting your Chapters 1 to 3.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Info Column */}
          <div className="contact-info-panel">
            <h3 className="panel-title">Contact 4JJCONCEPT</h3>
            <p className="panel-desc">
              We serve undergraduate and postgraduate scholars across all Nigerian universities and international institutions with seamless digital delivery.
            </p>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="info-title">Phone &amp; Direct Call</h4>
                  <a href="tel:+2348037696091" className="info-link">08037696091</a>
                  <p className="info-sub">+234 803 769 6091 • Mon - Sat: 8:00 AM - 9:00 PM WAT</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="info-title">Official WhatsApp Desk</h4>
                  <a 
                    href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20my%20project." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="info-link text-whatsapp"
                  >
                    08037696091 (Click to Chat)
                  </a>
                  <p className="info-sub">Direct access to lead statistical analyst</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="info-title">Official Email</h4>
                  <a href="mailto:jesuniyi4wealth@gmail.com" className="info-link">jesuniyi4wealth@gmail.com</a>
                  <p className="info-sub">Fast replies within 30 minutes</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="info-title">Office / Academic Coordinates</h4>
                  <p className="info-detail">School Gate, Federal University Lokoja</p>
                  <p className="info-sub">Adankolo Campus, Lokoja, Kogi State, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="fast-chat-banner">
              <div className="banner-text">
                <strong>Ready to upload Chapters 1 to 3?</strong>
                <span>Submit files directly through your student account.</span>
              </div>
              <button 
                onClick={onUploadClick} 
                className="btn btn-primary banner-btn"
              >
                <UploadCloud size={16} />
                <span>Upload to Portal</span>
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-box">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="success-title">Message Received!</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Our lead research analyst at 4JJCONCEPT is reviewing your details and will connect with you on WhatsApp at <strong>{formData.phone || '08037696091'}</strong> shortly.
                </p>
                <button 
                  onClick={sendToWhatsApp}
                  className="btn btn-whatsapp w-100 mb-3"
                >
                  <MessageSquare size={18} />
                  <span>Send Direct Copy to WhatsApp (08037696091)</span>
                </button>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline w-100"
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-heading">Send Us a Quick Project Inquiry</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="e.g. Adebayo Ogunlesi"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="08037696091"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="your.email@gmail.com"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Academic Level</label>
                    <select 
                      name="level" 
                      value={formData.level} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="B.Sc / HND">B.Sc / HND / Undergrad</option>
                      <option value="PGD">Postgraduate Diploma (PGD)</option>
                      <option value="M.Sc / M.Phil">Master's (M.Sc / M.Phil / MBA)</option>
                      <option value="Ph.D">Doctorate (Ph.D)</option>
                      <option value="Corporate / NGO">Corporate / NGO</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Service Scope</label>
                  <select 
                    name="service" 
                    value={formData.service} 
                    onChange={handleChange} 
                    className="form-control"
                  >
                    <option value="Complete Chapter 4 & 5 Execution (From Ch 1-3 Upload)">Complete Chapter 4 &amp; 5 Execution (From Ch 1-3 Upload)</option>
                    <option value="Chapter 4 Only (Data Analysis & Hypothesis Testing)">Chapter 4 Only (Data Analysis &amp; Hypothesis Testing)</option>
                    <option value="Statistical Modeling in SPSS / R / Python / STATA">Statistical Modeling in SPSS / R / Python / STATA</option>
                    <option value="Plagiarism Checking & Turnitin Reduction">Plagiarism Checking &amp; Turnitin Reduction</option>
                    <option value="Questionnaire Design & Scale Reliability">Questionnaire Design &amp; Scale Reliability</option>
                    <option value="Oral Defense Presentation & Coaching">Oral Defense Coaching &amp; Presentation Slides</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Details / Topic / Target Submission Date *</label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    required 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Briefly state your topic, what chapters you need help with, number of survey respondents, or your submission deadline..."
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-primary submit-btn w-100"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry &amp; Get Free Quote</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="btn btn-whatsapp w-100 mt-2"
                  >
                    <MessageSquare size={16} />
                    <span>Or Chat on WhatsApp: 08037696091</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

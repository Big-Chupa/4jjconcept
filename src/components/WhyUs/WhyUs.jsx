import React from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  UserCheck, 
  FileCheck, 
  Zap, 
  MessageCircle, 
  UploadCloud 
} from 'lucide-react';
import './WhyUs.css';

const WhyUs = ({ onUploadClick }) => {
  const advantages = [
    {
      icon: <RefreshCw size={26} />,
      title: 'Free Supervisor Revisions Guarantee',
      desc: 'Supervisors inevitably request comments or table modifications. We provide free corrections until your department grants final defense clearance.'
    },
    {
      icon: <UploadCloud size={26} />,
      title: 'Direct Portal Submission & Rapid Delivery',
      desc: 'Upload just your topic for full project writing, or submit your Chapters 1 to 3 for Chapter 4 & 5 empirical analysis. Receive completed documents directly into your student portal.'
    },
    {
      icon: <UserCheck size={26} />,
      title: '1-on-1 Defense Coaching & Explanations',
      desc: 'We prepare you for oral defense panel questioning. You will understand your hypotheses, models, findings, and theoretical implications like an expert.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Strict Non-Disclosure & Confidentiality',
      desc: 'Your research topic, unpublished hypotheses, survey datasets, and thesis manuscripts are strictly guarded under full confidentiality protocols.'
    },
    {
      icon: <FileCheck size={26} />,
      title: 'Turnitin Clean & Genuine Citations',
      desc: 'Turnitin similarity index reduced well below 15% with authentic peer-reviewed literature (APA 7th, MLA, or Harvard citation styles).'
    },
    {
      icon: <MessageCircle size={26} />,
      title: 'Direct WhatsApp Line (08037696091)',
      desc: 'No confusing ticket systems. Communicate directly via WhatsApp with the lead research consultant handling your project.'
    }
  ];

  return (
    <section id="why-us" className="section why-us-section">
      <div className="container">
        <div className="why-us-grid">
          {/* Left Column: Heading & Value Proposition */}
          <div className="why-us-content">
            <div className="section-tag">
              <span>The 4JJCONCEPT Advantage</span>
            </div>
            <h2 className="why-us-title">
              Why Hundreds of Scholars <span className="gradient-text">Trust 4JJCONCEPT</span>
            </h2>
            <p className="why-us-desc">
              Academic research is stressful enough without having to write from scratch or decipher confusing statistics. Whether you need a full project (Chapters 1 to 5), precision Chapter 4 &amp; 5 data analysis, or a defense-ready proposal, we guide you to approval.
            </p>

            <div className="why-us-stat-box">
              <div className="stat-pill-row">
                <span className="stat-pill-number">99.4%</span>
                <span className="stat-pill-text">Thesis approval rate across Nigerian and foreign universities</span>
              </div>
            </div>

            <button 
              onClick={onUploadClick}
              className="btn btn-primary why-us-btn"
            >
              <UploadCloud size={17} />
              <span>Submit Your Topic / Project Now</span>
            </button>
          </div>

          {/* Right Column: 6 Value Cards */}
          <div className="why-us-cards-grid">
            {advantages.map((item, idx) => (
              <div key={idx} className="advantage-card">
                <div className="advantage-icon-wrapper">
                  {item.icon}
                </div>
                <h3 className="advantage-title">{item.title}</h3>
                <p className="advantage-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

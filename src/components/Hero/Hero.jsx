import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  UploadCloud, 
  ShieldCheck, 
  Zap, 
  FileText,
  BookOpen,
  Sparkles
} from 'lucide-react';
import './Hero.css';

const Hero = ({ onUploadClick, onRequestClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="glow-sphere glow-sphere-1"></div>
        <div className="glow-sphere glow-sphere-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">Nigeria's #1 Full Project &amp; Research Analytics Agency</span>
          </div>

          <h1 className="hero-title">
            Complete Project Writing <span className="gradient-text">From Approved Topic to Final Defense</span>
          </h1>

          <p className="hero-description">
            <strong>4JJCONCEPT Global Services</strong> turns your research topic into an outstanding, defense-ready thesis. Submit just your <strong>project topic</strong> and we write your <strong>complete project from Chapters 1 through 5</strong>. Already have your proposal? We also specialize in precision <strong>Chapter 4 &amp; 5 empirical data analysis</strong> and <strong>research proposals</strong>.
          </p>

          <div className="hero-cta-group">
            <button 
              onClick={onUploadClick} 
              className="btn btn-primary hero-primary-btn"
            >
              <UploadCloud size={19} />
              <span>Submit Topic for Full Project</span>
            </button>

            <a 
              href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20would%20like%20to%20discuss%20my%20academic%20project%20topic." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp hero-whatsapp-btn"
            >
              <MessageSquare size={18} />
              <span>WhatsApp: 08037696091</span>
            </a>
          </div>

          {/* Core Service Pillar Badges */}
          <div className="hero-guarantees">
            <div className="guarantee-item">
              <CheckCircle2 size={16} className="guarantee-icon" />
              <span>1. Full Project Writing (Ch 1 - 5)</span>
            </div>
            <div className="guarantee-item">
              <TrendingUp size={16} className="guarantee-icon" />
              <span>2. Chapter 4 &amp; 5 Data Analysis</span>
            </div>
            <div className="guarantee-item">
              <FileText size={16} className="guarantee-icon" />
              <span>3. Proposal Writing</span>
            </div>
            <div className="guarantee-item">
              <ShieldCheck size={16} className="guarantee-icon" />
              <span>Free Supervisor Revisions</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Project Architecture Visualizer */}
        <div className="hero-visual">
          <div className="visual-card">
            {/* Visual Card Header */}
            <div className="visual-header">
              <div className="visual-controls">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="visual-model-tag">
                <span className="status-indicator"></span>
                <span>4JJCONCEPT Academic Architecture</span>
              </div>
            </div>

            {/* 3 Core Services Highlight Ribbon */}
            <div className="hero-pillars-container">
              <div className="pillar-row active-flagship">
                <div className="pillar-badge-num">1</div>
                <div className="pillar-info">
                  <strong>Full Project Writing (Chapters 1 to 5)</strong>
                  <span>Topic Only Needed • Complete Preliminaries to Appendices</span>
                </div>
                <span className="pillar-tag-featured">Major Focus</span>
              </div>

              <div className="pillar-row">
                <div className="pillar-badge-num">2</div>
                <div className="pillar-info">
                  <strong>Chapter 4 &amp; 5 Data Analysis</strong>
                  <span>Upload Ch 1-3 • Empirical Testing (SPSS/R/Python)</span>
                </div>
              </div>

              <div className="pillar-row">
                <div className="pillar-badge-num">3</div>
                <div className="pillar-info">
                  <strong>Research Proposals &amp; Synopsis</strong>
                  <span>Problem Statement, Hypotheses &amp; Methodology</span>
                </div>
              </div>
            </div>

            {/* Quality Summary Metrics */}
            <div className="visual-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Scope</span>
                <div className="metric-value-row">
                  <span className="metric-value">Ch 1 - 5</span>
                  <span className="metric-tag verified">Complete</span>
                </div>
                <span className="metric-sub">Start to Finish</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Turnitin</span>
                <div className="metric-value-row">
                  <span className="metric-value">&lt; 15%</span>
                  <span className="metric-tag positive">Safe</span>
                </div>
                <span className="metric-sub">Similarity Guaranteed</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Empirical Fit (R²)</span>
                <div className="metric-value-row">
                  <span className="metric-value">0.942</span>
                  <span className="metric-tag highlight">Sig.</span>
                </div>
                <span className="metric-sub">SPSS / R / STATA</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Revisions</span>
                <div className="metric-value-row">
                  <span className="metric-value">100%</span>
                  <span className="metric-tag neutral">Free</span>
                </div>
                <span className="metric-sub">Supervisor Alignment</span>
              </div>
            </div>

            {/* Floating Trust Badges */}
            <div className="floating-badge badge-top-right animate-float">
              <Award size={20} className="badge-icon gold" />
              <div>
                <strong>Oral Defense Ready</strong>
                <span>100% Approval Record</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-left animate-float" style={{ animationDelay: '2s' }}>
              <BookOpen size={20} className="badge-icon emerald" />
              <div>
                <strong>From Topic to Thesis</strong>
                <span>Full Chapter 1 to 5 Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

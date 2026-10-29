import React from 'react';
import { ArrowRight, MessageSquare, CheckCircle2, TrendingUp, Award, UploadCloud, ShieldCheck, Zap } from 'lucide-react';
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
            <span className="badge-text">Nigeria's Leading Research &amp; Data Analytics Agency</span>
          </div>

          <h1 className="hero-title">
            Empower Your Research with <span className="gradient-text">Precision Data Analytics</span>
          </h1>

          <p className="hero-description">
            <strong>4JJCONCEPT Global Services</strong> bridges academic theory and empirical rigor. Upload your <strong>Chapters 1 to 3</strong>; our senior methodology team analyzes your data and delivers complete, defense-ready <strong>Chapter 4 (Data Analysis) &amp; Chapter 5 (Discussion &amp; Recommendations)</strong> directly to your dashboard.
          </p>

          <div className="hero-cta-group">
            <button 
              onClick={onUploadClick} 
              className="btn btn-primary hero-primary-btn"
            >
              <UploadCloud size={19} />
              <span>Upload Chapters 1 to 3</span>
            </button>

            <a 
              href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20would%20like%20to%20discuss%20my%20data%20analysis%20project." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp hero-whatsapp-btn"
            >
              <MessageSquare size={18} />
              <span>WhatsApp: 08037696091</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="hero-guarantees">
            <div className="guarantee-item">
              <CheckCircle2 size={16} className="guarantee-icon" />
              <span>Chapters 4 &amp; 5 Specialization</span>
            </div>
            <div className="guarantee-item">
              <ShieldCheck size={16} className="guarantee-icon" />
              <span>Free Supervisor Revisions</span>
            </div>
            <div className="guarantee-item">
              <Zap size={16} className="guarantee-icon" />
              <span>Dashboard File Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Analytics Visualizer Card */}
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
                <span>4JJCONCEPT Analytical Engine</span>
              </div>
            </div>

            {/* Model Summary Metrics */}
            <div className="visual-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Regression Fit (R²)</span>
                <div className="metric-value-row">
                  <span className="metric-value">0.942</span>
                  <span className="metric-tag positive">+18.4%</span>
                </div>
                <span className="metric-sub">Variance Explained</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Reliability (α)</span>
                <div className="metric-value-row">
                  <span className="metric-value">0.891</span>
                  <span className="metric-tag verified">High</span>
                </div>
                <span className="metric-sub">Cronbach's Alpha</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Sample (N)</span>
                <div className="metric-value-row">
                  <span className="metric-value">450</span>
                  <span className="metric-tag neutral">95% CI</span>
                </div>
                <span className="metric-sub">Valid Respondents</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">p-value</span>
                <div className="metric-value-row">
                  <span className="metric-value">&lt; 0.001</span>
                  <span className="metric-tag highlight">Sig.</span>
                </div>
                <span className="metric-sub">Hypothesis Accepted</span>
              </div>
            </div>

            {/* Visual Chart Bars Preview */}
            <div className="visual-chart-box">
              <div className="chart-header">
                <span className="chart-title">Chapter 4 Hypothesis Testing Distribution</span>
                <span className="chart-badge">SPSS / R-Studio Output</span>
              </div>
              <div className="chart-bars">
                <div className="bar-col">
                  <div className="bar-fill" style={{ height: '78%' }}></div>
                  <span className="bar-label">Hyp. 1</span>
                </div>
                <div className="bar-col">
                  <div className="bar-fill" style={{ height: '92%' }}></div>
                  <span className="bar-label">Hyp. 2</span>
                </div>
                <div className="bar-col">
                  <div className="bar-fill highlight" style={{ height: '98%' }}></div>
                  <span className="bar-label">Hyp. 3</span>
                </div>
                <div className="bar-col">
                  <div className="bar-fill" style={{ height: '85%' }}></div>
                  <span className="bar-label">Hyp. 4</span>
                </div>
                <div className="bar-col">
                  <div className="bar-fill" style={{ height: '89%' }}></div>
                  <span className="bar-label">Hyp. 5</span>
                </div>
              </div>
            </div>

            {/* Floating Trust Badges */}
            <div className="floating-badge badge-top-right animate-float">
              <Award size={20} className="badge-icon gold" />
              <div>
                <strong>Oral Defense Ready</strong>
                <span>100% Approval Rate</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-left animate-float" style={{ animationDelay: '2s' }}>
              <TrendingUp size={20} className="badge-icon emerald" />
              <div>
                <strong>Chapters 4 &amp; 5 Formatted</strong>
                <span>APA 7th Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

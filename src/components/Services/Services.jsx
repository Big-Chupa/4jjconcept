import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  FileCheck2, 
  HelpCircle, 
  Layers, 
  Presentation, 
  Database, 
  LineChart, 
  ArrowUpRight,
  UploadCloud,
  Sparkles
} from 'lucide-react';
import './Services.css';

const Services = ({ onRequestService, onUploadClick }) => {
  const serviceList = [
    {
      id: 'full-project-writing',
      icon: <BookOpen className="service-icon" size={28} />,
      title: 'Full Project Writing (Chapters 1 to 5 from Scratch)',
      desc: 'Simply provide your approved research topic. We handle the entire project from Chapter 1 (Introduction), Chapter 2 (Literature Review), Chapter 3 (Methodology), to Chapters 4 & 5 (Analysis & Recommendations), complete with preliminary pages, abstract, and references.',
      tags: ['Primary Offering', 'Chapters 1 - 5', 'Turnitin Clean (<15%)', 'Free Corrections'],
      popular: true,
      highlightBadge: 'Flagship Service'
    },
    {
      id: 'chapter-4-and-5',
      icon: <BarChart3 className="service-icon" size={28} />,
      title: 'Chapter 4 & 5 Empirical Data Analysis & Discussion',
      desc: 'Already completed your Chapters 1 to 3? Upload your proposal and raw dataset. We run statistical tests, generate APA 7th tables, write empirical interpretations, and deliver completed Chapters 4 & 5 directly to your dashboard.',
      tags: ['Chapter 4 Results', 'Chapter 5 Discussion', 'SPSS / R / Python', 'APA 7th Format'],
      popular: true,
      highlightBadge: 'Core Specialty'
    },
    {
      id: 'proposal-development',
      icon: <FileCheck2 className="service-icon" size={28} />,
      title: 'Research Proposal & Synopsis Development',
      desc: 'Need supervisor approval for your project topic? We write defense-ready proposals including background of study, statement of problem, research questions, formulated hypotheses, and rigorous methodology design.',
      tags: ['Proposal Approval', 'Problem Statement', 'Conceptual Framework', 'Hypotheses'],
      popular: true,
      highlightBadge: 'Topic Approval'
    },
    {
      id: 'data-analysis',
      icon: <LineChart className="service-icon" size={28} />,
      title: 'Statistical Modeling (SPSS / R / Python / STATA)',
      desc: 'Advanced statistical analytics across SPSS, R-Studio, Python, STATA, and Advanced Excel: multiple regressions, ANOVA, structural equation modeling (SEM), t-tests, and correlation matrices.',
      tags: ['SPSS v29', 'R-Studio', 'Python Data Science', 'STATA', 'Hypothesis Testing']
    },
    {
      id: 'questionnaire-design',
      icon: <HelpCircle className="service-icon" size={28} />,
      title: 'Questionnaire Design & Reliability Scale Testing',
      desc: 'Structured Likert-scale questionnaire drafting, expert content validity, data coding into SPSS/Excel, and Cronbach\'s Alpha reliability verification (α ≥ 0.70).',
      tags: ['Google Forms', 'KoboToolbox', 'Cronbach Alpha', 'SPSS Coding']
    },
    {
      id: 'plagiarism-reduction',
      icon: <Layers className="service-icon" size={28} />,
      title: 'Plagiarism Reduction & Turnitin Clearance',
      desc: 'Rigorous scholarly rewriting to eliminate unoriginal phrasing, upgrade vocabulary, and bring Turnitin similarity scores well below strict institutional thresholds (<15%).',
      tags: ['Turnitin Report', 'APA 7th Citations', 'Manual Paraphrasing']
    },
    {
      id: 'defense-prep',
      icon: <Presentation className="service-icon" size={28} />,
      title: 'Oral Defense Coaching & PowerPoint Slides',
      desc: 'High-impact PowerPoint presentation decks with empirical charts, defense talking points, and 1-on-1 coaching on answering difficult panel questions.',
      tags: ['PowerPoint Deck', 'Mock Defense', 'Q&A Coaching']
    },
    {
      id: 'datasets',
      icon: <Database className="service-icon" size={28} />,
      title: 'Curated Nigerian & Global Research Datasets',
      desc: 'High-quality secondary data sourcing and cleaning across Central Bank of Nigeria (CBN) bulletins, NBS macroeconomic data, corporate financial statements, and World Bank indices.',
      tags: ['CBN Bulletins', 'World Bank', 'Corporate Financials']
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Our Service Portfolio</span>
          </div>
          <h2 className="section-title">
            Tailored Research Solutions for <span className="gradient-text">Undergraduate &amp; Postgraduate Success</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a full project written from scratch, Chapter 4 &amp; 5 data analysis for your existing proposal, or a defense-ready proposal for your approved topic.
          </p>
        </div>

        <div className="services-grid">
          {serviceList.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${service.popular ? 'featured' : ''}`}
            >
              {service.popular && (
                <div className="popular-badge">{service.highlightBadge || 'Core Specialty'}</div>
              )}
              
              <div className="service-header">
                <div className="service-icon-box">
                  {service.icon}
                </div>
                <button 
                  onClick={() => onRequestService(service.title)}
                  className="service-action-btn"
                  title="Request this service"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>

              <div className="service-tags">
                {service.tags.map((tag, i) => (
                  <span key={i} className="service-pill">{tag}</span>
                ))}
              </div>

              <div className="service-footer">
                <button 
                  onClick={() => onRequestService(service.title)}
                  className="service-link-btn"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

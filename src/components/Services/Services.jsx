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
  UploadCloud
} from 'lucide-react';
import './Services.css';

const Services = ({ onRequestService, onUploadClick }) => {
  const serviceList = [
    {
      id: 'chapter-4-and-5',
      icon: <BookOpen className="service-icon" size={28} />,
      title: 'Chapter 4 & 5 Thesis Execution & Delivery',
      desc: 'Upload your Chapters 1 to 3. We run the statistical analysis, format full APA 7th tables, draft empirical discussions, and deliver Chapter 4 and Chapter 5 directly back to your dashboard.',
      tags: ['Chapter 4 Analysis', 'Chapter 5 Discussion', 'APA 7th Format', 'Dashboard Delivery'],
      popular: true
    },
    {
      id: 'data-analysis',
      icon: <BarChart3 className="service-icon" size={28} />,
      title: 'Statistical Data Analysis (SPSS / R / Python / STATA)',
      desc: 'Expert execution across SPSS, R, Python, STATA, and Advanced Excel. We run descriptive statistics, multiple regressions, ANOVA, t-tests, SEM, and correlation matrices.',
      tags: ['SPSS v29', 'R-Studio', 'Python', 'STATA', 'Hypothesis Testing'],
      popular: true
    },
    {
      id: 'proposal-review',
      icon: <FileCheck2 className="service-icon" size={28} />,
      title: 'Chapters 1 to 3 Proposal Review & Alignment',
      desc: 'Evaluation of problem statements, conceptual frameworks, objective-hypothesis consistency, and sampling methodology to ensure 100% defense alignment.',
      tags: ['Problem Statement', 'Conceptual Framework', 'Sample Size Formulas']
    },
    {
      id: 'questionnaire-design',
      icon: <HelpCircle className="service-icon" size={28} />,
      title: 'Questionnaire Design & Reliability Scale Testing',
      desc: 'Structured Likert-scale survey drafting, expert content validity, data coding into SPSS/Excel, and Cronbach\'s Alpha reliability scoring (α ≥ 0.70).',
      tags: ['Google Forms', 'KoboToolbox', 'Cronbach Alpha', 'SPSS Coding']
    },
    {
      id: 'plagiarism-reduction',
      icon: <Layers className="service-icon" size={28} />,
      title: 'Plagiarism Reduction & Turnitin Clearance',
      desc: 'Rigorous academic rewriting to eliminate unoriginal phrasing, improve academic tone, and drive Turnitin similarity scores well below institutional thresholds (<15%).',
      tags: ['Turnitin Report', 'APA 7th Citations', 'Manual Paraphrasing']
    },
    {
      id: 'defense-prep',
      icon: <Presentation className="service-icon" size={28} />,
      title: 'Oral Defense Coaching & Presentation Slides',
      desc: 'Professional presentation slides with visual charts, bulleted findings, and personalized 1-on-1 coaching on answering tough supervisor defense questions.',
      tags: ['PowerPoint Deck', 'Mock Defense', 'Q&A Coaching']
    },
    {
      id: 'datasets',
      icon: <Database className="service-icon" size={28} />,
      title: 'Curated Research Datasets',
      desc: 'High-quality secondary data sourcing and cleaning across Nigerian economic indicators (CBN/NBS), corporate financial reports, healthcare, and education.',
      tags: ['CBN Bulletins', 'World Bank', 'Financial Statements']
    },
    {
      id: 'business-analytics',
      icon: <LineChart className="service-icon" size={28} />,
      title: 'Corporate Business Intelligence & Dashboards',
      desc: 'Interactive Power BI and Excel dashboards for corporate clients, business forecasting, customer retention metrics, and sales trend analysis.',
      tags: ['Power BI', 'Interactive Dashboards', 'Forecasting']
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="section-title">
            Comprehensive Services Tailored for <span className="gradient-text">Academic &amp; Data Excellence</span>
          </h2>
          <p className="section-subtitle">
            Whether you need complete Chapter 4 &amp; 5 execution or specific statistical modeling, 4JJCONCEPT provides end-to-end expertise.
          </p>
        </div>

        <div className="services-grid">
          {serviceList.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${service.popular ? 'featured' : ''}`}
            >
              {service.popular && (
                <div className="popular-badge">Core Specialty</div>
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

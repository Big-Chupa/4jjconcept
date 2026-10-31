import React, { useState } from 'react';
import { 
  CheckCircle, 
  UploadCloud, 
  Table2, 
  Lightbulb, 
  ArrowRight,
  BookOpen,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import './ChapterGuide.css';

const ChapterGuide = ({ onUploadClick, onWhatsAppClick }) => {
  const [activeTab, setActiveTab] = useState(1); // default Chapter 4

  const workflowStages = [
    {
      id: 'chapters1to3',
      stageTag: 'Written from Topic / Student Draft',
      tagColor: 'blue',
      tabLabel: 'Chapters 1 to 3',
      title: 'Chapters 1 - 3: Background, Literature & Methodology',
      subtitle: 'Written completely from scratch for Full Project requests, or uploaded by the student if you already have your proposal approved.',
      icon: <BookOpen size={24} />,
      role: 'Full Project or Draft',
      points: [
        'Chapter 1: Background of Study, Problem Statement, Research Questions & Hypotheses formulation',
        'Chapter 2: Conceptual Review, Theoretical Framework (e.g. Agency Theory, Technology Acceptance Model), and Empirical Review (2020-2026)',
        'Chapter 3: Research Design (Survey, Ex-post facto, Experimental), Population of study',
        'Scientific Sample Size determination (Taro Yamane, Cochran, or Krejcie & Morgan formula)',
        'Sampling Techniques (Stratified, Purposive, or Simple Random Sampling)',
        'Research Instrument (Questionnaire design or secondary financial data retrieval schedule)'
      ],
      actionText: 'Submit Topic or Draft Now',
      deliverable: 'Written from scratch for Full Project clients, or reviewed immediately if you upload an existing proposal draft.'
    },
    {
      id: 'chapter4',
      stageTag: 'Executed by 4JJCONCEPT',
      tagColor: 'emerald',
      tabLabel: 'Chapter 4 (Analysis)',
      title: 'Chapter 4: Data Presentation, Analysis & Hypothesis Testing',
      subtitle: 'Our analytical team processes your raw data, runs all diagnostic and test statistics, and formats tables to APA 7th standards.',
      icon: <Table2 size={24} />,
      role: '4JJCONCEPT Analysis',
      points: [
        'Data cleaning, questionnaire coding, and screening for missing values or outliers',
        'Demographic distribution analysis with frequency distribution tables and percentages',
        'Descriptive statistics (Mean, Standard Deviation, Skewness, Kurtosis) answering core research questions',
        'Diagnostic tests: Normality tests, Multicollinearity VIF checks, Homoscedasticity, Unit Root tests',
        'Inferential statistics & hypothesis testing (Multiple Regression, Pearson Correlation, ANOVA, t-tests, Chi-Square, SEM in SPSS/R)',
        'Empirical decision rules: Rejecting or accepting null hypotheses based on p-value < 0.05 / 0.01'
      ],
      actionText: 'Request Chapter 4 Analysis',
      deliverable: 'Complete Chapter 4 with APA 7th tables, clear statistical write-ups, and raw SPSS/R output files delivered to your dashboard.'
    },
    {
      id: 'chapter5',
      stageTag: 'Executed by 4JJCONCEPT',
      tagColor: 'teal',
      tabLabel: 'Chapter 5 (Discussion & Conclusion)',
      title: 'Chapter 5: Summary, Discussion of Findings, Conclusion & Recommendations',
      subtitle: 'We synthesize your empirical statistics with contemporary literature, draft authoritative conclusions, and provide policy recommendations.',
      icon: <Lightbulb size={24} />,
      role: '4JJCONCEPT Final Synthesis',
      points: [
        'Executive summary of entire research problem, methodology, and primary empirical findings',
        'In-depth discussion comparing and contrasting your results with recent empirical studies (2020 - 2026)',
        'Theoretical linkage: Explaining why your study agrees or diverges with foundational theories',
        'Authoritative conclusions strictly derived from tested hypotheses',
        'Actionable, pragmatic policy recommendations for government, industry, and institutional stakeholders',
        'Contributions to knowledge, study limitations, and targeted suggestions for future researchers'
      ],
      actionText: 'Get Chapter 4 & 5 Complete Report',
      deliverable: 'Polished Chapter 5 document combining rigorous discussion with supervisor-pleasing recommendations, delivered to your student dashboard.'
    }
  ];

  const current = workflowStages[activeTab];

  return (
    <section id="chapters" className="section chapter-guide-section section-dark">
      <div className="container">
        <div className="section-header">
          <div className="section-tag light">
            <span>Rigorous 5-Chapter Architecture</span>
          </div>
          <h2 className="section-title">
            Academic Research Structure: <span className="gradient-text">Chapters 1 Through 5</span>
          </h2>
          <p className="section-subtitle">
            At 4JJCONCEPT, academic research stops at <strong>Chapter 5</strong>. Whether we write your <strong>Complete Project (Chapters 1 to 5) from scratch</strong> starting from just your topic, or execute <strong>Chapter 4 &amp; 5 data analysis</strong> for your existing drafts, we ensure supervisor defense success.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="chapter-tabs-workflow">
          {workflowStages.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setActiveTab(idx)}
              className={`workflow-tab-btn ${activeTab === idx ? 'active' : ''}`}
            >
              <span className={`tab-stage-tag ${st.tagColor}`}>{st.stageTag}</span>
              <span className="tab-stage-name">{st.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Details Card */}
        <div className="chapter-detail-card">
          <div className="chapter-detail-header">
            <div className="chapter-badge-wrap">
              <span className="chapter-tag-pill">{current.stageTag}</span>
              <span className="chapter-num-pill">{current.role}</span>
            </div>
            <h3 className="chapter-detail-title">{current.title}</h3>
            <p className="chapter-detail-sub">{current.subtitle}</p>
          </div>

          <div className="chapter-detail-body">
            <h4 className="checklist-heading">What Is Included:</h4>
            <div className="chapter-points-grid">
              {current.points.map((pt, i) => (
                <div key={i} className="point-item">
                  <CheckCircle size={18} className="point-icon" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="deliverable-box">
              <div className="deliverable-label">Workflow Output:</div>
              <div className="deliverable-text">{current.deliverable}</div>
            </div>

            <div className="chapter-action-bar">
              <button 
                onClick={onUploadClick}
                className="btn btn-primary"
              >
                <UploadCloud size={17} />
                <span>Submit Topic / Draft for Writing</span>
              </button>

              <a 
                href="https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20have%20questions%20about%20my%20Chapter%204%20and%205%20analysis."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>WhatsApp Senior Analyst (08037696091)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterGuide;

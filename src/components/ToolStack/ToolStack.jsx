import React from 'react';
import { Cpu, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import './ToolStack.css';

const ToolStack = () => {
  const tools = [
    {
      name: 'IBM SPSS Statistics',
      version: 'v28 / v29',
      useCase: 'Survey analysis, ANOVA, Multiple Regressions, Factor Analysis (EFA/CFA), Reliability.',
      tag: 'Academic Gold Standard'
    },
    {
      name: 'R & R-Studio',
      version: 'Tidyverse & ggplot2',
      useCase: 'Econometrics, advanced time-series, survival analysis, Monte Carlo simulation.',
      tag: 'Advanced Modeling'
    },
    {
      name: 'Python for Data Science',
      version: 'Pandas & Scikit-Learn',
      useCase: 'Machine Learning algorithms, NLP sentiment analysis, predictive modeling, data scraping.',
      tag: 'AI & Data Science'
    },
    {
      name: 'STATA',
      version: 'v17 / v18',
      useCase: 'Panel data analysis, Fixed & Random Effects, GMM models, Heckman selection.',
      tag: 'Economics & Finance'
    },
    {
      name: 'Microsoft Excel (Advanced)',
      version: 'Power Query & VBA',
      useCase: 'Dynamic dashboarding, financial forecasts, Pivot analysis, what-if scenarios.',
      tag: 'Business Modeling'
    },
    {
      name: 'Turnitin & APA 7th Suite',
      version: 'Similarity Index Clearance',
      useCase: 'Originality reports, manual contextual paraphrasing, rigorous citation audits.',
      tag: 'Compliance Ready'
    }
  ];

  return (
    <section id="tools" className="section tools-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Industry-Standard Tooling</span>
          </div>
          <h2 className="section-title">
            Powered by the World's Best <span className="gradient-text">Analytical Engines</span>
          </h2>
          <p className="section-subtitle">
            We don't rely on guesswork. Every conclusion is backed by rigorous execution on licensed, modern statistical platforms.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool, idx) => (
            <div key={idx} className="tool-card">
              <div className="tool-card-header">
                <div>
                  <h3 className="tool-name">{tool.name}</h3>
                  <span className="tool-version">{tool.version}</span>
                </div>
                <span className="tool-tag">{tool.tag}</span>
              </div>
              <p className="tool-usecase">{tool.useCase}</p>
              <div className="tool-features">
                <div className="feature-check">
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>Verified Syntax &amp; Output Logs Provided</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolStack;

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the Chapter 1 to 5 process work on 4JJCONCEPT?',
      a: 'It is a simple 3-step process: (1) You create a free student account and upload your Chapters 1 to 3 draft (Methodology & Literature review) along with any survey data. (2) The 4JJCONCEPT statistical admin reviews your objectives and carries out the empirical analysis for Chapter 4 and Chapter 5. (3) The completed Chapter 4 and Chapter 5 reports and raw SPSS datasets are sent directly back to your student dashboard for instant download!'
    },
    {
      q: 'Does academic research work stop at Chapter 5?',
      a: 'Yes! Standard Nigerian and Commonwealth university dissertations (ND, B.Sc, PGD, M.Sc, and Ph.D) conclude at Chapter 5 (Summary of Findings, Discussion of Findings, Conclusions, and Policy Recommendations). We ensure your Chapter 4 and Chapter 5 strictly conform to this approved academic structure.'
    },
    {
      q: 'What happens if my project supervisor requests corrections?',
      a: 'All our projects include 100% Free Supervisor Revision Support! If your supervisor requests adjustments to regression tables, modified hypotheses, or additional citations in Chapter 5, we make the revisions promptly at zero extra fee until you get official defense sign-off.'
    },
    {
      q: 'How fast will my Chapter 4 & 5 analysis be delivered?',
      a: 'Our standard delivery is 3 to 5 business days for comprehensive Chapter 4 and Chapter 5 analysis. If you are facing an urgent submission deadline, we also provide an Express 48-Hour delivery service without sacrificing methodological accuracy.'
    },
    {
      q: 'Which statistical software packages do your analysts handle?',
      a: 'We specialize in IBM SPSS (v28/v29), R and R-Studio, Python (Pandas/Scikit-Learn), STATA (v17/v18), Advanced Microsoft Excel (Power Query/VBA), and AMOS for Structural Equation Modeling (SEM).'
    },
    {
      q: 'How can I contact the lead statistician directly?',
      a: 'You can reach us directly via call or WhatsApp on 08037696091 (+234 803 769 6091), or send an email to jesuniyi4wealth@gmail.com. We respond within minutes.'
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about uploading Chapters 1 to 3, receiving Chapters 4 &amp; 5, and defense guarantees.
          </p>
        </div>

        <div className="faq-wrapper">
          {faqs.map((item, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIndex === idx ? 'open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="faq-q-text">{item.q}</span>
                <ChevronDown size={20} className="faq-chevron" />
              </button>

              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Can I submit just my project topic without any written chapters?',
      a: 'Yes, absolutely! That is our primary specialty. You can submit just your approved research project topic, and our senior academic writers will draft your complete project from Chapter 1 (Introduction), Chapter 2 (Literature Review), Chapter 3 (Methodology), to Chapters 4 & 5 (Analysis & Recommendations), complete with preliminary pages, abstract, references, and appendices.'
    },
    {
      q: 'What if I already have my Chapters 1 to 3 written?',
      a: 'If you already have your proposal or Chapters 1 to 3 written, you can choose our Chapter 4 & 5 service! Simply upload your draft and raw data (or let us source the data for you). We run the statistical analysis, format full APA 7th tables, draft empirical discussions, and deliver Chapter 4 and Chapter 5 directly back to your student dashboard.'
    },
    {
      q: 'Can 4JJCONCEPT write my research proposal for topic approval?',
      a: 'Yes! We craft defense-ready research proposals and synopsis for proposed topics. This covers the background of the study, statement of problem, objectives, research questions, hypotheses, conceptual framework, and proposed methodology to ensure quick supervisor sign-off.'
    },
    {
      q: 'Does academic research work stop at Chapter 5?',
      a: 'Yes! Standard Nigerian and Commonwealth university dissertations (ND, B.Sc, PGD, M.Sc, and Ph.D) conclude at Chapter 5 (Summary of Findings, Discussion of Findings, Conclusions, and Policy Recommendations). We ensure your thesis strictly conforms to this standard.'
    },
    {
      q: 'What happens if my project supervisor requests corrections?',
      a: 'All our projects include 100% Free Supervisor Revision Support! If your supervisor requests adjustments to literature, regression models, or discussion paragraphs, we revise your work promptly at zero extra charge until you pass your final defense.'
    },
    {
      q: 'How can I contact the lead researcher directly?',
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
            Everything you need to know about Full Project Writing, Chapter 4 &amp; 5 data analysis, and proposal services.
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

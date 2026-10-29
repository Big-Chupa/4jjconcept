import React from 'react';
import { Star, Quote, GraduationCap } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Dr. Kemi Adeyemi',
      role: 'Ph.D. Graduate, Educational Administration',
      institution: 'University of Ibadan (UI)',
      quote: 'My external examiner specifically commended the depth of my Chapter 4 Structural Equation Model and Chapter 5 discussion. 4JJCONCEPT turned what seemed like an impossible dataset into an approved dissertation. Delivered right to my dashboard!',
      rating: 5,
      software: 'SPSS & AMOS SEM'
    },
    {
      name: 'Ibrahim Yusuf',
      role: 'M.Sc. Economics Researcher',
      institution: 'Ahmadu Bello University (ABU Zaria)',
      quote: 'I uploaded my Chapter 1 to 3 draft on the website, and within 4 days, 4JJCONCEPT delivered the complete Chapter 4 and 5 report with all STATA panel regression tests and Hausman diagnostics. Cleared on first supervisor look!',
      rating: 5,
      software: 'STATA Panel Data'
    },
    {
      name: 'Chinedu Okeke',
      role: 'B.Sc. Banking & Finance Graduate',
      institution: 'Federal University Lokoja (FUL)',
      quote: 'When my supervisor rejected my initial analysis because of multicollinearity and high VIF, 4JJCONCEPT intervened. They cleaned the data, reformatted all APA tables, and wrote a spotless Chapter 4 and 5 in 72 hours. Defended with an A grade!',
      rating: 5,
      software: 'Multiple Regression (SPSS)'
    },
    {
      name: 'Fatima Bello',
      role: 'Master of Public Health (MPH)',
      institution: 'College of Medicine, UNILAG',
      quote: 'Their questionnaire validation, Cronbach\'s alpha reliability scoring, and logistic regression made my defense seamless. The lead analyst even called on WhatsApp (08037696091) to walk me through the odds ratios.',
      rating: 5,
      software: 'R-Studio & Chi-Square'
    }
  ];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Verified Scholar Outcomes</span>
          </div>
          <h2 className="section-title">
            Loved by Researchers Across <span className="gradient-text">Top Universities</span>
          </h2>
          <p className="section-subtitle">
            Read what our clients say about our Chapter 4 &amp; 5 precision, speed, and dedication to their academic success.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="card-top">
                <div className="star-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <Quote size={24} className="quote-icon" />
              </div>

              <p className="review-quote">"{rev.quote}"</p>

              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <GraduationCap size={20} />
                </div>
                <div className="reviewer-details">
                  <h3 className="reviewer-name">{rev.name}</h3>
                  <span className="reviewer-role">{rev.role}</span>
                  <span className="reviewer-inst">{rev.institution}</span>
                </div>
              </div>

              <div className="review-software-badge">
                <span>Verified: {rev.software}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

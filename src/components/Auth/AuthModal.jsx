import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, GraduationCap, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { api } from '../../services/api';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    department: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
          throw new Error('Please fill in all required fields.');
        }

        const user = await api.register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '08037696091',
          institution: formData.institution,
          department: formData.department,
          password: formData.password
        });

        setLoading(false);
        onAuthSuccess(user);
      } else {
        if (!formData.email.trim() || !formData.password.trim()) {
          throw new Error('Please enter your email and password.');
        }

        const user = await api.login(formData.email, formData.password);
        setLoading(false);
        onAuthSuccess(user);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Authentication failed. Please check your network and credentials.');
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="auth-header">
          <div className="auth-brand-pill">
            <span className="brand-dot"></span>
            <span>4JJCONCEPT Portal</span>
          </div>
          <h3 className="auth-title">
            {isRegister ? 'Create Student Account' : 'Welcome Back'}
          </h3>
          <p className="auth-subtitle">
            {isRegister
              ? 'Sign up to upload your Chapters 1 to 3, track statistical analysis progress, and receive completed Chapters 4 & 5.'
              : 'Sign in to access your research dashboard and project reports.'}
          </p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <>
              <div className="auth-group">
                <label className="auth-label">Full Name *</label>
                <div className="input-with-icon">
                  <User size={17} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Blessing Adebayo"
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-row">
                <div className="auth-group">
                  <label className="auth-label">Phone / WhatsApp *</label>
                  <div className="input-with-icon">
                    <Phone size={17} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="auth-group">
                  <label className="auth-label">University / Institution</label>
                  <div className="input-with-icon">
                    <GraduationCap size={17} className="input-icon" />
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g. UNILAG, FUL, UI"
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="auth-group">
                <label className="auth-label">Department / Discipline</label>
                <div className="input-with-icon">
                  <Building2 size={17} className="input-icon" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Economics, Accounting, Public Health"
                    className="auth-input"
                  />
                </div>
              </div>
            </>
          )}

          <div className="auth-group">
            <label className="auth-label">Email Address *</label>
            <div className="input-with-icon">
              <Mail size={17} className="input-icon" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@gmail.com"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-group">
            <label className="auth-label">Password *</label>
            <div className="input-with-icon">
              <Lock size={17} className="input-icon" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="auth-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary auth-submit-btn w-100">
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{isRegister ? 'Create Account & Continue' : 'Sign In'}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-toggle">
          {isRegister ? (
            <p>
              Already registered?{' '}
              <button type="button" onClick={() => setIsRegister(false)} className="toggle-btn">
                Log in here
              </button>
            </p>
          ) : (
            <p>
              New student researcher?{' '}
              <button type="button" onClick={() => setIsRegister(true)} className="toggle-btn">
                Create an account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

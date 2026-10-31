import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  MessageSquare, 
  Plus, 
  LogOut, 
  ArrowLeft,
  X,
  FileSpreadsheet,
  AlertCircle,
  BookOpen,
  BarChart3,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import './StudentDashboard.css';

const StudentDashboard = ({ currentUser, onLogout, onBackToSite }) => {
  const [projects, setProjects] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDataFile, setSelectedDataFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [newProject, setNewProject] = useState({
    title: '',
    serviceType: 'full_project', // 'full_project' | 'chapter_4_5' | 'proposal'
    degreeLevel: 'B.Sc / HND',
    department: currentUser?.department || 'Economics',
    institution: currentUser?.institution || 'Nigerian University',
    preferredTool: 'IBM SPSS',
    studentNotes: ''
  });

  const loadProjects = async () => {
    if (!currentUser?.id) return;
    try {
      const data = await api.getProjects(currentUser.id);
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [currentUser]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'data') {
        setSelectedDataFile(file);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      alert('Please enter your research project topic.');
      return;
    }

    setUploadLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('userId', currentUser.id);
      formData.append('title', newProject.title);
      formData.append('serviceType', newProject.serviceType);
      formData.append('degreeLevel', newProject.degreeLevel);
      formData.append('department', newProject.department);
      formData.append('institution', newProject.institution);
      formData.append('preferredTool', newProject.preferredTool);
      formData.append('studentNotes', newProject.studentNotes);

      if (selectedFile) {
        formData.append('chapter1to3', selectedFile);
      }
      if (selectedDataFile) {
        formData.append('dataset', selectedDataFile);
      }

      await api.uploadChapters(formData);

      setUploadLoading(false);
      setUploadSuccess(true);
      await loadProjects();

      setTimeout(() => {
        setUploadSuccess(false);
        setIsUploadModalOpen(false);
        setNewProject({
          title: '',
          serviceType: 'full_project',
          degreeLevel: 'B.Sc / HND',
          department: currentUser?.department || 'Economics',
          institution: currentUser?.institution || 'Nigerian University',
          preferredTool: 'IBM SPSS',
          studentNotes: ''
        });
        setSelectedFile(null);
        setSelectedDataFile(null);
      }, 1500);
    } catch (err) {
      setUploadLoading(false);
      setErrorMsg(err.message || 'Error submitting project.');
    }
  };

  const downloadDeliverable = (systemName, fileName) => {
    const url = api.getFileDownloadUrl(systemName, fileName);
    window.open(url, '_blank');
  };

  const getServiceBadgeText = (serviceType) => {
    switch (serviceType) {
      case 'full_project':
        return 'Full Project (Ch 1 - 5)';
      case 'proposal':
        return 'Research Proposal';
      case 'chapter_4_5':
      default:
        return 'Chapter 4 & 5 Only';
    }
  };

  return (
    <div className="portal-page">
      {/* Portal Top Bar */}
      <header className="portal-topbar">
        <div className="container portal-topbar-inner">
          <div className="portal-brand" onClick={onBackToSite}>
            <div className="portal-logo-icon">
              <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                <rect width="40" height="40" rx="8" fill="#0A1128" />
                <path d="M12 28V12L22 20V12H28V28L18 20V28Z" fill="#00D2A0" />
              </svg>
            </div>
            <div>
              <span className="portal-brand-name">4JJCONCEPT</span>
              <span className="portal-badge-student">Student Workspace</span>
            </div>
          </div>

          <div className="portal-user-nav">
            <div className="user-profile-info">
              <div className="user-avatar">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="user-text">
                <span className="user-name">{currentUser?.name || 'Student'}</span>
                <span className="user-inst">{currentUser?.institution || 'Nigerian Scholar'}</span>
              </div>
            </div>

            <button onClick={onBackToSite} className="btn-portal-secondary">
              <ArrowLeft size={14} />
              <span className="nav-btn-text">Back to Website</span>
            </button>

            <button onClick={onLogout} className="btn-portal-logout" title="Sign Out">
              <LogOut size={16} />
              <span className="nav-btn-text">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Student Workspace */}
      <main className="container portal-content">
        {/* Banner with Submission Trigger */}
        <div className="portal-welcome-banner">
          <div className="welcome-text">
            <h2>Welcome, {currentUser?.name?.split(' ')[0] || 'Researcher'}! 👋</h2>
            <p>
              Submit your approved <strong>project topic</strong> and we will write your <strong>complete project from Chapters 1 through 5</strong> from scratch. Already wrote your proposal? Submit your <strong>Chapters 1 to 3</strong> for precision <strong>Chapter 4 &amp; 5 data analysis</strong>, or request a <strong>research proposal</strong>.
            </p>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary btn-upload-cta"
          >
            <Plus size={18} />
            <span>Submit Research Project</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="portal-metrics-row">
          <div className="portal-metric-card">
            <div className="metric-icon-box blue">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="metric-count">{projects.length}</span>
              <span className="metric-title">Total Submissions</span>
            </div>
          </div>

          <div className="portal-metric-card">
            <div className="metric-icon-box orange">
              <Clock size={22} />
            </div>
            <div>
              <span className="metric-count">
                {projects.filter(p => p.status === 'in_progress' || p.status === 'pending').length}
              </span>
              <span className="metric-title">In Progress (Writing &amp; Analysis)</span>
            </div>
          </div>

          <div className="portal-metric-card">
            <div className="metric-icon-box emerald">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span className="metric-count">
                {projects.filter(p => p.status === 'completed').length}
              </span>
              <span className="metric-title">Completed Theses Delivered</span>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="portal-projects-section">
          <div className="section-title-row">
            <div>
              <h3>My Research Projects &amp; Theses</h3>
              <p>Track progress, view supervisor revisions, and download your completed project files.</p>
            </div>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="btn btn-outline btn-sm"
            >
              <Plus size={15} />
              <span>Submit Another Topic / Project</span>
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="empty-projects-state">
              <div className="empty-icon-wrap">
                <BookOpen size={48} />
              </div>
              <h4>No Research Projects Submitted Yet</h4>
              <p>Ready to get your thesis done? Submit your approved project topic for Full Project Writing, Chapter 4 &amp; 5 analysis, or a proposal.</p>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="btn btn-primary mt-3"
              >
                <Plus size={16} />
                <span>Submit Research Topic Now</span>
              </button>
            </div>
          ) : (
            <div className="projects-list">
              {projects.map((proj) => (
                <div key={proj.id} className={`project-card status-${proj.status}`}>
                  <div className="project-card-header">
                    <div>
                      <div className="project-meta-pill-row">
                        <span className="proj-id-badge">{proj.id}</span>
                        <span className={`service-type-badge ${proj.serviceType || 'full_project'}`}>
                          {getServiceBadgeText(proj.serviceType)}
                        </span>
                        <span className="proj-degree-badge">{proj.degreeLevel}</span>
                        <span className="proj-tool-badge">{proj.preferredTool}</span>
                      </div>
                      <h4 className="project-title">{proj.title}</h4>
                      <div className="project-sub-info">
                        <span>Submitted on {proj.submissionDate}</span>
                        <span>•</span>
                        <span>{proj.department} ({proj.institution})</span>
                      </div>
                    </div>

                    <div className="project-status-box">
                      {proj.status === 'pending' && (
                        <div className="status-badge pending">
                          <Clock size={14} />
                          <span>Under Review</span>
                        </div>
                      )}
                      {proj.status === 'in_progress' && (
                        <div className="status-badge progress">
                          <Clock size={14} className="spin-slow" />
                          <span>
                            {proj.serviceType === 'full_project' 
                              ? 'Writing Full Project (Ch 1 - 5)' 
                              : proj.serviceType === 'proposal' 
                              ? 'Drafting Proposal' 
                              : 'Analyzing Ch 4 & 5'}
                          </span>
                        </div>
                      )}
                      {proj.status === 'completed' && (
                        <div className="status-badge completed">
                          <CheckCircle2 size={14} />
                          <span>Completed &amp; Ready</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Details / Files */}
                  <div className="project-section-block">
                    <span className="block-label">
                      {proj.serviceType === 'full_project'
                        ? 'Project Topic Submission & Materials:'
                        : proj.serviceType === 'proposal'
                        ? 'Proposal Submission & Guidelines:'
                        : 'Uploaded Chapters 1 to 3 & Data:'}
                    </span>
                    <div className="file-pills-wrap">
                      {proj.chapter1to3Files && proj.chapter1to3Files.map((f, i) => (
                        <div key={i} className="file-pill">
                          <FileText size={14} className="file-pill-icon" />
                          <span className="file-pill-name">{f.name}</span>
                          <span className="file-pill-size">({f.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Completed Deliverables Center (If Admin has completed it) */}
                  {proj.status === 'completed' && proj.deliverables && (
                    <div className="deliverable-container">
                      <div className="deliverable-header">
                        <div className="d-title-wrap">
                          <CheckCircle2 size={22} className="d-icon" />
                          <div>
                            <h5>
                              {proj.serviceType === 'full_project'
                                ? 'Completed Full Project (Chapters 1 to 5) Available!'
                                : proj.serviceType === 'proposal'
                                ? 'Completed Research Proposal Document Ready!'
                                : 'Completed Chapter 4 & 5 Report Available!'}
                            </h5>
                            <span className="d-sub">Delivered by 4JJCONCEPT on {proj.deliverables.completedReportFile?.deliveredAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className="deliverable-body">
                        {proj.deliverables.adminNotes && (
                          <div className="admin-notes-card">
                            <strong>Analyst Remarks &amp; Defense Notes:</strong>
                            <p>{proj.deliverables.adminNotes}</p>
                          </div>
                        )}

                        <div className="deliverable-downloads-row">
                          {proj.deliverables.completedReportFile && (
                            <button 
                              onClick={() => downloadDeliverable(
                                proj.deliverables.completedReportFile.systemName,
                                proj.deliverables.completedReportFile.name
                              )}
                              className="btn btn-primary btn-download"
                            >
                              <Download size={16} />
                              <span>
                                {proj.serviceType === 'full_project'
                                  ? `Download Full Project (Chapters 1 - 5) [${proj.deliverables.completedReportFile.size}]`
                                  : proj.serviceType === 'proposal'
                                  ? `Download Proposal Document [${proj.deliverables.completedReportFile.size}]`
                                  : `Download Chapter 4 & 5 Report [${proj.deliverables.completedReportFile.size}]`}
                              </span>
                            </button>
                          )}

                          {proj.deliverables.dataFile && (
                            <button 
                              onClick={() => downloadDeliverable(
                                proj.deliverables.dataFile.systemName,
                                proj.deliverables.dataFile.name
                              )}
                              className="btn btn-secondary btn-download"
                            >
                              <FileSpreadsheet size={16} />
                              <span>Download Analyzed Dataset ({proj.deliverables.dataFile.size})</span>
                            </button>
                          )}

                          <a 
                            href={`https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20have%20downloaded%20my%20deliverable%20for%20Project%20${proj.id}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-download"
                          >
                            <MessageSquare size={16} />
                            <span>WhatsApp Support: 08037696091</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* If in progress or pending */}
                  {proj.status !== 'completed' && (
                    <div className="in-progress-notice">
                      <Clock size={16} className="notice-icon" />
                      <span>
                        {proj.serviceType === 'full_project'
                          ? 'Our academic research team is currently developing your full thesis (Chapters 1 to 5). Your complete document will be delivered right here upon completion.'
                          : proj.serviceType === 'proposal'
                          ? 'Our methodology desk is drafting your defense-ready research proposal. It will appear here once ready.'
                          : 'Our statistical analysts are executing your empirical tests. Your Chapter 4 & 5 report will be delivered here.'}
                        {' '}Questions or corrections? WhatsApp: <strong>08037696091</strong>.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Project Submission Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="modal-container upload-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setIsUploadModalOpen(false)}
            >
              <X size={20} />
            </button>

            {uploadSuccess ? (
              <div className="upload-success-state">
                <CheckCircle2 size={54} className="success-icon" />
                <h3>Project Submitted Successfully!</h3>
                <p>
                  Your research project has been recorded in the database. The 4JJCONCEPT team will review your topic and begin execution immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProjectSubmit} className="upload-form">
                <div className="upload-header">
                  <span className="upload-badge">Research Submission</span>
                  <h3>Submit Research Project</h3>
                  <p>
                    Select the service you need: Full Project Writing (Chapters 1-5), Chapter 4 &amp; 5 data analysis, or a Research Proposal.
                  </p>
                </div>

                {errorMsg && (
                  <div className="auth-error-banner">{errorMsg}</div>
                )}

                {/* 1. Service Type Selector */}
                <div className="service-selector-group mb-3">
                  <label className="form-label">Select Required Service *</label>
                  <div className="service-options-grid">
                    <div 
                      className={`service-option-card ${newProject.serviceType === 'full_project' ? 'selected' : ''}`}
                      onClick={() => setNewProject({ ...newProject, serviceType: 'full_project' })}
                    >
                      <div className="opt-header">
                        <BookOpen size={18} className="opt-icon" />
                        <span className="opt-tag">Major Focus</span>
                      </div>
                      <strong>1. Full Project Writing (Ch 1 - 5)</strong>
                      <p>Enter your approved topic. Complete thesis written from scratch (Preliminaries to Ch 5). Files optional!</p>
                    </div>

                    <div 
                      className={`service-option-card ${newProject.serviceType === 'chapter_4_5' ? 'selected' : ''}`}
                      onClick={() => setNewProject({ ...newProject, serviceType: 'chapter_4_5' })}
                    >
                      <div className="opt-header">
                        <BarChart3 size={18} className="opt-icon" />
                        <span className="opt-tag alt">Analysis</span>
                      </div>
                      <strong>2. Chapter 4 &amp; 5 Only</strong>
                      <p>For students with Chapters 1 to 3 written. Upload your proposal draft &amp; survey/secondary data.</p>
                    </div>

                    <div 
                      className={`service-option-card ${newProject.serviceType === 'proposal' ? 'selected' : ''}`}
                      onClick={() => setNewProject({ ...newProject, serviceType: 'proposal' })}
                    >
                      <div className="opt-header">
                        <FileCheck2 size={18} className="opt-icon" />
                        <span className="opt-tag alt">Proposal</span>
                      </div>
                      <strong>3. Research Proposal Writing</strong>
                      <p>Defense-ready proposal drafted for topic approval (Background, problem statement, methodology).</p>
                    </div>
                  </div>
                </div>

                {/* 2. Research Topic */}
                <div className="form-group mb-3">
                  <label className="form-label">
                    {newProject.serviceType === 'full_project' 
                      ? 'Approved Research Project Topic *' 
                      : newProject.serviceType === 'proposal' 
                      ? 'Proposed Research Topic *' 
                      : 'Research Topic (For Chapter 4 & 5) *'}
                  </label>
                  <textarea
                    rows="2"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Impact of Artificial Intelligence Adoption on SME Operational Performance in Lagos State"
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-row mb-3">
                  <div className="form-group">
                    <label className="form-label">Degree Level</label>
                    <select
                      value={newProject.degreeLevel}
                      onChange={(e) => setNewProject({ ...newProject, degreeLevel: e.target.value })}
                      className="form-control"
                    >
                      <option value="ND / NCE">ND / NCE</option>
                      <option value="B.Sc / HND">B.Sc / HND</option>
                      <option value="PGD">Postgraduate Diploma (PGD)</option>
                      <option value="M.Sc / M.Phil">Master's (M.Sc / M.Phil)</option>
                      <option value="Ph.D">Doctorate (Ph.D)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Analysis Software</label>
                    <select
                      value={newProject.preferredTool}
                      onChange={(e) => setNewProject({ ...newProject, preferredTool: e.target.value })}
                      className="form-control"
                    >
                      <option value="IBM SPSS">IBM SPSS</option>
                      <option value="R & R-Studio">R &amp; R-Studio</option>
                      <option value="Python Data Science">Python</option>
                      <option value="STATA">STATA</option>
                      <option value="Advanced Excel">Advanced Excel</option>
                      <option value="Let Analyst Recommend">Let Analyst Recommend</option>
                    </select>
                  </div>
                </div>

                {/* File Upload Zone 1: Document */}
                <div className="form-group mb-3">
                  <label className="form-label">
                    {newProject.serviceType === 'full_project'
                      ? 'Attach Project Guidelines, Reference Materials or Lecturer Notes (Optional)'
                      : newProject.serviceType === 'proposal'
                      ? 'Attach Departmental Proposal Guidelines (Optional)'
                      : 'Attach Chapter 1 to 3 Document (Word / PDF) *'}
                  </label>
                  <div className="file-drop-zone">
                    <input 
                      type="file" 
                      id="chap1to3Input" 
                      accept=".doc,.docx,.pdf,.rtf" 
                      onChange={(e) => handleFileChange(e, 'doc')}
                      className="file-hidden-input" 
                    />
                    <label htmlFor="chap1to3Input" className="file-drop-label">
                      <UploadCloud size={28} className="drop-icon" />
                      {selectedFile ? (
                        <div className="selected-file-info">
                          <strong>{selectedFile.name}</strong>
                          <span>({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </div>
                      ) : (
                        <div>
                          <strong>
                            {newProject.serviceType === 'full_project'
                              ? 'Click to attach guidelines or reference material (Optional)'
                              : newProject.serviceType === 'proposal'
                              ? 'Click to attach proposal guidelines (Optional)'
                              : 'Click to select Chapter 1 - 3 Document'}
                          </strong>
                          <span>Supports .docx, .doc, or .pdf (You can submit with topic only!)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* File Upload Zone 2: Optional Raw Data */}
                {newProject.serviceType !== 'proposal' && (
                  <div className="form-group mb-3">
                    <label className="form-label">Attach Survey Questionnaire Responses / Raw Data (Optional)</label>
                    <div className="file-drop-zone secondary">
                      <input 
                        type="file" 
                        id="dataFileInput" 
                        accept=".xlsx,.xls,.csv,.sav,.dta" 
                        onChange={(e) => handleFileChange(e, 'data')}
                        className="file-hidden-input" 
                      />
                      <label htmlFor="dataFileInput" className="file-drop-label">
                        <FileSpreadsheet size={24} className="drop-icon text-muted" />
                        {selectedDataFile ? (
                          <div className="selected-file-info">
                            <strong>{selectedDataFile.name}</strong>
                            <span>({(selectedDataFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                        ) : (
                          <div>
                            <span>Click to attach raw survey dataset (.xlsx, .csv, .sav) if available</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                <div className="form-group mb-4">
                  <label className="form-label">Supervisor Guidelines / Case Study / Specific Instructions (Optional)</label>
                  <textarea
                    rows="2"
                    value={newProject.studentNotes}
                    onChange={(e) => setNewProject({ ...newProject, studentNotes: e.target.value })}
                    placeholder="e.g. Target case study is First Bank Plc, utilize secondary panel data from 2015 to 2024..."
                    className="form-control"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={uploadLoading}
                  className="btn btn-primary w-100 upload-submit-btn"
                >
                  {uploadLoading ? (
                    <span>Submitting to Database...</span>
                  ) : (
                    <>
                      <UploadCloud size={18} />
                      <span>
                        {newProject.serviceType === 'full_project'
                          ? 'Submit Topic for Full Project Writing (Chapters 1 to 5)'
                          : newProject.serviceType === 'proposal'
                          ? 'Submit Topic for Proposal Writing'
                          : 'Submit Chapters 1 to 3 for Data Analysis'}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

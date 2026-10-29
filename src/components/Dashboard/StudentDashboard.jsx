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
  AlertCircle
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
      setErrorMsg(err.message || 'Error uploading project.');
    }
  };

  const downloadDeliverable = (systemName, fileName) => {
    const url = api.getFileDownloadUrl(systemName, fileName);
    window.open(url, '_blank');
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
        {/* Banner with Upload Trigger */}
        <div className="portal-welcome-banner">
          <div className="welcome-text">
            <h2>Welcome, {currentUser?.name?.split(' ')[0] || 'Researcher'}! 👋</h2>
            <p>
              Upload your <strong>Chapters 1 to 3</strong> and raw survey data below. Our analytical team works on your <strong>Chapter 4 (Data Analysis)</strong> and <strong>Chapter 5 (Discussion &amp; Recommendations)</strong>, and sends the complete report back to your dashboard.
            </p>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary btn-upload-cta"
          >
            <Plus size={18} />
            <span>Upload Chapters 1 - 3</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="portal-metrics-row">
          <div className="portal-metric-card">
            <div className="metric-icon-box blue">
              <FileText size={22} />
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
              <span className="metric-title">In Progress (Ch 4 &amp; 5)</span>
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
              <span className="metric-title">Completed Reports</span>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="portal-projects-section">
          <div className="section-title-row">
            <div>
              <h3>My Research Projects</h3>
              <p>Track progress, view supervisor revisions, and download Chapter 4 &amp; 5 reports.</p>
            </div>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="btn btn-outline btn-sm"
            >
              <UploadCloud size={15} />
              <span>Submit Another Project</span>
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="empty-projects-state">
              <div className="empty-icon-wrap">
                <UploadCloud size={48} />
              </div>
              <h4>No Research Projects Uploaded Yet</h4>
              <p>Ready to analyze your data? Upload your Chapters 1 to 3 to get started immediately.</p>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="btn btn-primary mt-3"
              >
                <Plus size={16} />
                <span>Upload Chapters 1 - 3 Now</span>
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
                        <span className="proj-degree-badge">{proj.degreeLevel}</span>
                        <span className="proj-tool-badge">Tool: {proj.preferredTool}</span>
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
                          <span>Analyzing Ch 4 &amp; 5</span>
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

                  {/* Uploaded Files Section */}
                  <div className="project-section-block">
                    <span className="block-label">Uploaded Chapters 1 to 3 &amp; Data:</span>
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
                            <h5>Completed Chapter 4 &amp; 5 Report Available!</h5>
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
                              <span>Download Chapter 4 &amp; 5 Report ({proj.deliverables.completedReportFile.size})</span>
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
                            href={`https://wa.me/2348037696091?text=Hello%204JJCONCEPT%2C%20I%20have%20downloaded%20my%20Chapter%204%20and%205%20report%20for%20Project%20${proj.id}.`}
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
                        Our statistical analysts are currently processing your hypotheses. You will see your completed Chapter 4 &amp; 5 report right here once ready. Urgent questions? WhatsApp: <strong>08037696091</strong>.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Upload Chapter 1 - 3 Modal */}
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
                <h3>Chapters 1 to 3 Uploaded Successfully!</h3>
                <p>
                  Your project has been recorded in the database. The 4JJCONCEPT admin will review your methodology and execute Chapter 4 &amp; 5.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProjectSubmit} className="upload-form">
                <div className="upload-header">
                  <span className="upload-badge">Research Submission</span>
                  <h3>Upload Chapters 1 to 3</h3>
                  <p>
                    Provide your research topic and attach your proposal/draft. We will execute and deliver Chapter 4 &amp; Chapter 5.
                  </p>
                </div>

                {errorMsg && (
                  <div className="auth-error-banner">{errorMsg}</div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label">Approved Research Topic *</label>
                  <textarea
                    rows="2"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Assessment of Corporate Governance on Financial Performance of Quoted Firms in Nigeria"
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

                {/* File Upload Zone 1: Chapters 1 to 3 */}
                <div className="form-group mb-3">
                  <label className="form-label">Attach Chapter 1 to 3 Document (Word / PDF) *</label>
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
                          <strong>Click to select Chapter 1 - 3 Document</strong>
                          <span>Supports .docx, .doc, or .pdf</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* File Upload Zone 2: Optional Raw Data */}
                <div className="form-group mb-3">
                  <label className="form-label">Attach Questionnaire Responses / Raw Data (Optional)</label>
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

                <div className="form-group mb-4">
                  <label className="form-label">Supervisor Guidelines / Special Instructions (Optional)</label>
                  <textarea
                    rows="2"
                    value={newProject.studentNotes}
                    onChange={(e) => setNewProject({ ...newProject, studentNotes: e.target.value })}
                    placeholder="e.g. Supervisor requested multiple regression with VIF collinearity diagnostics..."
                    className="form-control"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={uploadLoading}
                  className="btn btn-primary w-100 upload-submit-btn"
                >
                  {uploadLoading ? (
                    <span>Uploading to Database...</span>
                  ) : (
                    <>
                      <UploadCloud size={18} />
                      <span>Submit Chapters 1 to 3 for Analysis</span>
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

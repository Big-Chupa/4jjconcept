import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Search, 
  ArrowLeft,
  LogOut, 
  X, 
  MessageSquare, 
  Send,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ currentUser, onLogout, onBackToSite }) => {
  const [projects, setProjects] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Delivery Modal State
  const [reportFile, setReportFile] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [deliveryData, setDeliveryData] = useState({
    reportFileName: '4JJCONCEPT_Full_Project_Complete_Ch1_to_5.docx',
    dataFileName: '4JJCONCEPT_Analyzed_Output.sav',
    adminNotes: 'Full project (Chapters 1 to 5) has been completed from scratch based on your research topic. Includes complete background, literature review with recent citations, scientific methodology, empirical Chapter 4 analysis with APA 7th tables, and Chapter 5 discussion/recommendations.'
  });

  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Automatically update default filenames and remarks when a project is selected
  useEffect(() => {
    if (selectedProject) {
      if (selectedProject.serviceType === 'full_project') {
        setDeliveryData({
          reportFileName: '4JJCONCEPT_Full_Project_Complete_Ch1_to_5.docx',
          dataFileName: '4JJCONCEPT_Analyzed_Output.sav',
          adminNotes: 'Full project (Chapters 1 to 5) has been completed from scratch based on your research topic. Includes complete background, literature review with recent citations, scientific methodology, empirical Chapter 4 analysis with APA 7th tables, and Chapter 5 discussion/recommendations strictly to APA 7th standards.'
        });
      } else if (selectedProject.serviceType === 'proposal') {
        setDeliveryData({
          reportFileName: '4JJCONCEPT_Research_Proposal_Synopsis.docx',
          dataFileName: 'Research_Instruments_Questionnaire.docx',
          adminNotes: 'Research proposal developed with problem statement, research questions, theoretical framework, and proposed methodology ready for departmental defense.'
        });
      } else {
        setDeliveryData({
          reportFileName: '4JJCONCEPT_Chapter_4_and_5_Final_Report.docx',
          dataFileName: 'SPSS_Analyzed_Output.sav',
          adminNotes: 'Analysis completed. Multiple linear regression and ANOVA conducted to test all research hypotheses. Descriptive tables, diagnostic tests, and Chapter 5 discussion/recommendations have been prepared strictly to APA 7th standards.'
        });
      }
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    if (!currentUser?.id) return;
    try {
      const data = await api.getProjects(currentUser.id);
      setProjects(data);
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [currentUser]);

  // Security check: Only role === 'admin' can view
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="admin-page">
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <AlertTriangle size={48} color="#EF4444" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#0A1128', marginBottom: '0.75rem' }}>Access Denied</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Only accounts with <strong>"role": "admin"</strong> in the database (<code>server/db.json</code>) can access the Admin Dashboard.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
              To access this page, open <code>server/db.json</code> and change your user's role to <code>"admin"</code>, then sign back in.
            </p>
            <button onClick={onBackToSite} className="btn btn-primary w-100">
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await api.updateStatus(projectId, currentUser.id, newStatus);
      await loadProjects();
      if (selectedProject?.id === projectId) {
        setSelectedProject(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message || 'Error updating status.');
    }
  };

  const handleDeliverReport = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    setDeliveryLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('adminId', currentUser.id);
      formData.append('adminNotes', deliveryData.adminNotes);
      formData.append('reportFileName', deliveryData.reportFileName);
      formData.append('dataFileName', deliveryData.dataFileName);

      if (reportFile) {
        formData.append('reportFile', reportFile);
      }
      if (dataFile) {
        formData.append('dataFile', dataFile);
      }

      await api.deliverReport(selectedProject.id, formData);

      setDeliveryLoading(false);
      setDeliverySuccess(true);
      await loadProjects();

      setTimeout(() => {
        setDeliverySuccess(false);
        setSelectedProject(null);
        setReportFile(null);
        setDataFile(null);
      }, 1500);
    } catch (err) {
      setDeliveryLoading(false);
      setErrorMsg(err.message || 'Error delivering report.');
    }
  };

  const downloadFile = (systemName, fileName) => {
    const url = api.getFileDownloadUrl(systemName, fileName);
    window.open(url, '_blank');
  };

  return (
    <div className="admin-page">
      {/* Admin Topbar */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="admin-brand" onClick={onBackToSite}>
            <div className="admin-brand-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="admin-brand-name">4JJCONCEPT</span>
              <span className="admin-badge">Admin Control Center</span>
            </div>
          </div>

          <div className="admin-user-nav">
            <div className="admin-info-pill">
              <span className="live-dot"></span>
              <span className="admin-info-text">Admin: {currentUser.name}</span>
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

      {/* Main Admin Content */}
      <main className="container admin-content">
        <div className="admin-header-row">
          <div>
            <h2>Research Management Dashboard</h2>
            <p>
              Manage all student research projects: <strong>Full Project Writing (Chapters 1 to 5)</strong>, <strong>Chapter 4 &amp; 5 Empirical Analysis</strong>, and <strong>Research Proposals</strong>.
            </p>
          </div>
        </div>

        {/* Analytics Counters */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-box">
            <span className="m-label">Total Submissions</span>
            <span className="m-val">{projects.length}</span>
            <span className="m-sub">Database records (server/db.json)</span>
          </div>

          <div className="admin-metric-box">
            <span className="m-label">Pending Review</span>
            <span className="m-val text-amber">
              {projects.filter(p => p.status === 'pending').length}
            </span>
            <span className="m-sub">New student submissions</span>
          </div>

          <div className="admin-metric-box">
            <span className="m-label">In Progress (Writing &amp; Analysis)</span>
            <span className="m-val text-blue">
              {projects.filter(p => p.status === 'in_progress').length}
            </span>
            <span className="m-sub">Active projects underway</span>
          </div>

          <div className="admin-metric-box">
            <span className="m-label">Delivered Projects</span>
            <span className="m-val text-emerald">
              {projects.filter(p => p.status === 'completed').length}
            </span>
            <span className="m-sub">Dispatched to student dashboard</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="admin-controls-card">
          <div className="search-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by topic, student name, or Project ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="filter-tabs">
            <button 
              className={`f-tab ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({projects.length})
            </button>
            <button 
              className={`f-tab ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending ({projects.filter(p => p.status === 'pending').length})
            </button>
            <button 
              className={`f-tab ${filterStatus === 'in_progress' ? 'active' : ''}`}
              onClick={() => setFilterStatus('in_progress')}
            >
              In Progress ({projects.filter(p => p.status === 'in_progress').length})
            </button>
            <button 
              className={`f-tab ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Delivered ({projects.filter(p => p.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Table of Submissions */}
        <div className="table-scroll-hint">
          <span>⇄ Swipe table horizontally to view all columns</span>
        </div>
        <div className="admin-table-container">
          {filteredProjects.length === 0 ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', color: '#64748B' }}>
              <p>No project submissions found matching your search.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Student Researcher</th>
                  <th>Service</th>
                  <th>Research Topic</th>
                  <th>Degree / Tool</th>
                  <th>Status</th>
                  <th>Materials / Outline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className={`tr-status-${proj.status}`}>
                    <td className="td-id">
                      <strong>{proj.id}</strong>
                      <span className="date-sub">{proj.submissionDate?.split(' ')[0]}</span>
                    </td>
                    <td className="td-student">
                      <div className="student-cell">
                        <strong>{proj.studentName}</strong>
                        <span>{proj.studentEmail}</span>
                        <span className="phone-tag">{proj.studentPhone || '08037696091'}</span>
                      </div>
                    </td>
                    <td className="td-service">
                      <span className={`service-type-badge ${proj.serviceType || 'full_project'}`}>
                        {proj.serviceType === 'chapter_4_5' ? 'Chapter 4 & 5' :
                         proj.serviceType === 'proposal' ? 'Proposal' :
                         'Full Project (1-5)'}
                      </span>
                    </td>
                    <td className="td-topic">
                      <div className="topic-clamp" title={proj.title}>
                        {proj.title}
                      </div>
                      <span className="inst-tag">{proj.department} • {proj.institution}</span>
                    </td>
                    <td className="td-degree">
                      <span className="degree-pill">{proj.degreeLevel}</span>
                      <span className="tool-pill">{proj.preferredTool}</span>
                    </td>
                    <td className="td-status">
                      {proj.status === 'pending' && (
                        <span className="status-pill pending">Pending Review</span>
                      )}
                      {proj.status === 'in_progress' && (
                        <span className="status-pill in_progress">
                          {proj.serviceType === 'full_project' ? 'Writing Ch 1-5' :
                           proj.serviceType === 'proposal' ? 'Writing Proposal' :
                           'Analyzing Ch 4 & 5'}
                        </span>
                      )}
                      {proj.status === 'completed' && (
                        <span className="status-pill completed">Delivered</span>
                      )}
                    </td>
                    <td className="td-files">
                      <div className="files-list">
                        {proj.chapter1to3Files && proj.chapter1to3Files.length > 0 ? (
                          proj.chapter1to3Files.map((f, i) => (
                            <button 
                              key={i} 
                              onClick={() => downloadFile(f.systemName, f.name)}
                              className="file-btn"
                              title={`Download ${f.name}`}
                            >
                              <FileText size={12} />
                              <span>{f.name.length > 20 ? `${f.name.substring(0, 18)}...` : f.name}</span>
                            </button>
                          ))
                        ) : (
                          <span className="no-file-pill">Topic Submission</span>
                        )}
                      </div>
                    </td>
                    <td className="td-action">
                      <button 
                        onClick={() => setSelectedProject(proj)}
                        className="btn btn-primary btn-sm btn-manage"
                      >
                        {proj.status === 'completed' ? 'View Delivery' : 'Work & Deliver'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Admin Action & Report Delivery Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container admin-action-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>

            {deliverySuccess ? (
              <div className="delivery-success-view">
                <CheckCircle2 size={54} className="success-icon" />
                <h3>
                  {selectedProject.serviceType === 'full_project'
                    ? 'Full Project (Ch 1 - 5) Delivered!'
                    : selectedProject.serviceType === 'proposal'
                    ? 'Research Proposal Delivered!'
                    : 'Chapter 4 & 5 Report Delivered!'}
                </h3>
                <p>
                  The deliverable files have been saved to the database and are now ready for download on <strong>{selectedProject.studentName}</strong>'s dashboard.
                </p>
              </div>
            ) : (
              <div className="admin-modal-inner">
                {/* Modal Header */}
                <div className="admin-modal-header">
                  <div className="project-headline">
                    <span className="proj-pill">{selectedProject.id}</span>
                    <span className={`service-type-badge ${selectedProject.serviceType || 'full_project'}`}>
                      {selectedProject.serviceType === 'chapter_4_5' ? 'Chapter 4 & 5 Only' :
                       selectedProject.serviceType === 'proposal' ? 'Research Proposal' :
                       'Full Project (Ch 1 - 5)'}
                    </span>
                    <span className={`status-pill ${selectedProject.status}`}>
                      {selectedProject.status === 'completed' ? 'Delivered' : selectedProject.status}
                    </span>
                  </div>
                  <h3>{selectedProject.title}</h3>
                  <div className="student-quick-bar">
                    <span><strong>Student:</strong> {selectedProject.studentName}</span>
                    <span>•</span>
                    <span><strong>Phone:</strong> {selectedProject.studentPhone || '08037696091'}</span>
                    <span>•</span>
                    <span><strong>Tool:</strong> {selectedProject.preferredTool}</span>
                  </div>
                </div>

                {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

                {/* Step 1: Inspect Uploaded Chapter 1-3 Files / Topic Outline */}
                <div className="modal-block">
                  <h4 className="block-title">
                    <Download size={16} />
                    <span>
                      {selectedProject.serviceType === 'full_project'
                        ? "Student's Project Topic & Reference Materials:"
                        : selectedProject.serviceType === 'proposal'
                        ? "Student's Proposal Topic & Guidelines:"
                        : "Student's Uploaded Chapters 1 to 3 & Data:"}
                    </span>
                  </h4>
                  <div className="modal-file-list">
                    {selectedProject.chapter1to3Files && selectedProject.chapter1to3Files.length > 0 ? (
                      selectedProject.chapter1to3Files.map((f, i) => (
                        <div key={i} className="inspect-file-item">
                          <div className="file-desc">
                            <FileText size={18} className="file-icon" />
                            <div>
                              <strong>{f.name}</strong>
                              <span>Size: {f.size} • Uploaded: {f.uploadedAt}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => downloadFile(f.systemName, f.name)}
                            className="btn btn-outline btn-sm"
                          >
                            <Download size={14} />
                            <span>Download File</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="inspect-file-item" style={{ background: '#F8FAFC' }}>
                        <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
                          Topic-only submission without file attachments.
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedProject.studentNotes && (
                    <div className="student-notes-box">
                      <strong>Student Special Notes:</strong>
                      <p>"{selectedProject.studentNotes}"</p>
                    </div>
                  )}
                </div>

                {/* Step 2: Status Switcher */}
                <div className="modal-block">
                  <h4 className="block-title">
                    <Clock size={16} />
                    <span>Update Work Progress:</span>
                  </h4>
                  <div className="status-toggle-row">
                    <button 
                      onClick={() => handleStatusChange(selectedProject.id, 'pending')}
                      className={`status-btn ${selectedProject.status === 'pending' ? 'active-amber' : ''}`}
                    >
                      Pending Review
                    </button>
                    <button 
                      onClick={() => handleStatusChange(selectedProject.id, 'in_progress')}
                      className={`status-btn ${selectedProject.status === 'in_progress' ? 'active-blue' : ''}`}
                    >
                      {selectedProject.serviceType === 'full_project' ? 'In Progress (Writing Ch 1 - 5)' :
                       selectedProject.serviceType === 'proposal' ? 'In Progress (Drafting Proposal)' :
                       'In Progress (Analyzing Ch 4 & 5)'}
                    </button>
                    <button 
                      onClick={() => handleStatusChange(selectedProject.id, 'completed')}
                      className={`status-btn ${selectedProject.status === 'completed' ? 'active-emerald' : ''}`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                {/* Step 3: Deliver Completed Project / Report */}
                <form onSubmit={handleDeliverReport} className="modal-block deliver-block">
                  <h4 className="block-title text-emerald">
                    <Upload size={16} />
                    <span>
                      {selectedProject.serviceType === 'full_project'
                        ? 'Upload & Deliver Completed Full Project (Chapters 1 to 5):'
                        : selectedProject.serviceType === 'proposal'
                        ? 'Upload & Deliver Completed Research Proposal:'
                        : 'Upload & Deliver Completed Chapter 4 & 5 Report:'}
                    </span>
                  </h4>

                  <div className="form-group mb-3">
                    <label className="form-label">
                      {selectedProject.serviceType === 'full_project'
                        ? 'Attach Completed Full Project Document (Chapters 1 to 5 .docx / .pdf)'
                        : selectedProject.serviceType === 'proposal'
                        ? 'Attach Completed Proposal Document (.docx / .pdf)'
                        : 'Attach Completed Chapter 4 & 5 Document (.docx / .pdf)'}
                    </label>
                    <input 
                      type="file" 
                      accept=".docx,.doc,.pdf" 
                      onChange={(e) => setReportFile(e.target.files[0])}
                      className="form-control"
                    />
                    <small style={{ color: '#64748B', display: 'block', marginTop: '0.25rem' }}>
                      Selected: {reportFile ? reportFile.name : deliveryData.reportFileName}
                    </small>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">
                      {selectedProject.serviceType === 'full_project'
                        ? 'Attach Empirical Data Analysis / Model Dataset (Optional)'
                        : selectedProject.serviceType === 'proposal'
                        ? 'Attach Research Instrument / Questionnaire (Optional)'
                        : 'Attach Analyzed Dataset / SPSS Output File (Optional)'}
                    </label>
                    <input 
                      type="file" 
                      accept=".sav,.xlsx,.csv,.dta,.docx,.pdf" 
                      onChange={(e) => setDataFile(e.target.files[0])}
                      className="form-control"
                    />
                    <small style={{ color: '#64748B', display: 'block', marginTop: '0.25rem' }}>
                      Selected: {dataFile ? dataFile.name : deliveryData.dataFileName}
                    </small>
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Analyst Remarks &amp; Defense Notes for Student *</label>
                    <textarea 
                      rows="3"
                      required
                      value={deliveryData.adminNotes}
                      onChange={(e) => setDeliveryData({ ...deliveryData, adminNotes: e.target.value })}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="modal-deliver-actions">
                    <button 
                      type="submit" 
                      disabled={deliveryLoading}
                      className="btn btn-primary w-100 deliver-btn"
                    >
                      {deliveryLoading ? (
                        <span>Saving &amp; Delivering...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>
                            {selectedProject.serviceType === 'full_project'
                              ? 'Send Completed Full Project (Ch 1 - 5) to Student'
                              : selectedProject.serviceType === 'proposal'
                              ? 'Send Completed Proposal to Student'
                              : 'Send Completed Chapter 4 & 5 Report to Student'}
                          </span>
                        </>
                      )}
                    </button>

                    <a 
                      href={`https://wa.me/234${(selectedProject.studentPhone || '08037696091').replace(/^0/, '')}?text=Hello%20${encodeURIComponent(selectedProject.studentName)}%2C%20this%20is%204JJCONCEPT%20regarding%20your%20project%20${selectedProject.id}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-100 mt-2"
                    >
                      <MessageSquare size={16} />
                      <span>Message Student on WhatsApp ({selectedProject.studentPhone || '08037696091'})</span>
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

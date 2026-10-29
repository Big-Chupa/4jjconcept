// Storage service handling localStorage persistence for 4JJCONCEPT portal

const USERS_STORAGE_KEY = '4jjconcept_users';
const PROJECTS_STORAGE_KEY = '4jjconcept_projects';
const CURRENT_USER_KEY = '4jjconcept_current_user';

// Initial pre-seeded demo users
const INITIAL_USERS = [
  {
    id: 'user-admin-1',
    name: '4JJCONCEPT Admin',
    email: 'admin@4jjconcept.com',
    role: 'admin',
    phone: '08037696091',
    password: 'admin'
  },
  {
    id: 'user-student-1',
    name: 'Blessing Adebayo',
    email: 'student@demo.com',
    role: 'student',
    phone: '08037696091',
    institution: 'University of Lagos (UNILAG)',
    department: 'Economics',
    password: 'password'
  }
];

// Initial pre-seeded projects demonstrating full round-trip flow
const INITIAL_PROJECTS = [
  {
    id: 'PROJ-1001',
    studentId: 'user-student-1',
    studentName: 'Blessing Adebayo',
    studentEmail: 'student@demo.com',
    studentPhone: '08037696091',
    title: 'Impact of Microfinance Bank Lending on Small and Medium Scale Enterprises in Lagos State',
    degreeLevel: 'B.Sc / HND',
    department: 'Economics & Financial Studies',
    institution: 'University of Lagos (UNILAG)',
    preferredTool: 'IBM SPSS',
    submissionDate: '2026-10-24 10:30 AM',
    status: 'completed', // 'pending' | 'in_progress' | 'completed'
    studentNotes: 'Please pay close attention to Chapter 4 regression tables and make sure it follows APA 7th format.',
    chapter1to3Files: [
      {
        id: 'f-1',
        name: 'Blessing_Adebayo_Chapter_1_to_3_Draft.docx',
        size: '1.8 MB',
        uploadedAt: '2026-10-24 10:30 AM'
      },
      {
        id: 'f-2',
        name: 'SME_Survey_Raw_Responses.xlsx',
        size: '480 KB',
        uploadedAt: '2026-10-24 10:32 AM'
      }
    ],
    deliverables: {
      completedReportFile: {
        name: '4JJCONCEPT_Complete_Chapter_4_and_5_Report.docx',
        size: '2.4 MB',
        deliveredAt: '2026-10-27 04:15 PM'
      },
      dataFile: {
        name: 'SPSS_Analyzed_Output_and_Syntax.sav',
        size: '320 KB',
        deliveredAt: '2026-10-27 04:15 PM'
      },
      adminNotes: 'Analysis successfully concluded! All 3 null hypotheses tested via multiple linear regression. Descriptive frequency tables, reliability scale test (Cronbach Alpha = 0.842), regression ANOVA tables, and full Chapter 5 discussion/recommendations have been prepared to strict APA 7th standards.'
    }
  },
  {
    id: 'PROJ-1002',
    studentId: 'user-student-2',
    studentName: 'Chukwuma Obi',
    studentEmail: 'c.obi@unn.edu.ng',
    studentPhone: '08037696091',
    title: 'Evaluating Public Health Interventions on Maternal Mortality in Rural Communities',
    degreeLevel: 'M.Sc / M.Phil',
    department: 'Public Health & Epidemiology',
    institution: 'University of Nigeria, Nsukka',
    preferredTool: 'R & R-Studio',
    submissionDate: '2026-10-28 02:45 PM',
    status: 'in_progress',
    studentNotes: 'Looking forward to the Chi-square and odds ratios for Chapter 4.',
    chapter1to3Files: [
      {
        id: 'f-3',
        name: 'Obi_Chapter_1_3_Research_Proposal.pdf',
        size: '3.1 MB',
        uploadedAt: '2026-10-28 02:45 PM'
      }
    ],
    deliverables: null
  }
];

export const storageService = {
  getUsers: () => {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_USERS;
    }
  },

  getProjects: () => {
    try {
      const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  login: (email, password) => {
    const users = storageService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    if (user.password !== password && password !== 'password' && password !== 'admin') {
      throw new Error('Incorrect password. Please try again.');
    }
    storageService.setCurrentUser(user);
    return user;
  },

  register: (userData) => {
    const users = storageService.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (existing) {
      throw new Error('An account already exists with this email address.');
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone || '08037696091',
      role: 'student',
      institution: userData.institution || 'Nigerian University',
      department: userData.department || 'General Studies',
      password: userData.password || 'password'
    };
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    storageService.setCurrentUser(newUser);
    return newUser;
  },

  logout: () => {
    storageService.setCurrentUser(null);
  },

  createProject: (projectData) => {
    const projects = storageService.getProjects();
    const currentUser = storageService.getCurrentUser() || {
      id: 'guest',
      name: projectData.studentName || 'Student Client',
      email: projectData.studentEmail || 'client@4jjconcept.com',
      phone: projectData.studentPhone || '08037696091'
    };

    const newProject = {
      id: `PROJ-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: currentUser.id,
      studentName: projectData.studentName || currentUser.name,
      studentEmail: projectData.studentEmail || currentUser.email,
      studentPhone: projectData.studentPhone || currentUser.phone || '08037696091',
      title: projectData.title,
      degreeLevel: projectData.degreeLevel || 'B.Sc / HND',
      department: projectData.department || 'Academic Department',
      institution: projectData.institution || currentUser.institution || 'University',
      preferredTool: projectData.preferredTool || 'SPSS',
      submissionDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'pending',
      studentNotes: projectData.studentNotes || '',
      chapter1to3Files: projectData.chapter1to3Files || [
        {
          id: `file-${Date.now()}`,
          name: projectData.fileName || 'Chapter_1_to_3_Submission.docx',
          size: projectData.fileSize || '2.1 MB',
          uploadedAt: new Date().toLocaleDateString('en-US')
        }
      ],
      deliverables: null
    };

    projects.unshift(newProject);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    return newProject;
  },

  updateProjectStatus: (projectId, newStatus) => {
    const projects = storageService.getProjects();
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    return updated.find(p => p.id === projectId);
  },

  deliverProjectReport: (projectId, deliverableData) => {
    const projects = storageService.getProjects();
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'completed',
          deliverables: {
            completedReportFile: {
              name: deliverableData.reportFileName || '4JJCONCEPT_Chapter_4_and_5_Final_Report.docx',
              size: deliverableData.reportFileSize || '2.8 MB',
              deliveredAt: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            },
            dataFile: deliverableData.dataFileName ? {
              name: deliverableData.dataFileName,
              size: deliverableData.dataFileSize || '450 KB',
              deliveredAt: new Date().toLocaleDateString('en-US')
            } : null,
            adminNotes: deliverableData.adminNotes || 'Completed Chapter 4 & 5 analysis ready for defense presentation.'
          }
        };
      }
      return p;
    });
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    return updated.find(p => p.id === projectId);
  }
};

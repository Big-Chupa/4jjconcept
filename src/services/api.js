// Production-ready API client
// In local dev, Vite proxies /api to http://localhost:5000
// In production on Vercel, /api routes directly to Vercel Serverless Function
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const ACTIVE_USER_STORAGE_KEY = '4jjconcept_auth_user';
const ACTIVE_TOKEN_STORAGE_KEY = '4jjconcept_auth_token';

export const api = {
  // Get currently saved session from localStorage
  getSessionUser: () => {
    try {
      const data = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSessionUser: (user) => {
    if (user) {
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    }
  },

  getToken: () => {
    return localStorage.getItem(ACTIVE_TOKEN_STORAGE_KEY) || '';
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem(ACTIVE_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(ACTIVE_TOKEN_STORAGE_KEY);
    }
  },

  logout: () => {
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_TOKEN_STORAGE_KEY);
  },

  // Helper for Authorization headers
  getAuthHeaders: (extraHeaders = {}) => {
    const token = localStorage.getItem(ACTIVE_TOKEN_STORAGE_KEY);
    const headers = { ...extraHeaders };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  // Register real account
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create account.');
    }

    if (data.token) {
      api.setToken(data.token);
    }
    api.setSessionUser(data.user);
    return data.user;
  },

  // Log in real account
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid credentials.');
    }

    if (data.token) {
      api.setToken(data.token);
    }
    api.setSessionUser(data.user);
    return data.user;
  },

  // Refresh user data (to detect if admin changed role in db)
  refreshMe: async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me?userId=${userId}`, {
        headers: api.getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        api.setSessionUser(data.user);
        return data.user;
      }
    } catch (e) {
      console.warn('API refresh error:', e);
    }
    return api.getSessionUser();
  },

  // Fetch projects (Admin gets all, Student gets their own)
  getProjects: async (userId) => {
    const res = await fetch(`${API_BASE}/projects?userId=${userId}`, {
      headers: api.getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch projects.');
    }
    return data.projects || [];
  },

  // Student uploads Chapters 1 to 3 with real files
  uploadChapters: async (formData) => {
    const res = await fetch(`${API_BASE}/projects/upload`, {
      method: 'POST',
      headers: api.getAuthHeaders(),
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to upload project.');
    }
    return data.project;
  },

  // Admin updates project status
  updateStatus: async (projectId, adminId, status) => {
    const res = await fetch(`${API_BASE}/projects/${projectId}/status`, {
      method: 'POST',
      headers: api.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ adminId, status })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update status.');
    }
    return data.project;
  },

  // Admin delivers completed Chapter 4 & 5 report to student
  deliverReport: async (projectId, formData) => {
    const res = await fetch(`${API_BASE}/projects/${projectId}/deliver`, {
      method: 'POST',
      headers: api.getAuthHeaders(),
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to deliver report.');
    }
    return data.project;
  },

  // Get download URL for stored files
  getFileDownloadUrl: (systemName, originalName) => {
    if (systemName) {
      return `${API_BASE}/files/${systemName}`;
    }
    return `${API_BASE}/files/${encodeURIComponent(originalName || 'Deliverable.docx')}`;
  }
};

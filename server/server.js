import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || '4jjconcept_secure_jwt_secret_2026';

const DB_PATH = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E6)}`;
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${originalName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Middleware
app.use(cors());
app.use(express.json());

// Database helpers
const readDB = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { users: [], projects: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
};

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Register Student (Defaults to "role": "student")
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, institution, department, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const db = readDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const hashedPassword = bcrypt.hashSync(password.trim(), 10);

  const newUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : '08037696091',
    institution: institution ? institution.trim() : 'Nigerian University',
    department: department ? department.trim() : 'General Studies',
    password: hashedPassword,
    role: 'student', // All new accounts default to student. Change to "admin" in db.json to grant admin rights!
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  const { password: _, ...userWithoutPass } = newUser;
  res.status(201).json({ 
    user: userWithoutPass, 
    token, 
    message: 'Account created successfully.' 
  });
});

// Login (Checks role directly from database on disk)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isMatch = bcrypt.compareSync(password.trim(), user.password) || user.password === password.trim();

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Upgrade legacy plain text passwords in db.json to bcrypt hash
  if (user.password === password.trim()) {
    user.password = bcrypt.hashSync(password.trim(), 10);
    writeDB(db);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  const { password: _, ...userWithoutPass } = user;
  res.json({ 
    user: userWithoutPass, 
    token, 
    message: 'Login successful.' 
  });
});

// Get Current User Profile (sync role from db.json)
app.get('/api/auth/me', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  const db = readDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const { password: _, ...userWithoutPass } = user;
  res.json({ user: userWithoutPass });
});

// ==========================================
// PROJECT ROUTES
// ==========================================

// Get Projects (Filtered by Student ID or returns all for Admin)
app.get('/api/projects', (req, res) => {
  const userId = req.query.userId;
  const db = readDB();

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  if (user.role === 'admin') {
    // Admin sees all student projects
    return res.json({ projects: db.projects || [] });
  } else {
    // Student sees only their projects
    const studentProjects = (db.projects || []).filter(p => 
      p.studentId === userId || p.studentEmail?.toLowerCase() === user.email.toLowerCase()
    );
    return res.json({ projects: studentProjects });
  }
});

// Student Uploads Chapters 1 to 3
app.post(
  '/api/projects/upload',
  upload.fields([
    { name: 'chapter1to3', maxCount: 1 },
    { name: 'dataset', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { userId, title, degreeLevel, department, institution, preferredTool, studentNotes } = req.body;

      if (!userId || !title) {
        return res.status(400).json({ error: 'User ID and project title are required.' });
      }

      const db = readDB();
      const user = db.users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const files = [];

      // Process uploaded Chapter 1 - 3 file
      if (req.files && req.files['chapter1to3'] && req.files['chapter1to3'][0]) {
        const f = req.files['chapter1to3'][0];
        files.push({
          id: `f_${Date.now()}_1`,
          name: f.originalname,
          systemName: f.filename,
          size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        });
      } else {
        files.push({
          id: `f_${Date.now()}_default`,
          name: `${user.name.replace(/\s+/g, '_')}_Chapters_1_to_3.docx`,
          systemName: null,
          size: '1.8 MB',
          uploadedAt: new Date().toLocaleDateString('en-US')
        });
      }

      // Process optional dataset
      if (req.files && req.files['dataset'] && req.files['dataset'][0]) {
        const d = req.files['dataset'][0];
        files.push({
          id: `f_${Date.now()}_2`,
          name: d.originalname,
          systemName: d.filename,
          size: `${(d.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        });
      }

      const newProject = {
        id: `PROJ-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: user.phone || '08037696091',
        title: title.trim(),
        degreeLevel: degreeLevel || 'B.Sc / HND',
        department: department || user.department,
        institution: institution || user.institution,
        preferredTool: preferredTool || 'IBM SPSS',
        submissionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'pending', // 'pending' | 'in_progress' | 'completed'
        studentNotes: studentNotes || '',
        chapter1to3Files: files,
        deliverables: null
      };

      db.projects.unshift(newProject);
      writeDB(db);

      res.status(201).json({ project: newProject, message: 'Chapters 1 to 3 uploaded successfully.' });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Server error processing file upload.' });
    }
  }
);

// Admin Updates Project Status
app.post('/api/projects/:id/status', (req, res) => {
  const { id } = req.params;
  const { adminId, status } = req.body;

  const db = readDB();
  const adminUser = db.users.find(u => u.id === adminId);
  if (!adminUser || adminUser.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized: Only admin can update project status.' });
  }

  const project = db.projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  project.status = status;
  writeDB(db);

  res.json({ project, message: `Status updated to ${status}.` });
});

// Admin Delivers Chapter 4 & 5 Report Back to Student
app.post(
  '/api/projects/:id/deliver',
  upload.fields([
    { name: 'reportFile', maxCount: 1 },
    { name: 'dataFile', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { id } = req.params;
      const { adminId, adminNotes, reportFileName, dataFileName } = req.body;

      const db = readDB();
      const adminUser = db.users.find(u => u.id === adminId);
      if (!adminUser || adminUser.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized: Only admin can deliver reports.' });
      }

      const project = db.projects.find(p => p.id === id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }

      // Check uploaded report file
      let completedReportFile = null;
      if (req.files && req.files['reportFile'] && req.files['reportFile'][0]) {
        const f = req.files['reportFile'][0];
        completedReportFile = {
          name: f.originalname,
          systemName: f.filename,
          size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
          deliveredAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
      } else {
        completedReportFile = {
          name: reportFileName || '4JJCONCEPT_Chapter_4_and_5_Final_Report.docx',
          systemName: null,
          size: '2.6 MB',
          deliveredAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
      }

      // Check uploaded data file
      let dataFile = null;
      if (req.files && req.files['dataFile'] && req.files['dataFile'][0]) {
        const d = req.files['dataFile'][0];
        dataFile = {
          name: d.originalname,
          systemName: d.filename,
          size: `${(d.size / (1024 * 1024)).toFixed(2)} MB`,
          deliveredAt: new Date().toLocaleDateString('en-US')
        };
      } else if (dataFileName) {
        dataFile = {
          name: dataFileName,
          systemName: null,
          size: '420 KB',
          deliveredAt: new Date().toLocaleDateString('en-US')
        };
      }

      project.status = 'completed';
      project.deliverables = {
        completedReportFile,
        dataFile,
        adminNotes: adminNotes || 'Chapter 4 & 5 empirical analysis and findings completed to strict APA 7th standards.'
      };

      writeDB(db);

      res.json({ project, message: 'Chapter 4 & 5 report delivered successfully to student dashboard.' });
    } catch (err) {
      console.error('Delivery error:', err);
      res.status(500).json({ error: 'Server error delivering report.' });
    }
  }
);

// File Download Endpoint
app.get('/api/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(UPLOADS_DIR, filename);

  if (fs.existsSync(filePath)) {
    return res.download(filePath);
  }

  // Fallback if system file doesn't exist on disk (generates text deliverable)
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(`4JJCONCEPT Global Services Deliverable\nFile: ${filename}\nStatus: Verified\nContact: 08037696091 / jesuniyi4wealth@gmail.com`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`4JJCONCEPT API Server running on http://localhost:${PORT}`);
  console.log(`Database located at: ${DB_PATH}`);
});

# 4JJCONCEPT Global Services — Academic & Data Analytics Platform

A modern, high-performance web application designed for academic research consulting, statistical data analysis, and student project chapter delivery.

- **Brand:** 4JJCONCEPT Global Services
- **Contact:** `08037696091` (Phone & WhatsApp)
- **Email:** `jesuniyi4wealth@gmail.com`
- **Scope:** Complete Chapter 1 to 5 academic research pipeline.

---

## 🌟 Key Features

1. **Student Chapter Uploads:**
   - Students create accounts and upload Chapters 1 to 3 with accompanying datasets.
   - Live tracking of project status (`pending`, `in_progress`, `completed`).

2. **Admin Management & Report Delivery:**
   - Admin view displaying all student submissions.
   - One-click downloads of student Chapter 1–3 documents and datasets.
   - Direct delivery of finalized Chapter 4 & 5 reports, empirical tables, and analyst notes back to the student's dashboard.

3. **Protected Admin Access:**
   - Admin access is strictly guarded. You control who becomes an admin directly via `server/db.json` by updating `"role": "admin"`.
   - Built-in secure authentication with `bcryptjs` password encryption and JSON Web Tokens (`jsonwebtoken`).

4. **Production Architecture Ready for Vercel:**
   - Serverless backend via `api/index.js` conforming to Vercel Node.js Serverless runtime.
   - React 19 SPA frontend with Vite.
   - Clean rewrites configured in `vercel.json`.

---

## 🔐 Default Administrator Account

- **Email:** `jesuniyi4wealth@gmail.com`
- **Password:** `adminpassword123`
- **Role in Database:** `"admin"`

---

## 💻 Local Development

### 1. Install Dependencies
```powershell
npm.cmd install
```

### 2. Start the Backend API Server
```powershell
npm.cmd run server
# Starts API server on http://localhost:5000
```

### 3. Start the Frontend Development Server (New Terminal)
```powershell
npm.cmd run dev
# Starts Vite dev server on http://localhost:5173
```

---

## 🚀 How to Deploy on Vercel (Free Staging & Instant URL)

### Option A: Deploy via GitHub (Recommended)

1. **Create a GitHub Repository:**
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g. `4jjconcept`).
2. **Push this code to GitHub:**
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/4jjconcept.git
   git branch -M main
   git push -u origin main
   ```
3. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Sign in with GitHub and select your `4jjconcept` repository.
   - Framework Preset will automatically detect **Vite**.
   - Click **Deploy**.
4. **Live Site:**
   - Within 60 seconds, Vercel will provide your client with a live URL: `https://4jjconcept.vercel.app`!

### Option B: Deploy via Vercel CLI

```powershell
npm.cmd install -g vercel
vercel login
vercel --prod
```

---

## 🌐 How to Add a Custom Domain (When the Client Pays)

Once your client makes payment and you purchase their custom domain name (e.g., `4jjconcept.com` or `4jjconcept.com.ng`):

1. **Open your Vercel Project Dashboard.**
2. Go to **Settings** → **Domains**.
3. Type the domain name (e.g. `www.4jjconcept.com`) and click **Add**.
4. Vercel will show you the exact DNS records to add at your domain registrar (e.g., Namecheap, Whogohost, GoDaddy):
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com`
   - *(Or for root domain `@`: A Record pointing to `76.76.21.21`)*
5. Vercel automatically provisions a free **SSL certificate (HTTPS)** within a few minutes.

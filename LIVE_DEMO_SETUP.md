# Live Demo Setup Guide

## 🌐 GitHub Pages Deployment (Frontend Only)

### Step 1: Enable GitHub Pages
1. Push your code to GitHub
2. Go to your repository → **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** / **(root)**
5. Click **Save**

### Step 2: GitHub Actions will automatically:
- Build your React app
- Deploy to GitHub Pages
- Your site will be live at: `https://YOUR_USERNAME.github.io/ai-meeting-summarizer/`

### Step 3: Update Repository Name in Config
If your repository name is different, update `frontend/meeting-summarizer/vite.config.js`:
```javascript
base: '/YOUR_ACTUAL_REPO_NAME/',
```

## 🚀 Full Deployment (Frontend + Backend)

### Option 1: Vercel (Frontend) + Railway (Backend)

**Backend on Railway:**
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy from `backend` folder
4. Add environment variables:
   - `GROQ_API_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Get your Railway URL (e.g., `https://your-app.railway.app`)

**Frontend on Vercel:**
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Build settings:
   - Framework: **Vite**
   - Root Directory: `frontend/meeting-summarizer`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Update `frontend/meeting-summarizer/src/config.js`:
   ```javascript
   production: {
     API_BASE_URL: 'https://your-app.railway.app'
   }
   ```

### Option 2: Netlify (Frontend) + Heroku (Backend)

**Backend on Heroku:**
```bash
cd backend
heroku create your-app-name
heroku config:set GROQ_API_KEY=your_key
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
git subtree push --prefix backend heroku main
```

**Frontend on Netlify:**
1. Connect GitHub repo to Netlify
2. Build settings:
   - Base directory: `frontend/meeting-summarizer`
   - Build command: `npm run build`
   - Publish directory: `frontend/meeting-summarizer/dist`

## 📱 Demo Features

### GitHub Pages Demo Mode:
- ✅ File upload and text input
- ✅ Custom prompt input
- ✅ Simulated AI summarization
- ✅ Editable summaries
- ✅ Email form (simulated)
- ✅ Professional UI/UX

### Full Deployment Features:
- ✅ Real AI summarization with Groq
- ✅ Actual email sending
- ✅ Production-ready performance
- ✅ Scalable architecture

## 🔗 Your Live Links

After deployment, you'll have:

1. **GitHub Pages Demo**: `https://YOUR_USERNAME.github.io/ai-meeting-summarizer/`
2. **Full App (if deployed)**: `https://your-app.vercel.app/`

## 📋 Repository Badge

Add this to your README.md:
```markdown
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://YOUR_USERNAME.github.io/ai-meeting-summarizer/)
[![Deploy](https://img.shields.io/badge/Deploy-Ready-blue)](https://github.com/YOUR_USERNAME/ai-meeting-summarizer)
```

## 🎯 What Visitors Will See

- **Professional landing page**
- **Working demo with simulated AI**
- **Complete source code**
- **Setup instructions**
- **Deployment guides**

Perfect for showcasing your full-stack development skills! 🌟
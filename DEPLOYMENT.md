# Deployment Guide

## Quick Start (Development)

1. **Install Dependencies**:
```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend/meeting-summarizer
npm install
```

2. **Configure Environment**:
   - Copy `backend/.env` and add your API keys
   - Get Groq API key from https://console.groq.com/
   - Set up Gmail App Password for email functionality

3. **Run Application**:
   - On Windows: Double-click `start.bat`
   - Or manually:
     ```bash
     # Terminal 1 - Backend
     cd backend && npm run dev
     
     # Terminal 2 - Frontend
     cd frontend/meeting-summarizer && npm run dev
     ```

## Production Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

**Backend on Railway:**
1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy from `backend` folder

**Frontend on Vercel:**
1. Connect repo to Vercel
2. Set build command: `cd frontend/meeting-summarizer && npm run build`
3. Set output directory: `frontend/meeting-summarizer/dist`
4. Update API URLs to your Railway backend URL

### Option 2: Heroku (Full Stack)

**Backend:**
```bash
cd backend
heroku create your-app-name-backend
heroku config:set GROQ_API_KEY=your_key
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
git push heroku main
```

**Frontend:**
```bash
cd frontend/meeting-summarizer
# Update API base URL in App.jsx to your Heroku backend
npm run build
# Deploy dist folder to Netlify/Vercel
```

### Option 3: DigitalOcean App Platform

1. Create new app from GitHub repo
2. Configure build settings:
   - Backend: Node.js, `backend` folder
   - Frontend: Static site, `frontend/meeting-summarizer` folder
3. Set environment variables
4. Deploy

## Environment Variables

### Required for Backend:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### Frontend Configuration:
Update the API base URL in `frontend/meeting-summarizer/src/App.jsx`:
```javascript
// Development
const API_BASE = "http://localhost:5000";

// Production
const API_BASE = "https://your-backend-domain.com";
```

## Testing Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.com/` - should show "Backend is running 🚀"
2. **API Test**: POST to `/api/summarize` with test data
3. **Frontend Test**: Upload a sample transcript and generate summary
4. **Email Test**: Try sharing a summary via email

## Troubleshooting

**Common Issues:**
- CORS errors: Ensure backend allows your frontend domain
- API key errors: Verify Groq API key is valid and has credits
- Email errors: Check Gmail app password and 2FA settings
- Build errors: Ensure all dependencies are installed

**Logs:**
- Check deployment platform logs for detailed error messages
- Test API endpoints individually using Postman/curl
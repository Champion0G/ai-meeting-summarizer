# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `ai-meeting-summarizer` (or your preferred name)
4. Description: `AI-powered meeting notes summarizer with custom prompts and email sharing`
5. Make it **Public** (so it can be deployed easily)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

For your repository, use:
```bash
git remote add origin https://github.com/champion0g/meeting-summarizer.git
git branch -M main
git push -u origin main
```

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that `.env` is **NOT** visible (it should be ignored)
4. Verify `.env.example` is there for others to use

## Step 4: Update Repository Settings

1. Go to your repository → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. This will give you a GitHub Pages URL for documentation

## Your Repository Structure

```
ai-meeting-summarizer/
├── backend/                 # Express.js API
├── frontend/meeting-summarizer/  # React app
├── README.md               # Main documentation
├── DEPLOYMENT.md           # Deployment guide
├── EMAIL_SETUP.md          # Email configuration guide
├── start.bat              # Windows startup script
└── .gitignore             # Git ignore rules
```

## Security Note

✅ Your `.env` file with API keys is safely ignored
✅ `.env.example` provides template for others
✅ All sensitive data is protected
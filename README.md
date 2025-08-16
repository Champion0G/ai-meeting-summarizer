# AI-Powered Meeting Notes Summarizer

A full-stack application that allows users to upload meeting transcripts, generate AI-powered summaries with custom prompts, edit the summaries, and share them via email.

## Features

- **Text Input**: Paste meeting transcripts directly or upload .txt files
- **Custom Prompts**: Specify how you want the summary formatted (e.g., "Summarize in bullet points for executives", "Highlight only action items")
- **AI Summarization**: Uses Groq's Llama3 model for intelligent summarization
- **Editable Summaries**: Generated summaries can be edited before sharing
- **Email Sharing**: Send summaries to multiple recipients via email

## Tech Stack

### Frontend
- **React 19** with Vite
- **Axios** for API calls
- Basic CSS styling (functional, not design-focused)

### Backend
- **Node.js** with Express
- **Groq API** for AI summarization (Llama3-8b-8192 model)
- **Nodemailer** for email functionality
- **CORS** enabled for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Groq API key (free at https://console.groq.com/)
- Gmail account with App Password for email functionality

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password_here
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/meeting-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### POST /api/summarize
Generates AI summary from transcript text.

**Request Body:**
```json
{
  "text": "Meeting transcript content...",
  "prompt": "Custom instruction for summarization"
}
```

**Response:**
```json
{
  "summary": "Generated summary content..."
}
```

### POST /api/email
Sends summary via email to specified recipients.

**Request Body:**
```json
{
  "recipients": ["email1@example.com", "email2@example.com"],
  "summary": "Summary content to send...",
  "subject": "Meeting Summary"
}
```

**Response:**
```json
{
  "message": "Email sent successfully"
}
```

## Usage

1. **Input Transcript**: Either paste your meeting transcript in the text area or upload a .txt file
2. **Add Custom Prompt**: Enter specific instructions for how you want the summary formatted
3. **Generate Summary**: Click "Generate Summary" to create an AI-powered summary
4. **Edit Summary**: The generated summary is editable - make any changes needed
5. **Share via Email**: Click "Share via Email", enter recipient addresses, and send

## Example Prompts

- "Summarize in bullet points for executives"
- "Highlight only action items and deadlines"
- "Create a brief overview focusing on key decisions"
- "Extract main discussion points and next steps"

## Environment Configuration

### Groq API Setup
1. Sign up at https://console.groq.com/
2. Create a new API key
3. Add the key to your `.env` file

### Gmail Setup for Email Sharing
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use your Gmail address and the app password in the `.env` file

## Deployment Notes

For production deployment:
- Set environment variables on your hosting platform
- Update the frontend API base URL to your deployed backend URL
- Ensure CORS is properly configured for your domain
- Use a production-ready email service (consider alternatives to Gmail for production)

## Project Structure

```
├── backend/
│   ├── routes/
│   │   ├── summarize.js    # AI summarization endpoint
│   │   └── email.js        # Email sharing endpoint
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Environment variables
├── frontend/
│   └── meeting-summarizer/
│       ├── src/
│       │   ├── App.jsx    # Main React component
│       │   └── main.jsx   # React entry point
│       ├── package.json
│       └── vite.config.js
└── README.md
```

## Development Approach

This project was built with a focus on functionality over design, as requested. The approach prioritized:

1. **Rapid Development**: Used familiar technologies (React, Express) for quick implementation
2. **API Integration**: Chose Groq for reliable, fast AI summarization
3. **User Experience**: Simple, intuitive interface with clear feedback
4. **Extensibility**: Modular structure allows for easy feature additions

The application successfully meets all requirements: file upload, custom prompts, AI summarization, editable results, and email sharing functionality.
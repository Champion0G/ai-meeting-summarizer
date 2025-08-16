# Email Setup Guide

## The Issue

Gmail requires App Passwords for third-party applications when 2-Factor Authentication is enabled. Your current password won't work.

## Quick Fix Steps

### 1. Enable 2-Factor Authentication (if not already enabled)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"

### 2. Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "App passwords" (you might need to sign in again)
3. Select "Mail" as the app
4. Select "Other" as the device and name it "Meeting Summarizer"
5. Click "Generate"
6. Copy the 16-character password (it looks like: `abcd efgh ijkl mnop`)

### 3. Update Your .env File

Replace the `EMAIL_PASS` in `backend/.env` with the app password:

```env
EMAIL_PASS=abcdefghijklmnop
```

(Remove spaces, use the 16-character code as one string)

### 4. Test Email Configuration

1. Start your backend server: `cd backend && npm run dev`
2. Visit: http://localhost:5000/api/test-email
3. You should see: `{"status":"success","message":"Email configuration is working!"}`

### 5. Alternative: Use a Different Email Service

If you don't want to use Gmail, you can use other services:

**Outlook/Hotmail:**

```env
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

**Yahoo:**

```env
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

## Testing

After setup, test the email functionality:

1. Generate a summary in the app
2. Click "Share via Email"
3. Enter your own email as recipient
4. Check if you receive the email

## Troubleshooting

- **"Authentication failed"**: Wrong app password or 2FA not enabled
- **"Network error"**: Check internet connection
- **"Email configuration error"**: Visit the test endpoint for details

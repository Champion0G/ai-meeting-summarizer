const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Test email configuration
router.get('/', async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.json({ 
        status: 'error',
        message: 'Email credentials not configured',
        config: {
          EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
          EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
        }
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Test connection
    await transporter.verify();
    
    res.json({ 
      status: 'success',
      message: 'Email configuration is working!',
      config: {
        EMAIL_USER: process.env.EMAIL_USER,
        service: 'gmail'
      }
    });

  } catch (error) {
    res.json({ 
      status: 'error',
      message: 'Email configuration failed',
      error: error.message,
      code: error.code,
      suggestion: error.code === 'EAUTH' ? 
        'Try using an App Password instead of your regular Gmail password. Go to Google Account → Security → App passwords' :
        'Check your internet connection and email credentials'
    });
  }
});

module.exports = router;
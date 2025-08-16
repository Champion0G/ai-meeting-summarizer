// API Configuration
const config = {
  // For local development
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  
  // For production (you'll need to deploy backend separately)
  production: {
    API_BASE_URL: 'https://your-backend-url.herokuapp.com' // Replace with your deployed backend URL
  }
};

// Determine environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const environment = isDevelopment ? 'development' : 'production';

export const API_BASE_URL = config[environment].API_BASE_URL;

// Demo mode for GitHub Pages (when backend is not available)
export const DEMO_MODE = !isDevelopment;
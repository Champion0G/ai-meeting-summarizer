const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Import routes
const summarizeRoute = require('./routes/summarize');
const emailRoute = require('./routes/email');
const testEmailRoute = require('./routes/test-email');

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API routes
app.use('/api/summarize', summarizeRoute);
app.use('/api/email', emailRoute);
app.use('/api/test-email', testEmailRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

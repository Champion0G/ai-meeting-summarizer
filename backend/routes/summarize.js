const express = require("express");
const axios = require("axios");
const router = express.Router();

// Groq API endpoint for summarization
router.post("/", async (req, res) => {
  try {
    const { text, prompt } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const customPrompt =
      prompt ||
      "Summarize the following meeting transcript in a clear and structured format";

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that specializes in summarizing meeting transcripts. Provide clear, structured summaries based on the user's instructions.",
          },
          {
            role: "user",
            content: `${customPrompt}\n\nTranscript:\n${text}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate summary",
      details: error.response?.data?.error?.message || error.message,
    });
  }
});

module.exports = router;

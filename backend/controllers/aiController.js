import axios from "axios";

export const summariseText = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "https://api.x.ai/v1/summarise", // Replace with actual Grok endpoint
      { prompt: `Summarise this: ${text}` },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating summary" });
  }
};

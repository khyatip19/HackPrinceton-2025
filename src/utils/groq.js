import axios from "axios";

const GROQ_API_KEY = "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";

export async function getGroqFeedback(prompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a physiotherapy expert giving real-time squat form feedback.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    return "Error fetching feedback.";
  }
}

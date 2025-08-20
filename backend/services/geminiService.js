const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateEHRSummary(extractedText, summaryType = 'general') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompts = {
      general: `You are a medical document summarizer.

Read the following document and summarize ONLY the medically relevant content.

Your response must always be structured under these headings:
- Diagnosis
- Treatment
- Medications
- Precautions

If a section is missing or not applicable, write "Not mentioned".

If the document is not medical, respond with:
"This document does not contain relevant medical information."

Document:
${extractedText}
`,
      clinical: `Generate a clinical summary highlighting findings, diagnostic results, treatment plans, and recommendations:

Document:
${extractedText}
`
    };

    const prompt = prompts[summaryType] || prompts.general;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return {
      success: true,
      summary,
      summaryType
    };
  } catch (err) {
    console.error("❌ Gemini service error:", err);
    return { success: false, error: err.message };
  }
}

module.exports = { generateEHRSummary };

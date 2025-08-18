const Tesseract = require('tesseract.js');

async function extractTextFromImage(imagePath) {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng', // language code
      { logger: m => console.log(m) } // optional: shows progress logs
    );
    return {
      success: true,
      text: result.data.text,
      confidence: result.data.confidence
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = { extractTextFromImage };

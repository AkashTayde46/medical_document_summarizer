// const fs = require('fs');
// const pdfParse = require('pdf-parse');

// async function extractTextFromPDF(filePath) {
//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdfParse(dataBuffer);
//     return {
//       success: true,
//       text: pdfData.text,
//       pages: pdfData.numpages
//     };
//   } catch (err) {
//     return { success: false, error: err.message };
//   }
// }

// module.exports = { extractTextFromPDF };


const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return {
      success: true,
      text: pdfData.text,
      pages: pdfData.numpages
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = { extractTextFromPDF };

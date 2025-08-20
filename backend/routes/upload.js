const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { extractTextFromPDF } = require('../services/pdfExtractor');
const { extractTextFromImage } = require('../services/ocrExtractor');
const { generateEHRSummary } = require('../services/geminiService');
// Optional: const Document = require('../models/Document');

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads folder:", uploadDir);
}

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|jpeg|jpg|png/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    (extname && mimetype)
      ? cb(null, true)
      : cb(new Error('PDF and image files only!'));
  }
});

router.post('/process-document', upload.single('file'), async (req, res) => {
  try {
    console.log("📩 Incoming request:", req.body);

    if (!req.file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const summaryType = req.body.summaryType || 'general';

    console.log("📂 Uploaded file:", filePath);
    console.log("📄 File extension:", ext);
    console.log("📝 Summary type:", summaryType);

    let extractionResult = null;
    if (ext === '.pdf') {
      console.log("🔍 Extracting text from PDF...");
      extractionResult = await extractTextFromPDF(filePath);
    } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      console.log("🔍 Extracting text from Image...");
      extractionResult = await extractTextFromImage(filePath);
    } else {
      console.error("❌ Unsupported file type:", ext);
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    if (!extractionResult || !extractionResult.success) {
      console.error("❌ Extraction failed:", extractionResult?.error);
      return res.status(500).json({ error: extractionResult?.error || 'Extraction failed' });
    }

    console.log("✅ Text extracted, generating summary...");

    const summaryResult = await generateEHRSummary(extractionResult.text, summaryType);

    if (!summaryResult || !summaryResult.success) {
      console.error("❌ Summary generation failed:", summaryResult?.error);
      return res.status(500).json({ error: summaryResult?.error || 'Summary generation failed' });
    }

    console.log("✅ Summary generated successfully");

    // Delete file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ Deleted uploaded file:", filePath);
    }

    res.json({
      success: true,
      extractedText: extractionResult.text,
      summary: summaryResult.summary,
      summaryType,
      confidence: extractionResult.confidence || null
    });

  } catch (error) {
    console.error("🔥 Internal Server Error:", error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;

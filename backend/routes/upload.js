const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { extractTextFromPDF } = require('../services/pdfExtractor');
const { extractTextFromImage } = require('../services/ocrExtractor');
const { generateEHRSummary } = require('../services/geminiService');
// Optional: const Document = require('../models/Document');

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|jpeg|jpg|png/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    (extname && mimetype) ? cb(null, true) : cb(new Error('PDF and image files only!'));
  }
});

router.post('/process-document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const summaryType = req.body.summaryType || 'general';

    let extractionResult = null;
    if (ext === '.pdf') extractionResult = await extractTextFromPDF(filePath);
    else if (['.jpg', '.jpeg', '.png'].includes(ext)) extractionResult = await extractTextFromImage(filePath);
    else return res.status(400).json({ error: 'Unsupported file type' });

    if (!extractionResult.success) return res.status(500).json({ error: extractionResult.error });
    const summaryResult = await generateEHRSummary(extractionResult.text, summaryType);
    if (!summaryResult.success) return res.status(500).json({ error: summaryResult.error });

    fs.unlinkSync(filePath); // Delete after processing

    res.json({
      success: true,
      extractedText: extractionResult.text,
      summary: summaryResult.summary,
      summaryType,
      confidence: extractionResult.confidence || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;

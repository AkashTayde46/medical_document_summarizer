EHR Document Summarizer
EHR Document Summarizer is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to upload medical documents (PDF or images), extracts their contents using OCR and PDF processing, and generates concise medical summaries leveraging Google Gemini AI. The project supports modern UI features including drag-and-drop uploads and Tailwind CSS styling.

Features
File Upload: Upload PDF, PNG, JPG, or JPEG files via drag-and-drop interface.

OCR & PDF Parsing: Extract text from both PDFs and scanned images using Tesseract.js and pdf-parse.

Medical Summarization: Generate short, focused medical summaries from extracted content using Gemini AI.

Tabbed Display: Switch between the GEMINI summary and the full extracted raw text.

Modern UI: Styled with Tailwind CSS and Lucide React icons.

Tech Stack
Frontend: React, Tailwind CSS, lucide-react, axios, react-drag-drop-files

Backend: Node.js, Express.js, multer, pdf-parse, tesseract.js, dotenv, @google/generative-ai

Database: MongoDB Atlas (can be run locally or in the cloud)

AI Summarization: Google Gemini API

Getting Started
Prerequisites
Node.js and npm installed

MongoDB Atlas (recommended) or local MongoDB

Google Gemini API key

1. Clone the Repository
bash
git clone https://github.com/your-username/ehr-summarizer.git
cd ehr-summarizer
2. Setting up the Backend
bash
cd backend
npm install
Copy .env.example to .env (or create .env):

text
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
Start MongoDB if using locally or ensure Atlas is accessible.

Start the backend server:

bash
npm run dev  # For development (with nodemon)
npm start    # For production
3. Setting up the Frontend
bash
cd ../frontend
npm install
Start the React app:

bash
npm start
The frontend will be running at http://localhost:3000 by default.

Usage
Open the frontend in your browser.

Drag and drop a PDF or image file (max 10MB) into the upload zone.

Select the summary type you want (General, Discharge, Clinical).

Click "Generate Summary".

View the AI-generated summary or extracted text in the tabs.

File Structure
text
ehr-summarizer/
├── backend/
│   ├── services/
│   ├── routes/
│   ├── uploads/
│   ├── models/
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUploader.jsx
    │   │   └── SummaryDisplay.jsx
    │   ├── App.jsx
    │   └── index.jsx
    ├── public/
    └── package.json
Environment Variables
Backend .env:

text
MONGODB_URI=<your_mongodb_atlas_uri>
GEMINI_API_KEY=<your_gemini_api_key>
PORT=5000
Notes & Tips
Ensure your Google Gemini API key is active and usage limits are not reached.

For tesseract.js to work optimally, input scanned images with decent resolution.

The backend cleans up uploaded files after processing for efficiency and security.

Adjust CORS settings in the backend if deploying frontend and backend to different origins.

License
This project is open-source and available for any non-commercial use.
For commercial licensing, please contact the maintainer.

Acknowledgements
Tesseract.js

pdf-parse

Google Gemini API

Lucide React

Feel free to copy, modify, and adapt this README for your project’s repository and documentation!
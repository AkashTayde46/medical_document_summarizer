# EHR Document Summarizer

EHR Document Summarizer is a robust full-stack application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It empowers healthcare professionals to streamline documentation by allowing easy upload of medical files (PDFs or images), automatic OCR and text extraction, and generation of concise medical summaries powered by **Google Gemini AI**. The application features a modern user interface with drag-and-drop uploads and responsive design via **Tailwind CSS**.

---

## 🚀 Features

- **File Upload:** Effortless upload of PDF and image files (PNG, JPG, JPEG) through a drag-and-drop interface.
- **OCR & PDF Parsing:** Accurate extraction of text from both PDFs and scanned images using Tesseract.js and pdf-parse.
- **AI Medical Summarization:** Automated generation of focused medical summaries leveraging Google Gemini AI.
- **Tabbed Display:** Seamless switching between AI-generated summary (GEMINI) and the full extracted raw text.
- **Modern UI:** Clean, responsive design styled with Tailwind CSS and Lucide React icons.

---

## 🛠️ Tech Stack

| Layer        | Technology                                            |
|--------------|------------------------------------------------------|
| **Frontend** | React, Tailwind CSS, lucide-react, axios, react-drag-drop-files |
| **Backend**  | Node.js, Express.js, multer, pdf-parse, tesseract.js, dotenv, @google/generative-ai |
| **Database** | MongoDB Atlas (cloud recommended; local supported)   |
| **AI Service** | Google Gemini API                                  |

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) installed
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance
- [Google Gemini API](https://ai.google.dev/) key

### 1. Clone the Repository


---

### 2. Backend Setup


- Copy `.env.example` to `.env` (or create manually):


- _Start MongoDB locally (if not using Atlas)_ or ensure Atlas is accessible.

- **Start the backend server:**

---

### 3. Frontend Setup


- **Start the React app:**

- _Default frontend URL_: [http://localhost:3000](http://localhost:3000)

---

## 💡 Usage

1. Open the web interface in your browser.
2. Drag and drop a PDF or image file (max 10MB) into the upload zone.
3. Select the desired summary type (General, Discharge, or Clinical).
4. Click **"Generate Summary"**.
5. View your AI-generated summary or extracted text in the provided tabs.

---

## 📁 Project Structure


---

## 📝 Notes & Tips

- Ensure your **Google Gemini API key** is active and has valid usage limits.
- For best OCR accuracy, upload clear, high-resolution scanned images.
- The backend cleans up uploaded files after processing to increase security.
- Adjust backend CORS settings if deploying frontend and backend on different origins.
- For production, review and strengthen security/configuration as needed.

---

## 📜 License

This project is open-source for non-commercial use.  
For commercial licensing or collaboration, please contact the maintainer.

---

## 🙏 Acknowledgements

- [Tesseract.js](https://github.com/naptha/tesseract.js)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [Google Gemini API](https://ai.google.dev/)
- [Lucide React](https://lucide.dev/)

---

Feel free to copy, adapt, and enhance this README for your project and repository!

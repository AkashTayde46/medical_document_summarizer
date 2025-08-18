import React, { useState } from 'react';
import axios from 'axios';
import FileUploader from './components/FileUploader.jsx';
import SummaryDisplay from './components/SummaryDisplay.jsx';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file, summaryType = 'general') => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('summaryType', summaryType);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload/process-document',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EHR Document Summarizer</h1>
        <p>Upload PDF or image files to extract text and generate medical summaries</p>
      </header>
      <main>
        <FileUploader onFileUpload={handleFileUpload} loading={loading} />
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
        {result && <SummaryDisplay result={result} />}
      </main>
    </div>
  );
}

export default App;

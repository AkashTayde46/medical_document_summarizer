import React, { useState } from 'react';
import { FileUploader as ReactFileUploader } from 'react-drag-drop-files';
import { Upload, FileText, Shield, Clock, CheckCircle } from 'lucide-react';

const fileTypes = ['PDF', 'JPG', 'JPEG', 'PNG'];

function FileUploader({ onFileUpload, loading }) {
  const [file, setFile] = useState(null);
  const [summaryType, setSummaryType] = useState('general');

  const handleChange = (uploadedFile) => setFile(uploadedFile);

  const handleSubmit = () => {
    if (file && onFileUpload) {
      onFileUpload(file, summaryType);
    }
  };

  const getSummaryDescription = (type) => {
    const descriptions = {
      general: "Comprehensive overview of patient information and medical history",
      discharge: "Focused summary for patient discharge and transition of care",
      clinical: "Detailed clinical assessment and diagnostic information"
    };
    return descriptions[type];
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">EHR Document Analyzer</h2>
        <p className="text-gray-600">Upload your Electronic Health Record document for AI-powered analysis</p>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-green-800 font-medium">HIPAA Compliant & Secure</p>
            <p className="text-green-700">Your medical documents are processed with enterprise-grade security and are not stored after analysis.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Upload Section */}
        <div className="p-8">
          <ReactFileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            classes="group"
            maxSize={10}
            onSizeError={() => alert('File size exceeds 10MB limit. Please compress your document and try again.')}
            onTypeError={() => alert('Unsupported file format. Please upload PDF, JPG, or PNG files only.')}
          >
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/50 group-hover:border-blue-400 group-hover:bg-blue-50/50 cursor-pointer">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                  <Upload className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your EHR document here
                  </h3>
                  <p className="text-gray-600 mb-3">or click to browse your files</p>
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <span>Supports: PDF, JPG, PNG</span>
                    <span>•</span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              </div>
            </div>
          </ReactFileUploader>

          {/* File Preview */}
          {file && (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">File Ready for Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <p className="truncate">{file.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Format:</span>
                      <p>{file.name.split('.').pop().toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Section */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="space-y-4">
            <div>
              <label htmlFor="summaryType" className="block text-sm font-semibold text-gray-700 mb-3">
                Analysis Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'general', label: 'General Summary', icon: '📋' },
                  { value: 'discharge', label: 'Discharge Summary', icon: '🏥' },
                  { value: 'clinical', label: 'Clinical Summary', icon: '⚕️' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-white ${
                      summaryType === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="summaryType"
                      value={option.value}
                      checked={summaryType === option.value}
                      onChange={(e) => setSummaryType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 w-full">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          summaryType === option.value ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </div>
                      </div>
                      {summaryType === option.value && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getSummaryDescription(summaryType)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="p-8 pt-6">
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-sm transition-all duration-200 ${
              !file || loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <>
                <Clock className="w-5 h-5 animate-pulse" />
                <span>Analyzing Document...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate Analysis</span>
              </>
            )}
          </button>
          
          {!file && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Please upload a document to begin analysis
            </p>
          )}
        </div>
      </div>

      {/* Processing Time Estimate */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>⏱️ Typical processing time: 30-60 seconds depending on document complexity</p>
      </div>
    </div>
  );
}

export default FileUploader;
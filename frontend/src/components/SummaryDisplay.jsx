import React, { useState } from 'react';
import { FileText, Eye, Download, Share2, AlertCircle, CheckCircle, Activity, Clock, User, Calendar } from 'lucide-react';

function SummaryDisplay({ result = {} }) {
  const [activeTab, setActiveTab] = useState('summary');

  // Provide default values to prevent undefined errors
  const {
    summaryType = 'general',
    summary = 'No summary available',
    extractedText = 'No text extracted',
    confidence = null
  } = result;

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'bg-green-50 text-green-800 border-green-200';
    if (confidence >= 85) return 'bg-blue-50 text-blue-800 border-blue-200';
    if (confidence >= 70) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    return 'bg-red-50 text-red-800 border-red-200';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 85) return <CheckCircle className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  const formatSummaryText = (text) => {
    if (!text) return [<p key="0" className="text-gray-500">No summary text available</p>];
    
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      // Check if paragraph is a header (starts with common medical section headers)
      const headers = ['PATIENT INFORMATION', 'CHIEF COMPLAINT', 'HISTORY', 'ASSESSMENT', 'PLAN', 'MEDICATIONS', 'ALLERGIES', 'VITAL SIGNS'];
      const isHeader = headers.some(header => paragraph.toUpperCase().includes(header));
      
      if (isHeader) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">
            {paragraph}
          </h3>
        );
      }
      
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-3">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  const getSummaryTypeInfo = (type) => {
    const info = {
      general: { 
        icon: <FileText className="w-5 h-5" />, 
        color: 'bg-blue-500',
        description: 'Comprehensive medical overview'
      },
      discharge: { 
        icon: <Activity className="w-5 h-5" />, 
        color: 'bg-green-500',
        description: 'Discharge and care transition summary'
      },
      clinical: { 
        icon: <User className="w-5 h-5" />, 
        color: 'bg-purple-500',
        description: 'Clinical assessment and diagnostics'
      }
    };
    return info[type] || info.general;
  };

  const summaryTypeInfo = getSummaryTypeInfo(summaryType);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${summaryTypeInfo.color} text-white`}>
                {summaryTypeInfo.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {summaryType.charAt(0).toUpperCase() + summaryType.slice(1)} Analysis
                </h1>
                <p className="text-gray-600">{summaryTypeInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">Processing Time</div>
                <div className="text-xs text-gray-600">Completed just now</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">Text Length</div>
                <div className="text-xs text-gray-600">{extractedText?.length || 0} characters</div>
              </div>
            </div>
            {confidence && (
              <div className="flex items-center space-x-3">
                {getConfidenceIcon(confidence)}
                <div>
                  <div className="text-sm font-medium text-gray-900">OCR Quality</div>
                  <div className="text-xs text-gray-600">{confidence.toFixed(1)}% accuracy</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'summary'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Medical Summary</span>
              </div>
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'extracted'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('extracted')}
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Extracted Text</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {activeTab === 'summary' && (
          <div className="p-8">
            {/* Confidence Badge */}
            {confidence && (
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border mb-6 ${getConfidenceColor(confidence)}`}>
                {getConfidenceIcon(confidence)}
                <span className="font-semibold text-sm">
                  OCR Confidence: {confidence.toFixed(1)}%
                </span>
                {confidence < 85 && (
                  <span className="text-xs">• Review recommended</span>
                )}
              </div>
            )}

            {/* Summary Content */}
            <div className="prose prose-lg max-w-none">
              <div className="medical-summary space-y-4">
                {formatSummaryText(summary)}
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 mb-1">Medical Disclaimer</p>
                  <p className="text-amber-700">
                    This AI-generated summary is for informational purposes only and should not replace professional medical judgment. 
                    Always consult with qualified healthcare professionals for medical decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'extracted' && (
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Raw Extracted Text</h2>
              <p className="text-gray-600 text-sm">
                Original text extracted from the uploaded document using optical character recognition (OCR).
              </p>
            </div>

            {/* Text Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{extractedText?.split(' ').length || 0}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{extractedText?.split('\n').length || 0}</div>
                <div className="text-sm text-gray-600">Lines</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{extractedText?.length || 0}</div>
                <div className="text-sm text-gray-600">Characters</div>
              </div>
              {confidence && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{confidence.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">OCR Quality</div>
                </div>
              )}
            </div>

            {/* Extracted Text Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Extracted Content</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-auto">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {extractedText || 'No text extracted'}
                </pre>
              </div>
            </div>

            {/* OCR Quality Indicator */}
            {confidence && confidence < 85 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-1">OCR Quality Notice</p>
                    <p className="text-yellow-700">
                      The OCR confidence is below 85%. Some text may be inaccurate. Consider re-uploading with higher image quality if possible.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryDisplay;
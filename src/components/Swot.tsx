import React, { useState } from 'react';

// --- Helper Components for UI ---

// A simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-10">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">Analyzing your business...</p>
  </div>
);

// Component to display the final analysis report
const AnalysisReport = ({ analysis }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in w-full">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      Analysis for <span className="text-blue-600">{analysis.businessName}</span>
    </h2>
    <p className="text-gray-500 mb-8">Here is your generated growth potential report.</p>

    {/* SWOT Analysis Section */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-100 pb-2">SWOT Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-800 mb-2">Strengths</h4>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            {analysis.swot.strengths.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-bold text-red-800 mb-2">Weaknesses</h4>
          <ul className="list-disc list-inside text-red-700 space-y-1">
             {analysis.swot.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">Opportunities</h4>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            {analysis.swot.opportunities.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-2">Threats</h4>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            {analysis.swot.threats.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>

    {/* Growth Plan Section */}
    <div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-100 pb-2">Your Growth Plan</h3>
      <ol className="list-decimal list-inside space-y-3 text-gray-600">
        {analysis.growthPlan.map((step, i) => (
          <li key={i} className="p-3 bg-gray-50 rounded-md border">{step}</li>
        ))}
      </ol>
    </div>
  </div>
);


// --- Main App Component ---

export default function App() {
  // State to hold the form data
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    industry: 'E-commerce',
    businessAge: '1-3 years',
    teamSize: '2-5 people',
  });

  // State for the analysis result, loading status, and errors
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Send the form data to the Python backend
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If the server response is not OK, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysis(result); // Store the analysis from the backend

    } catch (err) {
      // Handle network errors or errors from the backend
      setError('Description is too short or invalid. Please give a fair information.');
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false); // Stop loading, regardless of outcome
    }
  };

  // If there's an analysis, show the report and a button to start over
  if (analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AnalysisReport analysis={analysis} />
        <button
          onClick={() => setAnalysis(null)}
          className="mt-8 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Start New Analysis
        </button>
      </div>
    );
  }

  // Main view with the form
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Business Growth Analyzer</h1>
          <p className="text-center text-gray-500 mb-8">Enter your business details to get a free growth plan.</p>

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Business Description */}
            <div>
              <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">What does your business do?</label>
              <textarea name="businessDescription" id="businessDescription" value={formData.businessDescription} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div>
              <label htmlFor='websiteInfo' className='text-sm flex'>Do you have a website ?</label>
              <input type="radio" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} required className="m-[1.2vw] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />Yes
              <input type="radio" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} required className="m-[1.2vw] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />No
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select name="industry" id="industry" value={formData.industry} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option>E-commerce</option>
                <option>Local Service</option>
                <option>Restaurant</option>
                <option>Software/SaaS</option>
                <option>Consulting</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Age */}
                <div>
                  <label htmlFor="businessAge" className="block text-sm font-medium text-gray-700 mb-1">Business Age</label>
                  <select name="businessAge" id="businessAge" value={formData.businessAge} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                {/* Team Size */}
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <select name="teamSize" id="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>Just me</option>
                    <option>2-5 people</option>
                    <option>6-10 people</option>
                    <option>11+ people</option>
                  </select>
                </div>
            </div>

            {/* Submit Button & Status */}
            <div className="pt-2">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Generate My Growth Plan
                </button>
              )}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

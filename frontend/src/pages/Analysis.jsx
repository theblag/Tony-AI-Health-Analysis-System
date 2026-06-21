import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud, File, Loader2 } from 'lucide-react';

export default function Analysis() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    // Simulate backend upload delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // Go back to dashboard to see results
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Upload Medical Report</h1>
        <p className="text-slate-600 mb-8">
          Upload your latest PDF report. Our Gemini AI will analyze the data, compare it with your history, and generate an updated action plan.
        </p>

        <form onSubmit={handleUpload} className="space-y-8">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-brand transition bg-gray-50 flex flex-col items-center justify-center cursor-pointer relative">
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex flex-col items-center">
                <File className="w-12 h-12 text-brand mb-3" />
                <span className="font-semibold text-slate-700">{file.name}</span>
                <span className="text-sm text-gray-500 mt-1">Click to change file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                <span className="font-semibold text-slate-700">Drag & Drop your PDF here</span>
                <span className="text-sm text-gray-500 mt-1">or click to browse</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-gray-500 font-semibold hover:text-brand">Cancel</Link>
            <button 
              type="submit" 
              disabled={!file || loading}
              className={`flex items-center gap-2 bg-brand text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand/30 transition ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-dark'}`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Analyzing with AI...' : 'Analyze Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

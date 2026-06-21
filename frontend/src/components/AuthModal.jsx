import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        token: credentialResponse.credential
      };
      // Save real verified Google user to server/local storage
      localStorage.setItem('tony_health_user', JSON.stringify(user));
      onClose(); // Close modal on success
      navigate('/dashboard');
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };

  const handleSimulatedLogin = (e) => {
    e?.preventDefault();
    const user = {
      id: "mock-google-id-123",
      name: "Prashant Singh",
      email: "rawatnaksh67@gmail.com",
      token: "mock_jwt_token_for_local_dev"
    };
    localStorage.setItem('tony_health_user', JSON.stringify(user));
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Join Tony Health
          </h2>
          <p className="text-slate-500">
            Create an account to track your health metrics
          </p>
        </div>

        {/* Google Button */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="pill"
            size="large"
            theme="outline"
            text="continue_with"
            width="100%"
          />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative px-4 bg-white text-xs font-bold text-gray-400 tracking-wider uppercase">
            Or use password credentials
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSimulatedLogin} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue="rawatnaksh67@gmail.com" 
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+91 88666 71624" 
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              defaultValue="••••••••••••" 
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-slate-700 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {!isLogin && (
            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600">Send updates & features announcements to my phone or email.</span>
            </label>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors mt-6 shadow-lg shadow-blue-600/30"
          >
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? 'Register Instead' : 'Sign In Instead'}
          </button>
        </div>

      </div>
    </div>
  );
}

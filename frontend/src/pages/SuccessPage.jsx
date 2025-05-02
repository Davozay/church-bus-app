import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../assets/MAIN-LW.png";

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', {replace: true}); // Redirect to QR code page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center">
          <img
            src={img}
            alt="Church Logo"
            className="w-32 h-auto mb-6"
          />
        </div>
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for registering for the church bus. Your seat has been confirmed.
        </p>
        <p className="text-gray-500 text-sm">
          You will be redirected back to the QR scanner in 5 seconds...
        </p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Return Now
        </button>
      </div>
    </div>
  );
}
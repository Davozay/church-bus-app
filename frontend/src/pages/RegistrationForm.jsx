import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from "../assets/MAIN-LW.png";
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    status: 'single',
    familyCount: 1,
    churchBranch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  useEffect(() => {
    const container = document.querySelector('.min-h-screen');
    if (!container) return;

    // Create bubbles
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble absolute rounded-full bg-blue-200 opacity-10';

      // Random size between 20px and 80px
      const size = Math.random() * 60 + 20;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Random position
      bubble.style.left = `${Math.random() * 100}vw`;
      bubble.style.top = `${Math.random() * 100}vh`;

      // Random animation
      const duration = Math.random() * 20 + 10;
      bubble.style.animation = `float ${duration}s linear infinite`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(bubble);
    }

    return () => {
      // Cleanup bubbles when component unmounts
      const bubbles = document.querySelectorAll('.bubble');
      bubbles.forEach(bubble => bubble.remove());
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    if (!formData.churchBranch) newErrors.churchBranch = 'Please select a branch';
    if (formData.status === 'family' && formData.familyCount < 1) {
      newErrors.familyCount = 'Must have at least 1 family member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post('https://church-bus-app-backend.onrender.com/api/attendees', formData);
      // navigate('/');
      navigate('/success'); // Consider adding a success route
    } catch (err) {
      console.error('Submission error:', err);
      alert(`Failed to submit form: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Grouped church branches by category
  const churchBranches = {
    "MCA Groups": [
      { value: "MCA", label: "Central Church Group" },
      { value: "MCA-ARG", label: "Airport Road Group" },
      { value: "MCA-KG", label: "Karu Group" },
      { value: "MCA-ASO", label: "Asokoro Group" },
      { value: "MCA-Gk", label: "Garki Group" },
      { value: "MCA-MG", label: "Model Group" },
      { value: "MCA-GW", label: "Gwarimpa Group" },
      { value: "MCA-WS", label: "Wuse Group" },
      { value: "MCA-SB", label: "Silverbird Group" },
      { value: "MCA-CBD", label: "CBD Group" },

    ],
    "CEAZ1 Groups": [
      { value: "CEAZ1-IIW", label: "Immanent in Wisdom Group" },
      { value: "CEAZ1-IIG", label: "Immanent in Glory Group" },
      { value: "CEAZ1-IIL", label: "Immanent in Love Group" },
      { value: "CEAZ1-HP", label: "Heavenly Pantheon Group" },
      { value: "CEAZ1-WG", label: "Wuye Group" },
      { value: "CEAZ1-FV", label: "Fruitful Vine Group" },
      { value: "CEAZ1-GF", label: "Gracefield Group" },
      { value: "CEAZ1-KB", label: "Kubwa Group" },
      { value: "CEAZ1-KB2", label: "Kubwa 2 Group" },
      { value: "CEAZ1-BOB", label: "Brooks of Bliss Group" },
      { value: "CEAZ1-BG", label: "Boundless Grace Group" },
      { value: "CEAZ1-BW", label: "Bwari Group" },
      { value: "CEAZ1-NH", label: " New Horizon Group" },
      { value: "CEAZ1-GL", label: "Glory Group" },
      { value: "CEAZ1-Gk", label: "Garki Group" },
      { value: "CEAZ1-LKG", label: "Lokogoma Group" },
      { value: "CEAZ1-KJ", label: "Kuje Group" },
      { value: "CEAZ1-LSG", label: "Lugbe Sub-Group" },

    ],
    "CEAZ2 Groups": [
      { value: "CEAZ2-BLG", label: "Boundless Love Group" },
      { value: "CEAZ2-NYA", label: "Nyanya Group" },
      { value: "CEAZ2-KDM", label: "Koroduma Group" },
      { value: "CEAZ2-SLJ", label: "Suleja Group" },
      { value: "CEAZ2-KFF", label: "Keffi  Group" },
      { value: "CEAZ2-JKW", label: "Jikwoyi Group" },
      { value: "CEAZ2-NKG", label: "New Karu Group" },
      { value: "CEAZ2-MRB", label: "Mararaba Group" },

    ],
    "LWGF ": [{ value: "LWGF", label: "LOVE WORLD GLOBAL FELLOWSHIP" }],
    "CEAZ1-TY ": [{ value: "LW-TY", label: "TEANS & YOUTH MINISTRY" }]



  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-400 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={img}
          alt="Background Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: 0.15;
          }
          100% {
            transform: translateY(-200px) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }
        .bubble {
          will-change: transform, opacity;
          pointer-events: none;
        }
      `}</style>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full transition-all duration-300 hover:shadow-xl z-10">
        <div className="flex justify-center"> {/* Added flex container to center the image */}
          <img
            src={img}
            alt="Church Logo"
            className="w-32 h-auto mb-4 rounded-se-4xl" // Removed z-10 from image as it's not needed here
          />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Bus Registration</h1>
          <p className="text-gray-600">Secure your seat for the church bus</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.name ? 'border-red-500' : ''
                }`}
              placeholder=" "
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.phoneNumber ? 'border-red-500' : ''
                }`}
              placeholder=" "
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="flex space-x-4">
              {['single', 'family'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    checked={formData.status === option}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.status === 'family' && (
            <div>
              <label htmlFor="familyCount" className="block text-sm font-medium text-gray-700 mb-1">
                Family Members Count
              </label>
              <input
                type="number"
                id="familyCount"
                name="familyCount"
                min="1"
                max="10"
                value={formData.familyCount}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.familyCount ? 'border-red-500' : ''
                  }`}
              />
              {errors.familyCount && <p className="mt-1 text-sm text-red-600">{errors.familyCount}</p>}
            </div>
          )}

          <div>
            <label htmlFor="churchBranch" className="block text-sm font-medium text-gray-700 mb-1">
              Church Branch <span className="text-red-500">*</span>
            </label>
            <select
              id="churchBranch"
              name="churchBranch"
              value={formData.churchBranch}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.churchBranch ? 'border-red-500' : ''
                }`}
            >
              <option value="">Select your branch</option>
              {Object.entries(churchBranches).map(([category, branches]) => (
                <optgroup key={category} label={category}>
                  {branches.map((branch) => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.churchBranch && <p className="mt-1 text-sm text-red-600">{errors.churchBranch}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-300 flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
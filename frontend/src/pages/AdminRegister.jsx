import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import img from "../assets/MAIN-LW.png";

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        churchBranch: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const createBubbles = () => {
            const container = document.querySelector('.min-h-screen');
            if (!container) return;

            // Clear existing bubbles
            const existingBubbles = container.querySelectorAll('.bubble');
            existingBubbles.forEach(bubble => bubble.remove());

            // Create new bubbles
            for (let i = 0; i < 15; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble absolute rounded-full bg-blue-200 opacity-20';

                // Random size between 20px and 80px
                const size = Math.random() * 60 + 20;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;

                // Random position
                bubble.style.left = `${Math.random() * 100}vw`;
                bubble.style.top = `${Math.random() * 100}vh`;

                // Random animation
                const duration = Math.random() * 15 + 10;
                bubble.style.animation = `float ${duration}s linear infinite`;
                bubble.style.animationDelay = `${Math.random() * 5}s`;

                container.appendChild(bubble);
            }
        };

        createBubbles();
        window.addEventListener('resize', createBubbles);

        return () => {
            window.removeEventListener('resize', createBubbles);
        };
    }, []);

    // Grouped church branches for better organization
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
            { value: "CEAZ1-NH", label: "New Horizon Group" },
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
            { value: "CEAZ2-KFF", label: "Keffi Group" },
            { value: "CEAZ2-JKW", label: "Jikwoyi Group" },
            { value: "CEAZ2-NKG", label: "New Karu Group" },
            { value: "CEAZ2-MRB", label: "Mararaba Group" },
        ],
        "LWGF ": [{ value: "LWGF", label: "LOVE WORLD GLOBAL FELLOWSHIP" }],
        "CEAZ1-TY ": [{ value: "LW-TY", label: "TEANS & YOUTH MINISTRY" }]
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with at least one letter and one number';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.churchBranch) newErrors.churchBranch = 'Please select a branch';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const result = await register(
                formData.name,
                formData.email,
                formData.password,
                formData.churchBranch
            );

            if (!result.success) {
                setErrors({ form: result.message });
            } else {
                navigate('/admin/dashboard');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setErrors({ form: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <img
                    src={img}
                    alt="Background Pattern"
                    className="w-full h-full object-cover"
                />
            </div>
            <style>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-100px) translateX(50px) rotate(180deg);
                        opacity: 0.1;
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

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="flex justify-center">
                    <img
                        src={img}
                        alt="Church Logo"
                        className="w-32 h-auto mb-8 z-10 rounded-se-4xl mx-auto"
                    />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Admin Registration</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">
                    Create an account to manage your church branch
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-100">
                    {errors.form && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700">{errors.form}</p>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="e.g David Ayozie"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="e.g, dail@gmail.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
                                placeholder="At least 8 characters"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7 transition-all duration-300"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <div className="relative w-5 h-5">
                                    {/* Eye icon with animated transition */}
                                    <svg
                                        className={`absolute w-5 h-5 text-gray-500 transition-opacity duration-300 ${showPassword ? 'opacity-0' : 'opacity-100'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {/* Eye-slash icon with animated transition */}
                                    <svg
                                        className={`absolute w-5 h-5 text-gray-500 transition-opacity duration-300 ${showPassword ? 'opacity-100' : 'opacity-0'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </div>
                            </button>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7 transition-all duration-300"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                <div className="relative w-5 h-5">
                                    {/* Eye icon with animated transition */}
                                    <svg
                                        className={`absolute w-5 h-5 text-gray-500 transition-opacity duration-300 ${showConfirmPassword ? 'opacity-0' : 'opacity-100'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {/* Eye-slash icon with animated transition */}
                                    <svg
                                        className={`absolute w-5 h-5 text-gray-500 transition-opacity duration-300 ${showConfirmPassword ? 'opacity-100' : 'opacity-0'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </div>
                            </button>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                        <div>
                            <label htmlFor="churchBranch" className="block text-sm font-medium text-gray-700 mb-1">
                                Church Branch <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="churchBranch"
                                name="churchBranch"
                                value={formData.churchBranch}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 rounded-lg border ${errors.churchBranch ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Register Account'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-5 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/admin/login')}
                                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                            >
                                Sig n n in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
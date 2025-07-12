import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, MapPin, Calendar, Star, Clock, Globe } from 'lucide-react';

const LoginProfileModal = (props) => {
    // const [isOpen, setIsOpen] = useState(props.isOpen);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Profile form state
    const [profileData, setProfileData] = useState({
        name: '',
        location: '',
        skillsOffered: [],
        skillsWanted: [],
        availability: 'weekends',
        profileVisibility: 'public',
        profilePhoto: null
    });

    const [newSkill, setNewSkill] = useState({ offered: '', wanted: '' });
    const [errors, setErrors] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const newErrors = {};
        if (!loginData.email) newErrors.email = 'Email is required';
        if (!loginData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                sessionStorage.setItem("user_id", data.user_id);  // store for future API calls
                setErrors({});
            } else {
                setErrors({ general: data.error || 'Login failed' });
            }
        } catch (error) {
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };


    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                alert("User ID not found. Please log in again.");
                return;
            }

            const profilePayload = {
                name: profileData.name,
                location: profileData.location,
                skills_offered: profileData.skillsOffered,
                skills_wanted: profileData.skillsWanted,
                availability: profileData.availability,
                profile: profileData.profileVisibility,
                profile_photo: profileData.profilePhoto || "" // base64 or filename
            };

            const response = await fetch(`http://localhost:5000/update-profile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profilePayload)
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Profile saved:", result);
                alert("Profile saved successfully!");

                // Reset
                setIsOpen(false);
                setIsLoggedIn(false); // you can skip this if not logging out
                setProfileData({
                    name: '',
                    location: '',
                    skillsOffered: [],
                    skillsWanted: [],
                    availability: 'weekends',
                    profileVisibility: 'public',
                    profilePhoto: null
                });
            } else {
                alert(result.error || "Failed to save profile.");
            }
        } catch (error) {
            console.error("Profile save error:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const addSkill = (type) => {
        if (newSkill[type].trim()) {
            setProfileData(prev => ({
                ...prev,
                [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: [
                    ...prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'],
                    newSkill[type].trim()
                ]
            }));
            setNewSkill(prev => ({ ...prev, [type]: '' }));
        }
    };

    const removeSkill = (type, index) => {
        setProfileData(prev => ({
            ...prev,
            [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].filter((_, i) => i !== index)
        }));
    };

    const resetModal = () => {
        setIsLoggedIn(false);
        setLoginData({ email: '', password: '' });
        setErrors({});
        setShowPassword(false);
    };

    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {/* {isLoggedIn ? 'Complete Your Profile' : 'Login to Your Account'} */}
                        Sign up
                    </h2>
                    <button
                        onClick={() => {
                            props.setIsOpen(false);
                            resetModal();
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>


                <form onSubmit={handleLogin} className="p-6 space-y-6">
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="inline w-4 h-4 mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Lock className="inline w-4 h-4 mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginData.password}
                                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                    className={`w-full px-4 py-3 border rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-700 transition-colors">
                            Sign up here
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginProfileModal;
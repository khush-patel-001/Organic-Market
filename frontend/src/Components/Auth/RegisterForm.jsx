import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Store/useAuthStore';

const RegisterForm = ({ userType }) => {
    const initialState = {
        isFarmer: userType === 'farmer' ? true : false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Farmer specific fields
        farmName: userType === 'farmer' ? '' : undefined,
        farmAddress: userType === 'farmer' ? '' : undefined,
        farmDescription: userType === 'farmer' ? '' : undefined,
        farmSize: userType === 'farmer' ? '' : undefined
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = userType === 'farmer' ? 2 : 1;

    const navigate = useNavigate();
    const { register } = useAuthStore();

    useEffect(() => {
        setFormData(initialState);
        setErrors({});
        setCurrentStep(1);
    }, [userType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required.';
            if (!formData.email.trim()) newErrors.email = 'Email is required.';
            if (!formData.password.trim()) newErrors.password = 'Password is required.';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match.';
            }
        }

        if (currentStep === 2 && userType === 'farmer') {
            if (!formData.farmName?.trim()) newErrors.farmName = 'Farm name is required.';
            if (!formData.farmAddress?.trim()) newErrors.farmAddress = 'Farm address is required.';
            if (!formData.farmDescription?.trim()) newErrors.farmDescription = 'Farm description is required.';
            if (!formData.farmSize?.trim()) newErrors.farmSize = 'Farm size is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await register(formData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            setErrors({
                auth: error.message, 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNextStep}>
            {errors.auth && (
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-md text-sm mb-6">
                    {errors.auth}
                </div>
            )}

            {/* Progress indicator for multi-step form */}
            {userType === 'farmer' && (
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <div className={currentStep >= 1 ? 'text-green-600 font-medium' : ''}>
                            Account Details
                        </div>
                        <div className={currentStep >= 2 ? 'text-green-600 font-medium' : ''}>
                            Farm Information
                        </div>
                    </div>
                </div>
            )}

            {/* Step 1: Account Information */}
            {currentStep === 1 && (
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.name ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="John sigh"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className='md:col-span-2'>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.password ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Step 2: Farmer Information */}
            {currentStep === 2 && userType === 'farmer' && (
                <div className="space-y-6">
                    <div>
                        <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
                            Farm Name
                        </label>
                        <input
                            id="farmName"
                            name="farmName"
                            type="text"
                            value={formData.farmName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.farmName ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Green Valley Farm"
                        />
                        {errors.farmName && (
                            <p className="mt-1 text-sm text-red-500">{errors.farmName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="farmAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Farm Address
                        </label>
                        <input
                            id="farmAddress"
                            name="farmAddress"
                            type="text"
                            value={formData.farmAddress}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.farmAddress ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="123 Rural Road, Countryside, CO"
                        />
                        {errors.farmAddress && (
                            <p className="mt-1 text-sm text-red-500">{errors.farmAddress}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="farmDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Farm Description
                        </label>
                        <textarea
                            id="farmDescription"
                            name="farmDescription"
                            rows="3"
                            value={formData.farmDescription}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.farmDescription ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Tell us about your farm, what you grow, and your farming practices..."
                        ></textarea>
                        {errors.farmDescription && (
                            <p className="mt-1 text-sm text-red-500">{errors.farmDescription}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
                            Farm size
                        </label>
                        <input
                            id="farmSize"
                            name="farmSize"
                            type="text"
                            value={formData.farmSize}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.farmName ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="20 acres"
                        />
                        {errors.farmName && (
                            <p className="mt-1 text-sm text-red-500">{errors.farmSize}</p>
                        )}
                    </div>

                </div>
            )}

            <div className={`mt-8 ${userType === 'farmer' ? 'flex justify-between' : ''}`}>
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex justify-center mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition cursor-pointer"
                    >
                        Back
                    </button>
                )}

                <button
                    type={currentStep === totalSteps ? 'submit' : 'button'}
                    disabled={isLoading}
                    onClick={currentStep < totalSteps ? handleNextStep : handleSubmit}
                    className={`${userType === 'farmer' && currentStep < totalSteps ? '' : 'w-full'
                        } inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                >
                    {isLoading
                        ? 'Processing...'
                        : currentStep === totalSteps
                            ? `Create ${userType === 'farmer' ? 'Farmer' : ''} Account`
                            : 'Next'}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
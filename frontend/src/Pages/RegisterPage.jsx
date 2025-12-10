import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';
import RegisterForm from '../Components/Auth/RegisterForm.jsx';

const RegisterPage = () => {
    const [userType, setUserType] = useState('consumer');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-12 border-t-1 border-gray-300">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
                        <p className="text-gray-600 mt-2">Register as a Farmer or User</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                            <button
                                type="button"
                                onClick={() => setUserType('consumer')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${userType === 'consumer'
                                    ? 'bg-white shadow-sm text-green-700'
                                    : 'text-gray-700 hover:text-green-600'
                                    }`}
                            >
                                I'm a Consumer
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType('farmer')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${userType === 'farmer'
                                    ? 'bg-white shadow-sm text-green-700'
                                    : 'text-gray-700 hover:text-green-600'
                                    }`}
                            >
                                I'm a Farmer
                            </button>
                        </div>
                    </div>

                    <RegisterForm userType={userType} />

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
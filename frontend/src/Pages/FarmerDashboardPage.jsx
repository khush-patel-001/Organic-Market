import React, { useState } from 'react';
import Dashboard from '../Components/Farmer/Dashboard.jsx';
import ProductManagement from '../Components/Farmer/ProductManagement.jsx';
import ProfileSettings from '../Components/Farmer/ProfileSettings.jsx';
import UpcomingAudits from '../Components/Farmer/UpcomingAudits.jsx';
import DashboardStats from '../Components/Farmer/DashboardStats.jsx';
import VerificationStatus from '../Components/Farmer/VerificationStatus.jsx';

const FarmerDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Sample farmer data - in a real app, this would come from your API/auth context
    const farmer = {
        id: '123456',
        name: 'Green Valley Farm',
        owner: 'Sarah Johnson',
        location: 'Riverdale, CA',
        joined: '2023-05-12',
        imageUrl: '/images/farm-profile.jpg'
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <DashboardStats />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <VerificationStatus />
                            <UpcomingAudits />
                        </div>
                    </div>
                );
            case 'products':
                return <ProductManagement />;
            case 'profile':
                return <ProfileSettings farmerData={farmer} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-700 text-lg font-bold">
                                    {farmer.name.charAt(0)}
                                </span>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold text-gray-900">{farmer.name}</h1>
                                <p className="text-sm text-gray-500">Welcome back, {farmer.owner}!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white font-medium transition-colors">
                                Add New Product
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`${activeTab === 'dashboard'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`${activeTab === 'products'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`${activeTab === 'profile'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Profile & Settings
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            © 2025 Farm To Table Marketplace. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Help Center
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FarmerDashboardPage;
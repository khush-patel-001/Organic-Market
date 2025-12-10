import React from 'react';

const VerificationStatus = () => {
    // Sample verification data - in a real app, this would come from your API
    const verificationStatus = {
        status: 'verified', // Options: 'pending', 'verified', 'rejected'
        certifications: [
            {
                id: 1,
                name: 'Organic Certification',
                status: 'verified',
                expiryDate: '2026-01-15',
                issuer: 'National Organic Program'
            },
            {
                id: 2,
                name: 'Local Grower Verification',
                status: 'verified',
                expiryDate: '2025-12-10',
                issuer: 'Regional Farmers Association'
            },
            {
                id: 3,
                name: 'Fair Trade Certification',
                status: 'pending',
                expiryDate: null,
                issuer: 'Fair Trade USA'
            }
        ]
    };

    // Get status badge color based on status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'verified':
                return (
                    <span className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                        <span className="font-medium text-green-700">Verified</span>
                    </span>
                );
            case 'pending':
                return (
                    <span className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="font-medium text-yellow-700">Pending</span>
                    </span>
                );
            case 'rejected':
                return (
                    <span className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></span>
                        <span className="font-medium text-red-700">Rejected</span>
                    </span>
                );
            default:
                return (
                    <span className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-gray-400 mr-2"></span>
                        <span className="font-medium text-gray-700">Unknown</span>
                    </span>
                );
        }
    };

    // Format date to more readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Verification Status</h2>
                <div>
                    {getStatusBadge(verificationStatus.status)}
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-md font-medium text-gray-700 mb-3">Your Certifications</h3>

                <div className="space-y-4">
                    {verificationStatus.certifications.map((cert) => (
                        <div key={cert.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">Issued by: {cert.issuer}</p>
                                </div>
                                {getStatusBadge(cert.status)}
                            </div>

                            {cert.expiryDate && (
                                <div className="mt-2 text-sm">
                                    <span className="font-medium text-gray-700">Expires:</span>
                                    <span className="ml-2 text-gray-600">{formatDate(cert.expiryDate)}</span>
                                </div>
                            )}

                            <div className="mt-3 flex justify-end space-x-2">
                                {cert.status === 'verified' && (
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition">
                                        View Certificate
                                    </button>
                                )}
                                {cert.status === 'pending' && (
                                    <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition">
                                        Check Status
                                    </button>
                                )}
                                {cert.status === 'rejected' && (
                                    <button className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-md transition">
                                        View Issues
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition">
                        Add New Certification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationStatus;
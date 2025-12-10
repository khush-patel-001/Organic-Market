import React from 'react';

const UpcomingAudits = () => {
    // Sample audit data - in a real app, this would come from your API
    const audits = [
        {
            id: 1,
            type: 'Sustainability',
            date: '2025-04-15',
            status: 'scheduled',
            notes: 'Annual sustainability review'
        },
        {
            id: 2,
            type: 'Organic Certification',
            date: '2025-05-22',
            status: 'pending',
            notes: 'Certificate renewal required'
        }
    ];

    // Format date to more readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get status badge based on status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'scheduled':
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Scheduled
                    </span>
                );
            case 'pending':
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Pending
                    </span>
                );
            case 'completed':
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Audits</h2>

            {audits.length > 0 ? (
                <div className="space-y-4">
                    {audits.map((audit) => (
                        <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-gray-900">{audit.type}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{formatDate(audit.date)}</p>
                                </div>
                                {getStatusBadge(audit.status)}
                            </div>

                            {audit.notes && (
                                <p className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Note:</span> {audit.notes}
                                </p>
                            )}

                            <div className="mt-4 flex justify-end">
                                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition">
                                    Prepare Documents
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming audits scheduled</p>
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View audit history
                </button>
            </div>
        </div>
    );
};

export default UpcomingAudits;
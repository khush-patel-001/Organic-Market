import React from 'react';

const DashboardStats = () => {
    // Sample stats data - in a real app, this would come from your API
    const stats = [
        {
            id: 1,
            label: 'Products Listed',
            value: 24,
            change: '+3',
            changeType: 'increase',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        },
        {
            id: 2,
            label: 'Recent Orders',
            value: 18,
            change: '+5',
            changeType: 'increase',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            id: 3,
            label: 'Low Stock Items',
            value: 3,
            change: '-2',
            changeType: 'decrease',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        },
        {
            id: 4,
            label: 'Revenue (30 days)',
            value: '$3,280',
            change: '+12%',
            changeType: 'increase',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-md bg-gray-50 p-3">
                            {stat.icon}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.change} {stat.changeType === 'increase' ? 'up' : 'down'} from last month
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
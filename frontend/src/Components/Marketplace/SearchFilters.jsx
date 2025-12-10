// SearchFilters.jsx
import React, { useState } from 'react';

const SearchFilters = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                {/* Search Bar */}
                <div className="relative flex-grow max-w-lg">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Search by product, category, or location..."
                        value={searchTerm}
                        onChange={handleSearchInput}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
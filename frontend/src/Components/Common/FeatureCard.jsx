import React from 'react';

const colorVariants = {
    green: {
        bg: 'bg-green-200 hover:bg-green-300',
        border: 'border-green-300',
        text: 'text-green-800',
        iconBg: 'bg-green-100'
    },
    red: {
        bg: 'bg-red-200 hover:bg-red-300',
        border: 'border-red-300',
        text: 'text-red-800',
        iconBg: 'bg-red-100'
    },
    blue: {
        bg: 'bg-blue-200 hover:bg-blue-300',
        border: 'border-blue-300',
        text: 'text-blue-800',
        iconBg: 'bg-blue-100'
    },
    orange: {
        bg: 'bg-orange-200 hover:bg-orange-300',
        border: 'border-orange-300',
        text: 'text-orange-800',
        iconBg: 'bg-orange-100'
    },
    teal: {
        bg: 'bg-teal-200 hover:bg-teal-300',
        border: 'border-teal-300',
        text: 'text-teal-800',
        iconBg: 'bg-teal-100'
    }
};

const FeatureCard = ({ icon, title, description, color = 'green' }) => {
    const colorClasses = colorVariants[color] || colorVariants.green;

    return (
        <div className={`
      rounded-xl ${colorClasses.bg} ${colorClasses.border} border 
      p-10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col justify-center items-center
    `}>
            <div className={`
        ${colorClasses.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4
      `}>
                <img src={icon} alt={title} className="w-8 h-8" />
            </div>

            <h3 className={`${colorClasses.text} text-xl font-semibold mb-3`}>
                {title}
            </h3>

            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
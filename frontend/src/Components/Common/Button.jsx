import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    to,
    onClick,
    type = 'button',
    disabled = false,
    ...props
}) => {
    // Button styles based on variant
    const baseStyles = "cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none";

    const variantStyles = {
        primary: "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-white hover:bg-gray-100 text-green-700 border border-green-600 hover:border-green-700",
        outlined: "bg-transparent hover:bg-green-50 text-green-700 border border-green-600 hover:border-green-700",
        text: "bg-transparent hover:bg-green-50 text-green-700"
    };

    const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    // If "to" prop exists, render as Link, otherwise as button
    if (to) {
        return (
            <Link
                to={to}
                className={buttonClasses}
                onClick={onClick}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
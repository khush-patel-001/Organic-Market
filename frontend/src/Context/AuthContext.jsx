import React, { createContext, useState, useEffect } from 'react';
import { useAuthStore } from '../Store/useAuthStore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { login, isLoggingIn, authUser, register, isSigningUp, logout} = useAuthStore();
    
    // Check if user is logged in when component mounts
    useEffect(() => {
        // Check local storage for user data
        const authUser = localStorage.getItem('organicMarketUser');

        if (authUser) {
            setCurrentUser(JSON.parse(authUser));
        }

        setLoading(false);
    }, []);

    // Login function
    const handleLogin = (credentials) => {
        login(credentials);

        setCurrentUser(authUser);
        localStorage.setItem('organicMarketUser', JSON.stringify(authUser));

        return authUser;
    };

    // Register function
    const handleRegister = (userData) => {
        register(userData);
    };

    // Logout function
    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('organicMarketUser');
    };

    // Update user function
    const HandleUpdateUser = (userData) => {
        const updatedUser = { ...currentUser, ...userData };
        setCurrentUser(updatedUser);
        localStorage.setItem('organicMarketUser', JSON.stringify(updatedUser));

        return updatedUser;
    };

    const value = {
        currentUser,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        HandleUpdateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
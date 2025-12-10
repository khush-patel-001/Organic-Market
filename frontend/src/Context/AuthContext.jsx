import React, { createContext, useState, useEffect } from 'react';
import { useAuthStore } from '../Store/useAuthStore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { login, authUser, register, logout, checkAuth } = useAuthStore();
    
    // Check if user is logged in when component mounts
    useEffect(() => {
        const hydrate = async () => {
            const storedUser = localStorage.getItem('organicMarketUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }

            await checkAuth();
            setLoading(false);
        };

        hydrate();
    }, [checkAuth]);

    // Login function
    const handleLogin = async (credentials) => {
        const user = await login(credentials);
        setCurrentUser(user);
        localStorage.setItem('organicMarketUser', JSON.stringify(user));
        return user;
    };

    // Register function
    const handleRegister = (userData) => {
        register(userData);
    };

    // Logout function
    const handleLogout = () => {
        setCurrentUser(null);
        logout();
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
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../Store/useAuthStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();


    const handleScroll = () => {
        setIsScrolled(window.scrollY > 30);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileDropdownOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/marketplace', label: 'Marketplace' },
        { to: '/register', label: 'Farmer Registration' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    const fadeIn = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const navVariants = {
        transparent: { backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: 'none' },
        solid: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }
    };

    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
    };

    const dropdownVariants = {
        closed: { opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.2 } },
        open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } }
    };

    return (
        <motion.nav
            className="sticky top-0 w-full z-50 transition-all"
            initial="transparent"
            animate={isScrolled ? "solid" : "transparent"}
            variants={navVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 md:h-[70px]">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <motion.img
                                className="h-20 md:h-25"
                                src="/images/logo.png"
                                alt="logo"
                            />
                        </Link>

                        <div className="hidden lg:flex items-center space-x-8 ml-20">
                            {navLinks.map((link) => (
                                <motion.div key={link.to} whileHover={{ y: -2 }}>
                                    <Link
                                        to={link.to}
                                        className={`px-4 py-2 rounded-md font-medium transition duration-300 text-base ${isActive(link.to)
                                            ? 'text-green-800 bg-green-50'
                                            : 'text-gray-800 hover:text-green-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {authUser ? (
                            <div className="ml-3 relative">
                                <motion.button
                                    onClick={toggleProfileDropdown}
                                    whileHover={{ scale: 1.03 }}
                                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 p-1"
                                    id="user-menu-button"
                                    aria-expanded={isProfileDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    
                                    <span className="ml-2 text-gray-700">{authUser.name}</span>
                                    <motion.svg
                                        animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-1 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </motion.svg>
                                </motion.button>

                                <AnimatePresence>
                                    {isProfileDropdownOpen && (
                                        <motion.div
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                        >
                                            {authUser.isFarmer === true ? (
                                                <motion.div whileHover={{ backgroundColor: '#F3F4F6' }}>
                                                    <Link
                                                        to="/farmer/dashboard"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        role="menuitem"
                                                    >
                                                        Farmer Dashboard
                                                    </Link>
                                                </motion.div>
                                            ) : (<motion.div whileHover={{ backgroundColor: '#F3F4F6' }}>
                                                <Link
                                                    to="/consumer/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                >
                                                    Dashboard
                                                </Link>
                                            </motion.div>)}
                                            <motion.div whileHover={{ backgroundColor: '#F3F4F6' }}>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                >
                                                    Logout
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-green-700 text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                        {authUser && (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link
                                    to="/cart"
                                    className="ml-6 p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <span className="sr-only">View cart</span>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <motion.span
                                            className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                            initial={fadeIn.hidden}
                                            animate={fadeIn.visible}
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                        >
                                            0
                                        </motion.span>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <motion.div
                                animate={isMenuOpen ? "open" : "closed"}
                                variants={{
                                    open: { rotate: 90 },
                                    closed: { rotate: 0 }
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {!isMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="lg:hidden bg-white shadow-lg"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.to}
                                    whileHover={{ x: 5 }}
                                    className="block py-2"
                                >
                                    <Link
                                        to={link.to}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.to)
                                            ? 'text-green-700 bg-green-50'
                                            : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            {authUser ? (
                                <>
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                                                {authUser.name}
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">
                                                {authUser.name}
                                            </div>
                                            <div className="text-sm font-medium text-gray-500">{authUser.email}</div>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Link
                                                to="/cart"
                                                className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <span className="sr-only">View cart</span>
                                                <div className="relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>
                                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                                        0
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        {authUser.isFarmer === true && (
                                            <motion.div
                                                whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                                initial={fadeIn.hidden}
                                                animate={fadeIn.visible}
                                                transition={{ delay: 0.05 }}
                                            >
                                                <Link
                                                    to="/farmer-dashboard"
                                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                                >
                                                    Farmer Dashboard
                                                </Link>
                                            </motion.div>
                                        )}
                                        <motion.div
                                            whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                            initial={fadeIn.hidden}
                                            animate={fadeIn.visible}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                            >
                                                Your Profile
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                            initial={fadeIn.hidden}
                                            animate={fadeIn.visible}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                            >
                                                Your Orders
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                            initial={fadeIn.hidden}
                                            animate={fadeIn.visible}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                            >
                                                Settings
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                            initial={fadeIn.hidden}
                                            animate={fadeIn.visible}
                                            transition={{ delay: 0.25 }}
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                            >
                                                Sign out
                                            </button>
                                        </motion.div>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-3 space-y-1">
                                    <motion.div
                                        whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                        initial={fadeIn.hidden}
                                        animate={fadeIn.visible}
                                        transition={{ delay: 0.05 }}
                                    >
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                        >
                                            Login
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5, backgroundColor: '#F3F4F6' }}
                                        initial={fadeIn.hidden}
                                        animate={fadeIn.visible}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800"
                                        >
                                            Register
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
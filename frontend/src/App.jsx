import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

// Pages
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import FarmerDashboardPage from './Pages/FarmerDashboardPage.jsx';
import ConsumerDashboardPage from './Pages/ConsumerDashboardPage.jsx';
import MarketplacePage from './Pages/MarketplacePage.jsx';
import ProductDetailsPage from './Pages/ProductDetailsPage.jsx';
import CartPage from './Pages/CartPage.jsx';
import AboutUsPage from './Pages/AboutUsPage.jsx';
import ContactPage from './Pages/ContactPage.jsx';


// Context Providers
import { AuthProvider } from './Context/AuthContext.jsx';
import { CartProvider } from './Context/CartContent.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboardPage isFarmer={true} />} />
            <Route path="/consumer/dashboard" element={<ConsumerDashboardPage isFarmer={false} />} />
            <Route path="/register/farmer" element={<RegisterPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
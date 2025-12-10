import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Common/Button.jsx';

const HeroSection = () => {
  const heroVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.95 }
  };

  const heroTransition = {
    duration: 0.8,
    ease: 'easeInOut'
  };

  return (
    <motion.section
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden px-20"
      initial="initial"
      animate="in"
      exit="out"
      variants={heroVariants}
      transition={heroTransition}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-background.jpg"
          alt="Farm Scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-800/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-center md:text-left">
            From OrganicMarket – Experience Authentic, Verified Product
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-center md:text-left">
            A transparent marketplace that ensures fair pricing for farmers and quality products for consumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              to="/register/farmer"
              variant="secondary"
              className="text-lg px-6 py-3"
            >
              List Your Product
            </Button>
            <Button
              to="/marketplace"
              variant="primary"
              className="text-lg px-6 py-3"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../Components/Common/Navbar.jsx';
import HeroSection from '../Components/Home/HeroSection.jsx';
import FeatureHighlights from '../Components/Home/FeatureHighlights.jsx';
import AdditionalDetails from '../Components/Home/AdditionalDetails.jsx';
import Footer from '../Components/Common/Footer.jsx';

const HomePage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('in');
    }
  }, [controls, inView]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.8
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <motion.div ref={ref} animate={controls} initial="initial" variants={pageVariants} transition={pageTransition}>
          <FeatureHighlights />
        </motion.div>
        <motion.div ref={ref} animate={controls} initial="initial" variants={pageVariants} transition={pageTransition}>
          <AdditionalDetails />
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default HomePage;
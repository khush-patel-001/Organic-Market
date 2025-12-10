import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from '../Common/FeatureCard.jsx';

const features = [
    {
        id: 'verification',
        icon: '/images/icons/verification.svg',
        title: 'Verified Farmers',
        description: 'Ensuring quality and trust.',
        color: 'green'
    },
    {
        id: 'marketplace',
        icon: '/images/icons/marketplace.svg',
        title: 'Direct Marketplace',
        description: 'Bridging farmers and consumers.',
        color: 'blue'
    },
    {
        id: 'sustainability',
        icon: '/images/icons/sustainability.svg',
        title: 'Sustainability & Transparency',
        description: 'Your healthy food, our commitment.',
        color: 'orange'
    }
];

const FeatureHighlights = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('in');
        }
    }, [controls, inView]);

    const featureVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const featureTransition = {
        duration: 0.8,
        ease: 'easeInOut'
    };

    return (
        <motion.section
            className="py-16 bg-gray-50 px-20"
            initial="initial"
            animate={controls}
            ref={ref}
            exit="out"
            variants={featureVariants}
            transition={featureTransition}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                        Our Platform Features
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover how our platform creates a direct connection between farmers and consumers
                        while ensuring quality and transparency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            color={feature.color}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FeatureHighlights;

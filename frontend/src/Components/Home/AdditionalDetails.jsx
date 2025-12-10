import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../Common/Button.jsx';

const AdditionalDetails = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('in');
        }
    }, [controls, inView]);

    const steps = [
        {
            id: 1,
            title: "Application",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            description: "Farmers submit an application along with relevant documents for review. Our team carefully evaluates each submission."
        },
        {
            id: 2,
            title: "On-Site Audit",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            description: "Our team visits the farm to verify practices, ensuring they meet our strict standards for quality and sustainability."
        },
        {
            id: 3,
            title: "Certification",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            description: "Once approved, farmers receive a certification that is displayed on their product listings, giving customers confidence in their purchase."
        }
    ];

    const sectionVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const sectionTransition = {
        duration: 0.8,
        ease: 'easeInOut'
    };

    return (
        <motion.section
            className="py-16 px-20"
            initial="initial"
            animate={controls}
            ref={ref}
            exit="out"
            variants={sectionVariants}
            transition={sectionTransition}
        >
            <div className="container mx-auto px-4">
                {/* How It Works */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our platform simplifies the journey with just a few steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-green-600">1</span>
                                </div>
                                <div className="hidden md:block absolute top-10 w-full h-0.5 bg-green-200 z-[-1] left-1/2"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-green-800">Register & Verify</h3>
                            <p className="text-gray-600">
                                Farmers register and get verified for authenticity. Consumers create accounts and explore products.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-green-600">2</span>
                                </div>
                                <div className="hidden md:block absolute top-10 w-full h-0.5 bg-green-200 z-[-1] left-1/2"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-green-800">Browse</h3>
                            <p className="text-gray-600">
                                Browse verified farm products with transparent origin information and purchase with confidence.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl font-bold text-green-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-green-800">Explore Products</h3>
                            <p className="text-gray-600">
                                Explore products to view the complete details of farmers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <section className="py-16 mb-10 bg-stone-50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                                How Our Verification Works
                            </h2>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                We follow a rigorous, multi-step approach to ensure authentic and transparent produce.
                            </p>
                        </div>

                        {/* Interactive Visual Section */}
                        <section className="py-16 bg-gray-50">
                            <div className="container mx-auto px-4">
                                {/* Steps for Desktop */}
                                <div className="hidden md:flex gap-8 mb-16">
                                    {steps.map((step, index) => (
                                        <div
                                            key={step.id}
                                            className="flex-1 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center animate-on-scroll"
                                            style={{ animationDelay: `${index * 200}ms` }}
                                        >
                                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Steps for Mobile */}
                                <div className="md:hidden space-y-6 mb-16">
                                    {steps.map((step, index) => (
                                        <div
                                            key={step.id}
                                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center animate-on-scroll"
                                            style={{ animationDelay: `${index * 200}ms` }}
                                        >
                                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">
                                Ready to Join Our Verified Community?
                            </h3>
                            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
                                Experience the benefits of our rigorous verification process as a farmer or consumer.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                                    Become a Verified Farmer
                                </button>
                                <button className="bg-stone-200 hover:bg-stone-300 text-green-800 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                                    Explore Verified Products
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact & Stats */}
                <div className="bg-green-50 p-8 rounded-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-green-800 mb-4">
                            Our Impact
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Making a difference in the agricultural ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">95%</h3>
                            <p className="text-gray-700">Verified Produce</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">20%</h3>
                            <p className="text-gray-700">More Farmer Profit</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">5000+</h3>
                            <p className="text-gray-700">Happy Customers</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">30%</h3>
                            <p className="text-gray-700">Reduced Carbon Footprint</p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Button
                            to="/about"
                            variant="primary"
                        >
                            Learn More About Our Mission
                        </Button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AdditionalDetails;
import React, { useEffect } from 'react';
import Navbar from '../Components/Common/Navbar.jsx';
import Footer from '../Components/Common/Footer.jsx';
import Button from '../Components/Common/Button.jsx';

const AboutUsPage = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-element');
        animatedElements.forEach(el => observer.observe(el));

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    // Team member data
    const teamMembers = [
        {
            name: "Emma Johnson",
            role: "Founder & CEO",
            bio: "With 15 years in sustainable agriculture, Emma founded Farm To Table to bridge the gap between farmers and consumers."
        },
        {
            name: "Michael Chen",
            role: "Head of Operations",
            bio: "Michael oversees all marketplace operations and ensures smooth transactions between farmers and customers."
        },
        {
            name: "Sofia Rodriguez",
            role: "Farmer Relations",
            bio: "Sofia works directly with our network of farmers to maintain quality standards and sustainable practices."
        },
        {
            name: "David Kim",
            role: "Technology Director",
            bio: "David leads our technical team, developing innovative solutions for transparent food tracking."
        }
    ];

    // Journey timeline data
    const journeyMilestones = [
        {
            year: "2021",
            title: "The Seed is Planted",
            description: "Founded with a mission to connect local farmers directly with consumers."
        },
        {
            year: "2022",
            title: "Growing Our Network",
            description: "Expanded to partner with over 50 local organic farmers."
        },
        {
            year: "2023",
            title: "Community Impact",
            description: "Established community programs to promote sustainable farming education."
        },
        {
            year: "2024",
            title: "Sustainable Growth",
            description: "Reached 10,000 customers committed to supporting local agriculture."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-96 md:h-[500px] bg-cover bg-center bg-green-600" style={{ backgroundImage: 'url(/images/about-background.jpg)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-800/70 to-green-800/50 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl pt-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 fade-in-element opacity-0 translate-y-10 transition duration-1000">
                            Our Story – Cultivating Trust and Transparency
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8 fade-in-element opacity-0 translate-y-10 transition duration-1000 delay-300">
                            Bridging the gap between farmers and consumers through sustainable practices and community values
                        </p>
                        <Button
                            onClick={() => document.getElementById('our-story').scrollIntoView({ behavior: 'smooth' })}
                            className="fade-in-element opacity-0 translate-y-10 transition duration-1000 delay-500 cursor-pointer"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Our Story & Mission Section */}
            <section id="our-story" className="py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Image/Video Column */}
                        <div className="fade-in-element opacity-0 translate-y-10 transition duration-1000">
                            <div className="rounded-lg overflow-hidden shadow-xl h-full">
                                <img
                                    src="/images/farm.jpg"
                                    alt="farm"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Content Column */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 fade-in-element opacity-0 translate-y-10 transition duration-1000">
                                Our Journey
                            </h2>
                            <div className="space-y-8">
                                {journeyMilestones.map((milestone, index) => (
                                    <div
                                        key={index}
                                        className="fade-in-element opacity-0 translate-y-10 transition duration-1000"
                                        style={{ transitionDelay: `${300 + (index * 150)}ms` }}
                                    >
                                        <div className="flex items-start">
                                            <div className="bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4">
                                                {milestone.year}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{milestone.title}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        </div>
                                        {index < journeyMilestones.length - 1 && (
                                            <div className="ml-6 h-18 w-px bg-green-300 my-2"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 px-4 md:px-8 bg-green-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 fade-in-element opacity-0 translate-y-10 transition duration-1000">
                        Our Mission & Vision
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Mission Point 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 fade-in-element opacity-0 translate-y-10 transition duration-1000">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Transparency</h3>
                            </div>
                            <p className="text-gray-600">
                                We believe consumers have the right to know exactly where their food comes from and how it was grown. Our platform provides complete transparency in the food supply chain.
                            </p>
                        </div>

                        {/* Mission Point 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 fade-in-element opacity-0 translate-y-10 transition duration-1000 delay-150">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability</h3>
                            </div>
                            <p className="text-gray-600">
                                We champion sustainable agricultural practices that protect our planet. By connecting consumers directly with farmers who prioritize environmental stewardship, we're building a more sustainable food system.
                            </p>
                        </div>

                        {/* Mission Point 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 fade-in-element opacity-0 translate-y-10 transition duration-1000 delay-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Community</h3>
                            </div>
                            <p className="text-gray-600">
                                We're building a community that connects farmers with consumers, fostering relationships based on trust and shared values. Together, we're creating a more resilient local food economy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Spotlight Section */}
            <section className="py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 fade-in-element opacity-0 translate-y-10 transition duration-1000">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="fade-in-element opacity-0 translate-y-10 transition duration-1000"
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="text-center group">
                                    <div className="w-48 p-9 h-48 mx-auto mb-4 overflow-hidden rounded-full shadow-lg relative border-1 border-gray-200">
                                        <img
                                            src="/images/icons/team-member.svg"
                                            alt={member.name}
                                            className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                                    <p className="text-green-600 font-medium">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 md:px-8 bg-green-600 text-white text-center">
                <div className="max-w-3xl mx-auto fade-in-element opacity-0 translate-y-10 transition duration-1000">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
                    <p className="text-xl mb-8">
                        Together, we can build a more transparent, sustainable, and connected food system.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => window.location.href = '/marketplace'}
                        >
                            Explore Marketplace
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => window.location.href = '/contact'}
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUsPage;
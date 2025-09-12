import React from 'react';
import AboutSection from '@/components/AboutSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
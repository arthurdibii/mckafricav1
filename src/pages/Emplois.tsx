import React from 'react';
import Navigation from '@/components/Navigation';
import JobBoardSection from '@/components/JobBoardSection';
import Footer from '@/components/Footer';

const Emplois = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <JobBoardSection />
      </main>
      <Footer />
    </div>
  );
};

export default Emplois;
import React from 'react';
import Navigation from '../components/Navigation';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

/**
 * Page Contact dédiée
 * 
 * Cette page contient uniquement la section contact avec navigation et footer
 */
const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation fixe en haut */}
      <Navigation />

      {/* Contenu principal avec espacement pour la navigation fixe */}
      <main className="pt-16">
        {/* Section contact */}
        <ContactSection />
      </main>

      {/* Footer avec liens et informations */}
      <Footer />
    </div>
  );
};

export default Contact;
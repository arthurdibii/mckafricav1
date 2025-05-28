
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import JobBoardSection from '../components/JobBoardSection';
import InsightsSection from '../components/InsightsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

/**
 * Page principale du site McK Africa
 * 
 * Cette page assemble tous les composants pour créer un site web professionnel
 * de cabinet de conseil en recrutement, avec toutes les fonctionnalités demandées :
 * - Navigation responsive
 * - Section hero avec présentation
 * - Services et expertise
 * - À propos et équipe
 * - Job board avec recherche
 * - Section insights/blog
 * - Contact avec formulaire
 * - Footer complet
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation fixe en haut */}
      <Navigation />
      
      {/* Contenu principal avec espacement pour la navigation fixe */}
      <main className="pt-16">
        {/* Section principale avec appel à l'action */}
        <HeroSection />
        
        {/* Présentation des services */}
        <ServicesSection />
        
        {/* À propos du cabinet et équipe */}
        <AboutSection />
        
        {/* Plateforme d'offres d'emploi */}
        <JobBoardSection />
        
        {/* Articles et insights */}
        <InsightsSection />
        
        {/* Formulaire de contact */}
        <ContactSection />
      </main>
      
      {/* Footer avec liens et informations */}
      <Footer />
    </div>
  );
};

export default Index;

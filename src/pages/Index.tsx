
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedJobsSection from '../components/FeaturedJobsSection';
import InsightsSection from '../components/InsightsSection';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

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

      {/* Bouton d'accès temporaire au dashboard */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link to="/admin">
          <Button className="bg-mck-blue-500 hover:bg-mck-blue-600 shadow-lg">
            <Settings className="h-4 w-4 mr-2" />
            Admin Dashboard (Dev)
          </Button>
        </Link>
      </div>

      {/* Contenu principal avec espacement pour la navigation fixe */}
      <main className="pt-16">
        {/* Section principale avec appel à l'action */}
        <HeroSection />

        {/* Présentation des services */}
        <ServicesSection />

        {/* Plateforme d'offres d'emploi */}
        <FeaturedJobsSection />

        {/* Articles et insights */}
        <InsightsSection />
      </main>

      {/* Footer avec liens et informations */}
      <Footer />
    </div>
  );
};

export default Index;

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
const HeroSection = () => {
  return <section id="accueil" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mck-blue-50 to-white overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-mck-blue-500/5 to-mck-green-500/5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-mck-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-mck-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge de présentation */}
          <div className="inline-flex items-center px-4 py-2 bg-mck-green-100 text-mck-blue-700 rounded-full text-sm font-medium mb-8">
            🌍 Leader du conseil en recrutement en Afrique
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transformez votre
            <span className="text-mck-blue-500"> stratégie RH</span>
            <br />
            avec <span className="text-mck-blue-600">mcK Africa</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Cabinet de conseil spécialisé en recrutement, nous connectons les talents exceptionnels 
            aux entreprises visionnaires à travers l'Afrique.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-mck-blue-500 hover:bg-mck-blue-600 text-white px-8 py-4 text-lg group">
              Découvrir nos services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-mck-blue-500 text-mck-blue-500 hover:bg-mck-blue-50 px-8 py-4 text-lg">
              Voir les offres d'emploi
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-3xl font-bold text-mck-blue-500 mb-2">500+</h3>
              <p className="text-gray-600">Talents placés</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-3xl font-bold text-mck-blue-500 mb-2">15</h3>
              <p className="text-gray-600">Pays couverts</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-3xl font-bold text-mck-blue-500 mb-2">98%</h3>
              <p className="text-gray-600">Taux de satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
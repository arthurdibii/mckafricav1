import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import DarkVeil from '@/components/DarkVeil';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, TrendingUp, Award, CheckCircle, ArrowRight } from 'lucide-react';

const HumanCapital = () => {
  const [activeTab, setActiveTab] = useState('management-executive-recruitment');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const tabs = [
    {
      id: 'management-executive-recruitment',
      title: 'Management & Executive Recruitment',
      icon: Users,
      description: 'Recrutement de cadres dirigeants et managers de haut niveau',
      content: {
        overview: 'Notre expertise en recrutement de cadres dirigeants nous permet d\'identifier et d\'attirer les meilleurs talents pour les postes stratégiques de votre organisation.',
        services: [
          'Recrutement de dirigeants (CEO, DG, Directeurs)',
          'Recrutement de managers intermédiaires',
          'Évaluation des compétences managériales',
          'Assessment center pour cadres',
          'Accompagnement à l\'intégration'
        ],
        benefits: [
          'Processus de sélection rigoureux',
          'Évaluation comportementale approfondie',
          'Garantie de remplacement',
          'Suivi post-intégration'
        ]
      }
    },
    {
      id: 'human-capital-advisory',
      title: 'Human Capital Advisory',
      icon: Target,
      description: 'Conseil stratégique en gestion du capital humain',
      content: {
        overview: 'Nous accompagnons les organisations dans l\'optimisation de leur capital humain à travers des stratégies RH innovantes et adaptées au contexte africain.',
        services: [
          'Audit organisationnel et RH',
          'Définition de stratégies RH',
          'Optimisation des processus RH',
          'Politique de rémunération et avantages',
          'Gestion des talents et succession planning'
        ],
        benefits: [
          'Amélioration de la performance organisationnelle',
          'Réduction du turnover',
          'Optimisation des coûts RH',
          'Alignement stratégique RH/Business'
        ]
      }
    },
    {
      id: 'development-programs',
      title: 'Development Programs & Executive Certification',
      icon: Award,
      description: 'Programmes de développement et certification des dirigeants',
      content: {
        overview: 'Nos programmes de développement visent à renforcer les compétences managériales et de leadership des cadres africains.',
        services: [
          'Programmes de leadership',
          'Formation en management stratégique',
          'Coaching exécutif personnalisé',
          'Certification en gouvernance',
          'Mentoring de dirigeants'
        ],
        benefits: [
          'Développement des compétences de leadership',
          'Amélioration de la prise de décision',
          'Renforcement de la vision stratégique',
          'Certification reconnue internationalement'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière Hero */}
      <section className="relative text-white py-20 overflow-hidden min-h-[500px]">
        {/* Background DarkVeil */}
        <div className="absolute inset-0 w-full h-full">
          <DarkVeil
            hueShift={20}
            noiseIntensity={0.15}
            scanlineIntensity={0.08}
            speed={1.9}
            scanlineFrequency={0.6}
            warpAmount={0.3}
            resolutionScale={1.0}
          />
        </div>

        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Human Capital
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Optimisez votre capital humain avec nos solutions de recrutement,
              conseil RH et développement des talents adaptées au marché africain
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Recrutement Executive
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Conseil RH Stratégique
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Développement Leadership
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 py-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-mck-blue-600 text-white shadow-lg'
                    : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.title}</span>
                  <span className="sm:hidden">{tab.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contenu de l'onglet actif */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentTab && (
            <div className="space-y-12">
              {/* En-tête de l'onglet */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-mck-blue-100 rounded-xl flex items-center justify-center">
                    <currentTab.icon className="w-6 h-6 text-mck-blue-600" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {currentTab.title}
                </h2>
                <p className="text-xl text-black max-w-3xl mx-auto">
                  {currentTab.description}
                </p>
              </div>

              {/* Vue d'ensemble */}
              <div className="bg-gradient-to-r from-mck-blue-50 to-mck-gold-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-black mb-4">Vue d'ensemble</h3>
                <p className="text-lg text-black leading-relaxed">
                  {currentTab.content.overview}
                </p>
              </div>

              {/* Services et Avantages */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-mck-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6" />
                      <span>Nos Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.services.map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-mck-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-black">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Avantages */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-mck-gold-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-6 h-6" />
                      <span>Avantages Clés</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-mck-gold-600 mt-0.5 flex-shrink-0" />
                          <span className="text-black">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-mck-blue-600 to-mck-blue-700 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Prêt à optimiser votre capital humain ?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Contactez nos experts pour discuter de vos besoins en {currentTab.title.toLowerCase()}
                  et découvrir comment nous pouvons vous accompagner.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-mck-blue-600 hover:bg-gray-100"
                  >
                    Demander un devis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Planifier un appel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HumanCapital;
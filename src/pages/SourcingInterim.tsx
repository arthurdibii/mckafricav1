import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, UserCheck, Target, CheckCircle, ArrowRight, Users, Zap } from 'lucide-react';

const SourcingInterim = () => {
  const [activeTab, setActiveTab] = useState('sourcing-talents');
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
      id: 'sourcing-talents',
      title: 'Sourcing de Talents',
      icon: Search,
      description: 'Identification et recrutement des meilleurs profils pour vos besoins',
      content: {
        overview: 'Nous utilisons des méthodes de sourcing innovantes et notre vaste réseau pour identifier et attirer les talents les plus qualifiés, adaptés à vos besoins spécifiques et à votre culture d\'entreprise.',
        services: [
          'Recherche de cadres et dirigeants',
          'Sourcing de profils techniques spécialisés',
          'Chasse de têtes (headhunting)',
          'Évaluation et assessment des candidats',
          'Vérification des références et background',
          'Négociation et finalisation des recrutements'
        ],
        benefits: [
          'Accès aux meilleurs talents du marché',
          'Réduction du temps de recrutement',
          'Amélioration de la qualité des embauches',
          'Expertise sectorielle approfondie',
          'Processus de sélection rigoureux'
        ],
        specialties: [
          'Finance et banque',
          'Technologies et digital',
          'Industrie et manufacturing',
          'Consulting et services',
          'Santé et pharmaceutique',
          'Énergie et mines'
        ]
      }
    },
    {
      id: 'travail-temporaire',
      title: 'Travail Temporaire',
      icon: Clock,
      description: 'Solutions flexibles de personnel temporaire et intérimaire',
      content: {
        overview: 'Nous proposons des solutions de travail temporaire flexibles pour répondre à vos besoins ponctuels, saisonniers ou de remplacement, avec un personnel qualifié et immédiatement opérationnel.',
        services: [
          'Missions d\'intérim courte et longue durée',
          'Remplacement de personnel en congé',
          'Renfort pour pics d\'activité',
          'Projets spéciaux et missions ponctuelles',
          'Contrats de transition et management',
          'Gestion administrative complète'
        ],
        benefits: [
          'Flexibilité dans la gestion des effectifs',
          'Réduction des coûts de recrutement',
          'Personnel immédiatement disponible',
          'Gestion simplifiée des contrats',
          'Expertise dans la réglementation du travail'
        ],
        specialties: [
          'Administration et support',
          'Vente et commercial',
          'Production et logistique',
          'IT et développement',
          'Marketing et communication',
          'Comptabilité et finance'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sourcing & Intérim
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Trouvez les talents qu'il vous faut avec nos solutions de sourcing
              et de travail temporaire adaptées à vos besoins
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Sourcing de Talents
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Travail Temporaire
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Solutions Flexibles
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
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
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
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <currentTab.icon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentTab.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {currentTab.description}
                </p>
              </div>

              {/* Vue d'ensemble */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vue d'ensemble</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentTab.content.overview}
                </p>
              </div>

              {/* Services et Avantages */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-6 h-6" />
                      <span>Nos Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.services.map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Avantages */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-6 h-6" />
                      <span>Avantages Clés</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Spécialités sectorielles */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center space-x-2">
                  <Users className="w-6 h-6 text-orange-600" />
                  <span>Nos Spécialités Sectorielles</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTab.content.specialties.map((specialty, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <UserCheck className="w-5 h-5 text-orange-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{specialty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métriques de performance */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-8 text-center">Nos Performances</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <p className="text-orange-100">Taux de satisfaction client</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">72h</div>
                    <p className="text-orange-100">Délai moyen de sourcing</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1,500+</div>
                    <p className="text-orange-100">Placements réussis/an</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">85%</div>
                    <p className="text-orange-100">Taux de rétention</p>
                  </div>
                </div>
              </div>

              {/* Processus de service */}
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Notre Processus de Service
                </h3>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-orange-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analyse</h4>
                    <p className="text-sm text-gray-600">Définition précise des besoins</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-red-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sourcing</h4>
                    <p className="text-sm text-gray-600">Recherche active de candidats</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-pink-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sélection</h4>
                    <p className="text-sm text-gray-600">Évaluation et présélection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Présentation</h4>
                    <p className="text-sm text-gray-600">Proposition des meilleurs profils</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-indigo-600 font-bold text-lg">5</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Suivi</h4>
                    <p className="text-sm text-gray-600">Accompagnement et intégration</p>
                  </div>
                </div>
              </div>

              {/* Témoignages clients */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Ce que disent nos clients
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Sarah Kouame</h4>
                        <p className="text-sm text-gray-600">DRH, Banque Atlantique</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "mcK Africa nous a permis de recruter des profils exceptionnels
                      en un temps record. Leur expertise du marché africain est remarquable."
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <UserCheck className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Mohamed Diallo</h4>
                        <p className="text-sm text-gray-600">CEO, TechStart Africa</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "Les solutions d'intérim de mcK Africa nous offrent la flexibilité
                      nécessaire pour gérer nos pics d'activité avec efficacité."
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Trouvons ensemble les talents qu'il vous faut
                </h3>
                <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                  Que vous cherchiez des talents permanents ou temporaires,
                  nous avons les solutions adaptées à vos besoins.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    Démarrer un projet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Consulter nos experts
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

export default SourcingInterim;
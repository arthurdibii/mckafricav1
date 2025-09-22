import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Shield, Zap, CheckCircle, ArrowRight, BarChart3, Cpu, Search, Code, Lightbulb } from 'lucide-react';

const TechnologieInnovation = () => {
  const [activeTab, setActiveTab] = useState('market-intelligence');
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
      id: 'market-intelligence',
      title: 'Market Intelligence',
      icon: Search,
      description: 'Solutions d\'intelligence de marché et d\'analyse de données',
      content: {
        overview: 'Nous fournissons des solutions d\'intelligence de marché avancées pour aider les entreprises africaines à prendre des décisions éclairées basées sur des données fiables et des analyses approfondies.',
        services: [
          'Études de marché et veille concurrentielle',
          'Analyse de données et business intelligence',
          'Recherche sectorielle et tendances',
          'Évaluation des opportunités d\'investissement',
          'Cartographie des écosystèmes d\'affaires',
          'Rapports d\'intelligence économique'
        ],
        benefits: [
          'Prise de décision basée sur les données',
          'Identification d\'opportunités de marché',
          'Réduction des risques d\'investissement',
          'Avantage concurrentiel durable',
          'Optimisation des stratégies commerciales'
        ],
        technologies: [
          'Outils d\'analyse de données avancés',
          'Plateformes de business intelligence',
          'Solutions de data mining',
          'Systèmes de veille automatisée'
        ]
      }
    },
    {
      id: 'it-solutions',
      title: 'IT Solutions',
      icon: Code,
      description: 'Solutions technologiques et développement de systèmes d\'information',
      content: {
        overview: 'Nous développons et implémentons des solutions technologiques sur mesure pour moderniser les systèmes d\'information et améliorer l\'efficacité opérationnelle des entreprises africaines.',
        services: [
          'Développement d\'applications métiers',
          'Intégration de systèmes d\'information',
          'Solutions de gestion documentaire',
          'Plateformes de collaboration digitale',
          'Systèmes de gestion des ressources humaines',
          'Solutions de cybersécurité'
        ],
        benefits: [
          'Automatisation des processus métiers',
          'Amélioration de la productivité',
          'Réduction des coûts opérationnels',
          'Sécurisation des données',
          'Facilitation du travail collaboratif'
        ],
        technologies: [
          'Développement web et mobile',
          'Cloud computing et SaaS',
          'Intelligence artificielle',
          'Blockchain et technologies émergentes'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technologie & Innovation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Accélérez votre transformation digitale avec nos solutions technologiques
              innovantes et notre expertise en intelligence de marché
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Intelligence de Marché
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Solutions IT
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Innovation Digitale
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
                    ? 'bg-indigo-600 text-white shadow-lg'
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
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <currentTab.icon className="w-6 h-6 text-indigo-600" />
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
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vue d'ensemble</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentTab.content.overview}
                </p>
              </div>

              {/* Services et Avantages */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-6 h-6" />
                      <span>Nos Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.services.map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Avantages */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-6 h-6" />
                      <span>Avantages Clés</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Technologies utilisées */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center space-x-2">
                  <Database className="w-6 h-6 text-indigo-600" />
                  <span>Technologies & Outils</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentTab.content.technologies.map((tech, index) => (
                    <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Cpu className="w-5 h-5 text-indigo-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processus de mise en œuvre */}
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Notre Processus de Mise en Œuvre
                </h3>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-indigo-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analyse</h4>
                    <p className="text-sm text-gray-600">Évaluation des besoins et contraintes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Conception</h4>
                    <p className="text-sm text-gray-600">Design de la solution technique</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Développement</h4>
                    <p className="text-sm text-gray-600">Création et tests de la solution</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Déploiement</h4>
                    <p className="text-sm text-gray-600">Mise en production et formation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-orange-600 font-bold text-lg">5</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                    <p className="text-sm text-gray-600">Maintenance et évolutions</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Prêt à innover avec la technologie ?
                </h3>
                <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                  Découvrez comment nos solutions en {currentTab.title.toLowerCase()} peuvent
                  transformer votre entreprise et vous donner un avantage concurrentiel.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    Demander une démo
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

export default TechnologieInnovation;
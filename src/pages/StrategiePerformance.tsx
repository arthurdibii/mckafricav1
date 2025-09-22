import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, CheckCircle, ArrowRight, BarChart3, Users, Lightbulb } from 'lucide-react';

const StrategiePerformance = () => {
  const [activeTab, setActiveTab] = useState('performance-organisations');
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
      id: 'performance-organisations',
      title: 'Performance des Organisations',
      icon: BarChart3,
      description: 'Optimisation de la performance organisationnelle et opérationnelle',
      content: {
        overview: 'Nous accompagnons les organisations dans l\'amélioration de leur performance globale à travers des méthodologies éprouvées et adaptées au contexte africain.',
        services: [
          'Diagnostic de performance organisationnelle',
          'Optimisation des processus métiers',
          'Mise en place d\'indicateurs de performance (KPI)',
          'Amélioration de la productivité',
          'Restructuration organisationnelle',
          'Gestion du changement'
        ],
        benefits: [
          'Amélioration mesurable de la performance',
          'Réduction des coûts opérationnels',
          'Optimisation des ressources',
          'Meilleure agilité organisationnelle',
          'Culture de performance renforcée'
        ]
      }
    },
    {
      id: 'transformation-organisations',
      title: 'Transformation des Organisations',
      icon: Zap,
      description: 'Accompagnement dans la transformation digitale et organisationnelle',
      content: {
        overview: 'Nous guidons les entreprises africaines dans leur transformation pour s\'adapter aux nouveaux défis du marché et saisir les opportunités de croissance.',
        services: [
          'Stratégie de transformation digitale',
          'Conduite du changement organisationnel',
          'Transformation des modèles d\'affaires',
          'Innovation et développement de nouveaux services',
          'Modernisation des systèmes et processus',
          'Formation et accompagnement des équipes'
        ],
        benefits: [
          'Adaptation aux évolutions du marché',
          'Amélioration de la compétitivité',
          'Innovation accélérée',
          'Engagement renforcé des collaborateurs',
          'Croissance durable'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière Hero */}
      <section className="bg-gradient-to-br from-mck-blue-600 via-purple-600 to-mck-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stratégie, Performance & Transformation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transformez votre organisation et optimisez vos performances avec nos solutions
              stratégiques adaptées aux défis du marché africain
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Performance Organisationnelle
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Transformation Digitale
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Conduite du Changement
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
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <currentTab.icon className="w-6 h-6 text-purple-600" />
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
              <div className="bg-gradient-to-r from-purple-50 to-mck-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vue d'ensemble</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentTab.content.overview}
                </p>
              </div>

              {/* Services et Avantages */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-mck-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-6 h-6" />
                      <span>Nos Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.services.map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Avantages */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-mck-gold-600 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6" />
                      <span>Avantages Clés</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Méthodologie */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Notre Méthodologie
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Diagnostic</h4>
                    <p className="text-sm text-gray-600">Analyse approfondie de la situation actuelle</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mck-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-mck-blue-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stratégie</h4>
                    <p className="text-sm text-gray-600">Définition de la feuille de route</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mck-gold-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-mck-gold-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mise en œuvre</h4>
                    <p className="text-sm text-gray-600">Déploiement des solutions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Suivi</h4>
                    <p className="text-sm text-gray-600">Mesure des résultats et ajustements</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-600 to-mck-blue-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Prêt à transformer votre organisation ?
                </h3>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Contactez nos experts en {currentTab.title.toLowerCase()} pour discuter
                  de vos défis et découvrir nos solutions sur mesure.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Demander un diagnostic
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Planifier un entretien
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

export default StrategiePerformance;
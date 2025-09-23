import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Users, TrendingUp, CheckCircle, ArrowRight, Target, Award, BookOpen } from 'lucide-react';

const EmployabiliteJeunes = () => {
  const [activeTab, setActiveTab] = useState('formation-professionnelle');
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
      id: 'formation-professionnelle',
      title: 'Formation Professionnelle',
      icon: GraduationCap,
      description: 'Programmes de formation adaptés aux besoins du marché du travail',
      content: {
        overview: 'Nous développons et mettons en œuvre des programmes de formation professionnelle innovants pour préparer les jeunes africains aux métiers d\'avenir et répondre aux besoins spécifiques des entreprises.',
        services: [
          'Conception de curricula adaptés au marché',
          'Formation en compétences techniques et digitales',
          'Développement des soft skills',
          'Programmes de certification professionnelle',
          'Formation en entrepreneuriat',
          'Mentorat et coaching personnalisé'
        ],
        benefits: [
          'Amélioration de l\'employabilité des jeunes',
          'Réduction du gap compétences-emploi',
          'Augmentation des taux d\'insertion professionnelle',
          'Développement de l\'esprit entrepreneurial',
          'Renforcement de la confiance en soi'
        ],
        sectors: [
          'Technologies de l\'information',
          'Services financiers',
          'Agriculture et agro-industrie',
          'Santé et bien-être',
          'Énergie renouvelable',
          'Commerce et distribution'
        ]
      }
    },
    {
      id: 'insertion-professionnelle',
      title: 'Insertion Professionnelle',
      icon: Briefcase,
      description: 'Accompagnement vers l\'emploi et l\'entrepreneuriat',
      content: {
        overview: 'Nous facilitons l\'insertion professionnelle des jeunes à travers un accompagnement personnalisé, des partenariats avec les entreprises et des programmes d\'incubation entrepreneuriale.',
        services: [
          'Orientation et conseil en carrière',
          'Préparation aux entretiens d\'embauche',
          'Mise en relation avec les employeurs',
          'Stages et apprentissages en entreprise',
          'Incubation de projets entrepreneuriaux',
          'Suivi post-insertion'
        ],
        benefits: [
          'Taux d\'insertion élevé dans l\'emploi',
          'Création d\'entreprises par les jeunes',
          'Développement de réseaux professionnels',
          'Amélioration des revenus des bénéficiaires',
          'Contribution au développement économique'
        ],
        sectors: [
          'Startups et innovation',
          'PME locales',
          'Multinationales',
          'Secteur public',
          'ONG et organisations internationales',
          'Économie sociale et solidaire'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière Hero */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Employabilité des Jeunes
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Accompagnons les jeunes africains vers l'emploi et l'entrepreneuriat
              à travers des programmes de formation et d'insertion innovants
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Formation Professionnelle
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Insertion Professionnelle
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                Entrepreneuriat Jeunes
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
                    ? 'bg-emerald-600 text-white shadow-lg'
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
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <currentTab.icon className="w-6 h-6 text-emerald-600" />
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
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-black mb-4">Vue d'ensemble</h3>
                <p className="text-lg text-black leading-relaxed">
                  {currentTab.content.overview}
                </p>
              </div>

              {/* Services et Avantages */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6" />
                      <span>Nos Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.services.map((service, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-black">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Avantages */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-6 h-6" />
                      <span>Impact & Bénéfices</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {currentTab.content.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-black">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Secteurs d'intervention */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-6 text-center flex items-center justify-center space-x-2">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <span>Secteurs d'Intervention</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTab.content.sectors.map((sector, index) => (
                    <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-sm font-medium text-black">{sector}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistiques d'impact */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-8 text-center">Notre Impact en Chiffres</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">5,000+</div>
                    <p className="text-emerald-100">Jeunes formés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">75%</div>
                    <p className="text-emerald-100">Taux d'insertion</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">200+</div>
                    <p className="text-emerald-100">Entreprises créées</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15</div>
                    <p className="text-emerald-100">Pays d'intervention</p>
                  </div>
                </div>
              </div>

              {/* Processus d'accompagnement */}
              <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">
                  Notre Processus d'Accompagnement
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-emerald-600 font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-black mb-2">Évaluation</h4>
                    <p className="text-sm text-black">Diagnostic des compétences et aspirations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-teal-600 font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-black mb-2">Formation</h4>
                    <p className="text-sm text-black">Programmes adaptés et certifiants</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-cyan-600 font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-black mb-2">Insertion</h4>
                    <p className="text-sm text-black">Placement en emploi ou création d'entreprise</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-semibold text-black mb-2">Suivi</h4>
                    <p className="text-sm text-black">Accompagnement post-insertion</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Investissons ensemble dans l'avenir des jeunes africains
                </h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Rejoignez notre mission pour développer l'employabilité des jeunes et créer
                  des opportunités d'emploi durables en Afrique.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-gray-100"
                  >
                    Découvrir nos programmes
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Devenir partenaire
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

export default EmployabiliteJeunes;
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Eye, Heart, Handshake } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('histoire');

  const tabs = [
    { id: 'histoire', label: 'Notre Histoire', icon: Heart },
    { id: 'vision-mission', label: 'Visions & Missions', icon: Target },
    { id: 'valeurs', label: 'Valeurs', icon: Eye },
    { id: 'engagements', label: 'Nos Engagements', icon: Handshake }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'histoire':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-mck-blue-600 mb-4">mcK Africa</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Cabinet spécialisé en Management Stratégique et Opérationnel
              </p>
            </div>
            <div className="bg-gradient-to-r from-mck-blue-50 to-mck-green-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Fondé avec la vision de transformer le paysage économique africain, mcK Africa s'est imposé comme un partenaire de confiance pour les entreprises et organisations à travers le continent. Notre expertise combine une connaissance approfondie des marchés locaux avec les meilleures pratiques internationales.
              </p>
            </div>
          </div>
        );

      case 'vision-mission':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-mck-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-mck-blue-500 mr-3" />
                    <h3 className="text-2xl font-bold text-mck-blue-600">Notre Mission</h3>
                  </div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-mck-green-400 pl-4">
                    « Nous conseillons et accompagnons les entreprises en Afrique à chaque étape de leur développement, en leur apportant des solutions personnalisées pour relever leurs défis stratégiques, organisationnels et opérationnels. »
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-mck-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-mck-green-500 mr-3" />
                    <h3 className="text-2xl font-bold text-mck-green-600">Notre Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Être le partenaire stratégique et opérationnel des acteurs économiques africains, en les accompagnant vers une croissance pérenne et la création de valeur durable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'valeurs':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-mck-blue-600 mb-8">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Responsabilité",
                  description: "Assumer nos engagements et contribuer à des solutions durables.",
                  color: "bg-blue-500"
                },
                {
                  title: "Détermination",
                  description: "Aller au-delà des obstacles pour atteindre l'excellence.",
                  color: "bg-green-500"
                },
                {
                  title: "Résilience",
                  description: "S'adapter et rebondir face aux défis.",
                  color: "bg-purple-500"
                },
                {
                  title: "Excellence",
                  description: "Offrir des solutions de qualité supérieure à nos clients.",
                  color: "bg-orange-500"
                },
                {
                  title: "Disponibilité",
                  description: "Être toujours au service de nos clients.",
                  color: "bg-teal-500"
                }
              ].map((valeur, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full ${valeur.color} mr-3`}></div>
                      <h3 className="text-xl font-bold text-gray-800">{index + 1}. {valeur.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{valeur.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'engagements':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-mck-blue-600 mb-8">Nos Engagements</h2>
            <div className="space-y-6">
              {[
                {
                  number: "1",
                  title: "Création de Valeur Durable",
                  content: "Accroître la Création de Valeur durable à travers un partenariat toujours GAGNANT en ligne avec les Visions, Stratégies et Objectifs prioritaires de nos clients États, Organisations, Entreprises et Communautés"
                },
                {
                  number: "2",
                  title: "Solutions Stratégiques Adaptées",
                  content: "Identifier et valider avec vous, les Services, Solutions et Approches Stratégiques adéquats et gagnants avec impacts tangibles et mesurables"
                },
                {
                  number: "3",
                  title: "Suivi et Évaluation Continue",
                  content: "Suivre et évaluer continuellement les actions et initiatives validées en veillant à leur réussite et impacts effectifs."
                }
              ].map((engagement, index) => (
                <Card key={index} className="border-l-4 border-l-mck-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Badge className="bg-mck-green-500 text-white text-lg px-3 py-1 mr-4 mt-1">
                        {engagement.number}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-mck-blue-600 mb-3">{engagement.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{engagement.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Bannière avec image d'équipe */}
      <section className="relative h-96 bg-gradient-to-r from-mck-blue-600 to-mck-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')"
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">À Propos de mcK Africa</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Votre partenaire stratégique pour une croissance durable en Afrique
            </p>
          </div>
        </div>
      </section>

      {/* Section des onglets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation des onglets */}
          <div className="mb-12">
            <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all duration-200 whitespace-nowrap min-w-fit ${activeTab === tab.id
                        ? 'bg-white text-mck-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-mck-blue-600 hover:bg-white/50'
                      }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="min-h-[500px]">
            {renderTabContent()}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

const ServicesSection = () => {
  const [expandedCards, setExpandedCards] = useState<boolean[]>(new Array(5).fill(false));

  // 5 Expertises principales du mega menu McK Africa
  const expertises = [
    {
      title: "Human Capital",
      subtitle: "Conseil en Stratégie RH",
      description: "Diagnostic organisationnel RH, Design et mise en oeuvre de politiques de Gestion des talents, Formation, Rémunération, Culture d'Entreprise",
      services: [
        "Management & Recrutement",
        "Human Capital Advisory",
        "Development Programs & Executive Certification"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
      gradient: "from-blue-600 to-blue-800",
      route: "/human-capital"
    },
    {
      title: "Stratégie, Performance & Transformation",
      subtitle: "Transformation Organisationnelle",
      description: "Conseil en stratégie d'entreprise, optimisation des performances, transformation digitale et accompagnement au changement",
      services: [
        "Performance des Organisations",
        "Stratégie & Transformation",
        "Accompagnement au changement"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      gradient: "from-green-600 to-green-800",
      route: "/strategie-performance"
    },
    {
      title: "Technologie & Innovation",
      subtitle: "Solutions Digitales",
      description: "Big Data, Data Mining & Data Analytics, Veille & Innovations, Benchmarks & Baromètres de Marchés, Conseil et Assistance Technologie/Digital",
      services: [
        "Market Intelligence",
        "IT Solutions",
        "Data Analytics & Big Data",
        "Automatisation Processus",
        "Gouvernance et Sécurité IT"
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
      gradient: "from-purple-600 to-purple-800",
      route: "/technologie-innovation"
    },
    {
      title: "Employabilité et Insertion Professionnelle des Jeunes Diplômés",
      subtitle: "Développement des Compétences",
      description: "Diagnostic et évaluation des compétences techniques et comportementales, programmes de développement JEDE-eX, iWorkshop, insertion professionnelle",
      services: [
        "Évaluation des compétences (DISEC)",
        "Développement des compétences (JEDE-eX, iWorkshop)",
        "Insertion Professionnelle (inPec-Hub, eLiT Time, SAJEDE, GEO)"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
      gradient: "from-orange-600 to-orange-800",
      route: "/employabilite-jeunes"
    },
    {
      title: "Sourcing, Intérim, Recrutement Portage salarial",
      subtitle: "Solutions de Staffing",
      description: "Solutions de staffing temporaire, sous-traitance de services, recrutement expert métier et administration RH externalisée",
      services: [
        "Travail Temporaire & Sous-Traitance",
        "Recrutement Expert métier (Low & Middle Management)",
        "Administration RH (Externalisation paie, on site)"
      ],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
      gradient: "from-teal-600 to-teal-800",
      route: "/sourcing-interim"
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section id="services" className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-nata">
            Nos <span className="text-mck-blue-600">Expertises</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto font-sans">
            Une approche méthodologique éprouvée et des solutions sur mesure
            pour répondre à tous vos défis de recrutement et de gestion des talents.
          </p>
        </div>

        {/* Cartes interactives avec scroll horizontal sur mobile */}
        <div className="flex overflow-x-auto overflow-y-visible lg:grid lg:grid-cols-5 gap-6 pb-20 lg:pb-16 scrollbar-hide h-auto mb-2">
          {expertises.map((expertise, index) => (
            <div key={index} className="flex-shrink-0 w-80 lg:w-auto">
              <Link to={expertise.route} className="block">
                <Card
                  className="group transition-all duration-500 hover:shadow-lg border-0 bg-white overflow-hidden rounded-lg cursor-pointer"
                >
                  {/* Image avec effet zoom */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={expertise.image}
                      alt={expertise.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${expertise.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-1 font-nata">{expertise.title}</h3>
                        <p className="text-sm opacity-90 font-sans">{expertise.subtitle}</p>
                      </div>
                    </div>
                    {/* Icône d'accordéon */}
                    <div
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/30 transition-colors z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCard(index);
                      }}
                    >
                      {expandedCards[index] ? (
                        <ChevronUp className="w-5 h-5 text-white" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Contenu accordéon */}
                  <CardContent className={`transition-all duration-500 overflow-hidden rounded-b-lg ${expandedCards[index] ? 'h-60 p-6' : 'max-h-0 p-0'
                    }`}>
                    <div className="space-y-2">
                      {expertise.services.map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-black">
                          <ChevronRight className="w-4 h-4 text-mck-blue-500 mr-3 flex-shrink-0" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Indicateur de scroll sur mobile */}
        <div className="lg:hidden text-center mb-8">
          <p className="text-sm text-gray-500">← Faites défiler pour voir toutes les expertises →</p>
        </div>


      </div>
    </section>
  );
};

export default ServicesSection;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  // Services proposés par McK Africa
  const services = [
    {
      title: "Chasse de Tête Executive",
      description: "Identification et recrutement de dirigeants et cadres supérieurs pour des postes stratégiques.",
      features: ["Leadership Assessment", "Approche directe", "Accompagnement post-placement"],
      icon: "🎯"
    },
    {
      title: "Conseil en Stratégie RH",
      description: "Optimisation de vos processus RH et développement de stratégies de talents sur mesure.",
      features: ["Audit RH", "Stratégie de rétention", "Transformation digitale"],
      icon: "📈"
    },
    {
      title: "Évaluation de Talents",
      description: "Assessment center et évaluations psychométriques pour identifier les meilleurs profils.",
      features: ["Tests de personnalité", "Assessment center", "Rapports détaillés"],
      icon: "🧠"
    },
    {
      title: "Recrutement Sectoriel",
      description: "Expertise spécialisée dans les secteurs clés de l'économie africaine.",
      features: ["Finance & Banque", "Technologie", "Industrie & Énergie"],
      icon: "🏭"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-mck-blue-600">Expertises</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une approche méthodologique éprouvée et des solutions sur mesure 
            pour répondre à tous vos défis de recrutement et de gestion des talents.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-mck-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-mck-gold-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-mck-blue-600 hover:bg-mck-blue-700 text-white px-8 py-4">
            Découvrir tous nos services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

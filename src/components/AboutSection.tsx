
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  // Membres de l'équipe dirigeante
  const teamMembers = [
    {
      name: "Marie Kouadio",
      position: "Directrice Générale",
      expertise: "Strategy & Leadership",
      experience: "15+ années Big Four",
      image: "👩🏿‍💼"
    },
    {
      name: "Jean-Baptiste Nkomo",
      position: "Directeur des Opérations",
      expertise: "Tech & Innovation",
      experience: "12+ années en recrutement tech",
      image: "👨🏿‍💼"
    },
    {
      name: "Fatima Al-Rashid",
      position: "Directrice Commerciale",
      expertise: "Business Development",
      experience: "10+ années développement Afrique",
      image: "👩🏽‍💼"
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notre Mission */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            À Propos de <span className="text-mck-blue-600">McK Africa</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Fondé par d'anciens consultants des "Big Four", McK Africa révolutionne 
              le paysage du conseil en recrutement sur le continent africain.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-mck-blue-600 mb-3">Notre Mission</h3>
                  <p className="text-gray-600">
                    Connecter les talents exceptionnels d'Afrique aux opportunités qui transforment 
                    les entreprises et façonnent l'avenir du continent.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mck-blue-600 mb-3">Notre Vision</h3>
                  <p className="text-gray-600">
                    Devenir le cabinet de référence en Afrique pour le conseil en recrutement 
                    et le développement des talents de haut niveau.
                  </p>
                </div>
              </div>
              
              <div className="bg-mck-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-mck-blue-600 mb-6">Nos Valeurs</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-mck-gold-400 rounded-full mr-4"></div>
                    <span className="font-semibold">Excellence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-mck-gold-400 rounded-full mr-4"></div>
                    <span className="font-semibold">Intégrité</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-mck-gold-400 rounded-full mr-4"></div>
                    <span className="font-semibold">Innovation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-mck-gold-400 rounded-full mr-4"></div>
                    <span className="font-semibold">Diversité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Équipe dirigeante */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Notre Équipe <span className="text-mck-blue-600">Dirigeante</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-mck-blue-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.expertise}</p>
                  <p className="text-gray-500 text-xs">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nos engagements */}
        <div className="bg-gray-50 p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Nos <span className="text-mck-blue-600">Engagements</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-mck-blue-600">Responsabilité Sociale</h4>
              <p className="text-gray-600">
                Nous nous engageons à promouvoir la diversité et l'inclusion dans tous nos processus 
                de recrutement, contribuant au développement durable du continent africain.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-mck-blue-600">Innovation Continue</h4>
              <p className="text-gray-600">
                Nous investissons constamment dans les nouvelles technologies et méthodologies 
                pour offrir les solutions de recrutement les plus avancées du marché.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

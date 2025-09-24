import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Amadou Diallo",
      position: "Directeur Général",
      company: "Banque Atlantique Sénégal",
      content: "mcK Africa a transformé notre approche du recrutement exécutif. Leur expertise en management stratégique nous a permis d'identifier et d'attirer les meilleurs talents pour notre expansion en Afrique de l'Ouest.",
      rating: 5
    },
    {
      id: 2,
      name: "Fatima El Mansouri",
      position: "DRH",
      company: "OCP Group",
      content: "L'accompagnement de mcK Africa dans notre transformation digitale a été exceptionnel. Leur approche méthodique et leur connaissance du marché africain ont fait la différence dans nos recrutements tech.",
      rating: 5
    },
    {
      id: 3,
      name: "Jean-Baptiste Kouassi",
      position: "CEO",
      company: "Orange Côte d'Ivoire",
      content: "Grâce à mcK Africa, nous avons pu structurer notre équipe de direction avec des profils de haut niveau. Leur réseau et leur expertise en chasse de tête sont remarquables.",
      rating: 5
    },
    {
      id: 4,
      name: "Aisha Mwangi",
      position: "Directrice Innovation",
      company: "Safaricom Kenya",
      content: "mcK Africa comprend parfaitement les enjeux du marché africain. Leur approche personnalisée et leur suivi rigoureux nous ont permis de recruter des talents exceptionnels pour nos projets d'innovation.",
      rating: 5
    },
    {
      id: 5,
      name: "Mohamed Ben Ali",
      position: "Directeur Stratégie",
      company: "Attijariwafa Bank",
      content: "L'expertise de mcK Africa en management de la performance nous a aidés à optimiser nos processus RH. Leur vision stratégique et leur connaissance du terrain sont des atouts majeurs.",
      rating: 5
    },
    {
      id: 6,
      name: "Grace Okafor",
      position: "VP Human Resources",
      company: "Dangote Group",
      content: "mcK Africa a été un partenaire clé dans notre expansion continentale. Leur capacité à identifier et évaluer les talents locaux tout en maintenant des standards internationaux est impressionnante.",
      rating: 5
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 font-nata">
            Ce que disent nos <span className="text-mck-blue-600">clients</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos partenaires qui nous font confiance pour leurs en Management Stratégique et Opérationnel.
          </p>
        </div>

        {/* Container avec contrôles de navigation */}
        <div className="relative">
          {/* Boutons de navigation */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('left')}
                className="border-mck-blue-600 text-mck-blue-600 hover:bg-mck-blue-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('right')}
                className="border-mck-blue-600 text-mck-blue-600 hover:bg-mck-blue-50"
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Container de scroll horizontal */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="flex-shrink-0 w-80 sm:w-96 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white"
                style={{ scrollSnapAlign: 'start' }}
              >
                <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                  {/* Icône de citation */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-mck-blue-600 opacity-60" />
                  </div>

                  {/* Contenu du témoignage */}
                  <div className="flex-grow mb-6">
                    <p className="text-gray-700 text-base leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Informations du client */}
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-bold text-black text-lg mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-mck-blue-600 font-semibold text-sm mb-1">
                      {testimonial.position}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection;
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin, Bookmark, Globe, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

const MissionsEventsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 6;

  const missions = [
    {
      id: 1,
      title: "Système de Management de la Performance",
      category: "Stratégie, Performance & Transformation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Diagnostic organisationnel RH",
      category: "Human Capital",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Chasse de tête, Recrutement & Exécutif",
      category: "Sourcing & Intérim",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Design et mise en œuvre de politiques de Gestion des talents",
      category: "Human Capital",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "Certificat Exécutif Leading & Implementing strategy (LIS)",
      category: "Employabilité des Jeunes",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Transformation digitale et innovation",
      category: "Technologie & Innovation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      title: "Audit et optimisation des processus RH",
      category: "Human Capital",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      title: "Stratégie de développement commercial",
      category: "Stratégie, Performance & Transformation",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 9,
      title: "Programme de formation en leadership",
      category: "Employabilité des Jeunes",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 10,
      title: "Mise en place d'outils de gestion de projet",
      category: "Technologie & Innovation",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 11,
      title: "Accompagnement dans la restructuration",
      category: "Stratégie, Performance & Transformation",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 12,
      title: "Solutions de staffing temporaire",
      category: "Sourcing & Intérim",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 13,
      title: "Data Analytics & Big Data",
      category: "Technologie & Innovation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 14,
      title: "Évaluation des compétences (DISEC)",
      category: "Employabilité des Jeunes",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 15,
      title: "Administration RH externalisée",
      category: "Sourcing & Intérim",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 16,
      title: "Gouvernance et Sécurité IT",
      category: "Technologie & Innovation",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 17,
      title: "Culture d'Entreprise et Rémunération",
      category: "Human Capital",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 18,
      title: "Insertion Professionnelle (inPec-Hub)",
      category: "Employabilité des Jeunes",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const totalSlides = Math.ceil(missions.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentMissions = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return missions.slice(startIndex, startIndex + itemsPerSlide);
  };

  const events = [
    {
      id: 1,
      title: "Webinaire 1 LIS",
      type: "Table-ronde",
      date: "Mardi - 16 Sep, 2025. 9:00 PM",
      location: "Siège mcK Africa",
      image: "/Landing mcK.webp",
      participants: "200+ personnes inscrites",
      isPublic: true,
      avatars: [
        "/Landing mcK.webp",
        "/Pictograme mcK.webp",
        "/Landing mcK.webp",
        "/Pictograme mcK.webp"
      ]
    },
    {
      id: 2,
      title: "Lancement LIS",
      type: "Certificat Exécutif",
      date: "Mardi - 06 Oct, 2025. 9:00 PM",
      location: "Siège mcK Africa",
      image: "/Pictograme mcK.webp",
      participants: "132+ personnes inscrites",
      isPublic: false,
      avatars: [
        "/Landing mcK.webp",
        "/Pictograme mcK.webp",
        "/Landing mcK.webp",
        "/Pictograme mcK.webp"
      ]
    },
    {
      id: 3,
      title: "Lancement HRacT",
      type: "Table-ronde",
      date: "Mardi - 14 Oct, 2025. 9:00 PM",
      location: "Siège mcK Africa",
      image: "/Landing mcK.webp",
      participants: "32+ personnes inscrites",
      isPublic: true,
      avatars: [
        "/Landing mcK.webp",
        "/Pictograme mcK.webp",
        "/Landing mcK.webp",
        "/Pictograme mcK.webp"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:items-start">

          {/* Nos Missions et Réalisations - 2 colonnes */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-black whitespace-nowrap">Nos <span className="text-mck-blue-600">Missions</span> et <span className="text-mck-blue-600">Réalisations</span></h2>
              </div>

              {/* Contrôles du slider - Desktop seulement */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:border-mck-blue-500 hover:bg-mck-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="text-sm text-gray-500 mx-2">
                  {currentSlide + 1} / {Math.ceil(missions.length / itemsPerSlide)}
                </span>
                <button
                  onClick={() => setCurrentSlide(Math.min(Math.ceil(missions.length / itemsPerSlide) - 1, currentSlide + 1))}
                  disabled={currentSlide >= Math.ceil(missions.length / itemsPerSlide) - 1}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:border-mck-blue-500 hover:bg-mck-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {/* Version Desktop - Grid avec slider */}
              <div className="hidden lg:block flex-1">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(missions.length / itemsPerSlide) }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {missions.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((mission) => (
                            <div key={mission.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                <img
                                  src={mission.image}
                                  alt={mission.title}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                              </div>
                              <div className="p-4">
                                <div className="mb-2">
                                  <span className="text-mck-blue-600 text-xs font-semibold">
                                    {mission.category}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-black text-sm line-clamp-2">{mission.title}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bouton Voir plus - Desktop */}
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="px-8 py-3 rounded-full border-gray-300 hover:border-mck-blue-600 hover:bg-mck-blue-600 hover:text-white transition-colors group">
                    Voir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:text-white" />
                  </Button>
                </div>
              </div>

              {/* Version Mobile/Tablette - Scroll horizontal */}
              <div className="lg:hidden flex-1 flex flex-col">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide flex-1">
                  {missions.map((mission) => (
                    <div key={mission.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-64">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img
                          src={mission.image}
                          alt={mission.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <div className="mb-2">
                          <span className="text-mck-blue-600 text-xs font-semibold">
                            {mission.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-black text-sm line-clamp-2">{mission.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bouton centré sur mobile */}
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="px-6 py-2 text-sm rounded-full border-gray-300 hover:border-mck-blue-600 hover:bg-mck-blue-600 hover:text-white transition-colors group">
                    Voir plus
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Nos Événements - 1 colonne */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-black whitespace-nowrap">Nos <span className="text-mck-blue-600">Événements</span> à Venir</h2>
            </div>

            <div className="flex-1 flex flex-col">
              {/* Version Desktop - Liste verticale */}
              <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 flex-1">
                {events.map((event, index) => (
                  <div key={event.id}>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      {/* Header avec date */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500 font-medium">{event.date}</span>
                      </div>

                      {/* Contenu principal avec image et texte */}
                      <div className="flex gap-4">
                        {/* Image à gauche */}
                        <div className="flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </div>

                        {/* Contenu à droite */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-black mb-2 text-lg leading-tight">{event.title}</h3>

                          {/* Avatars et participants */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex -space-x-2">
                              {event.avatars.slice(0, 4).map((avatar, idx) => (
                                <img
                                  key={idx}
                                  src={avatar}
                                  alt=""
                                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-black font-medium">{event.participants}</span>
                          </div>


                        </div>
                      </div>
                    </div>

                    {/* Séparateur entre les événements (sauf pour le dernier) */}
                    {index < events.length - 1 && (
                      <div className="border-b border-gray-100"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Version Mobile/Tablette - Scroll horizontal */}
              <div className="lg:hidden flex-1">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {events.map((event) => (
                    <div key={event.id} className="flex-shrink-0 w-80 bg-white rounded-2xl border border-gray-200 shadow-sm">
                      <div className="p-4">
                        {/* Header avec date */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500 font-medium">{event.date}</span>
                        </div>

                        {/* Contenu principal avec image et texte */}
                        <div className="flex gap-4">
                          {/* Image à gauche */}
                          <div className="flex-shrink-0">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          </div>

                          {/* Contenu à droite */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black mb-2 text-lg leading-tight">{event.title}</h3>

                            {/* Avatars et participants */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex -space-x-2">
                                {event.avatars.slice(0, 4).map((avatar, idx) => (
                                  <img
                                    key={idx}
                                    src={avatar}
                                    alt=""
                                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-black font-medium">{event.participants}</span>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button variant="outline" className="px-8 py-3 rounded-full border-gray-300 hover:border-mck-blue-600 hover:bg-mck-blue-600 hover:text-white transition-colors group">
                  Voir plus
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionsEventsSection;
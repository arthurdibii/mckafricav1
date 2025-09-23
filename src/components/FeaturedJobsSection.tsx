import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';

const FeaturedJobsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour vérifier si une offre est expirée
  const isJobExpired = (deadline: string): boolean => {
    try {
      // Convertir la date française en format ISO
      const [day, month, year] = deadline.split(' ');
      const monthNames = {
        'Janvier': '01', 'Février': '02', 'Mars': '03', 'Avril': '04',
        'Mai': '05', 'Juin': '06', 'Juillet': '07', 'Août': '08',
        'Septembre': '09', 'Octobre': '10', 'Novembre': '11', 'Décembre': '12'
      };

      const monthNumber = monthNames[month as keyof typeof monthNames];
      if (!monthNumber) return false;

      const deadlineDate = new Date(`${year}-${monthNumber}-${day.padStart(2, '0')}`);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      return deadlineDate < today;
    } catch (error) {
      console.error('Erreur lors du parsing de la date:', deadline, error);
      return false;
    }
  };

  // Données des emplois en vedette (triées du plus récent au moins récent)
  const allFeaturedJobs = [
    {
      id: 1,
      title: "Directeur Financier",
      company: "Groupe Bancaire International",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 1 jour",
      deadline: "30 Mars 2026",
      gradient: "from-purple-500 to-blue-600",
      tags: ["Leadership", "Finance", "Strategy"]
    },
    {
      id: 2,
      title: "Head of Technology",
      company: "Fintech Innovation",
      location: "Yamoussoukro, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 2 jours",
      deadline: "25 Mars 2026",
      gradient: "from-blue-500 to-cyan-600",
      tags: ["Tech Leadership", "Fintech", "Innovation"]
    },
    {
      id: 3,
      title: "Responsable Développement Durable",
      company: "Multinationale Énergie",
      location: "San-Pédro, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 3 jours",
      deadline: "15 Mars 2026",
      gradient: "from-green-500 to-teal-600",
      tags: ["Sustainability", "Energy", "CSR"]
    },
    {
      id: 4,
      title: "Directeur Marketing",
      company: "Startup EdTech",
      location: "Bouaké, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 5 jours",
      deadline: "20 Mars 2026",
      gradient: "from-orange-500 to-red-600",
      tags: ["Marketing", "EdTech", "Growth"]
    },
    {
      id: 5,
      title: "Senior Consultant",
      company: "Cabinet de Conseil",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 1 semaine",
      deadline: "25 Mars 2026",
      gradient: "from-indigo-500 to-purple-600",
      tags: ["Consulting", "Strategy", "Leadership"]
    },
    // Ajout d'une offre expirée pour tester la logique
    {
      id: 6,
      title: "Directeur des Opérations",
      company: "Entreprise Logistique",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI",
      postedDate: "Il y a 2 semaines",
      deadline: "15 Janvier 2024", // Date expirée pour test
      gradient: "from-gray-400 to-gray-600",
      tags: ["Operations", "Logistics", "Management"]
    }
  ];

  // Filtrer les offres non expirées
  const featuredJobs = allFeaturedJobs.filter(job => !isJobExpired(job.deadline));

  const itemWidth = 336; // Largeur de chaque carte (320px) + marge (16px)
  const containerRef = useRef<HTMLDivElement>(null);

  // Pour le scroll infini, on duplique les éléments
  const duplicatedJobs = [...featuredJobs, ...featuredJobs, ...featuredJobs];
  const totalJobs = duplicatedJobs.length;
  const originalLength = featuredJobs.length;

  // Défilement automatique avec scroll infini
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Si on atteint la fin du deuxième set, on revient au début du deuxième set
          if (nextIndex >= originalLength * 2) {
            // Reset sans transition pour créer l'illusion du scroll infini
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.transition = 'none';
                setCurrentIndex(originalLength);
                // Remettre la transition après le reset
                setTimeout(() => {
                  if (containerRef.current) {
                    containerRef.current.style.transition = 'transform 500ms ease-in-out';
                  }
                }, 50);
              }
            }, 500);
            return nextIndex;
          }
          return nextIndex;
        });
      }, 4000); // Change toutes les 4 secondes
    };

    // Commencer au milieu du premier set dupliqué pour permettre le scroll dans les deux directions
    setCurrentIndex(originalLength);
    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [featuredJobs.length, originalLength]);

  // Arrêter le défilement automatique lors de l'interaction manuelle
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Reprendre le défilement automatique après interaction
  const resumeAutoScroll = () => {
    stopAutoScroll(); // S'assurer qu'aucun timer n'est actif

    // Utiliser un timeout pour reprendre après 3 secondes
    const timeoutId = setTimeout(() => {
      // Vérifier qu'aucun timer n'est déjà actif avant d'en créer un nouveau
      if (!autoScrollRef.current) {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            return (prevIndex + 1) % featuredJobs.length;
          });
        }, 4000);
      }
    }, 3000); // Reprend après 3 secondes (réduit de 5 à 3)

    // Nettoyer le timeout si le composant est démonté
    return () => clearTimeout(timeoutId);
  };

  const scrollToIndex = (index: number) => {
    // Ajuster l'index pour pointer vers le bon élément dans le set du milieu
    setCurrentIndex(originalLength + index);
    stopAutoScroll();
    resumeAutoScroll();
  };

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      // Si on va en dessous du premier set, on passe au dernier élément du deuxième set
      if (newIndex < 0) {
        // Reset sans transition
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'none';
            setCurrentIndex(originalLength * 2 - 1);
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.transition = 'transform 500ms ease-in-out';
              }
            }, 50);
          }
        }, 500);
        return newIndex;
      }
      return newIndex;
    });
    stopAutoScroll();
    resumeAutoScroll();
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Si on atteint la fin du deuxième set, on revient au début du deuxième set
      if (nextIndex >= originalLength * 2) {
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'none';
            setCurrentIndex(originalLength);
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.transition = 'transform 500ms ease-in-out';
              }
            }, 50);
          }
        }, 500);
        return nextIndex;
      }
      return nextIndex;
    });
    stopAutoScroll();
    resumeAutoScroll();
  };

  return (
    <section className="pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full">
        {/* En-tête */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Nos Recrutements <span className="text-mck-blue-600">Exécutifs</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Découvrez les opportunités les plus récentes et les plus attractives.
          </p>
        </div>

        {/* Conteneur de défilement */}
        <div className="relative overflow-hidden w-screen -ml-[50vw] left-1/2 pb-8">
          {/* Boutons de navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={resumeAutoScroll}
          >
            <ChevronLeft className="h-6 w-6 text-mck-blue-600" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={resumeAutoScroll}
          >
            <ChevronRight className="h-6 w-6 text-mck-blue-600" />
          </button>

          {/* Conteneur des cartes */}
          <div
            ref={scrollContainerRef}
            className="w-full py-4"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={resumeAutoScroll}
          >
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out pl-4"
              style={{
                transform: `translateX(-${currentIndex * itemWidth}px)`,
                width: `${duplicatedJobs.length * itemWidth}px`
              }}
            >
              {duplicatedJobs.map((job, index) => (
                <div key={`${job.id}-${index}`} className="flex-shrink-0 w-80 mr-4">
                  <Card className="h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden rounded-2xl flex flex-col">
                    {/* Header avec gradient */}
                    <div className={`bg-gradient-to-r ${job.gradient} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-end mb-4">
                          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20">
                            {job.type}
                          </Badge>
                        </div>

                        <CardTitle className="text-xl font-bold mb-2 text-white">
                          {job.title}
                        </CardTitle>

                        <p className="text-white/90 font-medium">{job.company}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                      {/* Informations de base */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center text-black">
                          <MapPin className="h-4 w-4 mr-2 text-mck-blue-500" />
                          <span className="text-sm">{job.location}</span>
                        </div>

                        <div className="flex items-center text-black">
                          <Calendar className="h-4 w-4 mr-2 text-red-500" />
                          <span className="text-sm font-medium text-red-600">Deadline: {job.deadline}</span>
                        </div>

                        <div className="flex items-center text-black">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-xs">{job.postedDate}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {job.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="bg-mck-blue-50 text-mck-blue-700 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-mck-blue-200 text-mck-blue-600 hover:bg-mck-blue-50"
                        >
                          Sauvegarder
                        </Button>
                        <Link to={`/emploi/${job.id}`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-mck-blue-600 hover:bg-mck-blue-700"
                          >
                            Voir l'offre
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredJobs.map((_, index) => {
              // Calculer l'index actuel dans le contexte des éléments originaux
              const normalizedCurrentIndex = currentIndex % originalLength;
              return (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === normalizedCurrentIndex
                    ? 'bg-mck-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-mck-blue-300'
                    }`}
                  onMouseEnter={stopAutoScroll}
                  onMouseLeave={resumeAutoScroll}
                />
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 px-4 sm:px-6 lg:px-8">
          <Link to="/emplois">
            <Button
              size="lg"
              className="bg-mck-blue-600 hover:bg-mck-blue-700 text-white px-8 py-3 text-lg"
            >
              Voir toutes les offres
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
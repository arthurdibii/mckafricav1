import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Eye, Heart, Handshake, BookOpen, Users, ChevronLeft, ChevronRight, Star, Lightbulb, TrendingUp, Filter, ChevronDown, X, Linkedin } from 'lucide-react';
import Waves from '@/components/Waves';

// Composant de compteur animé
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;
    const endValue = parseInt(end);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
      {count}{suffix}
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('histoire');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerDesktopRef = useRef<HTMLDivElement>(null);
  const scrollContainerMobileRef = useRef<HTMLDivElement>(null);
  const [showLeftArrowDesktop, setShowLeftArrowDesktop] = useState(false);
  const [showRightArrowDesktop, setShowRightArrowDesktop] = useState(false);
  const [showLeftArrowMobile, setShowLeftArrowMobile] = useState(false);
  const [showRightArrowMobile, setShowRightArrowMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeValue, setActiveValue] = useState('responsabilite');
  const [activeEngagement, setActiveEngagement] = useState('creation-valeur');

  // États pour les filtres de l'équipe
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('');
  const [showTeamFilters, setShowTeamFilters] = useState(false);

  // Gérer l'activation de l'onglet équipe quand on revient de la page profil
  useEffect(() => {
    if (location.state?.activeTab === 'equipe') {
      setActiveTab('equipes');
      // Restaurer les filtres si ils existent
      if (location.state?.filters?.selectedTeamFilter) {
        setSelectedTeamFilter(location.state.filters.selectedTeamFilter);
      }
      
      // Si on doit scroller vers un membre spécifique
      if (location.state?.scrollToMember) {
        // Utiliser requestAnimationFrame pour s'assurer que le DOM est rendu
        requestAnimationFrame(() => {
          setTimeout(() => {
            // Chercher l'élément de la carte du membre
            const memberCards = document.querySelectorAll('[data-member-name]');
            const targetCard = Array.from(memberCards).find(card => 
              card.getAttribute('data-member-name') === location.state.scrollToMember
            );
            
            if (targetCard) {
              targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }, 500); // Délai plus long pour s'assurer que tout est rendu
        });
      }
      // Sinon, restaurer la position de scroll si elle existe
      else if (location.state?.scrollPosition !== undefined) {
        // Utiliser requestAnimationFrame pour s'assurer que le DOM est rendu
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({
              top: location.state.scrollPosition,
              behavior: 'auto'
            });
          }, 300); // Délai plus long pour s'assurer que tout est rendu
        });
      }
    }
  }, [location.state]);

  const tabs = [
    { id: 'histoire', label: 'Notre Histoire', icon: Heart },
    { id: 'vision-mission', label: 'Visions & Missions', icon: Target },
    { id: 'valeurs', label: 'Valeurs', icon: Eye },
    { id: 'methodologie', label: 'Notre méthodologie', icon: BookOpen },
    { id: 'equipes', label: 'Nos équipes', icon: Users },
    { id: 'engagements', label: 'Nos Engagements', icon: Handshake }
  ];

  // Données des collaborateurs
  const teamMembers = [
    {
      id: 1,
      name: "Mohamed KABA",
      position: "Associé",
      category: "Associé",
      image: "public/Mohamed KABA.png",
      linkedin: "https://www.linkedin.com/in/mohamed-kaba-ab732046/"
    },
    {
      id: 2,
      name: "Charles KIÉ",
      position: "Associée",
      category: "Associé",
      image: "public/Charle KIE.png",
      linkedin: "https://www.linkedin.com/in/charles-kie-08816912/"
    },
    {
      id: 3,
      name: "Abdoul Karim SAKO ",
      position: "Directeur BU Technologie & Innovation",
      category: "Directeur",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/jb-ouedraogo"
    },
    {
      id: 4,
      name: "Datte KOUASSI",
      position: "Directeur Général DiN Africa",
      category: "Directeur",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/aisha-traore"
    },
    {
      id: 5,
      name: "Hippolyte KOUAMÉ",
      position: " Directeur BU Human Capital",
      category: "Directeur",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/mohamed-camara"
    },
    {
      id: 6,
      name: "Yasmine MOURAD",
      position: "Directrice des Opérations RH",
      category: "Directeur",
      image: "public/Yasmine Mourad.jpg",
      linkedin: "https://linkedin.com/in/aminata-sow"
    },
    {
      id: 7,
      name: "Assietou KONATE",
      position: "Directrice du Developpement Commercial",
      category: "Directeur",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/kwame-asante"
    },
    {
      id: 8,
      name: "Jerry ADOU",
      position: "Consultante Senior Capital Humain",
      category: "Consultant Senior",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/mariam-diabate"
    },
    {
      id: 9,
      name: "Moctar DOUMBIA",
      position: "Consultant Senior Capital Humain",
      category: "Consultant Senior",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/ibrahim-sankara"
    },
    {
      id: 10,
      name: "Moussa YEO",
      position: "Consultante Research & Business Analyst",
      category: "Consultant Senior",
      image: "public/Datte KOUASSI.jpg",
      linkedin: "https://linkedin.com/in/grace-mensah"
    },
    {
      id: 11,
      name: "Maximilien KONAN",
      position: "Consultante Stratégie",
      category: "Consultant",
      image: "public/Yasmine Mourad.jpg",
      linkedin: "https://linkedin.com/in/omar-ba"
    },
    {
      id: 12,
      name: "Nana Akoto",
      position: "Consultante RH",
      category: "Consultant",
      image: "public/Yasmine Mourad.jpg",
      linkedin: "https://linkedin.com/in/nana-akoto"
    },
    {
      id: 13,
      name: "Sekou Toure",
      position: "Consultant Finance",
      category: "Consultant",
      image: "public/Yasmine Mourad.jpg",
      linkedin: "https://linkedin.com/in/sekou-toure"
    },
    {
      id: 14,
      name: "Adama Coulibaly",
      position: "Consultante Opérations",
      category: "Consultant",
      image: "public/Yasmine Mourad.jpg",
      linkedin: "https://linkedin.com/in/adama-coulibaly"
    }
  ];

  // Catégories de filtres
  const teamCategories = [
    { id: '', name: 'Tous' },
    { id: 'Associé', name: 'Associé' },
    { id: 'Directeur', name: 'Directeur' },
    { id: 'Consultant Senior', name: 'Consultant Senior' },
    { id: 'Consultant', name: 'Consultant' }
  ];

  // Fonction pour filtrer les membres de l'équipe
  const filteredTeamMembers = teamMembers.filter(member => {
    if (!selectedTeamFilter) return true;
    return member.category === selectedTeamFilter;
  });

  // Fonction pour réinitialiser les filtres de l'équipe
  const clearTeamFilters = () => {
    setSelectedTeamFilter('');
  };

  // Fonction pour changer d'onglet avec scroll automatique
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsInitialLoad(false); // Marquer que ce n'est plus le chargement initial
  };

  // Fonction pour vérifier si les flèches doivent être affichées (Desktop)
  const checkScrollArrowsDesktop = () => {
    if (scrollContainerDesktopRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerDesktopRef.current;
      setShowLeftArrowDesktop(scrollLeft > 0);
      setShowRightArrowDesktop(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Fonction pour vérifier si les flèches doivent être affichées (Mobile)
  const checkScrollArrowsMobile = () => {
    if (scrollContainerMobileRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerMobileRef.current;
      setShowLeftArrowMobile(scrollLeft > 0);
      setShowRightArrowMobile(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Fonction pour faire défiler vers la gauche (Desktop)
  const scrollLeftTabsDesktop = () => {
    if (scrollContainerDesktopRef.current) {
      scrollContainerDesktopRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour faire défiler vers la droite (Desktop)
  const scrollRightTabsDesktop = () => {
    if (scrollContainerDesktopRef.current) {
      scrollContainerDesktopRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour faire défiler vers la gauche (Mobile)
  const scrollLeftTabsMobile = () => {
    if (scrollContainerMobileRef.current) {
      scrollContainerMobileRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour faire défiler vers la droite (Mobile)
  const scrollRightTabsMobile = () => {
    if (scrollContainerMobileRef.current) {
      scrollContainerMobileRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  // Gestion du clic + glissement (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerDesktopRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerDesktopRef.current.offsetLeft);
      setScrollLeft(scrollContainerDesktopRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerDesktopRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerDesktopRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerDesktopRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Effect pour scroll automatique lors du changement d'onglet (sauf au chargement initial)
  useEffect(() => {
    if (tabContentRef.current && !isInitialLoad) {
      // Calculer la position avec un offset plus grand pour voir les titres
      const element = tabContentRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 180; // 180px d'offset pour voir les titres

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [activeTab, isInitialLoad]);

  // Vérifier les flèches au montage et lors du redimensionnement
  useEffect(() => {
    checkScrollArrowsDesktop();
    checkScrollArrowsMobile();
    const handleResize = () => {
      checkScrollArrowsDesktop();
      checkScrollArrowsMobile();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Vérifier les flèches lors du scroll (Desktop)
  const handleScrollDesktop = () => {
    checkScrollArrowsDesktop();
  };

  // Vérifier les flèches lors du scroll (Mobile)
  const handleScrollMobile = () => {
    checkScrollArrowsMobile();
  };

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
          <div className="space-y-12">
            {/* Texte principal */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Chez mcK Africa, nous sommes engagés à révolutionner l'industrie du conseil avec des solutions innovantes, durables et rentables. Avec un historique éprouvé de réalisation de missions exceptionnelles, nous combinons une technologie de pointe, une expertise qualifiée et des approches centrées sur le client pour donner vie aux visions.
              </p>
            </div>

            {/* Statistiques avec compteurs animés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <AnimatedCounter end="70" suffix="+" duration={2500} />
                <div className="text-gray-600 font-medium">Missions Réalisées</div>
              </div>
              <div>
                <AnimatedCounter end="20" suffix="+" duration={2000} />
                <div className="text-gray-600 font-medium">Membres d'Équipe</div>
              </div>
              <div>
                <AnimatedCounter end="80" suffix="+" duration={2800} />
                <div className="text-gray-600 font-medium">Avis Clients</div>
              </div>
              <div>
                <AnimatedCounter end="30" suffix="+" duration={2200} />
                <div className="text-gray-600 font-medium">Domaines d'expertises</div>
              </div>
            </div>

            {/* Section Mission avec le nouveau style */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    NOTRE MISSION
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Accompagner Votre
                    <br />
                    <span className="italic text-gray-700">Croissance & Succès</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Nous conseillons et accompagnons les entreprises en Afrique à chaque étape de leur développement, en leur apportant des solutions personnalisées pour relever leurs défis stratégiques, organisationnels et opérationnels avec une approche centrée sur l'excellence.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Solutions Stratégiques</h4>
                        <p className="text-gray-600 text-sm">Accompagnement personnalisé pour vos défis organisationnels</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Eye className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Excellence Opérationnelle</h4>
                        <p className="text-gray-600 text-sm">Optimisation des processus et performance durable</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="/public/image lis.webp"
                    alt="Notre Mission"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Conseil Stratégique</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Croissance Durable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Vision avec le nouveau style */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2">
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    NOTRE VISION
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Transformer l'Avenir
                    <br />
                    <span className="italic text-gray-700">de l'Afrique</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Être le partenaire stratégique et opérationnel des acteurs économiques africains, en les accompagnant vers une croissance pérenne et la création de valeur durable à travers l'innovation et l'excellence.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Heart className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Leadership Africain</h4>
                        <p className="text-gray-600 text-sm">Développer les talents et leaders de demain</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Handshake className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Partenariat Durable</h4>
                        <p className="text-gray-600 text-sm">Relations à long terme basées sur la confiance</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative md:order-1">
                  <img
                    src="/public/Vison mcK.webp"
                    alt="Notre Vision"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Innovation</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'valeurs':
        const valeurs = [
          {
            id: 'responsabilite',
            title: "Responsabilité",
            description: "Assumer nos engagements et contribuer à des solutions durables.",
            color: "bg-blue-500",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'determination',
            title: "Détermination",
            description: "Aller au-delà des obstacles pour atteindre l'excellence.",
            color: "bg-green-500",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'resilience',
            title: "Résilience",
            description: "S'adapter et rebondir face aux défis.",
            color: "bg-purple-500",
            image: "/public/équipe mcK.webp"
          },
          {
            id: 'excellence',
            title: "Excellence",
            description: "Offrir des solutions de qualité supérieure à nos clients.",
            color: "bg-orange-500",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'disponibilite',
            title: "Disponibilité",
            description: "Être toujours au service de nos clients.",
            color: "bg-teal-500",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ];

        const currentValue = valeurs.find(v => v.id === activeValue) || valeurs[0];

        return (
          <div className="space-y-12">
            {/* Texte principal */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-mck-blue-600 mb-4">Nos Valeurs</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Les valeurs qui soutiennent nos activités et guident notre approche dans chaque mission que nous entreprenons.
              </p>
            </div>

            {/* Section avec style de carte */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image dynamique */}
                <div className="relative hidden md:block">
                  <img
                    src={currentValue.image}
                    alt={currentValue.title}
                    className="w-full h-96 object-cover rounded-2xl transition-all duration-500"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <div className={`w-3 h-3 rounded-full ${currentValue.color} mr-2`}></div>
                      <span className="text-sm font-medium text-gray-900">{currentValue.title}</span>
                    </div>
                  </div>
                </div>

                {/* Accordéon des valeurs */}
                <div>
                  <div className="space-y-4">
                    {valeurs.map((valeur, index) => (
                      <div
                        key={valeur.id}
                        className={`border rounded-lg transition-all duration-300 cursor-pointer ${activeValue === valeur.id
                          ? 'border-mck-blue-500 bg-mck-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setActiveValue(valeur.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-6 h-6 flex items-center justify-center mr-3">
                                <span className="text-mck-blue-500 font-bold text-lg">+</span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{valeur.title}</h3>
                            </div>
                          </div>
                          {activeValue === valeur.id && (
                            <div className="mt-3 pl-9">
                              <p className="text-gray-600 leading-relaxed">{valeur.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'methodologie':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-mck-blue-600 mb-8">Notre Méthodologie</h2>
            <p className='text-xl text-center mb-12'>Nous nous appuyons sur une démarche performante, participative et conforme aux meilleurs standards
              permettant une création de valeur durable chez nos clients et reposant sur un partenariat gagnant – gagnant.</p>

            {/* Container principal avec stepper et section bleue */}
            <div className="relative">
              {/* Stepper horizontal en haut */}
              <div className="flex justify-center items-center  relative z-20">
                <div className="flex items-center space-x-4 md:space-x-8">
                  {[
                    { icon: Handshake, isGreen: true },
                    { icon: Star, isGreen: false },
                    { icon: TrendingUp, isGreen: true },
                    { icon: Lightbulb, isGreen: false }
                  ].map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="flex items-center">
                        {/* Cercle avec icône - agrandi */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${step.isGreen
                          ? 'bg-mck-green-500'
                          : 'bg-gray-400'
                          }`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>

                        {/* Petite bulle avec chevron bleu (sauf pour le dernier) */}
                        {index < 3 && (
                          <div className="hidden md:flex items-center justify-center mx-4">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                              <ChevronRight className="w-4 h-4 text-mck-blue-500" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section bleue qui passe à la moitié des steppers */}
              <div className="bg-gradient-to-r from-mck-blue-500 to-mck-blue-600 rounded-2xl p-8 md:p-12 relative -mt-8 pt-16">
                {/* Grid des 4 méthodologies */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[
                    {
                      number: "01",
                      title: "CONSULTATION & ENGAGEMENT",
                      content: "Nous nous accordons avec nos clients sur les mécanismes de fonctionnement opérationnel à déployer afin de trouver ensemble les solutions les plus pertinentes."
                    },
                    {
                      number: "02",
                      title: "ALIGNEMENT ET COHÉSION DES ÉQUIPES",
                      content: "Nous nous assurons de l'adhésion et de l'implication des acteurs clés et des équipes dans la conduite et gestion des projets et missions confiés par nos clients, et mettons tout en oeuvre pour faciliter leur mobilisation, engagement et alignement."
                    },
                    {
                      number: "03",
                      title: "CRÉATION DE VALEUR DURABLE",
                      content: "Nous veillons à offrir à nos clients une expérience de qualité supérieure tout au long de notre parcours de collaboration en favorisant un transfert de compétences aux équipes."
                    },
                    {
                      number: "04",
                      title: "MEILLEURS STANDARDS OPÉRATIONNELS",
                      content: "Nous déployons des solutions et services en ligne avec les meilleurs standards et pratiques, et dans le respect strict des exigences légales. Nos approches sont construites à partir des solides expériences de nos consultants et tiennent compte des meilleurs benchmarks."
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative text-white">
                      {/* Numéro en arrière-plan avec opacité réduite */}
                      <div className="absolute top-0 left-0 text-8xl font-bold text-white opacity-10 leading-none">
                        {item.number}
                      </div>

                      {/* Contenu au-dessus */}
                      <div className="relative z-10 pt-8">
                        {/* Titre */}
                        <h3 className="font-bold text-mck-green-400 text-lg mb-4 leading-tight">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/90 text-sm leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'equipes':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-mck-blue-600 mb-8">Nos Équipes</h2>
            <div className="text-center mb-8">
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Une équipe d'experts passionnés, dédiée à votre succès et à la transformation de l'écosystème économique africain.
              </p>
            </div>

            {/* Section des filtres */}
            <div className="bg-gray-50 py-6 rounded-lg border">
              <div className="px-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Bouton pour afficher/masquer les filtres sur mobile */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Filtrer par catégorie</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTeamFilters(!showTeamFilters)}
                      className="lg:hidden"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                      <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showTeamFilters ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>

                  {/* Filtres Desktop */}
                  <div className="hidden lg:flex flex-wrap gap-3">
                    {teamCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedTeamFilter === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTeamFilter(category.id)}
                        className={`whitespace-nowrap ${selectedTeamFilter === category.id
                          ? 'bg-mck-blue-600 hover:bg-mck-blue-700 text-white'
                          : ''
                          }`}
                      >
                        {category.name}
                      </Button>
                    ))}

                    {/* Bouton pour effacer les filtres - toujours visible */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearTeamFilters}
                      className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Effacer
                    </Button>
                  </div>

                  {/* Menu déroulant Mobile */}
                  <div className={`lg:hidden ${showTeamFilters ? 'block' : 'hidden'}`}>
                    <div className="space-y-2">
                      {teamCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedTeamFilter === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedTeamFilter(category.id);
                            setShowTeamFilters(false);
                          }}
                          className={`w-full justify-start ${selectedTeamFilter === category.id
                            ? 'bg-mck-blue-600 hover:bg-mck-blue-700 text-white'
                            : ''
                            }`}
                        >
                          {category.name}
                        </Button>
                      ))}

                      {/* Bouton pour effacer les filtres - toujours visible */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          clearTeamFilters();
                          setShowTeamFilters(false);
                        }}
                        className="w-full justify-start text-gray-600 hover:text-gray-900"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Effacer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats de filtrage */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredTeamMembers.length} collaborateur{filteredTeamMembers.length > 1 ? 's' : ''} trouvé{filteredTeamMembers.length > 1 ? 's' : ''}
                {selectedTeamFilter && ` dans la catégorie "${selectedTeamFilter}"`}
              </p>
            </div>

            {/* Grille des collaborateurs */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} data-member-name={member.name} className="group relative overflow-hidden transition-all duration-300 border-0 backdrop-blur-lg bg-white/10 shadow-2xl hover:shadow-3xl hover:bg-white/20 h-96 md:h-[420px]">
                  <CardContent className="p-0 h-full">
                    <div className="relative overflow-hidden h-full">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Pilule catégorie en haut à gauche */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white text-xs font-medium px-3 py-1">
                          {member.category}
                        </Badge>
                      </div>

                      {/* Gradient overlay pour lisibilité */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Conteneur d'informations en style glass complet */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-white/10 backdrop-blur-xl border-t border-white/20">
                        <h3 className="font-bold text-sm md:text-lg text-white mb-1">{member.name}</h3>
                        <p className="text-white/90 text-xs md:text-sm mb-4">{member.position}</p>

                        {/* Boutons selon la catégorie */}
                        <div className="flex items-center gap-2">
                          {/* Pour Associés et Directeurs : Bouton Voir profil + LinkedIn */}
                          {(member.category === 'Associé' || member.category === 'Directeur') && (
                            <>
                              <Button
                                size="sm"
                                className="flex-1 bg-mck-blue-600 hover:bg-[#0052A3] text-white text-xs font-medium border-0"
                                onClick={() => {
                                  const prenomNom = member.name.toLowerCase().replace(/\s+/g, '-');
                                  const scrollPosition = window.scrollY;
                                  navigate(`/profil/${prenomNom}`, { 
                                    state: { 
                                      memberData: member,
                                      filters: { selectedTeamFilter },
                                      scrollPosition: scrollPosition,
                                      memberName: member.name
                                    } 
                                  });
                                }}
                              >
                                Voir profil
                              </Button>
                              <Button
                                size="sm"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 p-2 h-auto"
                                onClick={() => window.open(member.linkedin, '_blank')}
                              >
                                <Linkedin className="w-4 h-4 text-white" />
                              </Button>
                            </>
                          )}

                          {/* Pour Consultants et Consultants Senior : Seulement LinkedIn */}
                          {(member.category === 'Consultant' || member.category === 'Consultant Senior') && (
                            <Button
                              size="sm"
                              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 p-2 h-auto mx-auto"
                              onClick={() => window.open(member.linkedin, '_blank')}
                            >
                              <Linkedin className="w-4 h-4 text-white" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Message si aucun résultat */}
            {filteredTeamMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun collaborateur trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de filtrage.
                </p>
                <Button onClick={clearTeamFilters} variant="outline">
                  Effacer tous les filtres
                </Button>
              </div>
            )}
          </div>
        );

      case 'engagements':
        const engagements = [
          {
            id: 'creation-valeur',
            title: "Création de Valeur Durable",
            description: "Accroître la Création de Valeur durable à travers un partenariat toujours GAGNANT en ligne avec les Visions, Stratégies et Objectifs prioritaires de nos clients États, Organisations, Entreprises et Communautés",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'solutions-strategiques',
            title: "Solutions Stratégiques Adaptées",
            description: "Identifier et valider avec vous, les Services, Solutions et Approches Stratégiques adéquats et gagnants avec impacts tangibles et mesurables",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'suivi-evaluation',
            title: "Suivi et Évaluation Continue",
            description: "Suivre et évaluer continuellement les actions et initiatives validées en veillant à leur réussite et impacts effectifs.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ];

        const currentEngagement = engagements.find(e => e.id === activeEngagement) || engagements[0];

        return (
          <div className="space-y-12">
            {/* Texte principal */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-mck-blue-600 mb-4">Nos Engagements</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Nous veillons à offrir à nos clients/partenaires une expérience de qualité supérieure tout au long de notre parcours de collaboration, tout en favorisant un transfert de compétences aux équipes.
              </p>
            </div>

            {/* Section avec style de carte */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image dynamique */}
                <div className="relative hidden md:block">
                  <img
                    src={currentEngagement.image}
                    alt={currentEngagement.title}
                    className="w-full h-96 object-cover rounded-2xl transition-all duration-500"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mck-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-gray-900">{currentEngagement.title}</span>
                    </div>
                  </div>
                </div>

                {/* Accordéon des engagements */}
                <div>
                  <div className="space-y-4">
                    {engagements.map((engagement, index) => (
                      <div
                        key={engagement.id}
                        className={`border rounded-lg transition-all duration-300 cursor-pointer ${activeEngagement === engagement.id
                          ? 'border-mck-blue-500 bg-mck-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setActiveEngagement(engagement.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-6 h-6 flex items-center justify-center mr-3">
                                <span className="text-mck-blue-500 font-bold text-lg">+</span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{engagement.title}</h3>
                            </div>
                          </div>
                          {activeEngagement === engagement.id && (
                            <div className="mt-3 pl-9">
                              <p className="text-gray-600 leading-relaxed">{engagement.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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

      {/* Bannière Hero avec animation Waves */}
      <section className="relative bg-black overflow-hidden min-h-[500px] flex items-center">
        {/* Animation Waves en arrière-plan */}
        <div className="absolute inset-0">
          <Waves
            lineColor="#1017E0"
            backgroundColor="rgba(0, 0, 0, 0)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Nata Sans, serif' }}>
              À Propos de mcK Africa
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Votre partenaire stratégique pour une croissance durable en Afrique.
              Découvrez notre histoire, nos valeurs et notre engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation par onglets - Sticky */}
      <section className="bg-gray-50 border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: scroll horizontal avec flèches */}
          <div className="hidden sm:block py-6">
            <div className="relative">
              {/* Flèche gauche */}
              {showLeftArrowDesktop && (
                <button
                  onClick={scrollLeftTabsDesktop}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginLeft: '-12px' }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Flèche droite */}
              {showRightArrowDesktop && (
                <button
                  onClick={scrollRightTabsDesktop}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginRight: '-12px' }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Container des onglets avec scroll */}
              <div
                ref={scrollContainerDesktopRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide px-6"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onScroll={handleScrollDesktop}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                        ? 'bg-mck-blue-600 text-white shadow-lg'
                        : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
                        }`}
                      style={{ userSelect: 'none' }}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: scroll horizontal avec flèches */}
          <div className="sm:hidden py-4">
            <div className="relative">
              {/* Flèche gauche mobile */}
              {showLeftArrowMobile && (
                <button
                  onClick={scrollLeftTabsMobile}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 hover:bg-gray-50 transition-colors"
                  style={{ marginLeft: '-8px' }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              )}

              {/* Flèche droite mobile */}
              {showRightArrowMobile && (
                <button
                  onClick={scrollRightTabsMobile}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 hover:bg-gray-50 transition-colors"
                  style={{ marginRight: '-8px' }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              )}

              {/* Container des onglets mobile */}
              <div
                ref={scrollContainerMobileRef}
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                onScroll={handleScrollMobile}
              >
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 min-w-max ${activeTab === tab.id
                        ? 'bg-mck-blue-600 text-white shadow-lg'
                        : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des onglets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Contenu des onglets */}
          <div className="min-h-[500px]" ref={tabContentRef}>
            {renderTabContent()}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
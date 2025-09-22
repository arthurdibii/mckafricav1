import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      image: '/Landing mcK.webp',
      tag: 'mcK Report',
      title: 'Cabinet spécialisé en',
      subtitle: 'Management Stratégique',
      subtitle2: 'et Opérationnel',
      description: 'Contribuer activement à la transformation économique, industrielle et sociale de l\'Afrique.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
      tag: 'Certificat LIS',
      title: 'Excellence en',
      subtitle: 'Conseil Stratégique',
      subtitle2: 'et Innovation',
      description: 'Accompagner les entreprises africaines vers l\'excellence opérationnelle et la croissance durable.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
      tag: 'Human Capital',
      title: 'Transformation',
      subtitle: 'Digitale et',
      subtitle2: 'Organisationnelle',
      description: 'Moderniser les processus et structures pour une performance optimale dans l\'économie numérique.'
    },
    {
      id: 4,
      image: 'https://unsplash.com/fr/photos/personnes-debout-a-linterieur-du-batiment-de-la-ville-3fPXt37X6UQ&auto=format&fit=crop&w=1920&q=80',
      tag: 'IT',
      title: 'Leadership et',
      subtitle: 'Développement',
      subtitle2: 'des Talents',
      description: 'Former et développer les leaders de demain pour un impact durable sur le continent africain.'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
      tag: 'HRacT',
      title: 'Partenariat pour',
      subtitle: 'l\'Avenir de',
      subtitle2: 'l\'Afrique',
      description: 'Construire ensemble un écosystème économique prospère et inclusif pour tous.'
    },
    {
      id: 6,
      image: 'https://unsplash.com/fr/photos/personnes-debout-a-linterieur-du-batiment-de-la-ville-3fPXt37X6UQ',
      tag: 'Système de Management de la performance',
      title: 'Performance',
      subtitle: 'Optimisée et',
      subtitle2: 'Mesurable',
      description: 'Implémentez des systèmes de management de la performance efficaces pour maximiser vos résultats.'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1920&auto=format&fit=crop',
      tag: 'Recrutements Top Management',
      title: 'Leadership',
      subtitle: 'Exécutif et',
      subtitle2: 'Stratégique',
      description: 'Recrutez les meilleurs talents pour vos postes de direction et transformez votre organisation.'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop',
      tag: 'Team building',
      title: 'Cohésion',
      subtitle: 'd\'Équipe et',
      subtitle2: 'Collaboration',
      description: 'Renforcez la collaboration et l\'esprit d\'équipe pour une performance collective optimale.'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop',
      tag: 'Employabilité des jeunes',
      title: 'Avenir',
      subtitle: 'Professionnel des',
      subtitle2: 'Jeunes Talents',
      description: 'Développez l\'employabilité des jeunes talents africains pour un avenir prospère.'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextSlide = (currentSlide + 1) % slides.length;
            setCurrentSlide(nextSlide);
            scrollToActiveTag(nextSlide);
            return 0;
          }
          return prev + 2; // 2% every 100ms = 5 seconds total
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    scrollToActiveTag(index);
  };

  const scrollToActiveTag = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tagElements = container.querySelectorAll('[data-tag-index]');
      const activeTag = tagElements[index] as HTMLElement;

      if (activeTag) {
        const containerWidth = container.offsetWidth;
        const tagLeft = activeTag.offsetLeft;
        const tagWidth = activeTag.offsetWidth;
        const scrollLeft = tagLeft - (containerWidth / 2) + (tagWidth / 2);

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-[85vh] md:min-h-[85vh] lg:min-h-[80vh] grid grid-rows-[1fr_auto] lg:grid-rows-[auto_1fr_auto] lg:pt-32 overflow-hidden -mt-16 pt-16">
      {/* Slides avec effet zoom */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${index === currentSlide
            ? 'opacity-100 scale-110 animate-pulse'
            : 'opacity-0 scale-105'
            }`}
          style={{
            backgroundImage: `url("${slide.image}")`,
            animation: index === currentSlide ? 'continuousZoom 10s ease-in-out infinite' : 'none'
          }}
        />
      ))}

      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Éléments décoratifs en arrière-plan - optimisés pour grid */}
      <div className="absolute inset-0 bg-gradient-to-r from-mck-blue-500/10 to-mck-green-500/10"></div>
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-mck-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-mck-blue-500/10 rounded-full blur-3xl"></div>

      {/* Zone de contenu principal - utilise la grille */}
      <div className="relative z-10 grid grid-rows-[1fr_auto] h-full w-full">
        {/* Contenu principal centré verticalement et aligné à gauche */}
        <div className="flex items-center justify-start overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full min-w-0">
            <div className="opacity-100 transition-opacity duration-700">
              <div className="flex flex-col items-start space-y-3 sm:space-y-4 min-w-0 max-w-full">
                {/* Tag pillule */}
                <div className="w-full max-w-full">
                  <div className="bg-mck-green-500/20 backdrop-blur-sm border border-mck-green-400/30 text-mck-green-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium break-words text-center max-w-fit">
                    {slides[currentSlide].tag}
                  </div>
                </div>

                {/* Titre principal */}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-tight text-left max-w-full break-words" style={{ fontFamily: 'Nata Sans, sans-serif' }}>
                  {slides[currentSlide].title} <br />
                  <span className="text-mck-green-400">{slides[currentSlide].subtitle}</span>
                  <br />
                  {slides[currentSlide].subtitle2 && (
                    <span className="text-mck-green-400">{slides[currentSlide].subtitle2}</span>
                  )}
                </h1>

                {/* Sous-titre */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 w-full max-w-96 sm:max-w-52 md:max-w-2xl lg:max-w-3xl leading-relaxed text-left line-clamp-2 ">
                  {slides[currentSlide].description}
                </p>

                {/* Bouton d'action */}
                <div className="pt-4">
                  <Button size="lg" className="bg-white hover:bg-gray-50 text-black px-6 py-3 text-base rounded-full flex items-center gap-3 group shadow-lg">
                    Contactez-nous
                    <div className="bg-mck-green-500 rounded-full p-2 group-hover:bg-mck-green-600 transition-colors">
                      <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags avec scroll horizontal sur toutes les tailles d'écran */}
        <div className="pt-4 md:pt-8 lg:pt-12 pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div
              ref={scrollContainerRef}
              className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide py-4 -mx-2 px-2"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex items-center flex-shrink-0"
                  data-tag-index={index}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <button
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap max-w-[120px] sm:max-w-none truncate ${currentSlide === index
                      ? 'bg-mck-green-500/20 border border-mck-green-400/30 text-mck-green-400 backdrop-blur-sm scale-105'
                      : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    title={slide.tag}
                  >
                    {slide.tag}
                  </button>

                  {/* Petite barre de progression individuelle */}
                  {index < slides.length - 1 && (
                    <div className="w-8 md:w-12 h-0.5 bg-white/20 mx-2 md:mx-4 relative">
                      <div
                        className="absolute h-full bg-mck-green-400 transition-all duration-300"
                        style={{
                          width: index < currentSlide ? '100%' :
                            index === currentSlide ? `${progress}%` : '0%'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton scroll animé - optimisé pour grid */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <button
          onClick={scrollToNextSection}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 group"
        >
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-white group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
export default HeroSection;
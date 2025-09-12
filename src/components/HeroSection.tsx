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
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
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
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop',
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
    <section id="accueil" className="relative min-h-[85vh] md:min-h-[85vh] lg:min-h-[80vh] flex items-center justify-center lg:justify-start lg:items-start lg:pt-32 overflow-hidden -mt-16 pt-16">
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

      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-mck-blue-500/10 to-mck-green-500/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-mck-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-mck-blue-500/10 rounded-full blur-3xl"></div>

      {/* Contenu du slide actuel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left lg:mt-0 lg:mx-0 lg:ml-16 lg:pl-32">
        <div className="animate-fade-in lg:ml-0 lg:pl-0 lg:max-w-none lg:w-full">
          <div className="lg:ml-0 lg:pl-0">
            {/* Tag pillule */}
            <div className="mb-6">
              <span className="inline-block bg-mck-green-500/20 backdrop-blur-sm border border-mck-green-400/30 text-mck-green-400 px-4 py-2 rounded-full text-sm font-medium">
                {slides[currentSlide].tag}
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl md:text-6xl lg:text-6xl font-medium text-white mb-6 leading-tight" style={{ fontFamily: 'Nata Sans, sans-serif' }}>
              {slides[currentSlide].title} <br />
              <span className="text-mck-green-400">{slides[currentSlide].subtitle}</span>
              <br />
              {slides[currentSlide].subtitle2 && (
                <span className="text-mck-green-400">{slides[currentSlide].subtitle2}</span>
              )}
            </h1>

            {/* Sous-titre */}
            <p className="text-xl font-thin md:text-2xl text-gray-200 mb-12 max-w-4xl leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* Bouton d'action */}
            <div className="flex justify-start items-center mb-16">
              <Button size="lg" className="bg-white hover:bg-gray-50 text-black px-8 py-4 text-lg rounded-full flex items-center gap-3 group shadow-lg">
                Contactez-nous
                <div className="bg-mck-green-500 rounded-full p-2 group-hover:bg-mck-green-600 transition-colors">
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tags avec scroll horizontal sur toutes les tailles d'écran */}
      <div className="absolute bottom-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:ml-16 lg:pl-32">
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-auto scrollbar-hide py-4"
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${currentSlide === index
                    ? 'bg-mck-green-500/20 border border-mck-green-400/30 text-mck-green-400 backdrop-blur-sm scale-105'
                    : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
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

      {/* Bouton scroll animé */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={scrollToNextSection}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        >
          <ChevronDown className="h-6 w-6 text-white group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
export default HeroSection;
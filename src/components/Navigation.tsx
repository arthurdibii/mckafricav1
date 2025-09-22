
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // États pour gérer l'ouverture/fermeture des sous-expertises
  const [expandedSubSections, setExpandedSubSections] = useState({
    managementRecruitment: false,
    humanCapitalAdvisory: false,
    developmentPrograms: false,
    performanceOrganisations: false,
    transformationOrganisations: false,
    marketIntelligence: false,
    itSolutions: false,
    evaluationCompetences: false,
    developpementCompetences: false,
    insertionProfessionnelle: false,
    travailTemporaire: false,
    recrutementExpert: false,
    administrationRH: false,
    expertises: false,
    industries: false,
    consulting: false,
    insights: false,
    about: false,
    careers: false,
    offices: false,
    global: false
  });

  // Navigation hiérarchique pour le menu mobile
  const [currentLevel, setCurrentLevel] = useState<'main' | 'expertises' | 'expertise-detail'>('main');
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Menu principal']);

  // Bloquer le scroll de la page quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurer la position de scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup au démontage du composant
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fonction pour toggle une sous-section
  const toggleSubSection = (section: string) => {
    setExpandedSubSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  // Données des expertises
  const expertisesData = {
    'human-capital': {
      title: 'Human Capital',
      items: [
        { id: 'management-executive-recruitment', title: 'Management & Executive Recruitment', href: '#management-executive-recruitment' },
        { id: 'human-capital-advisory', title: 'Human Capital Advisory', href: '#human-capital-advisory' },
        { id: 'development-programs', title: 'Development Programs & Executive Certification', href: '#development-programs' }
      ]
    },
    'strategie-performance': {
      title: 'Stratégie, Performance & Transformation',
      items: [
        { id: 'performance-organisations', title: 'Performance des Organisations', href: '#performance-organisations' },
        { id: 'transformation-organisations', title: 'Transformation des Organisations', href: '#transformation-organisations' }
      ]
    },
    'technologie-innovation': {
      title: 'Technologie & Innovation',
      items: [
        { id: 'market-intelligence', title: 'Market Intelligence', href: '#market-intelligence' },
        { id: 'it-solutions', title: 'IT Solutions', href: '#it-solutions' }
      ]
    },
    'employabilite-jeunes': {
      title: 'Employabilité des Jeunes',
      items: [
        { id: 'evaluation-competences', title: 'Évaluation des compétences (DISEC)', href: '#evaluation-competences' },
        { id: 'developpement-competences', title: 'Développement des compétences', href: '#developpement-competences' },
        { id: 'insertion-professionnelle', title: 'Insertion Professionnelle', href: '#insertion-professionnelle' }
      ]
    },
    'sourcing-interim': {
      title: 'Sourcing & Intérim',
      items: [
        { id: 'travail-temporaire', title: 'Travail Temporaire & Sous-Traitance', href: '#travail-temporaire' },
        { id: 'recrutement-expert', title: 'Recrutement Expert métier', href: '#recrutement-expert' },
        { id: 'administration-rh', title: 'Administration RH', href: '#administration-rh' }
      ]
    }
  };

  // Fonctions de navigation
  const navigateToExpertises = () => {
    setCurrentLevel('expertises');
    setBreadcrumb(['Menu principal', 'Expertises']);
  };

  const navigateToExpertiseDetail = (expertiseKey: string) => {
    const expertise = expertisesData[expertiseKey as keyof typeof expertisesData];
    setCurrentLevel('expertise-detail');
    setSelectedExpertise(expertiseKey);
    setBreadcrumb(['Menu principal', 'Expertises', expertise.title]);
  };

  const navigateBack = () => {
    if (currentLevel === 'expertise-detail') {
      setCurrentLevel('expertises');
      setBreadcrumb(['Menu principal', 'Expertises']);
      setSelectedExpertise(null);
    } else if (currentLevel === 'expertises') {
      setCurrentLevel('main');
      setBreadcrumb(['Menu principal']);
    }
  };

  const resetMobileMenu = () => {
    setCurrentLevel('main');
    setBreadcrumb(['Menu principal']);
    setSelectedExpertise(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        resetMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Navigation items - structure principale du menu
  const navItems = [
    { name: 'Expertises', href: '#expertises', hasDropdown: true },
    { name: 'Insights', href: '/insights' },
    { name: 'Recrutements', href: '/emplois' },
    { name: 'À propos', href: '/apropos' }
  ];

  return (
    <nav className={`fixed top-0 w-full transition-all duration-300 z-50 ${!isHomePage || isScrolled
      ? 'bg-white/95 backdrop-blur-md'
      : 'bg-transparent lg:bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20 gap-4">
          {/* Logo McK Africa */}
          <div className="justify-self-start">
            <Link to="/" className="flex items-center">
              <img
                src={!isHomePage || isScrolled ? "/logo.webp" : "/logo-light.webp"}
                alt="McK Africa - New African Consulting Company"
                className="h-10 md:h-12 w-auto transition-all duration-300 object-contain"
                style={{ minWidth: '120px', maxWidth: '160px' }}
              />
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:block justify-self-center">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`px-3 py-3 text-base font-medium transition-colors duration-200 flex items-center gap-1 hover:border-b-2 hover:border-mck-green-500 whitespace-nowrap ${!isHomePage || isScrolled
                      ? 'text-gray-700 hover:text-mck-blue-500'
                      : 'text-white hover:text-mck-green-400'
                      }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </a>
                  {item.hasDropdown && (
                    <div className="absolute left-[-350px] mt-2 right-[-730px] bg-white rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-6 md:p-8 lg:p-10 xl:p-12 auto-rows-min">
                        {/* Colonne 1: Human Capital */}
                        <div className="grid-item flex flex-col space-y-4">
                          <a href="#human-capital" className="text-lg font-semibold text-mck-blue-500 hover:text-mck-green-500 mb-4 border-b border-mck-green-400 pb-2 block transition-colors duration-200">Human Capital</a>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#management-executive-recruitment" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Management & Executive Recruitment</a>
                                <button
                                  onClick={() => toggleSubSection('managementRecruitment')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.managementRecruitment ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.managementRecruitment ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Chasse de tête, Recrutement & Évaluation de potentiel pour postes de niveau Management & Exécutif, Cartographie de talents stratégiques par secteur d'activité</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#human-capital-advisory" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Human Capital Advisory</a>
                                <button
                                  onClick={() => toggleSubSection('humanCapitalAdvisory')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.humanCapitalAdvisory ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.humanCapitalAdvisory ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Diagnostic organisationnel RH, Design et mise en oeuvre de politiques de Gestion des talents, Formation, Rémunération, Culture d'Entreprise</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#development-programs" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Development Programs & Executive Certification</a>
                                <button
                                  onClick={() => toggleSubSection('developmentPrograms')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.developmentPrograms ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.developmentPrograms ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Programmes Certifiants Exécutif en partenariat avec des institutions académiques, Programmes de développement sur mesure</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 2: Stratégie & Technologie */}
                        <div className="grid-item flex flex-col space-y-4">
                          <a href="#strategie-performance" className="text-lg font-semibold text-mck-blue-500 hover:text-mck-green-500 mb-4 border-b border-mck-green-400 pb-2 block transition-colors duration-200">Stratégie, Performance & Transformation</a>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#performance-organisations" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Performance des Organisations</a>
                                <button
                                  onClick={() => toggleSubSection('performanceOrganisations')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.performanceOrganisations ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.performanceOrganisations ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Performance opérationnelle, Optimisation des lignes d'activités, des revenus et coûts, Qualité service</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#transformation-organisations" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Transformation des Organisations</a>
                                <button
                                  onClick={() => toggleSubSection('transformationOrganisations')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.transformationOrganisations ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.transformationOrganisations ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Conduite de Changement, Revue et Re-engineering de Process et Procédures, Culture d'entreprise</p>
                              </div>
                            </div>
                          </div>
                          <a href="#technologie-innovation" className="text-lg font-semibold text-mck-blue-500 hover:text-mck-green-500 mb-4 border-b border-mck-green-400 pb-2 mt-6 block transition-colors duration-200">Technologie & Innovation</a>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#market-intelligence" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Market Intelligence</a>
                                <button
                                  onClick={() => toggleSubSection('marketIntelligence')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.marketIntelligence ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.marketIntelligence ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Big Data, Data Mining & Data Analytics, Veille & Innovations, Benchmarks & Baromètres de Marchés</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#it-solutions" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">IT Solutions</a>
                                <button
                                  onClick={() => toggleSubSection('itSolutions')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.itSolutions ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.itSolutions ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Conseil et Assistance Technologie/Digital, Automatisation Processus, Gouvernance et Sécurité IT</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 3: Employabilité & Sourcing */}
                        <div className="grid-item flex flex-col space-y-4">
                          <a href="#employabilite-jeunes" className="text-lg font-semibold text-mck-blue-500 hover:text-mck-green-500 mb-4 border-b border-mck-green-400 pb-2 block transition-colors duration-200">Employabilité des Jeunes</a>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#evaluation-competences" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Évaluation des compétences (DISEC)</a>
                                <button
                                  onClick={() => toggleSubSection('evaluationCompetences')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.evaluationCompetences ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.evaluationCompetences ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Diagnostic et évaluation des compétences techniques et comportementales</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#developpement-competences" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Développement des compétences</a>
                                <button
                                  onClick={() => toggleSubSection('developpementCompetences')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.developpementCompetences ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.developpementCompetences ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">JEDE-eX, iWorkshop</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#insertion-professionnelle" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Insertion Professionnelle</a>
                                <button
                                  onClick={() => toggleSubSection('insertionProfessionnelle')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.insertionProfessionnelle ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.insertionProfessionnelle ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">inPec-Hub, eLiT Time, SAJEDE, GEO</p>
                              </div>
                            </div>
                          </div>
                          <a href="#sourcing-interim" className="text-lg font-semibold text-mck-blue-500 hover:text-mck-green-500 mb-4 border-b border-mck-green-400 pb-2 mt-6 block transition-colors duration-200">Sourcing & Intérim</a>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#travail-temporaire" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Travail Temporaire & Sous-Traitance</a>
                                <button
                                  onClick={() => toggleSubSection('travailTemporaire')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.travailTemporaire ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.travailTemporaire ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Solutions de staffing temporaire et sous-traitance de services</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#recrutement-expert" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Recrutement Expert métier</a>
                                <button
                                  onClick={() => toggleSubSection('recrutementExpert')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.recrutementExpert ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.recrutementExpert ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Low & Middle Management</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <a href="#administration-rh" className="font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200">Administration RH</a>
                                <button
                                  onClick={() => toggleSubSection('administrationRH')}
                                  className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200"
                                >
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSubSections.administrationRH ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.administrationRH ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">Externalisation paie, on site</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Boutons CTA Desktop */}
          <div className="hidden lg:flex items-center space-x-3 justify-self-end">
            <Link to="/contact">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600 text-white px-6 py-3 text-base font-medium">
                Nous Contacter
              </Button>
            </Link>
          </div>

          {/* Menu Mobile/Tablette */}
          <div className="lg:hidden justify-self-end relative z-50">
            <Button
              variant="ghost"
              size="icon"
              className={`${!isHomePage || isScrolled
                ? 'text-gray-700 hover:text-mck-blue-600 hover:bg-gray-100'
                : 'text-white hover:text-mck-green-400 hover:bg-white/10'
                } transition-colors duration-200 relative z-50`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
              }}
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Overlay Menu Mobile */}
            {isOpen && (
              <div
                className="fixed inset-0 z-[9999] flex bg-black bg-opacity-50"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    resetMobileMenu();
                  }
                }}
              >
                {/* Menu principal - ne couvre pas toute la largeur */}
                <div
                  className="bg-white flex-1 flex flex-col shadow-2xl relative"
                  style={{ maxWidth: 'calc(100% - 80px)', zIndex: 10000 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header avec logo */}
                  <div className="p-6 border-b border-gray-200 bg-white">
                    <img src="/logo.webp" alt="mcK Africa" className="h-10 w-auto" />
                  </div>

                  {/* Fil d'Ariane */}
                  {breadcrumb.length > 1 && (
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center space-x-2 text-sm">
                        {breadcrumb.map((item, index) => (
                          <div key={index} className="flex items-center">
                            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                            {index < breadcrumb.length - 1 ? (
                              <button
                                onClick={navigateBack}
                                className="text-mck-blue-600 hover:text-mck-blue-700 font-medium"
                              >
                                {item}
                              </button>
                            ) : (
                              <span className="text-gray-900 font-medium">{item}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation principale */}
                  <div className="flex-1 bg-white" style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}>
                    <div className="p-6">
                      {/* Menu principal */}
                      {currentLevel === 'main' && (
                        <nav className="space-y-6">
                          {/* Expertises */}
                          <div>
                            <button
                              onClick={navigateToExpertises}
                              className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors"
                            >
                              Expertises
                              <ChevronRight className="w-5 h-5 text-mck-blue-600" />
                            </button>
                          </div>

                          {/* Insights */}
                          <div>
                            <a href="/insights" className="block text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors">
                              Insights
                            </a>
                          </div>

                          {/* Recrutements */}
                          <div>
                            <a href="/emplois" className="block text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors">
                              Recrutements
                            </a>
                          </div>

                          {/* À propos */}
                          <div>
                            <a href="/apropos" className="block text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors">
                              À propos
                            </a>
                          </div>

                          {/* Informations de contact mcK Africa */}
                          <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="space-y-4">
                              <div className="text-sm font-medium text-gray-900 leading-relaxed">
                                Cabinet spécialisé en<br />
                                Management<br />
                                Stratégique et<br />
                                Opérationnel
                              </div>

                              <div className="space-y-2">
                                <a href="mailto:info@mckafrica.com" className="block text-sm text-mck-blue-600 hover:text-mck-blue-700 transition-colors">
                                  info@mckafrica.com
                                </a>

                                <a href="tel:+22527222045007" className="block text-sm text-mck-blue-600 hover:text-mck-blue-700 transition-colors">
                                  +225 27 22 20 45 07
                                </a>

                                <a href="tel:+22507072017065" className="block text-sm text-mck-blue-600 hover:text-mck-blue-700 transition-colors">
                                  +225 07 07 20 17 65
                                </a>

                                <a href="https://linkedin.com/company/mckafrica" target="_blank" rel="noopener noreferrer" className="block text-sm text-mck-blue-600 hover:text-mck-blue-700 transition-colors">
                                  LinkedIn
                                </a>
                              </div>
                            </div>
                          </div>
                        </nav>
                      )}

                      {/* Liste des expertises */}
                      {currentLevel === 'expertises' && (
                        <nav className="space-y-4">
                          {Object.entries(expertisesData).map(([key, expertise]) => (
                            <div key={key}>
                              <button
                                onClick={() => navigateToExpertiseDetail(key)}
                                className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors p-3 rounded-lg hover:bg-gray-50"
                              >
                                {expertise.title}
                                <ChevronRight className="w-5 h-5 text-mck-blue-600" />
                              </button>
                            </div>
                          ))}
                        </nav>
                      )}

                      {/* Détail d'une expertise */}
                      {currentLevel === 'expertise-detail' && selectedExpertise && (
                        <nav className="space-y-4">
                          {expertisesData[selectedExpertise as keyof typeof expertisesData]?.items.map((item) => (
                            <div key={item.id}>
                              <a
                                href={item.href}
                                onClick={resetMobileMenu}
                                className="block text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors p-3 rounded-lg hover:bg-gray-50"
                              >
                                {item.title}
                              </a>
                            </div>
                          ))}
                        </nav>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bouton fermeture - collé au menu, pas superposé */}
                <div className="w-20 bg-mck-blue-600 flex items-start justify-center pt-6 relative" style={{ zIndex: 10001 }}>
                  <button
                    onClick={resetMobileMenu}
                    className="w-10 h-10 bg-mck-blue-600 text-white flex items-center justify-center text-xl font-bold hover:bg-mck-blue-700 transition-colors fixed"
                    style={{ position: 'sticky', top: '24px' }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigationStore } from '@/stores';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Utilisation du store Zustand pour la navigation
  const {
    isScrolled,
    expandedSubSections,
    isOpen,
    setIsScrolled,
    toggleSubSection,
    setIsOpen
  } = useNavigationStore();



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



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Navigation items - structure principale du menu
  const navItems = [
    { name: 'Expertises', href: '#expertises', hasDropdown: true },
    { name: 'Insights', href: '/insights' },
    { name: 'Recrutements', href: '/emplois' },
    { name: 'À propos', href: '/apropos' }
  ];

  return (
    <>
      {/* Navigation Mobile */}
      <nav className={`lg:hidden fixed top-0 w-full transition-all duration-300 z-50 ${!isHomePage || isScrolled
        ? 'bg-white/95 backdrop-blur-md'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Mobile */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src={!isHomePage || isScrolled ? "/logo.webp" : "/logo-light.webp"}
                  alt="McK Africa"
                  className="h-8 w-auto transition-all duration-300 object-contain"
                />
              </Link>
            </div>

            {/* Bouton Burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${!isHomePage || isScrolled
                ? 'text-gray-700 hover:text-mck-blue-500 hover:bg-gray-100'
                : 'text-white hover:text-mck-green-400 hover:bg-white/10'
                }`}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Navigation Desktop */}
      <nav className={`hidden lg:block fixed top-0 w-full transition-all duration-300 z-50 ${!isHomePage || isScrolled
        ? 'bg-white/95 backdrop-blur-md'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-3 items-center h-20 gap-4">
            {/* Logo McK Africa - Desktop Only */}
            <div className="justify-self-start">
              <Link to="/" className="flex items-center">
                <img
                  src={!isHomePage || isScrolled ? "/logo.webp" : "/logo-light.webp"}
                  alt="McK Africa - New African Consulting Company"
                  className="h-12 w-auto transition-all duration-300 object-contain"
                  style={{ minWidth: '120px', maxWidth: '160px' }}
                />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <div className="justify-self-center">
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
                      <div className="fixed left-1/2 transform -translate-x-1/2 top-20 w-screen max-w-5xl bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                        {/* Header du mega menu */}
                        <div className="bg-gradient-to-r from-mck-blue-600 to-mck-blue-700 text-white p-3 sm:p-4 rounded-t-lg">
                          <h3 className="text-base sm:text-lg font-bold mb-1">Nos Expertises</h3>
                          <p className="text-mck-blue-100 text-xs">Solutions complètes en management stratégique et opérationnel</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6">
                          {/* Colonne 1: Human Capital */}
                          <div className="flex flex-col space-y-3 lg:space-y-4">
                            <Link to="/human-capital" className="text-sm lg:text-base font-semibold text-mck-blue-600 hover:text-mck-green-500 mb-1 border-b-2 border-mck-green-400 pb-1 lg:pb-2 block transition-colors duration-200">Human Capital</Link>
                            <div className="space-y-2 lg:space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/human-capital?tab=management-executive-recruitment" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Management & Executive Recruitment</Link>
                                  <button
                                    onClick={() => toggleSubSection('managementRecruitment')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.managementRecruitment ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.managementRecruitment ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Recherche et sélection de cadres dirigeants et managers expérimentés pour des postes stratégiques</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/human-capital?tab=human-capital-advisory" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Human Capital Advisory</Link>
                                  <button
                                    onClick={() => toggleSubSection('humanCapitalAdvisory')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.humanCapitalAdvisory ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.humanCapitalAdvisory ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Diagnostic organisationnel RH, Design et mise en oeuvre de politiques de Gestion des talents, Formation, Rémunération, Culture d'Entreprise</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/human-capital?tab=development-programs" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Development Programs & Executive Certification</Link>
                                  <button
                                    onClick={() => toggleSubSection('developmentPrograms')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.developmentPrograms ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.developmentPrograms ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Programmes Certifiants Exécutif en partenariat avec des institutions académiques, Programmes de développement sur mesure</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Colonne 2: Stratégie & Technologie */}
                          <div className="flex flex-col space-y-3 lg:space-y-4">
                            <Link to="/strategie-performance" className="text-sm lg:text-base font-semibold text-mck-blue-600 hover:text-mck-green-500 mb-1 border-b-2 border-mck-green-400 pb-1 lg:pb-2 block transition-colors duration-200">Stratégie, Performance & Transformation</Link>
                            <div className="space-y-2 lg:space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/strategie-performance?tab=performance-organisations" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Performance des Organisations</Link>
                                  <button
                                    onClick={() => toggleSubSection('performanceOrganisations')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.performanceOrganisations ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.performanceOrganisations ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Performance opérationnelle, Optimisation des lignes d'activités, des revenus et coûts, Qualité service</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/strategie-performance?tab=transformation-organisations" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Transformation des Organisations</Link>
                                  <button
                                    onClick={() => toggleSubSection('transformationOrganisations')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.transformationOrganisations ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.transformationOrganisations ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Conduite de Changement, Revue et Re-engineering de Process et Procédures, Culture d'entreprise</p>
                                </div>
                              </div>
                            </div>
                            <Link to="/technologie-innovation" className="text-sm lg:text-base font-semibold text-mck-blue-600 hover:text-mck-green-500 mb-1 border-b-2 border-mck-green-400 pb-1 lg:pb-2 mt-4 lg:mt-6 block transition-colors duration-200">Technologie & Innovation</Link>
                            <div className="space-y-2 lg:space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/technologie-innovation?tab=market-intelligence" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Market Intelligence</Link>
                                  <button
                                    onClick={() => toggleSubSection('marketIntelligence')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.marketIntelligence ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.marketIntelligence ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Big Data, Data Mining & Data Analytics, Veille & Innovations, Benchmarks & Baromètres de Marchés</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/technologie-innovation?tab=it-solutions" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">IT Solutions</Link>
                                  <button
                                    onClick={() => toggleSubSection('itSolutions')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.itSolutions ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.itSolutions ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Conseil et Assistance Technologie/Digital, Automatisation Processus, Gouvernance et Sécurité IT</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Colonne 3: Employabilité & Sourcing */}
                          <div className="flex flex-col space-y-3 lg:space-y-4">
                            <Link to="/employabilite-jeunes" className="text-sm lg:text-base font-semibold text-mck-blue-600 hover:text-mck-green-500 mb-1 border-b-2 border-mck-green-400 pb-1 lg:pb-2 block transition-colors duration-200">Employabilité des Jeunes</Link>
                            <div className="space-y-2 lg:space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/employabilite-jeunes?tab=evaluation-competences" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Évaluation des compétences (DISEC)</Link>
                                  <button
                                    onClick={() => toggleSubSection('evaluationCompetences')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.evaluationCompetences ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.evaluationCompetences ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Diagnostic et évaluation des compétences techniques et comportementales</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/employabilite-jeunes?tab=developpement-competences" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Développement des compétences</Link>
                                  <button
                                    onClick={() => toggleSubSection('developpementCompetences')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.developpementCompetences ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.developpementCompetences ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">JEDE-eX, iWorkshop</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/employabilite-jeunes?tab=insertion-professionnelle" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Insertion Professionnelle</Link>
                                  <button
                                    onClick={() => toggleSubSection('insertionProfessionnelle')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.insertionProfessionnelle ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.insertionProfessionnelle ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">inPec-Hub, eLiT Time, SAJEDE, GEO</p>
                                </div>
                              </div>
                            </div>
                            <Link to="/sourcing-interim" className="text-sm lg:text-base font-semibold text-mck-blue-600 hover:text-mck-green-500 mb-1 border-b-2 border-mck-green-400 pb-1 lg:pb-2 mt-4 lg:mt-6 block transition-colors duration-200">Sourcing & Intérim</Link>
                            <div className="space-y-2 lg:space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/sourcing-interim?tab=travail-temporaire" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Travail Temporaire & Sous-Traitance</Link>
                                  <button
                                    onClick={() => toggleSubSection('travailTemporaire')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.travailTemporaire ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.travailTemporaire ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Solutions de staffing temporaire et sous-traitance de services</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/sourcing-interim?tab=recrutement-expert" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Recrutement Expert métier</Link>
                                  <button
                                    onClick={() => toggleSubSection('recrutementExpert')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.recrutementExpert ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.recrutementExpert ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Low & Middle Management</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <Link to="/sourcing-interim?tab=administration-rh" className="text-xs lg:text-sm font-medium text-gray-900 hover:text-mck-green-500 transition-colors duration-200 flex-1 pr-2">Administration RH</Link>
                                  <button
                                    onClick={() => toggleSubSection('administrationRH')}
                                    className="text-mck-blue-500 hover:text-mck-green-500 transition-colors duration-200 flex-shrink-0"
                                  >
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expandedSubSections.administrationRH ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${expandedSubSections.administrationRH ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <p className="text-xs text-gray-600 leading-relaxed">Externalisation paie, on site</p>
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
            <div className="flex items-center space-x-3 justify-self-end">
              <Link to="/contact">
                <Button className="bg-mck-blue-500 hover:bg-mck-blue-600 text-white px-6 py-3 text-base font-medium">
                  Nous Contacter
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <MobileMenu isHomePage={isHomePage} isScrolled={isScrolled} />
    </>
  );
};

export default Navigation;

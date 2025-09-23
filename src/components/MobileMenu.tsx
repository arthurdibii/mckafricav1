import React from 'react';
import { ChevronRight, Mail, Phone, Linkedin, MapPin, Globe } from 'lucide-react';
import { useNavigationStore } from '@/stores';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isHomePage, isScrolled }) => {
  const navigate = useNavigate();
  const {
    isOpen,
    currentLevel,
    selectedExpertise,
    breadcrumb,
    setCurrentLevel,
    setSelectedExpertise,
    setBreadcrumb,
    setIsOpen,
    navigateToSubExpertises,
    navigateBack
  } = useNavigationStore();

  // Données des expertises avec sous-expertises et onglets
  const expertisesData = {
    'human-capital': {
      title: 'Human Capital',
      route: '/human-capital',
      subExpertises: [
        {
          id: 'management-executive-recruitment',
          title: 'Management & Executive Recruitment',
          tab: 'management-executive-recruitment',
          route: '/human-capital?tab=management-executive-recruitment'
        },
        {
          id: 'human-capital-advisory',
          title: 'Human Capital Advisory',
          tab: 'human-capital-advisory',
          route: '/human-capital?tab=human-capital-advisory'
        },
        {
          id: 'development-programs',
          title: 'Development Programs & Executive Certification',
          tab: 'development-programs',
          route: '/human-capital?tab=development-programs'
        }
      ]
    },
    'strategie-performance': {
      title: 'Stratégie, Performance & Transformation',
      route: '/strategie-performance',
      subExpertises: [
        {
          id: 'performance-organisations',
          title: 'Performance des Organisations',
          tab: 'performance-organisations',
          route: '/strategie-performance?tab=performance-organisations'
        },
        {
          id: 'transformation-organisations',
          title: 'Transformation des Organisations',
          tab: 'transformation-organisations',
          route: '/strategie-performance?tab=transformation-organisations'
        }
      ]
    },
    'technologie-innovation': {
      title: 'Technologie & Innovation',
      route: '/technologie-innovation',
      subExpertises: [
        {
          id: 'market-intelligence',
          title: 'Market Intelligence',
          tab: 'market-intelligence',
          route: '/technologie-innovation?tab=market-intelligence'
        },
        {
          id: 'it-solutions',
          title: 'IT Solutions',
          tab: 'it-solutions',
          route: '/technologie-innovation?tab=it-solutions'
        }
      ]
    },
    'employabilite-jeunes': {
      title: 'Employabilité des Jeunes',
      route: '/employabilite-jeunes',
      subExpertises: [
        {
          id: 'evaluation-competences',
          title: 'Évaluation des compétences (DISEC)',
          tab: 'evaluation-competences',
          route: '/employabilite-jeunes?tab=evaluation-competences'
        },
        {
          id: 'developpement-competences',
          title: 'Développement des compétences',
          tab: 'developpement-competences',
          route: '/employabilite-jeunes?tab=developpement-competences'
        },
        {
          id: 'insertion-professionnelle',
          title: 'Insertion Professionnelle',
          tab: 'insertion-professionnelle',
          route: '/employabilite-jeunes?tab=insertion-professionnelle'
        }
      ]
    },
    'sourcing-interim': {
      title: 'Sourcing & Intérim',
      route: '/sourcing-interim',
      subExpertises: [
        {
          id: 'travail-temporaire',
          title: 'Travail Temporaire & Sous-Traitance',
          tab: 'travail-temporaire',
          route: '/sourcing-interim?tab=travail-temporaire'
        },
        {
          id: 'recrutement-expert',
          title: 'Recrutement Expert métier',
          tab: 'recrutement-expert',
          route: '/sourcing-interim?tab=recrutement-expert'
        },
        {
          id: 'administration-rh',
          title: 'Administration RH',
          tab: 'administration-rh',
          route: '/sourcing-interim?tab=administration-rh'
        }
      ]
    }
  };

  // Fonctions de navigation
  const navigateToExpertises = () => {
    setCurrentLevel('expertises');
    setBreadcrumb(['Menu principal', 'Expertises']);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    resetMobileMenu();
  };

  const navigateToExpertisePage = (expertiseKey: string) => {
    const expertise = expertisesData[expertiseKey as keyof typeof expertisesData];
    navigate(expertise.route);
    resetMobileMenu();
  };

  const navigateToSubExpertisesLevel = (expertiseKey: string) => {
    const expertise = expertisesData[expertiseKey as keyof typeof expertisesData];
    navigateToSubExpertises(expertiseKey, expertise.title);
  };

  const navigateToSubExpertisePage = (subExpertiseRoute: string) => {
    navigate(subExpertiseRoute);
    resetMobileMenu();
  };

  const resetMobileMenu = () => {
    setCurrentLevel('main');
    setBreadcrumb(['Menu principal']);
    setSelectedExpertise(null);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
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
                  <button
                    onClick={() => navigateToPage('/insights')}
                    className="block w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors"
                  >
                    Insights
                  </button>
                </div>

                {/* Recrutements */}
                <div>
                  <button
                    onClick={() => navigateToPage('/emplois')}
                    className="block w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors"
                  >
                    Recrutements
                  </button>
                </div>

                {/* À propos */}
                <div>
                  <button
                    onClick={() => navigateToPage('/apropos')}
                    className="block w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors"
                  >
                    À propos
                  </button>
                </div>

                {/* Footer moderne mcK Africa */}
                <div className="mt-12 pt-8">
                  {/* Carte principale avec gradient */}
                  <div className="bg-gradient-to-br from-mck-blue-600 to-mck-blue-700 rounded-2xl p-6 text-white shadow-xl">
                    {/* En-tête avec logo/titre */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">mcK Africa</h3>
                        <p className="text-white/80 text-sm">New African Consulting Company</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-white/90 text-sm leading-relaxed">
                        Cabinet spécialisé en Management Stratégique et Opérationnel.
                      </p>
                    </div>

                    {/* Contacts avec icônes */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <a
                          href="mailto:info@mckafrica.com"
                          className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-medium">info@mckafrica.com</span>
                        </a>

                        <a
                          href="tel:+22527222045007"
                          className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-medium">+225 27 22 20 45 07</span>
                        </a>

                        <a
                          href="tel:+22507072017065"
                          className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-medium">+225 07 07 20 17 65</span>
                        </a>

                        <a
                          href="https://linkedin.com/company/mckafrica"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Linkedin className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-medium">Suivez-nous sur LinkedIn</span>
                        </a>
                      </div>
                    </div>

                    {/* Localisation */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="flex items-center space-x-2 text-white/80">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Abidjan, Côte d'Ivoire</span>
                      </div>
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
                      onClick={() => navigateToSubExpertisesLevel(key)}
                      className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-mck-blue-600 transition-colors p-3 rounded-lg hover:bg-gray-50"
                    >
                      {expertise.title}
                      <ChevronRight className="w-5 h-5 text-mck-blue-600" />
                    </button>
                  </div>
                ))}
              </nav>
            )}

            {/* Liste des sous-expertises */}
            {currentLevel === 'sub-expertises' && selectedExpertise && (
              <nav className="space-y-4">
                {expertisesData[selectedExpertise as keyof typeof expertisesData]?.subExpertises.map((subExpertise) => (
                  <div key={subExpertise.id}>
                    <button
                      onClick={() => navigateToSubExpertisePage(subExpertise.route)}
                      className="flex items-center justify-between w-full text-left text-base font-medium text-gray-900 hover:text-mck-blue-600 transition-colors p-3 rounded-lg hover:bg-gray-50"
                    >
                      {subExpertise.title}
                      <ChevronRight className="w-5 h-5 text-mck-blue-600" />
                    </button>
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
  );
};

export default MobileMenu;
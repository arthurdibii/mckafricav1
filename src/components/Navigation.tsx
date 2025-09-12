
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Insights', href: '#insights' },
    { name: 'Recrutements', href: '/emplois' },
    { name: 'À propos', href: '/apropos' }
  ];

  return (
    <nav className={`fixed top-0 w-full transition-all duration-300 z-50 ${isScrolled
      ? 'bg-white/95 backdrop-blur-md'
      : 'bg-transparent lg:bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo McK Africa */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={isScrolled ? "/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" : "/logo-light.webp"}
                alt="McK Africa - New African Consulting Company"
                className="h-8 md:h-12 w-auto transition-all duration-300"
              />
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 hover:border-b-2 hover:border-mck-green-500 ${isScrolled
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
                    <div className="absolute left-[-410px] mt-2 right-[-680px] bg-white rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200">
                      <div className="grid grid-cols-3 gap-8 p-8">
                        {/* Colonne 1: Human Capital */}
                        <div>
                          <h3 className="text-lg font-semibold text-mck-blue-500 mb-4 border-b border-mck-green-400 pb-2">Human Capital</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Management & Executive Recruitment</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Chasse de tête, Recrutement & Évaluation de potentiel pour postes de niveau Management & Exécutif, Cartographie de talents stratégiques par secteur d'activité</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Human Capital Advisory</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Diagnostic organisationnel RH, Design et mise en oeuvre de politiques de Gestion des talents, Formation, Rémunération, Culture d'Entreprise</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Development Programs & Executive Certification</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Programmes Certifiants Exécutif en partenariat avec des institutions académiques, Programmes de développement sur mesure</p>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 2: Stratégie & Technologie */}
                        <div>
                          <h3 className="text-lg font-semibold text-mck-blue-500 mb-4 border-b border-mck-green-400 pb-2">Stratégie, Performance & Transformation</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Performance des Organisations</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Performance opérationnelle, Optimisation des lignes d'activités, des revenus et coûts, Qualité service</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Transformation des Organisations</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Conduite de Changement, Revue et Re-engineering de Process et Procédures, Culture d'entreprise</p>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-mck-blue-500 mb-4 mt-6 border-b border-mck-green-400 pb-2">Technologie & Innovation</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Market Intelligence</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Big Data, Data Mining & Data Analytics, Veille & Innovations, Benchmarks & Baromètres de Marchés</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">IT Solutions</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Conseil et Assistance Technologie/Digital, Automatisation Processus, Gouvernance et Sécurité IT</p>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 3: Employabilité & Sourcing */}
                        <div>
                          <h3 className="text-lg font-semibold text-mck-blue-500 mb-4 border-b border-mck-green-400 pb-2">Employabilité des Jeunes</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Évaluation des compétences (DISEC)</h4>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Développement des compétences</h4>
                              <p className="text-sm text-gray-600">JEDE-eX, iWorkshop</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Insertion Professionnelle</h4>
                              <p className="text-sm text-gray-600">inPec-Hub, eLiT Time, SAJEDE, GEO</p>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-mck-blue-500 mb-4 mt-6 border-b border-mck-green-400 pb-2">Sourcing & Intérim</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Travail Temporaire & Sous-Traitance</h4>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recrutement Expert métier</h4>
                              <p className="text-sm text-gray-600">Low & Middle Management</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Administration RH</h4>
                              <p className="text-sm text-gray-600">Externalisation paie, on site</p>
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
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/contact">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600 text-white">
                Nous Contacter
              </Button>
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black bg-white hover:bg-gray-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="mb-8">
                    <img
                      src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png"
                      alt="McK Africa"
                      className="h-10 w-auto"
                    />
                  </div>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-mck-blue-500 transition-colors duration-200 py-2"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="space-y-3 pt-4 border-t">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-mck-blue-500 hover:bg-mck-blue-600 text-white">
                        Nous Contacter
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

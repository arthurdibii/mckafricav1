import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Landmark, Truck, Briefcase } from 'lucide-react';

const ReferencesSection = () => {
  const [activeTab, setActiveTab] = useState('banques-finances');
  const categories = [
    {
      id: 'banques-finances',
      label: 'Banques & Finances',
      icon: Landmark,
      logos: [
        { name: 'NSIA Banque', path: '/References/BANQUES & FINANCES/NSIA  1.png' },
        { name: 'BNI', path: '/References/BANQUES & FINANCES/Finalogo-1 1.png' },
        { name: 'Ecobank', path: '/References/BANQUES & FINANCES/Ecobank_Logo.svg 1.png' },
        { name: 'BICICI', path: '/References/BANQUES & FINANCES/Logo_BICICI.svg 1.png' },
        { name: 'Société Ivoirienne de Banque', path: '/References/BANQUES & FINANCES/SIB.png' },
        { name: 'Mansa Bank', path: '/References/BANQUES & FINANCES/logo Mansa bank  1.png' },
        { name: 'SUNU', path: '/References/BANQUES & FINANCES/Logo_SUNU 1.png' },
        { name: 'Bank of Africa', path: '/References/BANQUES & FINANCES/454411938_886656370153361_4441386227022517293_n 1.png' },
        { name: 'Orabank', path: '/References/BANQUES & FINANCES/ORAGROUP-SA-recrute-pour-ce-poste-11-Octobre-2022 1.png' },
        { name: 'BGFI Bank', path: '/References/BANQUES & FINANCES/BGFI_logo 1.png' },
        { name: 'Bridge Bank Group', path: '/References/BANQUES & FINANCES/logo Bridge  1.png' },
        { name: 'Versus Bank', path: '/References/BANQUES & FINANCES/logo-versus-bank-ci 1.png' },
        { name: 'Banque Atlantique', path: '/References/BANQUES & FINANCES/Logo-banque-atlantique 1.png' },
        { name: 'Citi', path: '/References/BANQUES & FINANCES/Citi.svg 1.png' },
        { name: 'BOAD', path: '/References/BANQUES & FINANCES/logo_boad 1.png' },
        { name: 'Orange Bank', path: '/References/BANQUES & FINANCES/OM BANK.jpg' },
        { name: 'Orange Money', path: '/References/BANQUES & FINANCES/OM.jpg' },
        { name: 'BM Bank', path: '/References/BANQUES & FINANCES/BM  1.png' },
        { name: 'Genesis Bank', path: '/References/BANQUES & FINANCES/Genesis.  1.png' },
        { name: 'Impaxis', path: '/References/BANQUES & FINANCES/IMPAXIS.jpg' },
        { name: 'BOA Bénin', path: '/References/BANQUES & FINANCES/logo-boa-benin 1.png' },
        { name: 'Banque Partenaire', path: '/References/BANQUES & FINANCES/download 1.png' }
      ]
    },
    {
      id: 'administration',
      label: 'Administration & Institutions',
      icon: Building2,
      logos: [
        { name: 'Ministère de la jeunesse', path: '/References/Administration Publique & Institutions/Ministère de la jeunesse.png' },
        { name: 'Agence emploi jeune', path: '/References/Administration Publique & Institutions/Agence emploi jeune.png' },
        { name: 'Patronat Ivoirien', path: '/References/Administration Publique & Institutions/Patronat.png' }
      ]
    },
    {
      id: 'logistique',
      label: 'Logistique',
      icon: Truck,
      logos: [
        { name: 'Zara', path: '/References/LOGISTIQUE/Zara  1.png' },
        { name: 'Scanning', path: '/References/LOGISTIQUE/Scanning  1.png' },
        { name: 'Centaures', path: '/References/LOGISTIQUE/centaures  1.png' },
        { name: 'DHL', path: '/References/LOGISTIQUE/DHL.png' }
      ]
    },
    {
      id: 'autres-secteurs',
      label: 'Autres Secteurs',
      icon: Briefcase,
      logos: [
        { name: 'Orange', path: '/References/AUTRES SECTEURS/Orange  1.png' },
        { name: 'Total', path: '/References/AUTRES SECTEURS/Total  1.png' },
        { name: 'Sifca', path: '/References/AUTRES SECTEURS/Sifca  1.png' },
        { name: 'Prosuma', path: '/References/AUTRES SECTEURS/Prosuma  1.png' },
        { name: 'M qash', path: '/References/AUTRES SECTEURS/M qash 1.png' },
        { name: 'UBIPHARM', path: '/References/AUTRES SECTEURS/UBIPHARM.png' },
        { name: 'CIE.png', path: '/References/AUTRES SECTEURS/CIE.png' },
        { name: 'MOOV', path: '/References/AUTRES SECTEURS/MOOV.png' }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mck-blue-600 mb-4">
            Nos Références
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ils nous font confiance pour leurs défis stratégiques et opérationnels
          </p>
        </div>

        {/* Onglets de navigation */}
        <div className="mb-8">
          {/* Version desktop - flex wrap centré */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive
                    ? 'bg-mck-blue-600 text-white shadow-lg'
                    : 'bg-white text-mck-blue-600 border-2 border-mck-blue-200 hover:border-mck-blue-400 hover:bg-mck-blue-50'
                    }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  <span className="text-base">{category.label}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${isActive
                    ? 'bg-white text-mck-blue-600'
                    : 'bg-mck-blue-100 text-mck-blue-600'
                    }`}>
                    {category.logos.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Version mobile - scroll horizontal sur une ligne */}
          <div className="block md:hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = activeTab === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${isActive
                        ? 'bg-mck-blue-600 text-white shadow-lg'
                        : 'bg-white text-mck-blue-600 border-2 border-mck-blue-200'
                        }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      <span className="text-sm">{category.label}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${isActive
                        ? 'bg-white text-mck-blue-600'
                        : 'bg-mck-blue-100 text-mck-blue-600'
                        }`}>
                        {category.logos.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Affichage de la catégorie active */}
        <div className="space-y-8">
          {(() => {
            const activeCategory = categories.find(cat => cat.id === activeTab);
            if (!activeCategory) return null;

            const IconComponent = activeCategory.icon;
            return (
              <div className="space-y-6">
                {/* Version desktop - grille sans titre */}
                <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-3">
                  {activeCategory.logos.map((logo, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all duration-300 border border-mck-blue-200 hover:border-mck-blue-400 bg-white"
                    >
                      <CardContent className="p-2 flex items-center justify-center h-16">
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={logo.path}
                            alt={logo.name}
                            className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="text-mck-blue-600 font-medium text-xs text-center">${logo.name}</div>`;
                              }
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Version mobile - grille 5 colonnes sans titre */}
                <div className="block md:hidden">
                  <div className="grid grid-cols-5 gap-2">
                    {activeCategory.logos.map((logo, index) => (
                      <Card
                        key={index}
                        className="group hover:shadow-lg transition-all duration-300 border border-mck-blue-200 hover:border-mck-blue-400 bg-white"
                      >
                        <CardContent className="p-1 flex items-center justify-center h-12">
                          <div className="w-full h-full flex items-center justify-center">
                            <img
                              src={logo.path}
                              alt={logo.name}
                              className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="text-mck-blue-600 font-medium text-xs text-center">${logo.name}</div>`;
                                }
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>


      </div>
    </section>
  );
};

export default ReferencesSection;
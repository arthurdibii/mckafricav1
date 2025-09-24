import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Filter, Calendar, Building2, Users, ChevronDown, Search, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Waves from '@/components/Waves';

const Insights = () => {
  // États pour les filtres
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedSubExpertise, setSelectedSubExpertise] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Gestion du scroll pour fermer les filtres sur mobile
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si on scroll vers le bas et que les filtres sont ouverts sur mobile
      if (currentScrollY > lastScrollY && showFilters && window.innerWidth < 1024) {
        setShowFilters(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showFilters]);

  // 5 Expertises principales
  const expertises = [
    { id: 'human-capital', name: 'Human Capital' },
    { id: 'strategie-performance', name: 'Stratégie, Performance & Transformation' },
    { id: 'technologie-innovation', name: 'Technologie & Innovation' },
    { id: 'employabilite-jeunes', name: 'Employabilité des Jeunes' },
    { id: 'sourcing-interim', name: 'Sourcing & Intérim' }
  ];

  // 13 Sous-expertises
  const subExpertises = {
    'human-capital': [
      { id: 'management-recruitment', name: 'Management & Executive Recruitment' },
      { id: 'human-capital-advisory', name: 'Human Capital Advisory' },
      { id: 'development-programs', name: 'Development Programs & Executive Certification' }
    ],
    'strategie-performance': [
      { id: 'performance-organisations', name: 'Performance des Organisations' },
      { id: 'transformation-organisations', name: 'Transformation des Organisations' }
    ],
    'technologie-innovation': [
      { id: 'market-intelligence', name: 'Market Intelligence' },
      { id: 'it-solutions', name: 'IT Solutions' }
    ],
    'employabilite-jeunes': [
      { id: 'evaluation-competences', name: 'Évaluation des compétences (DISEC)' },
      { id: 'developpement-competences', name: 'Développement des compétences' },
      { id: 'insertion-professionnelle', name: 'Insertion Professionnelle' }
    ],
    'sourcing-interim': [
      { id: 'travail-temporaire', name: 'Travail Temporaire & Sous-Traitance' },
      { id: 'recrutement-expert', name: 'Recrutement Expert métier' },
      { id: 'administration-rh', name: 'Administration RH' }
    ]
  };

  // Secteurs d'activité
  const sectors = [
    'Finance & Banque',
    'Technologie & Digital',
    'Énergie & Infrastructure',
    'Conseil & Services',
    'Industrie & Manufacturing',
    'Santé & Pharmaceutique',
    'Éducation & Formation',
    'Commerce & Distribution'
  ];

  // Plages de dates
  const dateRanges = [
    { id: 'last-week', name: 'Dernière semaine' },
    { id: 'last-month', name: 'Dernier mois' },
    { id: 'last-3-months', name: '3 derniers mois' },
    { id: 'last-6-months', name: '6 derniers mois' },
    { id: 'last-year', name: 'Dernière année' }
  ];

  // Articles et insights étendus avec plus de données
  const insights = [
    {
      id: 1,
      title: "L'avenir du recrutement en Afrique : tendances 2025",
      excerpt: "Une analyse approfondie des transformations du marché du travail africain et des nouvelles attentes des talents...",
      author: "Hippolyte K.",
      readTime: "8 min",
      category: "Tendances",
      date: "15 mai 2025",
      expertise: "human-capital",
      subExpertise: "management-recruitment",
      sector: "Conseil & Services",
      featured: true,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Intelligence Artificielle et recrutement : opportunités et défis",
      excerpt: "Comment l'IA révolutionne les processus de recrutement tout en préservant l'aspect humain de la sélection...",
      author: "Abdoul SAKO",
      readTime: "6 min",
      category: "Innovation",
      date: "10 mai 2025",
      expertise: "technologie-innovation",
      subExpertise: "it-solutions",
      sector: "Technologie & Digital",
      featured: false,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "Rétention des talents : stratégies gagnantes pour les entreprises africaines",
      excerpt: "Les meilleures pratiques pour fidéliser les hauts potentiels dans un contexte de forte mobilité...",
      author: "Mohamed KABA",
      readTime: "5 min",
      category: "Stratégie RH",
      date: "5 mai 2025",
      expertise: "strategie-performance",
      subExpertise: "performance-organisations",
      sector: "Finance & Banque",
      featured: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "Transformation digitale des RH : guide pratique pour les PME",
      excerpt: "Comment les petites et moyennes entreprises peuvent tirer parti des outils digitaux pour optimiser leur gestion RH...",
      author: "Fatou DIALLO",
      readTime: "7 min",
      category: "Digital RH",
      date: "2 mai 2025",
      expertise: "technologie-innovation",
      subExpertise: "market-intelligence",
      sector: "Technologie & Digital",
      featured: false,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 5,
      title: "Insertion professionnelle des jeunes diplômés : défis et solutions",
      excerpt: "Analyse des obstacles à l'emploi des jeunes en Afrique et présentation de programmes innovants d'accompagnement...",
      author: "Amadou TRAORE",
      readTime: "9 min",
      category: "Employabilité",
      date: "28 avril 2025",
      expertise: "employabilite-jeunes",
      subExpertise: "insertion-professionnelle",
      sector: "Éducation & Formation",
      featured: false,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  // Articles recommandés pour le panneau latéral
  const recommendedInsights = [
    {
      id: 1,
      title: "L'avenir du recrutement en Afrique : tendances 2025",
      category: "Recrutement",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Intelligence artificielle et sélection de talents",
      category: "IA & Recrutement",
      readTime: "6 min"
    },
    {
      id: 3,
      title: "Rétention des talents : stratégies gagnantes pour les entreprises africaines",
      category: "Stratégie RH",
      readTime: "5 min"
    },
    {
      id: 4,
      title: "Transformation digitale des RH : guide pratique pour les PME",
      category: "Digital RH",
      readTime: "7 min"
    },
    {
      id: 5,
      title: "Insertion professionnelle des jeunes diplômés : défis et solutions",
      category: "Employabilité",
      readTime: "9 min"
    }
  ];

  // Fonction de filtrage
  const filteredInsights = insights.filter(insight => {
    const matchesSearch = searchTerm === '' ||
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExpertise = selectedExpertise === '' || insight.expertise === selectedExpertise;
    const matchesSubExpertise = selectedSubExpertise === '' || insight.subExpertise === selectedSubExpertise;
    const matchesSector = selectedSector === '' || insight.sector === selectedSector;

    return matchesSearch && matchesExpertise && matchesSubExpertise && matchesSector;
  });

  // Fonction pour réinitialiser les filtres
  const clearFilters = () => {
    setSelectedExpertise('');
    setSelectedSubExpertise('');
    setSelectedSector('');
    setSelectedDateRange('');
    setSearchTerm('');
  };

  // Fonction pour obtenir les sous-expertises disponibles
  const getAvailableSubExpertises = () => {
    if (!selectedExpertise) return [];
    return subExpertises[selectedExpertise as keyof typeof subExpertises] || [];
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
              mcK Insights
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Décryptage des tendances, analyses de marché et conseils d'experts
              pour anticiper les évolutions en Afrique.
            </p>

            {/* Barre de recherche dans la bannière */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans nos insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mck-gold-400 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des filtres */}
      <section className="bg-gray-50 py-6 border-b sticky top-16 z-50 backdrop-blur-sm bg-gray-50/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Bouton pour afficher/masquer les filtres sur mobile */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Filtrer les insights</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filtres */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:flex lg:items-center lg:space-x-3 lg:space-y-0 lg:flex-wrap ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Filtre par expertise */}
              <div className="relative lg:min-w-0 lg:flex-shrink">
                <select
                  value={selectedExpertise}
                  onChange={(e) => {
                    setSelectedExpertise(e.target.value);
                    setSelectedSubExpertise(''); // Reset sub-expertise when expertise changes
                  }}
                  className="w-full lg:w-48 appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-mck-blue-600 truncate"
                  title={selectedExpertise ? expertises.find(e => e.id === selectedExpertise)?.name : "Toutes les expertises"}
                >
                  <option value="">Toutes les expertises</option>
                  {expertises.map((expertise) => (
                    <option key={expertise.id} value={expertise.id}>
                      {expertise.name}
                    </option>
                  ))}
                </select>
                <Users className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Filtre par sous-expertise */}
              <div className="relative lg:min-w-0 lg:flex-shrink">
                <select
                  value={selectedSubExpertise}
                  onChange={(e) => setSelectedSubExpertise(e.target.value)}
                  disabled={!selectedExpertise}
                  className="w-full lg:w-52 appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-mck-blue-600 disabled:bg-gray-100 disabled:text-gray-400 truncate"
                  title={selectedSubExpertise ? getAvailableSubExpertises().find(s => s.id === selectedSubExpertise)?.name : "Toutes les sous-expertises"}
                >
                  <option value="">Toutes les sous-expertises</option>
                  {getAvailableSubExpertises().map((subExpertise) => (
                    <option key={subExpertise.id} value={subExpertise.id}>
                      {subExpertise.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Filtre par secteur */}
              <div className="relative lg:min-w-0 lg:flex-shrink">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full lg:w-44 appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-mck-blue-600 truncate"
                  title={selectedSector || "Tous les secteurs"}
                >
                  <option value="">Tous les secteurs</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                <Building2 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Filtre par date */}
              <div className="relative lg:min-w-0 lg:flex-shrink">
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full lg:w-40 appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-mck-blue-600 truncate"
                  title={selectedDateRange ? dateRanges.find(d => d.id === selectedDateRange)?.name : "Toutes les dates"}
                >
                  <option value="">Toutes les dates</option>
                  {dateRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Bouton pour effacer les filtres */}
              <div className="lg:flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  disabled={!(selectedExpertise || selectedSubExpertise || selectedSector || selectedDateRange || searchTerm)}
                  className="text-gray-600 hover:text-gray-900 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4 mr-1" />
                  Effacer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal avec mise en page à deux colonnes */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Contenu principal - Insights */}
            <div className="lg:col-span-3">
              {/* Résultats de recherche */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredInsights.length} insight{filteredInsights.length > 1 ? 's' : ''} trouvé{filteredInsights.length > 1 ? 's' : ''}
                  {searchTerm && ` pour "${searchTerm}"`}
                </p>
              </div>

              {/* Article principal (featured) */}
              {filteredInsights.find(insight => insight.featured) && (
                <div className="mb-12">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                    <div className="lg:flex">
                      <div className="lg:w-2/3">
                        <img
                          src={filteredInsights.find(insight => insight.featured)?.image}
                          alt={filteredInsights.find(insight => insight.featured)?.title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                      <div className="lg:w-2/3 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge className="bg-mck-gold-500 text-white">
                            Article à la Une
                          </Badge>
                          <Badge variant="outline" className="border-mck-blue-600 text-mck-blue-600">
                            {filteredInsights.find(insight => insight.featured)?.category}
                          </Badge>
                        </div>

                        <Link to={`/article/${filteredInsights.find(insight => insight.featured)?.id}`}>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 hover:text-mck-blue-600 transition-colors cursor-pointer leading-tight">
                            {filteredInsights.find(insight => insight.featured)?.title}
                          </h3>
                        </Link>

                        <p className="text-black mb-6 text-base sm:text-lg leading-relaxed">
                          {filteredInsights.find(insight => insight.featured)?.excerpt}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex flex-wrap items-center text-sm text-black gap-1">
                            <span className="font-medium">Par {filteredInsights.find(insight => insight.featured)?.author}</span>
                            <span className="hidden sm:inline mx-2">•</span>
                            <span>{filteredInsights.find(insight => insight.featured)?.date}</span>
                            <span className="hidden sm:inline mx-2">•</span>
                            <span>{filteredInsights.find(insight => insight.featured)?.readTime} de lecture</span>
                          </div>
                          <Link to={`/article/${filteredInsights.find(insight => insight.featured)?.id}`}>
                            <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 w-full sm:w-auto">
                              Lire l'article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Autres articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInsights.filter(insight => !insight.featured).map((insight) => (
                  <Card key={insight.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-0 shadow-md h-full flex flex-col overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-white/90 border-mck-blue-600 text-mck-blue-600">
                          {insight.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4 flex-shrink-0">
                      <Link to={`/article/${insight.id}`}>
                        <CardTitle className="text-lg font-bold text-black hover:text-mck-blue-600 transition-colors leading-tight cursor-pointer">
                          {insight.title}
                        </CardTitle>
                      </Link>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {insight.excerpt}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-4">
                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-black">{insight.author}</p>
                          <p>{insight.date} • {insight.readTime} de lecture</p>
                        </div>
                        <Link to={`/article/${insight.id}`}>
                          <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 w-full sm:w-auto">
                            Lire l'article
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Message si aucun résultat */}
              {filteredInsights.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun insight trouvé</h3>
                  <p className="text-gray-600 mb-4">
                    Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Effacer tous les filtres
                  </Button>
                </div>
              )}
            </div>

            {/* Panneau latéral - Recommandés */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-mck-blue-600 to-mck-blue-700 text-white">
                    <CardTitle className="text-lg font-bold">Recommandé</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {recommendedInsights.map((insight, index) => (
                        <div key={insight.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${index !== recommendedInsights.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-mck-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-mck-blue-600 font-bold text-sm">{index + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link to={`/article/${insight.id}`}>
                                <h4 className="text-sm font-semibold text-black hover:text-mck-blue-600 transition-colors leading-tight mb-2">
                                  {insight.title}
                                </h4>
                              </Link>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Badge variant="outline" className="text-xs">
                                  {insight.category}
                                </Badge>
                                <span>•</span>
                                <span>{insight.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter dans le panneau latéral */}
                <Card className="mt-6 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-black mb-3">
                      Newsletter
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Recevez nos dernières analyses et tendances directement dans votre boîte mail.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mck-blue-600 text-sm"
                      />
                      <Button className="w-full bg-mck-blue-600 hover:bg-mck-blue-700 text-sm">
                        S'abonner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
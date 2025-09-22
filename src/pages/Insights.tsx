import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Insights = () => {
  // Articles et insights
  const insights = [
    {
      id: 1,
      title: "L'avenir du recrutement en Afrique : tendances 2025",
      excerpt: "Une analyse approfondie des transformations du marché du travail africain et des nouvelles attentes des talents...",
      author: "Hippolyte K.",
      readTime: "8 min",
      category: "Tendances",
      date: "15 mai 2025",
      featured: true
    },
    {
      id: 2,
      title: "Intelligence Artificielle et recrutement : opportunités et défis",
      excerpt: "Comment l'IA révolutionne les processus de recrutement tout en préservant l'aspect humain de la sélection...",
      author: "Abdoul SAKO",
      readTime: "6 min",
      category: "Innovation",
      date: "10 mai 2025",
      featured: false
    },
    {
      id: 3,
      title: "Rétention des talents : stratégies gagnantes pour les entreprises africaines",
      excerpt: "Les meilleures pratiques pour fidéliser les hauts potentiels dans un contexte de forte mobilité...",
      author: "Mohamed KABA",
      readTime: "5 min",
      category: "Stratégie RH",
      date: "5 mai 2025",
      featured: false
    }
  ];

  // Catégories disponibles
  const categories = ["Tendances", "Innovation", "Stratégie RH", "Leadership", "Marché du travail"];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mck-blue-50 to-mck-gold-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos <span className="text-mck-blue-600">Insights</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto">
              Décryptage des tendances, analyses de marché et conseils d'experts
              pour anticiper l'évolution du recrutement en Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            <Button variant="default" size="sm" className="bg-mck-blue-600 hover:bg-mck-blue-700 text-xs sm:text-sm">
              Tous les articles
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="border-mck-blue-600 text-mck-blue-600 hover:bg-mck-blue-50 text-xs sm:text-sm">
                {category}
              </Button>
            ))}
          </div>

          {/* Article principal (featured) */}
          {insights.find(insight => insight.featured) && (
            <div className="mb-16">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <div className="lg:flex">
                  <div className="lg:w-2/3 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge className="bg-mck-gold-500 text-white">
                        Article à la Une
                      </Badge>
                      <Badge variant="outline" className="border-mck-blue-600 text-mck-blue-600">
                        {insights.find(insight => insight.featured)?.category}
                      </Badge>
                    </div>

                    <Link to={`/article/${insights.find(insight => insight.featured)?.id}`}>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-mck-blue-600 transition-colors cursor-pointer leading-tight">
                        {insights.find(insight => insight.featured)?.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
                      {insights.find(insight => insight.featured)?.excerpt}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-1">
                        <span className="font-medium">Par {insights.find(insight => insight.featured)?.author}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span>{insights.find(insight => insight.featured)?.date}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span>{insights.find(insight => insight.featured)?.readTime} de lecture</span>
                      </div>
                      <Link to={`/article/${insights.find(insight => insight.featured)?.id}`}>
                        <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 w-full sm:w-auto">
                          Lire l'article
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/3 bg-gradient-to-br from-mck-blue-100 to-mck-gold-100 flex items-center justify-center p-8 min-h-[200px] lg:min-h-[300px]">
                    <div className="text-4xl sm:text-6xl">📊</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Autres articles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {insights.filter(insight => !insight.featured).map((insight) => (
              <Card key={insight.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-0 shadow-md h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-mck-blue-600 text-mck-blue-600">
                      {insight.category}
                    </Badge>
                  </div>
                  <Link to={`/article/${insight.id}`}>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 hover:text-mck-blue-600 transition-colors leading-tight cursor-pointer">
                      {insight.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {insight.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-4">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium">{insight.author}</p>
                      <p>{insight.date} • {insight.readTime} de lecture</p>
                    </div>
                    <Link to={`/article/${insight.id}`}>
                      <Button variant="ghost" size="sm" className="text-mck-blue-600 hover:text-mck-blue-700 w-full sm:w-auto">
                        Lire →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter */}
          <div className="bg-mck-blue-50 p-8 sm:p-12 rounded-2xl text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Restez informé de nos dernières publications
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Recevez chaque mois notre newsletter avec les dernières tendances du recrutement,
              nos analyses de marché et conseils d'experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email professionnel"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mck-blue-600 text-sm sm:text-base"
              />
              <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 px-6 sm:px-8">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
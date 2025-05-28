
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InsightsSection = () => {
  // Articles et insights
  const insights = [
    {
      id: 1,
      title: "L'avenir du recrutement en Afrique : tendances 2025",
      excerpt: "Une analyse approfondie des transformations du marché du travail africain et des nouvelles attentes des talents...",
      author: "Marie Kouadio",
      readTime: "8 min",
      category: "Tendances",
      date: "15 mai 2025",
      featured: true
    },
    {
      id: 2,
      title: "Intelligence Artificielle et recrutement : opportunités et défis",
      excerpt: "Comment l'IA révolutionne les processus de recrutement tout en préservant l'aspect humain de la sélection...",
      author: "Jean-Baptiste Nkomo",
      readTime: "6 min",
      category: "Innovation",
      date: "10 mai 2025",
      featured: false
    },
    {
      id: 3,
      title: "Rétention des talents : stratégies gagnantes pour les entreprises africaines",
      excerpt: "Les meilleures pratiques pour fidéliser les hauts potentiels dans un contexte de forte mobilité...",
      author: "Fatima Al-Rashid",
      readTime: "5 min",
      category: "Stratégie RH",
      date: "5 mai 2025",
      featured: false
    }
  ];

  // Catégories disponibles
  const categories = ["Tendances", "Innovation", "Stratégie RH", "Leadership", "Marché du travail"];

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-mck-blue-600">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Décryptage des tendances, analyses de marché et conseils d'experts 
            pour anticiper l'évolution du recrutement en Afrique.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button variant="default" size="sm" className="bg-mck-blue-600 hover:bg-mck-blue-700">
            Tous les articles
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm" className="border-mck-blue-600 text-mck-blue-600 hover:bg-mck-blue-50">
              {category}
            </Button>
          ))}
        </div>

        {/* Article principal (featured) */}
        {insights.find(insight => insight.featured) && (
          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <div className="md:flex">
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-mck-gold-500 text-white">
                      Article à la Une
                    </Badge>
                    <Badge variant="outline" className="border-mck-blue-600 text-mck-blue-600">
                      {insights.find(insight => insight.featured)?.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-mck-blue-600 transition-colors cursor-pointer">
                    {insights.find(insight => insight.featured)?.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {insights.find(insight => insight.featured)?.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Par {insights.find(insight => insight.featured)?.author}</span>
                      <span className="mx-2">•</span>
                      <span>{insights.find(insight => insight.featured)?.date}</span>
                      <span className="mx-2">•</span>
                      <span>{insights.find(insight => insight.featured)?.readTime} de lecture</span>
                    </div>
                    <Button className="bg-mck-blue-600 hover:bg-mck-blue-700">
                      Lire l'article
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-mck-blue-100 to-mck-gold-100 flex items-center justify-center p-8">
                  <div className="text-6xl">📊</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Autres articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insights.filter(insight => !insight.featured).map((insight) => (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="border-mck-blue-600 text-mck-blue-600">
                    {insight.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 hover:text-mck-blue-600 transition-colors leading-tight">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <p className="font-medium">{insight.author}</p>
                    <p>{insight.date} • {insight.readTime} de lecture</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-mck-blue-600 hover:text-mck-blue-700">
                    Lire →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-mck-blue-50 p-12 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Restez informé de nos dernières publications
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Recevez chaque mois notre newsletter avec les dernières tendances du recrutement, 
            nos analyses de marché et conseils d'experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email professionnel"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mck-blue-600"
            />
            <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 px-8">
              S'abonner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;

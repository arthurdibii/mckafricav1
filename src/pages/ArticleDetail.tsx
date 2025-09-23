
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();

  // Données fictives - en production, ceci viendrait de votre base de données
  const articleData = {
    id: 1,
    title: "L'avenir du recrutement en Afrique : tendances 2025",
    content: `
      <p>Le marché du travail africain connaît une transformation majeure, portée par l'essor du numérique, l'émergence d'une nouvelle génération de talents et l'évolution des attentes professionnelles. En tant que cabinet de conseil en recrutement basé en Côte d'Ivoire, McK Africa observe quotidiennement ces mutations et anticipe les tendances qui façonneront l'emploi en 2025.</p>

      <h2>1. La digitalisation du recrutement</h2>
      <p>L'adoption des outils numériques s'accélère en Afrique. Les plateformes de recrutement en ligne, les entretiens vidéo et l'utilisation de l'intelligence artificielle pour le tri des candidatures deviennent la norme. Cette digitalisation permet aux entreprises d'accéder à un vivier de talents plus large et aux candidats de postuler depuis n'importe où sur le continent.</p>

      <h2>2. L'émergence de nouveaux métiers</h2>
      <p>Le développement de l'économie numérique africaine crée de nouveaux besoins en compétences. Les métiers liés à la fintech, à l'e-commerce, à la cybersécurité et au développement durable connaissent une forte demande. Les entreprises recherchent activement des profils capables de naviguer dans cet environnement en mutation.</p>

      <h2>3. La mobilité intra-africaine des talents</h2>
      <p>Avec la mise en place progressive de la Zone de libre-échange continentale africaine (ZLECAf), la mobilité des travailleurs qualifiés s'intensifie. Les professionnels africains sont de plus en plus ouverts à des opportunités dans d'autres pays du continent, créant un marché du travail réellement continental.</p>

      <h2>4. L'importance croissante du télétravail</h2>
      <p>La pandémie a accéléré l'adoption du travail à distance en Afrique. De nombreuses entreprises proposent désormais des postes hybrides ou entièrement en télétravail, permettant d'attirer des talents indépendamment de leur localisation géographique.</p>

      <h2>5. Focus sur le développement durable</h2>
      <p>Les entreprises africaines intègrent de plus en plus les enjeux environnementaux et sociaux dans leur stratégie RH. Les candidats, particulièrement les jeunes générations, privilégient les employeurs engagés dans des démarches responsables.</p>

      <h2>Conclusion</h2>
      <p>L'année 2025 s'annonce riche en opportunités pour les professionnels africains. Les entreprises qui sauront s'adapter à ces nouvelles tendances et attirer les meilleurs talents seront les mieux positionnées pour réussir dans cette nouvelle ère du recrutement africain.</p>
    `,
    author: "Marie Kouadio",
    authorBio: "Directrice associée chez McK Africa, spécialiste du recrutement exécutif en Afrique de l'Ouest avec plus de 15 ans d'expérience.",
    readTime: "8 min",
    category: "Tendances",
    date: "15 mai 2025",
    featured: true,
    relatedArticles: [
      {
        id: 2,
        title: "Intelligence Artificielle et recrutement : opportunités et défis",
        category: "Innovation",
        readTime: "6 min"
      },
      {
        id: 3,
        title: "Rétention des talents : stratégies gagnantes pour les entreprises africaines",
        category: "Stratégie RH",
        readTime: "5 min"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bouton retour */}
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-6 text-mck-blue-600 hover:text-mck-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux insights
          </Button>

          <article>
            {/* En-tête de l'article */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-mck-blue-100 text-mck-blue-700">
                  {articleData.category}
                </Badge>
                {articleData.featured && (
                  <Badge className="bg-mck-gold-100 text-mck-gold-700">
                    Article à la Une
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                {articleData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-black mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Par {articleData.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{articleData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{articleData.readTime} de lecture</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="border-mck-blue-600 text-mck-blue-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Contenu de l'article */}
            <div className="prose prose-lg max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: articleData.content }}
                className="text-black leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-6"
              />
            </div>

            <Separator className="mb-8" />

            {/* Informations sur l'auteur */}
            <Card className="mb-12 shadow-md border-0 bg-mck-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-mck-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {articleData.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">
                      {articleData.author}
                    </h3>
                    <p className="text-black leading-relaxed">
                      {articleData.authorBio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Articles connexes */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-6">Articles connexes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articleData.relatedArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-0 shadow-md">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 border-mck-blue-600 text-mck-blue-600">
                        {article.category}
                      </Badge>
                      <h3 className="font-bold text-black mb-3 hover:text-mck-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-black">
                        {article.readTime} de lecture
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;

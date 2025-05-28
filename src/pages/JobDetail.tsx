
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Users, Building, Briefcase } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const JobDetail = () => {
  const { id } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Données fictives - en production, ceci viendrait de votre base de données
  const jobData = {
    id: 1,
    title: "Directeur Financier",
    company: "Groupe Bancaire International",
    location: "Abidjan, Côte d'Ivoire",
    sector: "Finance",
    type: "CDI",
    experience: "10+ années",
    salary: "Négociable",
    description: "Nous recherchons un Directeur Financier expérimenté pour piloter la stratégie financière de notre filiale en Côte d'Ivoire. Ce poste stratégique vous permettra de contribuer activement au développement de nos activités sur le marché ouest-africain.",
    requirements: [
      "Master en Finance, Comptabilité ou équivalent",
      "Minimum 10 ans d'expérience en direction financière",
      "Expérience dans le secteur bancaire appréciée",
      "Maîtrise des normes IFRS et OHADA",
      "Leadership et capacités de management d'équipe",
      "Excellente maîtrise du français et de l'anglais"
    ],
    responsibilities: [
      "Piloter la stratégie financière et superviser la comptabilité",
      "Élaborer les budgets et prévisionnels financiers",
      "Assurer le reporting financier vers le siège",
      "Manager une équipe de 15 personnes",
      "Veiller à la conformité réglementaire locale",
      "Participer aux décisions stratégiques du comité de direction"
    ],
    benefits: [
      "Salaire attractif avec bonus performance",
      "Véhicule de fonction",
      "Assurance santé premium",
      "Formation continue",
      "Opportunités de mobilité internationale"
    ],
    tags: ["Leadership", "Finance", "Strategy"],
    postedDate: "Il y a 2 jours",
    urgent: true
  };

  if (showApplicationForm) {
    return <ApplicationForm jobData={jobData} onBack={() => setShowApplicationForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de l'offre */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {jobData.title}
                    </CardTitle>
                    {jobData.urgent && (
                      <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                    )}
                  </div>
                  
                  <p className="text-xl text-mck-blue-600 font-semibold mb-4">
                    {jobData.company}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {jobData.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {jobData.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {jobData.experience}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {jobData.sector}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-4">{jobData.postedDate}</p>
                  <Button 
                    size="lg" 
                    className="bg-mck-blue-600 hover:bg-mck-blue-700"
                    onClick={() => setShowApplicationForm(true)}
                  >
                    Postuler maintenant
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {jobData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-mck-blue-50 text-mck-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Description du poste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{jobData.description}</p>
                </CardContent>
              </Card>

              {/* Responsabilités */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Responsabilités principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-mck-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Exigences */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Profil recherché</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-mck-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations clés */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Informations clés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">Salaire</p>
                    <p className="text-gray-600">{jobData.salary}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold text-gray-900">Type de contrat</p>
                    <p className="text-gray-600">{jobData.type}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold text-gray-900">Expérience requise</p>
                    <p className="text-gray-600">{jobData.experience}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Avantages */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Avantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-mck-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Call to action */}
              <Card className="shadow-md border-0 bg-mck-blue-50">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-3">Intéressé par ce poste ?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Postulez dès maintenant et rejoignez notre équipe dynamique.
                  </p>
                  <Button 
                    className="w-full bg-mck-blue-600 hover:bg-mck-blue-700"
                    onClick={() => setShowApplicationForm(true)}
                  >
                    Postuler
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;

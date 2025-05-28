import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const JobBoardSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // Données fictives des offres d'emploi
  const jobOffers = [
    {
      id: 1,
      title: "Directeur Financier",
      company: "Groupe Bancaire International",
      location: "Lagos, Nigeria",
      sector: "Finance",
      type: "CDI",
      experience: "10+ années",
      salary: "Négociable",
      description: "Nous recherchons un Directeur Financier expérimenté pour piloter la stratégie financière...",
      tags: ["Leadership", "Finance", "Strategy"],
      postedDate: "Il y a 2 jours",
      urgent: true
    },
    {
      id: 2,
      title: "Head of Technology",
      company: "Fintech Innovation",
      location: "Le Cap, Afrique du Sud",
      sector: "Technologie",
      type: "CDI",
      experience: "8+ années",
      salary: "120k - 150k USD",
      description: "Poste de leadership technique dans une fintech en forte croissance...",
      tags: ["Tech Leadership", "Fintech", "Innovation"],
      postedDate: "Il y a 1 semaine",
      urgent: false
    },
    {
      id: 3,
      title: "Responsable Développement Durable",
      company: "Multinationale Énergie",
      location: "Casablanca, Maroc",
      sector: "Énergie",
      type: "CDI",
      experience: "5+ années",
      salary: "À négocier",
      description: "Leader des initiatives de développement durable et transition énergétique...",
      tags: ["Sustainability", "Energy", "CSR"],
      postedDate: "Il y a 3 jours",
      urgent: false
    }
  ];

  // Filtrage des offres
  const filteredJobs = jobOffers.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || selectedCountry === '' || job.location.includes(selectedCountry);
    const matchesSector = selectedSector === 'all' || selectedSector === '' || job.sector === selectedSector;
    
    return matchesSearch && matchesCountry && matchesSector;
  });

  return (
    <section id="emplois" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Offres d'<span className="text-mck-blue-600">Emploi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleures opportunités de carrière avec les entreprises 
            les plus innovantes d'Afrique.
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Rechercher par poste ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Afrique du Sud">Afrique du Sud</SelectItem>
                <SelectItem value="Maroc">Maroc</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="Secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les secteurs</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Technologie">Technologie</SelectItem>
                <SelectItem value="Énergie">Énergie</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Résultats de recherche */}
        <div className="mb-8">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredJobs.length}</span> offre(s) trouvée(s)
          </p>
        </div>

        {/* Liste des offres */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 hover:text-mck-blue-600 transition-colors">
                        {job.title}
                      </CardTitle>
                      {job.urgent && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-mck-blue-600 font-semibold mb-1">{job.company}</p>
                    <p className="text-gray-600 text-sm">{job.location} • {job.type} • {job.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">{job.postedDate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{job.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-mck-blue-50 text-mck-blue-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      <strong>Salaire:</strong> {job.salary}
                    </span>
                    <Badge variant="outline" className="border-mck-gold-400 text-mck-gold-600">
                      {job.sector}
                    </Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Sauvegarder
                    </Button>
                    <Button size="sm" className="bg-mck-blue-600 hover:bg-mck-blue-700">
                      Postuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action pour candidats */}
        <div className="text-center mt-16 bg-white p-12 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vous ne trouvez pas l'offre idéale ?
          </h3>
          <p className="text-gray-600 mb-8">
            Créez votre profil candidat et recevez les offres qui correspondent à vos critères.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-mck-blue-600 hover:bg-mck-blue-700">
              Créer mon profil
            </Button>
            <Button size="lg" variant="outline" className="border-mck-blue-600 text-mck-blue-600">
              Déposer mon CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoardSection;

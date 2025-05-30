import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter,
  Eye, 
  UserPlus,
  MapPin,
  Calendar
} from 'lucide-react';
import CreateCandidateModal from '@/components/CreateCandidateModal';
import CandidateDetailModal from '@/components/CandidateDetailModal';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentTitle: string;
  skills: string[];
  availability: string;
  location: string;
  experience: number;
  appliedJobs: string[];
  score: number;
  photo?: string;
}

const AdminCandidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Données simulées des candidats
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      firstName: 'Amadou',
      lastName: 'Traoré',
      email: 'a.traore@email.com',
      phone: '+225 01 23 45 67',
      currentTitle: 'Directeur Financier Senior',
      skills: ['Finance', 'Leadership', 'Stratégie', 'Gestion Risques'],
      availability: 'Sous 1 mois',
      location: 'Abidjan, Côte d\'Ivoire',
      experience: 12,
      appliedJobs: ['Directeur Financier', 'Head of Technology'],
      score: 4.5
    },
    {
      id: '2',
      firstName: 'Fatou',
      lastName: 'Bamba',
      email: 'f.bamba@email.com',
      phone: '+225 02 34 56 78',
      currentTitle: 'Chef de Projet Digital',
      skills: ['Marketing Digital', 'Gestion Projet', 'Analytics', 'Social Media'],
      availability: 'Immédiate',
      location: 'Lagos, Nigeria',
      experience: 8,
      appliedJobs: ['Responsable Développement Durable'],
      score: 4.2
    },
    {
      id: '3',
      firstName: 'Koffi',
      lastName: 'Assouan',
      email: 'k.assouan@email.com',
      phone: '+225 03 45 67 89',
      currentTitle: 'Développeur Full Stack',
      skills: ['Python', 'React', 'Node.js', 'DevOps'],
      availability: 'Sous 1 mois',
      location: 'Casablanca, Maroc',
      experience: 6,
      appliedJobs: ['Head of Technology', 'Consultant Senior'],
      score: 4.8
    }
  ]);

  // Compétences disponibles pour le filtre
  const availableSkills = ['Finance', 'Leadership', 'Stratégie', 'Marketing Digital', 'Python', 'React', 'Gestion Projet', 'Analytics', 'DevOps'];
  
  // Offres disponibles pour le filtre
  const availableJobs = ['Directeur Financier', 'Head of Technology', 'Responsable Développement Durable', 'Consultant Senior'];

  // Filtrage des candidats
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => candidate.skills.includes(skill));

    const matchesAvailability = !selectedAvailability || selectedAvailability === 'all' || 
      candidate.availability === selectedAvailability;

    const matchesLocation = !selectedLocation || selectedLocation === 'all' || 
      candidate.location.includes(selectedLocation);

    const matchesExperience = !selectedExperience || selectedExperience === 'all' || 
      (selectedExperience === '0-2' && candidate.experience <= 2) ||
      (selectedExperience === '3-5' && candidate.experience >= 3 && candidate.experience <= 5) ||
      (selectedExperience === '6-10' && candidate.experience >= 6 && candidate.experience <= 10) ||
      (selectedExperience === '10+' && candidate.experience > 10);

    const matchesJob = !selectedJob || selectedJob === 'all' || 
      candidate.appliedJobs.includes(selectedJob);

    return matchesSearch && matchesSkills && matchesAvailability && 
           matchesLocation && matchesExperience && matchesJob;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleAddCandidate = (newCandidate: Omit<Candidate, 'id'>) => {
    const candidate: Candidate = {
      ...newCandidate,
      id: Date.now().toString()
    };
    setCandidates([...candidates, candidate]);
    setShowCreateModal(false);
  };

  // Adapter les données du candidat pour le modal
  const adaptCandidateForModal = (candidate: Candidate) => {
    return {
      ...candidate,
      name: `${candidate.firstName} ${candidate.lastName}`,
      notes: '',
      stage: 'candidature'
    };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des Candidats
            </h2>
            <p className="text-gray-600">
              Recherchez et gérez tous vos candidats
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-mck-blue-500 hover:bg-mck-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer un candidat
          </Button>
        </div>

        {/* Panel de filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtres Avancés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher candidats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Disponibilité */}
              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Disponibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Immédiate">Immédiate</SelectItem>
                  <SelectItem value="Sous 1 mois">Sous 1 mois</SelectItem>
                  <SelectItem value="Sous 3 mois">Sous 3 mois</SelectItem>
                </SelectContent>
              </Select>

              {/* Localisation */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Abidjan">Abidjan</SelectItem>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Casablanca">Casablanca</SelectItem>
                  <SelectItem value="Dakar">Dakar</SelectItem>
                </SelectContent>
              </Select>

              {/* Expérience */}
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Expérience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute expérience</SelectItem>
                  <SelectItem value="0-2">0-2 ans</SelectItem>
                  <SelectItem value="3-5">3-5 ans</SelectItem>
                  <SelectItem value="6-10">6-10 ans</SelectItem>
                  <SelectItem value="10+">10+ ans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtres compétences et offres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compétences
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedSkills.includes(skill) 
                          ? 'bg-mck-blue-500 text-white' 
                          : 'hover:bg-mck-blue-50'
                      }`}
                      onClick={() => {
                        if (selectedSkills.includes(skill)) {
                          setSelectedSkills(selectedSkills.filter(s => s !== skill));
                        } else {
                          setSelectedSkills([...selectedSkills, skill]);
                        }
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offres postulées
                </label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une offre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les offres</SelectItem>
                    {availableJobs.map((job) => (
                      <SelectItem key={job} value={job}>{job}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredCandidates.length}</span> candidat(s) trouvé(s)
          </p>
        </div>

        {/* Liste des candidats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Photo/Initiales */}
                  <div className="w-12 h-12 bg-mck-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {getInitials(candidate.firstName, candidate.lastName)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <p className="text-mck-blue-600 text-sm font-medium mb-2">
                      {candidate.currentTitle}
                    </p>
                    
                    {/* Informations principales */}
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {candidate.experience} ans d'expérience
                      </div>
                    </div>

                    {/* Compétences */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge 
                            key={skill} 
                            className="bg-mck-green-100 text-mck-blue-700 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Offres postulées */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {candidate.appliedJobs.slice(0, 2).map((job) => (
                          <Badge 
                            key={job} 
                            variant="outline"
                            className="border-mck-blue-500 text-mck-blue-600 text-xs"
                          >
                            {job}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">{candidate.score}/5</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedCandidate(adaptCandidateForModal(candidate))}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Voir Profil
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-mck-blue-500 hover:bg-mck-blue-600"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Pipeline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modales */}
        <CreateCandidateModal 
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddCandidate}
          availableSkills={availableSkills}
        />

        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCandidates;

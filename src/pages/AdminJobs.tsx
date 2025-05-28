
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées des offres
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Directeur Financier",
      location: "Lagos, Nigeria",
      type: "CDI",
      status: "ouvert",
      candidates: 45,
      createdDate: "2024-01-15",
      description: "Nous recherchons un Directeur Financier expérimenté..."
    },
    {
      id: 2,
      title: "Head of Technology",
      location: "Le Cap, Afrique du Sud",
      type: "CDI",
      status: "ouvert",
      candidates: 32,
      createdDate: "2024-01-10",
      description: "Poste de leadership technique dans une fintech..."
    },
    {
      id: 3,
      title: "Responsable Développement Durable",
      location: "Casablanca, Maroc",
      type: "CDI",
      status: "fermé",
      candidates: 28,
      createdDate: "2024-01-05",
      description: "Leader des initiatives de développement durable..."
    },
    {
      id: 4,
      title: "Consultant Senior",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI",
      status: "ouvert",
      candidates: 18,
      createdDate: "2024-01-20",
      description: "Accompagner nos clients dans leur transformation..."
    }
  ]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteJob = (jobId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des Offres d'Emploi
            </h2>
            <p className="text-gray-600">
              Gérez toutes vos offres d'emploi et suivez les candidatures
            </p>
          </div>
          <Link to="/admin/offres/creer">
            <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Créer une offre
            </Button>
          </Link>
        </div>

        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par titre ou localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des offres */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <Badge 
                        variant={job.status === 'ouvert' ? 'default' : 'secondary'}
                        className={job.status === 'ouvert' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>Créée le {new Date(job.createdDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {job.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {job.candidates} candidat{job.candidates > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <Link to={`/admin/offres/${job.id}/pipeline`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Pipeline
                      </Button>
                    </Link>
                    <Link to={`/admin/offres/${job.id}/modifier`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune offre trouvée</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminJobs;

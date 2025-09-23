import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import CreateJobModal from '@/components/CreateJobModal';
import EditJobModal from '@/components/EditJobModal';
import AssignRecruiterModal from '@/components/AssignRecruiterModal';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  candidates: number;
  createdDate: string;
  description: string;
  contractType: string;
  requiredSkills: string[];
  responsibilities: string;
  profile: string;
  salary: string;
  experience: string;
  assignedRecruiters: Array<{
    id: string;
    name: string;
    email: string;
    specialties: string[];
    coefficient?: number;
  }>;
}

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { notifyRecruiterAssigned } = useNotifications();

  const availableSkills = [
    'Leadership', 'Finance', 'Stratégie', 'Gestion d\'équipe', 'Analyse financière',
    'Budgétisation', 'Reporting', 'Conformité', 'Audit', 'Gestion des risques'
  ];

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: "Directeur Financier",
      location: "Lagos, Nigeria",
      type: "CDI",
      status: "ouvert",
      candidates: 45,
      createdDate: "2024-01-15",
      description: "Nous recherchons un Directeur Financier expérimenté...",
      contractType: "CDI",
      requiredSkills: ["Leadership", "Finance", "Stratégie"],
      responsibilities: "Diriger l'équipe financière...",
      profile: "Diplôme en finance...",
      salary: "120 000 - 150 000 €",
      experience: "10+ ans",
      assignedRecruiters: [
        {
          id: '1',
          name: 'Marie Kouassi',
          email: 'marie.kouassi@mckafrica.com',
          specialties: ['Finance', 'Executive Search'],
          coefficient: 1.2
        }
      ]
    },
    {
      id: '2',
      title: "Head of Technology",
      location: "Le Cap, Afrique du Sud",
      type: "CDI",
      status: "ouvert",
      candidates: 32,
      createdDate: "2024-01-10",
      description: "Poste de leadership technique dans une fintech...",
      contractType: "CDI",
      requiredSkills: ["Leadership", "Technology"],
      responsibilities: "Diriger l'équipe tech...",
      profile: "Diplôme en informatique...",
      salary: "100 000 - 130 000 €",
      experience: "8+ ans",
      assignedRecruiters: []
    },
    {
      id: '3',
      title: "Responsable Développement Durable",
      location: "Casablanca, Maroc",
      type: "CDI",
      status: "fermé",
      candidates: 28,
      createdDate: "2024-01-05",
      description: "Leader des initiatives de développement durable...",
      contractType: "CDI",
      requiredSkills: ["Sustainability", "Leadership"],
      responsibilities: "Développer la stratégie durable...",
      profile: "Expérience en développement durable...",
      salary: "80 000 - 100 000 €",
      experience: "5+ ans",
      assignedRecruiters: []
    },
    {
      id: '4',
      title: "Consultant Senior",
      location: "Abidjan, Côte d'Ivoire",
      type: "CDI",
      status: "ouvert",
      candidates: 18,
      createdDate: "2024-01-20",
      description: "Accompagner nos clients dans leur transformation...",
      contractType: "CDI",
      requiredSkills: ["Consulting", "Strategy"],
      responsibilities: "Conseiller les clients...",
      profile: "Expérience en conseil...",
      salary: "70 000 - 90 000 €",
      experience: "3+ ans",
      assignedRecruiters: []
    }
  ]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'candidates' | 'createdDate' | 'assignedRecruiters'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      candidates: 0,
      createdDate: new Date().toISOString().split('T')[0],
      assignedRecruiters: []
    };
    setJobs([newJob, ...jobs]);
    setCreateModalOpen(false);
  };

  const handleEditJob = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setEditModalOpen(false);
    setSelectedJob(null);
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const handleAssignRecruiter = (recruiterId: string, coefficient: number, notes: string) => {
    if (!selectedJob) return;

    const recruiter = {
      id: recruiterId,
      name: recruiterId === '1' ? 'Marie Kouassi' : recruiterId === '2' ? 'Jean Baptiste' : 'Fatou Diallo',
      email: recruiterId === '1' ? 'marie.kouassi@mckafrica.com' : recruiterId === '2' ? 'jean.baptiste@mckafrica.com' : 'fatou.diallo@mckafrica.com',
      specialties: recruiterId === '1' ? ['Finance', 'Executive Search'] : recruiterId === '2' ? ['Technology', 'Engineering'] : ['HR', 'Operations'],
      coefficient: coefficient
    };

    setJobs(jobs.map(job => 
      job.id === selectedJob.id 
        ? { ...job, assignedRecruiters: [...job.assignedRecruiters, recruiter] }
        : job
    ));

    notifyRecruiterAssigned(recruiter.name, selectedJob.title);
    setAssignModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Gestion des Offres d'Emploi
            </h2>
            <p className="text-black">
              Gérez toutes vos offres d'emploi et suivez les candidatures
            </p>
          </div>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="bg-mck-blue-500 hover:bg-mck-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer une offre
          </Button>
        </div>

        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-4 w-4" />
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
                      <h3 className="text-xl font-semibold text-black">
                        {job.title}
                      </h3>
                      <Badge 
                        variant={job.status === 'ouvert' ? 'default' : 'secondary'}
                        className={job.status === 'ouvert' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-black'}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-black mb-3">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>Créée le {new Date(job.createdDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-black mb-4">
                      {job.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-800" />
                        <span className="text-sm text-black">
                          {job.candidates} candidat{job.candidates > 1 ? 's' : ''}
                        </span>
                      </div>
                      {job.assignedRecruiters.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <UserPlus className="h-4 w-4 text-mck-blue-500" />
                          <span className="text-sm text-mck-blue-600">
                            {job.assignedRecruiters.length} recruteur{job.assignedRecruiters.length > 1 ? 's' : ''} affecté{job.assignedRecruiters.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setAssignModalOpen(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Affecter
                    </Button>
                    <Link to={`/admin/offres/${job.id}/pipeline`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Pipeline
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
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
            <p className="text-black">Aucune offre trouvée</p>
          </div>
        )}

        {/* Modales */}
        <CreateJobModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateJob}
          availableSkills={availableSkills}
        />

        {selectedJob && (
          <EditJobModal
            open={editModalOpen}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedJob(null);
            }}
            onSubmit={handleEditJob}
            availableSkills={availableSkills}
            job={selectedJob}
          />
        )}

        {selectedJob && (
          <AssignRecruiterModal
            open={assignModalOpen}
            onClose={() => {
              setAssignModalOpen(false);
              setSelectedJob(null);
            }}
            onAssign={handleAssignRecruiter}
            jobTitle={selectedJob.title}
            currentRecruiters={selectedJob.assignedRecruiters}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminJobs;

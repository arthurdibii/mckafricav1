
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import KanbanBoard from '@/components/KanbanBoard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, Phone, Mail, FileText } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  notes: string;
  stage: string;
}

const JobPipeline = () => {
  const { id } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateNotes, setCandidateNotes] = useState('');
  const [candidateScore, setCandidateScore] = useState(0);

  // Données simulées de l'offre
  const jobData = {
    id: id,
    title: "Directeur Financier",
    location: "Lagos, Nigeria",
    type: "CDI",
    totalCandidates: 45,
    status: "ouvert"
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCandidateNotes(candidate.notes);
    setCandidateScore(candidate.score);
  };

  const handleSaveCandidateData = () => {
    if (selectedCandidate) {
      // Ici on mettrait à jour les données du candidat
      console.log('Mise à jour candidat:', {
        id: selectedCandidate.id,
        score: candidateScore,
        notes: candidateNotes
      });
      setSelectedCandidate(null);
    }
  };

  const renderStars = (score: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          i < score ? 'text-yellow-400 fill-current' : 'text-gray-300'
        } ${interactive ? 'hover:text-yellow-300' : ''}`}
        onClick={interactive ? () => setCandidateScore(i + 1) : undefined}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Pipeline - {jobData.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{jobData.location}</span>
              <span>{jobData.type}</span>
              <Badge className="bg-green-100 text-green-800">
                {jobData.totalCandidates} candidats
              </Badge>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-mck-blue-600">8</div>
              <div className="text-sm text-gray-600">Nouvelles candidatures</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">En entretien</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Offres en cours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">4.2/5</div>
              <div className="text-sm text-gray-600">Score moyen</div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Processus de Recrutement</h3>
          <KanbanBoard onCandidateClick={handleCandidateClick} />
        </div>

        {/* Modal détail candidat */}
        <Dialog open={selectedCandidate !== null} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détail du Candidat</DialogTitle>
            </DialogHeader>
            
            {selectedCandidate && (
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{selectedCandidate.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <Button variant="link" className="h-auto p-0 text-sm">
                          Télécharger CV
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Étape actuelle</h5>
                    <Badge className="mb-4">
                      {selectedCandidate.stage.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Système de notation */}
                <div>
                  <h5 className="font-medium mb-2">Évaluation</h5>
                  <div className="flex items-center space-x-2 mb-4">
                    {renderStars(candidateScore, true)}
                    <span className="text-sm text-gray-600">
                      ({candidateScore}/5)
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h5 className="font-medium mb-2">Notes et Commentaires</h5>
                  <Textarea
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                    placeholder="Ajoutez vos notes sur ce candidat..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Planifier entretien
                    </Button>
                    <Button variant="outline" size="sm">
                      Envoyer email
                    </Button>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSaveCandidateData} className="bg-mck-blue-500 hover:bg-mck-blue-600">
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default JobPipeline;

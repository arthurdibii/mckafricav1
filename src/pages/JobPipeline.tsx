
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import KanbanBoard from '@/components/KanbanBoard';
import CandidateDetailModal from '@/components/CandidateDetailModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

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
  };

  return (
    <AdminLayout>
      <div className="max-w-full overflow-hidden">
        <div className="space-y-6 px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 truncate">
                Pipeline - {jobData.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <span className="truncate">{jobData.location}</span>
                <span>{jobData.type}</span>
                <Badge className="bg-green-100 text-green-800 shrink-0">
                  {jobData.totalCandidates} candidats
                </Badge>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-xl sm:text-2xl font-bold text-mck-blue-600">8</div>
                <div className="text-xs sm:text-sm text-gray-600">Nouvelles candidatures</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">5</div>
                <div className="text-xs sm:text-sm text-gray-600">En entretien</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xl sm:text-2xl font-bold text-green-600">2</div>
                <div className="text-xs sm:text-sm text-gray-600">Offres en cours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">4.2/5</div>
                <div className="text-xs sm:text-sm text-gray-600">Score moyen</div>
              </CardContent>
            </Card>
          </div>

          {/* Kanban Board - Container avec scroll horizontal limité */}
          <div className="w-full">
            <KanbanBoard onCandidateClick={handleCandidateClick} />
          </div>

          {/* Modal détail candidat */}
          <CandidateDetailModal
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default JobPipeline;

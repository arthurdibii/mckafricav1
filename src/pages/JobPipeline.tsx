
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* En-tête responsive */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 truncate">
                  Pipeline - {jobData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-sm text-black">
                  <span className="truncate">{jobData.location}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{jobData.type}</span>
                  <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                    {jobData.totalCandidates} candidats
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques rapides - Responsive grid */}
          <div className="mb-6 lg:mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card className="overflow-hidden">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-mck-blue-600 mb-1">
                    8
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-black leading-tight">
                    Nouvelles candidatures
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-600 mb-1">
                    5
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-black leading-tight">
                    En entretien
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-600 mb-1">
                    2
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-black leading-tight">
                    Offres en cours
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-600 mb-1">
                    4.2/5
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-black leading-tight">
                    Score moyen
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Kanban Board responsive */}
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

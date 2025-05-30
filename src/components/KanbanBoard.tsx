
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Eye, MessageSquare, Medal, Settings } from 'lucide-react';
import DropZone from './DropZone';
import PipelineStageManager from './PipelineStageManager';
import { useNotifications } from '@/hooks/useNotifications';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  notes: string;
  stage: string;
  ranking?: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  candidates: Candidate[];
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
}

const CandidateCard = ({ candidate, onViewDetails }: CandidateCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < score ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRankingColor = (ranking: number | undefined) => {
    if (!ranking) return 'bg-gray-100 text-gray-600';
    if (ranking === 1) return 'bg-yellow-100 text-yellow-800';
    if (ranking === 2) return 'bg-gray-100 text-gray-600';
    if (ranking === 3) return 'bg-orange-100 text-orange-800';
    return 'bg-blue-100 text-blue-600';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className={`mb-3 hover:shadow-md transition-all duration-200 bg-white ${isDragging ? 'rotate-2 scale-105' : ''}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-sm">{candidate.name}</h4>
              {candidate.ranking && (
                <Badge className={`text-xs px-2 py-1 ${getRankingColor(candidate.ranking)}`}>
                  <Medal className="h-3 w-3 mr-1" />
                  #{candidate.ranking}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(candidate);
              }}
              className="h-6 w-6 p-0"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-600 mb-2">{candidate.email}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(candidate.score)}
            </div>
            {candidate.notes && (
              <MessageSquare className="h-3 w-3 text-gray-400" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface KanbanBoardProps {
  onCandidateClick: (candidate: Candidate) => void;
}

const KanbanBoard = ({ onCandidateClick }: KanbanBoardProps) => {
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const [showStageManager, setShowStageManager] = useState(false);
  const { notifyStageChange } = useNotifications();
  
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'nouvelles',
      title: 'Nouvelles Candidatures',
      candidates: [
        {
          id: '1',
          name: 'Jean Kouassi',
          email: 'j.kouassi@email.com',
          phone: '+225 07 12 34 56',
          score: 0,
          notes: '',
          stage: 'nouvelles',
          ranking: 1
        },
        {
          id: '2',
          name: 'Marie Diabaté',
          email: 'm.diabate@email.com',
          phone: '+225 05 67 89 01',
          score: 0,
          notes: '',
          stage: 'nouvelles',
          ranking: 2
        }
      ]
    },
    {
      id: 'preselection',
      title: 'Présélection',
      candidates: [
        {
          id: '3',
          name: 'Amadou Traoré',
          email: 'a.traore@email.com',
          phone: '+225 01 23 45 67',
          score: 4,
          notes: 'Profil intéressant, expérience solide',
          stage: 'preselection',
          ranking: 1
        }
      ]
    },
    {
      id: 'entretien-rh',
      title: 'Entretien RH',
      candidates: [
        {
          id: '4',
          name: 'Fatou Bamba',
          email: 'f.bamba@email.com',
          phone: '+225 02 34 56 78',
          score: 4,
          notes: 'Excellente motivation',
          stage: 'entretien-rh',
          ranking: 1
        }
      ]
    },
    {
      id: 'entretien-technique',
      title: 'Entretien Technique',
      candidates: [
        {
          id: '5',
          name: 'Koffi Assouan',
          email: 'k.assouan@email.com',
          phone: '+225 03 45 67 89',
          score: 5,
          notes: 'Compétences techniques excellentes',
          stage: 'entretien-technique',
          ranking: 1
        }
      ]
    },
    {
      id: 'offre',
      title: 'Offre Faite',
      candidates: []
    },
    {
      id: 'recrute',
      title: 'Recruté',
      candidates: []
    },
    {
      id: 'rejete',
      title: 'Rejeté',
      candidates: []
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const calculateRanking = (candidates: Candidate[]): Candidate[] => {
    return candidates
      .sort((a, b) => b.score - a.score)
      .map((candidate, index) => ({
        ...candidate,
        ranking: index + 1
      }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const candidate = findCandidate(active.id as string);
    setActiveCandidate(candidate);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveCandidate(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Déterminer la colonne cible
    let targetColumnId = overId;
    if (!columns.find(col => col.id === overId)) {
      const candidate = findCandidate(overId);
      if (candidate) {
        targetColumnId = candidate.stage;
      }
    }

    const activeCandidate = findCandidate(activeId);
    if (!activeCandidate) {
      setActiveCandidate(null);
      return;
    }

    const sourceColumnId = activeCandidate.stage;
    
    if (sourceColumnId !== targetColumnId) {
      // Notification du changement d'étape
      const sourceColumn = columns.find(col => col.id === sourceColumnId);
      const targetColumn = columns.find(col => col.id === targetColumnId);
      
      if (sourceColumn && targetColumn) {
        notifyStageChange(
          activeCandidate.name,
          sourceColumn.title,
          targetColumn.title
        );
      }

      setColumns(prevColumns => {
        const newColumns = prevColumns.map(column => ({ ...column, candidates: [...column.candidates] }));
        
        // Retirer le candidat de la colonne source
        const sourceCol = newColumns.find(col => col.id === sourceColumnId);
        if (sourceCol) {
          sourceCol.candidates = sourceCol.candidates.filter(c => c.id !== activeId);
          // Recalculer le classement de la colonne source
          sourceCol.candidates = calculateRanking(sourceCol.candidates);
        }
        
        // Ajouter le candidat à la colonne cible
        const targetCol = newColumns.find(col => col.id === targetColumnId);
        if (targetCol) {
          const updatedCandidate = { ...activeCandidate, stage: targetColumnId };
          targetCol.candidates.push(updatedCandidate);
          // Recalculer le classement de la colonne cible
          targetCol.candidates = calculateRanking(targetCol.candidates);
        }
        
        return newColumns;
      });
    }

    setActiveCandidate(null);
  };

  const findCandidate = (id: string): Candidate | undefined => {
    for (const column of columns) {
      const candidate = column.candidates.find(c => c.id === id);
      if (candidate) return candidate;
    }
    return undefined;
  };

  const handleStagesChange = (newStages: any[]) => {
    // Mettre à jour les colonnes en fonction des nouvelles étapes
    const updatedColumns = newStages.map(stage => {
      const existingColumn = columns.find(col => col.id === stage.id);
      return {
        id: stage.id,
        title: stage.title,
        candidates: existingColumn ? existingColumn.candidates : []
      };
    });
    setColumns(updatedColumns);
  };

  const pipelineStages = columns.map(col => ({
    id: col.id,
    title: col.title,
    candidateCount: col.candidates.length
  }));

  if (showStageManager) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Processus de Recrutement</h3>
          <Button
            variant="outline"
            onClick={() => setShowStageManager(false)}
          >
            Retour au Pipeline
          </Button>
        </div>
        <PipelineStageManager
          initialStages={pipelineStages}
          onStagesChange={handleStagesChange}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Processus de Recrutement</h3>
        <Button
          variant="outline"
          onClick={() => setShowStageManager(true)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Gérer les étapes
        </Button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto pb-4 border rounded-lg bg-gray-50 p-4">
          <div className="flex space-x-4 min-w-max">
            {columns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center justify-between">
                      {column.title}
                      <Badge variant="secondary" className="text-xs">
                        {column.candidates.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <DropZone id={column.id}>
                      <SortableContext
                        items={column.candidates.map(c => c.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {column.candidates.map((candidate) => (
                            <CandidateCard
                              key={candidate.id}
                              candidate={candidate}
                              onViewDetails={onCandidateClick}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DropZone>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard candidate={activeCandidate} onViewDetails={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;

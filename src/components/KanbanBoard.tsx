
import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import CandidateCard from './CandidateCard';
import PipelineStageManager from './PipelineStageManager';
import { useKanbanLogic } from '@/hooks/useKanbanLogic';

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

interface KanbanBoardProps {
  onCandidateClick: (candidate: Candidate) => void;
}

const KanbanBoard = ({ onCandidateClick }: KanbanBoardProps) => {
  const [showStageManager, setShowStageManager] = useState(false);
  const {
    columns,
    activeCandidate,
    handleDragStart,
    handleDragEnd,
    handleStagesChange,
  } = useKanbanLogic();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const pipelineStages = columns.map(col => ({
    id: col.id,
    title: col.title,
    candidateCount: col.candidates.length
  }));

  if (showStageManager) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">Processus de Recrutement</h3>
          <Button
            variant="outline"
            onClick={() => setShowStageManager(false)}
            size="sm"
            className="w-full sm:w-auto"
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
    <div className="space-y-4 sm:space-y-6">
      {/* Titre fixe + Bouton de gestion - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg sm:text-xl font-semibold">Processus de Recrutement</h3>
        <Button
          variant="outline"
          onClick={() => setShowStageManager(true)}
          size="sm"
          className="w-full sm:w-auto"
        >
          <Settings className="h-4 w-4 mr-2" />
          Gérer les étapes
        </Button>
      </div>

      {/* Container Kanban avec scroll horizontal responsive */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-full border rounded-lg bg-gray-50 p-3 sm:p-4 lg:p-6">
          {/* Zone de scroll horizontal avec scrollbar masquée */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-2">
            {/* Container flex avec largeur minimale pour forcer le scroll */}
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 min-w-max">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  candidates={column.candidates}
                  onCandidateClick={onCandidateClick}
                />
              ))}
            </div>
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

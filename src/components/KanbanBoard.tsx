
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
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-3 sm:gap-4">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Processus de Recrutement</h3>
          <Button
            variant="outline"
            onClick={() => setShowStageManager(false)}
            size="sm"
            className="w-full sm:w-auto text-sm"
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
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Titre fixe + Bouton de gestion - Responsive */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Processus de Recrutement</h3>
        <Button
          variant="outline"
          onClick={() => setShowStageManager(true)}
          size="sm"
          className="w-full sm:w-auto text-sm"
        >
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Gérer les étapes
        </Button>
      </div>

      {/* Container Kanban avec scroll horizontal responsive */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-full border rounded-lg bg-gray-50 p-2 sm:p-3 lg:p-4">
          {/* Zone de scroll horizontal optimisée */}
          <div 
            className="overflow-x-auto overflow-y-visible pb-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E1 #F1F5F9'
            }}
          >
            {/* Container flex avec largeur minimale calculée dynamiquement */}
            <div 
              className="flex space-x-2 sm:space-x-3 lg:space-x-4"
              style={{
                minWidth: `${columns.length * 280}px`,
                width: 'max-content'
              }}
            >
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

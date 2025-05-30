
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold">Processus de Recrutement</h3>
        <Button
          variant="outline"
          onClick={() => setShowStageManager(true)}
          size="sm"
        >
          <Settings className="h-4 w-4 mr-2" />
          Gérer les étapes
        </Button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-full border rounded-lg bg-gray-50 p-4">
          <ScrollArea className="w-full">
            <div className="flex space-x-4 min-w-max pb-4">
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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

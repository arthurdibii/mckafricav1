
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface PipelineStage {
  id: string;
  title: string;
  candidateCount: number;
}

interface SortableStageProps {
  stage: PipelineStage;
  onDelete: (id: string) => void;
  canDelete: boolean;
}

const SortableStage = ({ stage, onDelete, canDelete }: SortableStageProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-shrink-0 w-72 sm:w-80 bg-white border rounded-lg p-4 relative group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded shrink-0"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-700 truncate">{stage.title}</h3>
          <Badge variant="secondary" className="text-xs shrink-0">
            {stage.candidateCount}
          </Badge>
        </div>
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(stage.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

interface PipelineStageManagerProps {
  initialStages: PipelineStage[];
  onStagesChange: (stages: PipelineStage[]) => void;
}

const PipelineStageManager = ({ initialStages, onStagesChange }: PipelineStageManagerProps) => {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [newStageName, setNewStageName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = stages.findIndex((stage) => stage.id === active.id);
      const newIndex = stages.findIndex((stage) => stage.id === over?.id);

      const newStages = [...stages];
      const [movedStage] = newStages.splice(oldIndex, 1);
      newStages.splice(newIndex, 0, movedStage);

      setStages(newStages);
      onStagesChange(newStages);
    }
  };

  const handleAddStage = () => {
    if (newStageName.trim()) {
      const newStage: PipelineStage = {
        id: `stage-${Date.now()}`,
        title: newStageName.trim(),
        candidateCount: 0,
      };
      const newStages = [...stages, newStage];
      setStages(newStages);
      onStagesChange(newStages);
      setNewStageName('');
      setIsAdding(false);
    }
  };

  const handleDeleteStage = (stageId: string) => {
    if (stages.length <= 2) {
      alert('Vous devez avoir au moins 2 étapes dans votre pipeline.');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette étape ?')) {
      const newStages = stages.filter(stage => stage.id !== stageId);
      setStages(newStages);
      onStagesChange(newStages);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold">Configuration du Pipeline</h3>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          className="bg-mck-blue-500 hover:bg-mck-blue-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          Ajouter une étape
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="w-full border rounded-lg bg-gray-50 p-4">
          <ScrollArea className="w-full">
            <div className="flex space-x-4 min-w-max pb-4">
              <SortableContext items={stages.map(s => s.id)} strategy={horizontalListSortingStrategy}>
                {stages.map((stage) => (
                  <SortableStage
                    key={stage.id}
                    stage={stage}
                    onDelete={handleDeleteStage}
                    canDelete={stages.length > 2}
                  />
                ))}
              </SortableContext>

              {isAdding && (
                <div className="flex-shrink-0 w-72 sm:w-80 bg-white border-2 border-dashed border-mck-blue-300 rounded-lg p-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Nom de la nouvelle étape"
                      value={newStageName}
                      onChange={(e) => setNewStageName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddStage()}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleAddStage}>
                        Ajouter
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsAdding(false);
                          setNewStageName('');
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </DndContext>
    </div>
  );
};

export default PipelineStageManager;

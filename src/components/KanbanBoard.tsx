import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
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
import { Star, Eye, MessageSquare } from 'lucide-react';
import DropZone from './DropZone';
import { useNotifications } from '@/hooks/useNotifications';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  notes: string;
  stage: string;
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
            <h4 className="font-medium text-sm">{candidate.name}</h4>
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
          stage: 'nouvelles'
        },
        {
          id: '2',
          name: 'Marie Diabaté',
          email: 'm.diabate@email.com',
          phone: '+225 05 67 89 01',
          score: 0,
          notes: '',
          stage: 'nouvelles'
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
          stage: 'preselection'
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
          stage: 'entretien-rh'
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
          stage: 'entretien-technique'
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const candidate = findCandidate(active.id as string);
    setActiveCandidate(candidate);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let targetColumnId = overId;
    if (!columns.find(col => col.id === overId)) {
      const candidate = findCandidate(overId);
      if (candidate) {
        targetColumnId = candidate.stage;
      }
    }

    const activeCandidate = findCandidate(activeId);
    if (!activeCandidate) return;

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
        const newColumns = [...prevColumns];
        
        const sourceCol = newColumns.find(col => col.id === sourceColumnId);
        if (sourceCol) {
          sourceCol.candidates = sourceCol.candidates.filter(c => c.id !== activeId);
        }
        
        const targetCol = newColumns.find(col => col.id === targetColumnId);
        if (targetCol) {
          const updatedCandidate = { ...activeCandidate, stage: targetColumnId };
          targetCol.candidates.push(updatedCandidate);
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

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
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

      <DragOverlay>
        {activeCandidate ? (
          <CandidateCard candidate={activeCandidate} onViewDetails={() => {}} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;

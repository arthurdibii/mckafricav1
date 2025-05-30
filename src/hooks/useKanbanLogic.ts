
import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
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

const initialColumns: KanbanColumn[] = [
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
];

export const useKanbanLogic = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const { notifyStageChange } = useNotifications();

  const calculateRanking = (candidates: Candidate[]): Candidate[] => {
    return candidates
      .sort((a, b) => b.score - a.score)
      .map((candidate, index) => ({
        ...candidate,
        ranking: index + 1
      }));
  };

  const findCandidate = (id: string): Candidate | undefined => {
    for (const column of columns) {
      const candidate = column.candidates.find(c => c.id === id);
      if (candidate) return candidate;
    }
    return undefined;
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
        
        const sourceCol = newColumns.find(col => col.id === sourceColumnId);
        if (sourceCol) {
          sourceCol.candidates = sourceCol.candidates.filter(c => c.id !== activeId);
          sourceCol.candidates = calculateRanking(sourceCol.candidates);
        }
        
        const targetCol = newColumns.find(col => col.id === targetColumnId);
        if (targetCol) {
          const updatedCandidate = { ...activeCandidate, stage: targetColumnId };
          targetCol.candidates.push(updatedCandidate);
          targetCol.candidates = calculateRanking(targetCol.candidates);
        }
        
        return newColumns;
      });
    }

    setActiveCandidate(null);
  };

  const handleStagesChange = (newStages: any[]) => {
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

  return {
    columns,
    activeCandidate,
    handleDragStart,
    handleDragEnd,
    handleStagesChange,
  };
};

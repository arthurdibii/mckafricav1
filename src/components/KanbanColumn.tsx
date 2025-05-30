
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DropZone from './DropZone';
import CandidateCard from './CandidateCard';

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

interface KanbanColumnProps {
  id: string;
  title: string;
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}

const KanbanColumn = ({ id, title, candidates, onCandidateClick }: KanbanColumnProps) => {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center justify-between">
            <span className="truncate mr-2">{title}</span>
            <Badge variant="secondary" className="text-xs shrink-0">
              {candidates.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <DropZone id={id}>
            <SortableContext
              items={candidates.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 min-h-[200px]">
                {candidates.map((candidate) => (
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
  );
};

export default KanbanColumn;

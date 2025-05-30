
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
    <div className="flex-shrink-0 w-64 sm:w-72 lg:w-80 xl:w-84">
      <Card className="h-full">
        <CardHeader className="pb-3 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-sm sm:text-base font-medium text-gray-700 flex items-center justify-between">
            <span className="truncate mr-2 leading-tight">{title}</span>
            <Badge variant="secondary" className="text-xs shrink-0 px-2 py-1">
              {candidates.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
          <DropZone id={id}>
            <SortableContext
              items={candidates.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 sm:space-y-3 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
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

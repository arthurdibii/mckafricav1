
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Eye, MessageSquare, Medal } from 'lucide-react';

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
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
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
      className="cursor-grab active:cursor-grabbing touch-manipulation"
    >
      <Card className={`mb-2 sm:mb-3 hover:shadow-md transition-all duration-200 bg-white ${isDragging ? 'rotate-2 scale-105' : ''} border border-gray-200`}>
        <CardContent className="p-3 sm:p-4">
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
              <h4 className="font-medium text-sm sm:text-base truncate flex-1">{candidate.name}</h4>
              {candidate.ranking && (
                <Badge className={`text-xs px-1 sm:px-1.5 py-0.5 shrink-0 ${getRankingColor(candidate.ranking)}`}>
                  <Medal className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
                  {candidate.ranking}
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
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 shrink-0 hover:bg-gray-100"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{candidate.email}</p>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
              {renderStars(candidate.score)}
            </div>
            {candidate.notes && (
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 shrink-0" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateCard;

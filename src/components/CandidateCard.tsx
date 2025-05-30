
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

export default CandidateCard;

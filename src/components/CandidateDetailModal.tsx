
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText,
  Star,
  User
} from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentTitle: string;
  skills: string[];
  availability: string;
  location: string;
  experience: number;
  appliedJobs: string[];
  score: number;
}

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
}

const CandidateDetailModal = ({ candidate, onClose }: CandidateDetailModalProps) => {
  if (!candidate) return null;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(score) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Données simulées des évaluations
  const evaluations = [
    {
      id: '1',
      interviewType: 'Entretien RH',
      date: '2024-01-15',
      evaluators: [
        {
          name: 'Marie Kouassi',
          role: 'RH Manager',
          scores: {
            'Communication': 4,
            'Motivation': 5,
            'Culture Fit': 4
          },
          comments: 'Candidat très motivé avec une excellente communication.'
        }
      ]
    },
    {
      id: '2',
      interviewType: 'Entretien Technique',
      date: '2024-01-18',
      evaluators: [
        {
          name: 'Jean Diabaté',
          role: 'Tech Lead',
          scores: {
            'Compétences Techniques': 5,
            'Problem Solving': 4,
            'Architecture': 4
          },
          comments: 'Solides compétences techniques, bonne approche des problèmes.'
        },
        {
          name: 'Sarah Bamba',
          role: 'Senior Developer',
          scores: {
            'Code Quality': 4,
            'Best Practices': 5,
            'Collaboration': 4
          },
          comments: 'Code propre et respect des bonnes pratiques.'
        }
      ]
    }
  ];

  return (
    <Dialog open={!!candidate} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profil du Candidat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* En-tête du profil */}
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-mck-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {getInitials(candidate.firstName, candidate.lastName)}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p className="text-lg text-mck-blue-600 font-medium mb-2">
                {candidate.currentTitle}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {candidate.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {candidate.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {candidate.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {candidate.experience} ans d'expérience
                </div>
              </div>
              
              <div className="flex items-center mt-3">
                <span className="mr-2 text-sm font-medium">Score global:</span>
                <div className="flex items-center space-x-1">
                  {renderStars(candidate.score)}
                  <span className="ml-2 text-sm font-medium">{candidate.score}/5</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                <FileText className="h-4 w-4 mr-2" />
                Télécharger CV
              </Button>
              <div className="text-sm text-gray-600">
                Disponibilité: <span className="font-medium">{candidate.availability}</span>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill} className="bg-mck-green-100 text-mck-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Offres postulées */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Offres postulées</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.appliedJobs.map((job) => (
                <Badge key={job} variant="outline" className="border-mck-blue-500 text-mck-blue-600">
                  {job}
                </Badge>
              ))}
            </div>
          </div>

          {/* Évaluations des entretiens */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Évaluations des Entretiens</h3>
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div key={evaluation.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">{evaluation.interviewType}</h4>
                    <span className="text-sm text-gray-600">{evaluation.date}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {evaluation.evaluators.map((evaluator, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <User className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="font-medium">{evaluator.name}</span>
                          <span className="text-sm text-gray-600 ml-2">({evaluator.role})</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          {Object.entries(evaluator.scores).map(([criterion, score]) => (
                            <div key={criterion} className="flex justify-between items-center">
                              <span className="text-sm">{criterion}:</span>
                              <div className="flex items-center">
                                {renderStars(score)}
                                <span className="ml-1 text-sm">{score}/5</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-sm text-gray-700 italic">
                          "{evaluator.comments}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div className="space-x-2">
              <Button variant="outline">
                Planifier entretien
              </Button>
              <Button variant="outline">
                Envoyer email
              </Button>
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Ajouter au pipeline
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailModal;

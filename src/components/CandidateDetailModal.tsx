
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText,
  Star,
  User,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

interface EvaluationAxis {
  name: string;
  score: number;
  comment: string;
}

interface Evaluator {
  id: string;
  name: string;
  role: string;
  coefficient: number;
  globalScore: number;
  comment: string;
  axes: EvaluationAxis[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  notes: string;
  stage: string;
  ranking?: number;
  globalScore?: number;
  evaluators?: Evaluator[];
}

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
}

const CandidateDetailModal = ({ candidate, onClose }: CandidateDetailModalProps) => {
  const [expandedEvaluator, setExpandedEvaluator] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{evaluatorId: string, axisName: string} | null>(null);
  const [tempComment, setTempComment] = useState('');

  if (!candidate) return null;

  // Données simulées des évaluateurs
  const evaluators: Evaluator[] = candidate.evaluators || [
    {
      id: 'eval1',
      name: 'Marie Kouassi',
      role: 'RH Manager',
      coefficient: 2,
      globalScore: 4.2,
      comment: 'Candidat très prometteur avec une excellente motivation',
      axes: [
        { name: 'Communication', score: 4, comment: 'Très bonne expression orale et écrite' },
        { name: 'Motivation', score: 5, comment: 'Motivation exceptionnelle pour le poste' },
        { name: 'Culture Fit', score: 4, comment: 'Bonne adéquation avec nos valeurs' },
        { name: 'Leadership', score: 3, comment: 'Potentiel de leadership à développer' }
      ]
    },
    {
      id: 'eval2',
      name: 'Jean Diabaté',
      role: 'Tech Lead',
      coefficient: 3,
      globalScore: 4.5,
      comment: 'Excellentes compétences techniques',
      axes: [
        { name: 'Compétences Techniques', score: 5, comment: 'Maîtrise parfaite des technologies requises' },
        { name: 'Problem Solving', score: 4, comment: 'Bonne approche analytique des problèmes' },
        { name: 'Architecture', score: 4, comment: 'Solide compréhension des principes architecturaux' },
        { name: 'Innovation', score: 5, comment: 'Propose des solutions créatives' }
      ]
    },
    {
      id: 'eval3',
      name: 'Sarah Bamba',
      role: 'Senior Developer',
      coefficient: 2,
      globalScore: 4.0,
      comment: 'Bon profil technique avec de bonnes pratiques',
      axes: [
        { name: 'Code Quality', score: 4, comment: 'Code propre et bien structuré' },
        { name: 'Best Practices', score: 5, comment: 'Excellent respect des bonnes pratiques' },
        { name: 'Collaboration', score: 4, comment: 'Travaille bien en équipe' },
        { name: 'Mentorat', score: 3, comment: 'Capacité de transmission à améliorer' }
      ]
    }
  ];

  // Calcul de la note globale pondérée
  const calculateWeightedScore = () => {
    const totalWeight = evaluators.reduce((sum, evaluator) => sum + evaluator.coefficient, 0);
    const weightedSum = evaluators.reduce((sum, evaluator) => sum + (evaluator.globalScore * evaluator.coefficient), 0);
    return (weightedSum / totalWeight).toFixed(1);
  };

  const renderStars = (score: number, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClass} ${
          i < Math.floor(score) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleCommentEdit = (evaluatorId: string, axisName: string, currentComment: string) => {
    setEditingComment({ evaluatorId, axisName });
    setTempComment(currentComment);
  };

  const handleCommentSave = () => {
    // Ici on sauvegarderait le commentaire
    console.log('Sauvegarde commentaire:', editingComment, tempComment);
    setEditingComment(null);
    setTempComment('');
  };

  const toggleEvaluator = (evaluatorId: string) => {
    setExpandedEvaluator(expandedEvaluator === evaluatorId ? null : evaluatorId);
  };

  return (
    <Dialog open={!!candidate} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profil du Candidat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* En-tête du profil */}
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-mck-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {candidate.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {candidate.name}
              </h2>
              <p className="text-lg text-mck-blue-600 font-medium mb-2">
                Candidat - {candidate.stage.replace('-', ' ').toUpperCase()}
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
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                <FileText className="h-4 w-4 mr-2" />
                Télécharger CV
              </Button>
            </div>
          </div>

          {/* Note Globale */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Note Globale Pondérée
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-mck-blue-600">
                {calculateWeightedScore()}/5
              </div>
              <div className="flex items-center">
                {renderStars(parseFloat(calculateWeightedScore()))}
              </div>
              <div className="text-sm text-gray-600">
                Basée sur {evaluators.length} évaluations
              </div>
            </div>
          </div>

          {/* Évaluations détaillées */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Évaluations par Membre</h3>
            <div className="space-y-3">
              {evaluators.map((evaluator) => (
                <div key={evaluator.id} className="border rounded-lg">
                  {/* En-tête évaluateur */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleEvaluator(evaluator.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">{evaluator.name}</div>
                          <div className="text-sm text-gray-600">{evaluator.role}</div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          Coeff. {evaluator.coefficient}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">{evaluator.globalScore}/5</div>
                          <div className="flex items-center space-x-1">
                            {renderStars(evaluator.globalScore, 'sm')}
                          </div>
                        </div>
                        {expandedEvaluator === evaluator.id ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-700 italic">
                      "{evaluator.comment}"
                    </div>
                  </div>

                  {/* Détails des axes d'évaluation */}
                  {expandedEvaluator === evaluator.id && (
                    <div className="border-t bg-gray-50 p-4">
                      <h5 className="font-medium mb-3">Évaluation par Axes</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {evaluator.axes.map((axis, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-sm">{axis.name}</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(axis.score, 'sm')}
                                <span className="text-sm ml-1">{axis.score}/5</span>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-600">
                              {editingComment?.evaluatorId === evaluator.id && 
                               editingComment?.axisName === axis.name ? (
                                <div className="space-y-2">
                                  <Textarea
                                    value={tempComment}
                                    onChange={(e) => setTempComment(e.target.value)}
                                    className="text-xs min-h-[60px]"
                                    placeholder="Commentaire sur cette évaluation..."
                                  />
                                  <div className="flex space-x-2">
                                    <Button size="sm" onClick={handleCommentSave}>
                                      Sauvegarder
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => setEditingComment(null)}
                                    >
                                      Annuler
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                                  onClick={() => handleCommentEdit(evaluator.id, axis.name, axis.comment)}
                                >
                                  {axis.comment || "Cliquez pour ajouter un commentaire"}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Recruiter {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  coefficient?: number;
}

interface AssignRecruiterModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (recruiterId: string, coefficient: number, notes: string) => void;
  jobTitle: string;
  currentRecruiters: Recruiter[];
}

const AssignRecruiterModal = ({ 
  open, 
  onClose, 
  onAssign, 
  jobTitle, 
  currentRecruiters 
}: AssignRecruiterModalProps) => {
  const [selectedRecruiterId, setSelectedRecruiterId] = useState('');
  const [coefficient, setCoefficient] = useState(1);
  const [notes, setNotes] = useState('');

  // Données simulées des recruteurs disponibles
  const availableRecruiters: Recruiter[] = [
    {
      id: '1',
      name: 'Marie Kouassi',
      email: 'marie.kouassi@mckafrica.com',
      specialties: ['Finance', 'Executive Search'],
      coefficient: 1.2
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      email: 'jean.baptiste@mckafrica.com',
      specialties: ['Technology', 'Engineering'],
      coefficient: 1.0
    },
    {
      id: '3',
      name: 'Fatou Diallo',
      email: 'fatou.diallo@mckafrica.com',
      specialties: ['HR', 'Operations'],
      coefficient: 0.8
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecruiterId && coefficient > 0) {
      onAssign(selectedRecruiterId, coefficient, notes);
      setSelectedRecruiterId('');
      setCoefficient(1);
      setNotes('');
    }
  };

  const handleRecruiterChange = (recruiterId: string) => {
    setSelectedRecruiterId(recruiterId);
    const recruiter = availableRecruiters.find(r => r.id === recruiterId);
    if (recruiter && recruiter.coefficient) {
      setCoefficient(recruiter.coefficient);
    }
  };

  const removeRecruiter = (recruiterId: string) => {
    // Cette fonction sera gérée par le parent
    console.log('Remove recruiter:', recruiterId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Affecter un recruteur - {jobTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Recruteurs actuellement affectés */}
          {currentRecruiters.length > 0 && (
            <div>
              <Label className="text-base font-medium">Recruteurs affectés</Label>
              <div className="space-y-2 mt-2">
                {currentRecruiters.map((recruiter) => (
                  <div key={recruiter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{recruiter.name}</div>
                      <div className="text-sm text-black">{recruiter.email}</div>
                      <div className="flex gap-1 mt-1">
                        {recruiter.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {recruiter.coefficient && (
                          <Badge variant="outline" className="text-xs">
                            Coeff. {recruiter.coefficient}x
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRecruiter(recruiter.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulaire d'affectation */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recruiter">Ajouter un recruteur</Label>
              <Select value={selectedRecruiterId} onValueChange={handleRecruiterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un recruteur" />
                </SelectTrigger>
                <SelectContent>
                  {availableRecruiters
                    .filter(r => !currentRecruiters.find(cr => cr.id === r.id))
                    .map((recruiter) => (
                    <SelectItem key={recruiter.id} value={recruiter.id}>
                      <div className="flex flex-col">
                        <span>{recruiter.name}</span>
                        <span className="text-xs text-black">
                          {recruiter.specialties.join(', ')} • Coeff. {recruiter.coefficient}x
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="coefficient">Coefficient de recrutement</Label>
              <Input
                id="coefficient"
                type="number"
                step="0.1"
                min="0.1"
                value={coefficient}
                onChange={(e) => setCoefficient(parseFloat(e.target.value) || 1)}
                required
              />
              <p className="text-xs text-black mt-1">
                Coefficient appliqué aux performances pour cette affectation
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Notes d'affectation</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instructions particulières, priorités, objectifs..."
                className="min-h-[80px]"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-mck-blue-500 hover:bg-mck-blue-600"
                disabled={!selectedRecruiterId || coefficient <= 0}
              >
                Affecter le recruteur
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignRecruiterModal;


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
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Recruiter {
  id: string;
  name: string;
  email: string;
  specialties: string[];
}

interface AssignRecruiterModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (recruiterId: string, notes: string) => void;
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
  const [notes, setNotes] = useState('');

  // Données simulées des recruteurs disponibles
  const availableRecruiters: Recruiter[] = [
    {
      id: '1',
      name: 'Marie Kouassi',
      email: 'marie.kouassi@mckafrica.com',
      specialties: ['Finance', 'Executive Search']
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      email: 'jean.baptiste@mckafrica.com',
      specialties: ['Technology', 'Engineering']
    },
    {
      id: '3',
      name: 'Fatou Diallo',
      email: 'fatou.diallo@mckafrica.com',
      specialties: ['HR', 'Operations']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecruiterId) {
      onAssign(selectedRecruiterId, notes);
      setSelectedRecruiterId('');
      setNotes('');
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
                      <div className="text-sm text-gray-600">{recruiter.email}</div>
                      <div className="flex gap-1 mt-1">
                        {recruiter.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
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
              <Select value={selectedRecruiterId} onValueChange={setSelectedRecruiterId}>
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
                        <span className="text-xs text-gray-500">
                          {recruiter.specialties.join(', ')}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!selectedRecruiterId}
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

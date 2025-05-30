
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Candidate {
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

interface CreateCandidateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (candidate: Candidate) => void;
  availableSkills: string[];
}

const CreateCandidateModal = ({ open, onClose, onSubmit, availableSkills }: CreateCandidateModalProps) => {
  const [formData, setFormData] = useState<Candidate>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentTitle: '',
    skills: [],
    availability: '',
    location: '',
    experience: 0,
    appliedJobs: [],
    score: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      currentTitle: '',
      skills: [],
      availability: '',
      location: '',
      experience: 0,
      appliedJobs: [],
      score: 0
    });
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ 
      ...formData, 
      skills: formData.skills.filter(s => s !== skill) 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer un nouveau candidat</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currentTitle">Poste actuel</Label>
            <Input
              id="currentTitle"
              required
              value={formData.currentTitle}
              onChange={(e) => setFormData({ ...formData, currentTitle: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="experience">Années d'expérience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label>Disponibilité</Label>
            <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immédiate">Immédiate</SelectItem>
                <SelectItem value="Sous 1 mois">Sous 1 mois</SelectItem>
                <SelectItem value="Sous 3 mois">Sous 3 mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Compétences</Label>
            <Select onValueChange={addSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Ajouter une compétence" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.filter(skill => !formData.skills.includes(skill)).map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} className="bg-mck-blue-500 text-white">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-mck-blue-500 hover:bg-mck-blue-600">
              Créer le candidat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCandidateModal;

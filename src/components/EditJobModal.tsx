
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  contractType: string;
  requiredSkills: string[];
  responsibilities: string;
  profile: string;
  salary: string;
  experience: string;
}

interface EditJobModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (job: Job) => void;
  availableSkills: string[];
  job: Job | null;
}

const EditJobModal = ({ open, onClose, onSubmit, availableSkills, job }: EditJobModalProps) => {
  const [formData, setFormData] = useState<Job>({
    id: '',
    title: '',
    description: '',
    location: '',
    contractType: '',
    requiredSkills: [],
    responsibilities: '',
    profile: '',
    salary: '',
    experience: ''
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSkill = (skill: string) => {
    if (!formData.requiredSkills.includes(skill)) {
      setFormData({ ...formData, requiredSkills: [...formData.requiredSkills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ 
      ...formData, 
      requiredSkills: formData.requiredSkills.filter(s => s !== skill) 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'offre d'emploi</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre du poste</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type de contrat</Label>
              <Select value={formData.contractType} onValueChange={(value) => setFormData({ ...formData, contractType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Expérience requise</Label>
              <Input
                id="experience"
                placeholder="Ex: 3-5 ans"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="salary">Salaire</Label>
            <Input
              id="salary"
              placeholder="Ex: 80 000 - 120 000 €"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description du poste</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="responsibilities">Responsabilités</Label>
            <Textarea
              id="responsibilities"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="profile">Profil recherché</Label>
            <Textarea
              id="profile"
              value={formData.profile}
              onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label>Compétences requises</Label>
            <Select onValueChange={addSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Ajouter une compétence" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.filter(skill => !formData.requiredSkills.includes(skill)).map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requiredSkills.map((skill) => (
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
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;

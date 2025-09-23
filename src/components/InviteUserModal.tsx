
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string, role: string, coefficient: number, notes: string) => void;
}

const InviteUserModal = ({ 
  open, 
  onClose, 
  onInvite
}: InviteUserModalProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Recruteur');
  const [coefficient, setCoefficient] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && coefficient > 0) {
      onInvite(email, role, coefficient, notes);
      setEmail('');
      setRole('Recruteur');
      setCoefficient(1);
      setNotes('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Inviter un utilisateur</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="utilisateur@mckafrica.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Rôle</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex: Recruteur Senior, Consultant RH..."
              required
            />
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
              Coefficient appliqué aux performances de recrutement (ex: 1.2 pour +20%)
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Spécialités, instructions particulières..."
              className="min-h-[60px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-mck-blue-500 hover:bg-mck-blue-600"
              disabled={!email || coefficient <= 0}
            >
              Envoyer l'invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;

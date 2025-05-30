
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import InviteUserModal from './InviteUserModal';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  coefficient: number;
  status: 'active' | 'pending';
}

const TeamManagement = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Marie Diabaté',
      email: 'm.diabate@mckafrica.com',
      role: 'Recruteur Senior',
      coefficient: 1.2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Amadou Traoré',
      email: 'a.traore@mckafrica.com',
      role: 'Recruteur',
      coefficient: 1.0,
      status: 'active'
    },
    {
      id: '3',
      name: 'Fatou Bamba',
      email: 'f.bamba@mckafrica.com',
      role: 'Consultant RH',
      coefficient: 0.8,
      status: 'active'
    }
  ]);

  const handleInvite = (email: string, role: string, coefficient: number, notes: string) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      coefficient,
      status: 'pending'
    };
    setTeamMembers([...teamMembers, newMember]);
    console.log('Invitation envoyée avec notes:', notes);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestion de l'Équipe</h3>
          <p className="text-gray-600">Gérez les membres de votre équipe et leurs coefficients</p>
        </div>
        <Button 
          onClick={() => setInviteModalOpen(true)}
          className="bg-mck-blue-500 hover:bg-mck-blue-600"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Inviter un utilisateur
        </Button>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-mck-blue-100 text-mck-blue-600">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{member.name}</h4>
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                        className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {member.status === 'active' ? 'Actif' : 'En attente'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">{member.role}</span>
                      <Badge variant="outline" className="text-xs">
                        Coeff. {member.coefficient}x
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <InviteUserModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
};

export default TeamManagement;

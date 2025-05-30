
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Settings2,
  Bell,
  Users,
  Workflow,
  Save
} from 'lucide-react';

const AdminSettings = () => {
  // État du profil utilisateur
  const [userProfile, setUserProfile] = useState({
    firstName: 'Jean',
    lastName: 'Kouassi',
    email: 'j.kouassi@mckafrica.com',
    phone: '+225 01 23 45 67',
    role: 'Administrateur'
  });

  // État des utilisateurs de l'équipe
  const [teamUsers, setTeamUsers] = useState([
    { id: '1', name: 'Marie Diabaté', email: 'm.diabate@mckafrica.com', role: 'Recruteur Senior' },
    { id: '2', name: 'Amadou Traoré', email: 'a.traore@mckafrica.com', role: 'Recruteur' },
    { id: '3', name: 'Fatou Bamba', email: 'f.bamba@mckafrica.com', role: 'Consultant RH' }
  ]);

  // État des étapes du pipeline
  const [pipelineStages, setPipelineStages] = useState([
    'Nouvelles Candidatures',
    'Présélection',
    'Entretien RH',
    'Entretien Technique',
    'Offre Faite',
    'Recruté',
    'Rejeté'
  ]);

  // État des notifications
  const [notificationSettings, setNotificationSettings] = useState({
    newCandidate: true,
    candidateMoved: true,
    interviewScheduled: true,
    offerAccepted: false,
    weeklyReport: true
  });

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newInvite, setNewInvite] = useState({ email: '', role: '' });

  const handleSaveProfile = () => {
    console.log('Profil sauvegardé:', userProfile);
    // Simulation de la sauvegarde
  };

  const handleInviteUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: newInvite.email.split('@')[0], // Nom temporaire basé sur l'email
      email: newInvite.email,
      role: newInvite.role
    };
    setTeamUsers([...teamUsers, newUser]);
    setNewInvite({ email: '', role: '' });
    setShowInviteModal(false);
  };

  const handleRemoveUser = (userId: string) => {
    setTeamUsers(teamUsers.filter(user => user.id !== userId));
  };

  const addPipelineStage = () => {
    const stageName = prompt('Nom de la nouvelle étape:');
    if (stageName && !pipelineStages.includes(stageName)) {
      setPipelineStages([...pipelineStages, stageName]);
    }
  };

  const removePipelineStage = (stage: string) => {
    setPipelineStages(pipelineStages.filter(s => s !== stage));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Paramètres
          </h2>
          <p className="text-gray-600">
            Gérez votre profil et les paramètres de l'application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gestion du Profil Utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profil Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-mck-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={userProfile.firstName}
                    onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={userProfile.lastName}
                    onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={userProfile.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full bg-mck-blue-500 hover:bg-mck-blue-600">
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Nouveau candidat</div>
                    <div className="text-sm text-gray-600">Recevoir une notification pour chaque nouvelle candidature</div>
                  </div>
                  <Switch
                    checked={notificationSettings.newCandidate}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, newCandidate: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Candidat déplacé</div>
                    <div className="text-sm text-gray-600">Notification lors du changement d'étape d'un candidat</div>
                  </div>
                  <Switch
                    checked={notificationSettings.candidateMoved}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, candidateMoved: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Entretien planifié</div>
                    <div className="text-sm text-gray-600">Rappel des entretiens programmés</div>
                  </div>
                  <Switch
                    checked={notificationSettings.interviewScheduled}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, interviewScheduled: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rapport hebdomadaire</div>
                    <div className="text-sm text-gray-600">Résumé des activités de la semaine</div>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, weeklyReport: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gestion de l'Équipe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Gestion de l'Équipe
              </div>
              <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
                <DialogTrigger asChild>
                  <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Inviter un utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter un nouvel utilisateur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="inviteEmail">Email</Label>
                      <Input
                        id="inviteEmail"
                        type="email"
                        value={newInvite.email}
                        onChange={(e) => setNewInvite({...newInvite, email: e.target.value})}
                        placeholder="utilisateur@mckafrica.com"
                      />
                    </div>
                    <div>
                      <Label>Rôle</Label>
                      <Select value={newInvite.role} onValueChange={(role) => setNewInvite({...newInvite, role})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Recruteur">Recruteur</SelectItem>
                          <SelectItem value="Recruteur Senior">Recruteur Senior</SelectItem>
                          <SelectItem value="Consultant RH">Consultant RH</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleInviteUser} className="bg-mck-blue-500 hover:bg-mck-blue-600">
                        Envoyer l'invitation
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-mck-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {user.name.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                    <Badge variant="outline">{user.role}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Paramètres du Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Workflow className="h-5 w-5 mr-2" />
                Pipeline de Recrutement
              </div>
              <Button onClick={addPipelineStage} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une étape
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pipelineStages.map((stage, index) => (
                <div key={stage} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-mck-blue-100 text-mck-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{stage}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    {pipelineStages.length > 3 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removePipelineStage(stage)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import TeamManagement from '@/components/TeamManagement';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Paramètres Administrateur
          </h2>
          <p className="text-gray-600">
            Gérez les paramètres de votre plateforme de recrutement
          </p>
        </div>

        {/* Gestion de l'équipe */}
        <Card>
          <CardContent className="p-6">
            <TeamManagement />
          </CardContent>
        </Card>

        {/* Paramètres de l'entreprise */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'Entreprise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input
                  id="company-name"
                  defaultValue="McK Africa"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              <div>
                <Label htmlFor="company-email">Email principal</Label>
                <Input
                  id="company-email"
                  type="email"
                  defaultValue="contact@mckafrica.com"
                  placeholder="contact@entreprise.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company-description">Description</Label>
              <Textarea
                id="company-description"
                placeholder="Description de votre entreprise..."
                className="min-h-[100px]"
                defaultValue="McK Africa est un cabinet de conseil en ressources humaines spécialisé dans le recrutement de talents en Afrique."
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres des notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications email pour nouvelles candidatures</Label>
                <p className="text-sm text-gray-500">Recevoir un email à chaque nouvelle candidature</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications email quotidiennes</Label>
                <p className="text-sm text-gray-500">Résumé quotidien des activités</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications pour nouveaux commentaires</Label>
                <p className="text-sm text-gray-500">Être notifié des nouveaux commentaires sur les candidatures</p>
              </div>
              <Switch />
            </div>
            <div className="flex justify-end">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres du pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration du Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pipeline-stages">Étapes du pipeline (une par ligne)</Label>
              <Textarea
                id="pipeline-stages"
                placeholder="Candidature reçue&#10;Présélection&#10;Entretien téléphonique&#10;Entretien technique&#10;Entretien final&#10;Accepté&#10;Rejeté"
                className="min-h-[150px]"
                defaultValue="Candidature reçue&#10;Présélection&#10;Entretien téléphonique&#10;Entretien technique&#10;Entretien final&#10;Accepté&#10;Rejeté"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Archivage automatique des candidatures rejetées</Label>
                <p className="text-sm text-gray-500">Archiver automatiquement après 30 jours</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-end">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de sécurité */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité et Accès</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Authentification à deux facteurs obligatoire</Label>
                <p className="text-sm text-gray-500">Exiger la 2FA pour tous les utilisateurs</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session automatique expirée</Label>
                <p className="text-sm text-gray-500">Déconnexion automatique après inactivité</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="session-timeout">Durée de session (en heures)</Label>
              <Input
                id="session-timeout"
                type="number"
                defaultValue="8"
                className="w-32"
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres d'intégration */}
        <Card>
          <CardHeader>
            <CardTitle>Intégrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="linkedin-integration">LinkedIn Recruiter</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="linkedin-integration"
                  placeholder="Clé API LinkedIn"
                  type="password"
                />
                <Button variant="outline">Tester</Button>
              </div>
            </div>
            <div>
              <Label htmlFor="slack-webhook">Webhook Slack</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="slack-webhook"
                  placeholder="URL du webhook Slack"
                />
                <Button variant="outline">Tester</Button>
              </div>
            </div>
            <div>
              <Label htmlFor="email-service">Service Email (SMTP)</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input placeholder="Serveur SMTP" />
                <Input placeholder="Port" type="number" />
                <Input placeholder="Nom d'utilisateur" />
                <Input placeholder="Mot de passe" type="password" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres avancés */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres Avancés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Mode de débogage</Label>
                <p className="text-sm text-gray-500">Activer les logs détaillés (développement uniquement)</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Sauvegarde automatique</Label>
                <p className="text-sm text-gray-500">Sauvegarde quotidienne des données</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="data-retention">Rétention des données (en mois)</Label>
              <Input
                id="data-retention"
                type="number"
                defaultValue="24"
                className="w-32"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Exporter les données</Button>
              <Button className="bg-mck-blue-500 hover:bg-mck-blue-600">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

        {/* Autres paramètres */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres Généraux</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Autres paramètres de configuration à venir...
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

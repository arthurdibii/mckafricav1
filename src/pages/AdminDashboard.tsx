
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Clock, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  // Données simulées pour les statistiques
  const stats = [
    {
      title: 'Offres Actives',
      value: '12',
      icon: FileText,
      change: '+2 cette semaine',
      color: 'text-mck-blue-600'
    },
    {
      title: 'Total Candidats',
      value: '248',
      icon: Users,
      change: '+15 ce mois',
      color: 'text-green-600'
    },
    {
      title: 'En Attente d\'Évaluation',
      value: '34',
      icon: Clock,
      change: '8 urgents',
      color: 'text-orange-600'
    },
    {
      title: 'Taux de Conversion',
      value: '23%',
      icon: TrendingUp,
      change: '+5% vs mois dernier',
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    { action: 'Nouvelle candidature', job: 'Directeur Financier', time: 'Il y a 2h' },
    { action: 'Entretien planifié', job: 'Head of Technology', time: 'Il y a 4h' },
    { action: 'Offre acceptée', job: 'Responsable Développement Durable', time: 'Il y a 1 jour' },
    { action: 'Nouvelle offre créée', job: 'Consultant Senior', time: 'Il y a 2 jours' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord
          </h2>
          <p className="text-gray-600">
            Vue d'ensemble de vos activités de recrutement
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activité Récente */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-mck-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.job}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Offres Populaires */}
          <Card>
            <CardHeader>
              <CardTitle>Offres les Plus Actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Directeur Financier</p>
                    <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    45 candidats
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Head of Technology</p>
                    <p className="text-sm text-gray-500">Le Cap, Afrique du Sud</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    32 candidats
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Consultant Senior</p>
                    <p className="text-sm text-gray-500">Abidjan, Côte d'Ivoire</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                    28 candidats
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

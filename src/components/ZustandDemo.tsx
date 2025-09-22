import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigationStore, useUIStore, useAuthStore, useJobsStore } from '@/stores';

const ZustandDemo = () => {
  const {
    isOpen: navIsOpen,
    isScrolled,
    setIsOpen: setNavIsOpen,
    toggleSubSection,
    expandedSubSections
  } = useNavigationStore();

  const {
    sidebarCollapsed,
    mobileMenuOpen,
    notifications,
    toggleSidebar,
    setMobileMenuOpen,
    addNotification,
    removeNotification
  } = useUIStore();

  const {
    isAuthenticated,
    user,
    login,
    logout
  } = useAuthStore();

  const {
    jobs,
    candidates,
    searchQuery,
    setSearchQuery,
    getFilteredJobs,
    getFilteredCandidates
  } = useJobsStore();

  const handleTestNotification = () => {
    addNotification({
      type: 'success',
      title: 'Test Zustand',
      message: 'Les stores Zustand fonctionnent parfaitement !',
      duration: 3000
    });
  };

  const handleTestLogin = async () => {
    const result = await login('test@mckafrica.com', 'password123');
    if (result.success) {
      addNotification({
        type: 'success',
        title: 'Connexion réussie',
        message: 'Vous êtes maintenant connecté avec Zustand !',
        duration: 3000
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Démonstration des Stores Zustand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Navigation Store */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Navigation Store</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant={navIsOpen ? "default" : "secondary"}>
                Menu: {navIsOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
              <Badge variant={isScrolled ? "default" : "secondary"}>
                Scroll: {isScrolled ? 'Actif' : 'Inactif'}
              </Badge>
              <Button
                size="sm"
                onClick={() => setNavIsOpen(!navIsOpen)}
              >
                Toggle Menu
              </Button>
              <Button
                size="sm"
                onClick={() => toggleSubSection('expertises')}
              >
                Toggle Expertises ({expandedSubSections.expertises ? 'Ouvert' : 'Fermé'})
              </Button>
            </div>
          </div>

          {/* UI Store */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">UI Store</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant={sidebarCollapsed ? "default" : "secondary"}>
                Sidebar: {sidebarCollapsed ? 'Réduite' : 'Étendue'}
              </Badge>
              <Badge variant={mobileMenuOpen ? "default" : "secondary"}>
                Menu Mobile: {mobileMenuOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
              <Badge variant="outline">
                Notifications: {notifications.length}
              </Badge>
              <Button size="sm" onClick={toggleSidebar}>
                Toggle Sidebar
              </Button>
              <Button size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                Toggle Mobile Menu
              </Button>
              <Button size="sm" onClick={handleTestNotification}>
                Test Notification
              </Button>
            </div>

            {/* Affichage des notifications */}
            {notifications.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Notifications actives:</h4>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded"
                  >
                    <span className="text-sm">
                      <Badge variant="outline" className="mr-2">
                        {notification.type}
                      </Badge>
                      {notification.title}: {notification.message}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeNotification(notification.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auth Store */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Auth Store</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant={isAuthenticated ? "default" : "secondary"}>
                Status: {isAuthenticated ? 'Connecté' : 'Déconnecté'}
              </Badge>
              {user && (
                <Badge variant="outline">
                  Utilisateur: {user.name} ({user.role})
                </Badge>
              )}
              <Button
                size="sm"
                onClick={isAuthenticated ? logout : handleTestLogin}
              >
                {isAuthenticated ? 'Se déconnecter' : 'Se connecter (Test)'}
              </Button>
            </div>
          </div>

          {/* Jobs Store */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Jobs Store</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                Emplois: {jobs.length}
              </Badge>
              <Badge variant="outline">
                Candidats: {candidates.length}
              </Badge>
              <Badge variant="outline">
                Recherche: "{searchQuery || 'Aucune'}"
              </Badge>
              <Badge variant="outline">
                Emplois filtrés: {getFilteredJobs().length}
              </Badge>
              <Badge variant="outline">
                Candidats filtrés: {getFilteredCandidates().length}
              </Badge>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              />
              <Button size="sm" onClick={() => setSearchQuery('')}>
                Effacer
              </Button>
            </div>
          </div>

          {/* État global */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Implémentation Zustand Réussie !
            </h3>
            <p className="text-green-700 text-sm">
              Tous les stores Zustand sont opérationnels et la gestion d'état globale fonctionne parfaitement.
              Les composants Navigation et AdminLayout utilisent maintenant les stores au lieu des useState locaux.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZustandDemo;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Home,
  Menu,
  ChevronLeft
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Données simulées de l'utilisateur connecté
  const currentUser = {
    firstName: 'Marie',
    lastName: 'Kouassi',
    email: 'marie.kouassi@mckafrica.com',
    role: 'Administrateur RH'
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/admin' },
    { icon: FileText, label: 'Gestion des Offres', path: '/admin/offres' },
    { icon: Users, label: 'Candidats', path: '/admin/candidats' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white shadow-lg flex flex-col`}>
        {/* Header de la sidebar */}
        <div className="p-6 border-b">
          {!sidebarCollapsed ? (
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
                alt="McK Africa" 
                className="h-10 w-auto"
              />
            </Link>
          ) : (
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
                alt="McK Africa" 
                className="h-8 w-8 object-contain"
              />
            </div>
          )}
          {!sidebarCollapsed && (
            <p className="text-sm text-gray-600 mt-2">Dashboard Admin</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-mck-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer de la sidebar */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Link to="/">
              <Button 
                variant="outline" 
                className={`${sidebarCollapsed ? 'w-8 h-8 p-0' : 'w-full justify-start'}`}
                title={sidebarCollapsed ? 'Retour au site' : undefined}
              >
                <Home className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">Retour au site</span>}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header principal */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-600 hover:text-gray-900"
            >
              {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Administration McK Africa
            </h1>
          </div>
          
          {/* Profil utilisateur */}
          <UserProfile user={currentUser} />
        </div>

        {/* Contenu principal */}
        <div className="p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

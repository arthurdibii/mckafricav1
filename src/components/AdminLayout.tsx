
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Home,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/admin' },
    { icon: FileText, label: 'Gestion des Offres', path: '/admin/offres' },
    { icon: Users, label: 'Candidats', path: '/admin/candidats' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
              alt="McK Africa" 
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm text-gray-600 mt-2">Dashboard Admin</p>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-mck-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="space-y-2">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start">
                <Home className="h-4 w-4 mr-2" />
                Retour au site
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Administration McK Africa
          </h1>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

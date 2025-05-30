
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserProfile from '@/components/UserProfile';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Home,
  Menu,
  ChevronLeft,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const SidebarContent = ({ mobile = false }) => (
    <>
      {/* Header de la sidebar */}
      <div className={`${mobile ? 'p-4' : 'p-6'} border-b ${mobile ? 'flex items-center justify-between' : ''}`}>
        {mobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        {(!sidebarCollapsed || mobile) ? (
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
              alt="McK Africa" 
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
        ) : (
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
              alt="McK Africa" 
              className="h-6 w-6 object-contain"
            />
          </div>
        )}
        {(!sidebarCollapsed || mobile) && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2">Dashboard Admin</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileMenuOpen(false)}
              className={`flex items-center ${(sidebarCollapsed && !mobile) ? 'justify-center px-2' : 'space-x-2 sm:space-x-3 px-3'} py-2 sm:py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-mck-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={(sidebarCollapsed && !mobile) ? item.label : undefined}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              {(!sidebarCollapsed || mobile) && (
                <span className="font-medium text-sm sm:text-base truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer de la sidebar */}
      <div className="p-2 sm:p-4 border-t">
        <Link to="/" onClick={() => mobile && setMobileMenuOpen(false)}>
          <Button 
            variant="outline" 
            className={`${(sidebarCollapsed && !mobile) ? 'w-8 h-8 p-0' : 'w-full justify-start'} text-sm`}
            title={(sidebarCollapsed && !mobile) ? 'Retour au site' : undefined}
          >
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            {(!sidebarCollapsed || mobile) && <span className="ml-2">Retour au site</span>}
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-48 sm:w-64'} transition-all duration-300 bg-white shadow-lg hidden lg:flex flex-col`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 lg:hidden">
          <div className="flex flex-col h-full bg-white">
            <SidebarContent mobile={true} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header principal */}
        <div className="bg-white shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex text-gray-600 hover:text-gray-900 p-1"
            >
              {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              Administration McK Africa
            </h1>
          </div>
          
          {/* Profil utilisateur */}
          <div className="flex-shrink-0">
            <UserProfile user={currentUser} />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-3 sm:p-4 lg:p-6 flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';

interface UserProfileProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    photo?: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100">
          <div className="w-8 h-8 bg-mck-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              getInitials(user.firstName, user.lastName)
            )}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-500">
              {user.role}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
          <User className="h-4 w-4" />
          <span>Mon Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
          <Settings className="h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600">
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

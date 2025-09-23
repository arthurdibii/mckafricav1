
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Building2, Users, UserCheck, Shield } from 'lucide-react';

interface LoginFormProps {
  onClose?: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: ''
  });

  // Définition des rôles disponibles
  const roles = [
    {
      value: 'client',
      label: 'Client Entreprise',
      description: 'Accès aux services de recrutement et gestion des offres',
      icon: Building2
    },
    {
      value: 'candidate',
      label: 'Candidat',
      description: 'Recherche d\'emploi et suivi des candidatures',
      icon: UserCheck
    },
    {
      value: 'consultant',
      label: 'Consultant McK',
      description: 'Gestion des processus de recrutement et clients',
      icon: Users
    },
    {
      value: 'admin',
      label: 'Administrateur',
      description: 'Administration complète de la plateforme',
      icon: Shield
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous intégreriez avec votre système d'authentification
    console.log('Connexion:', loginData);
    
    // Simulation de connexion selon le rôle
    switch (loginData.role) {
      case 'client':
        alert('Connexion réussie - Redirection vers l\'espace client');
        break;
      case 'candidate':
        alert('Connexion réussie - Redirection vers l\'espace candidat');
        break;
      case 'consultant':
        alert('Connexion réussie - Redirection vers l\'espace consultant');
        break;
      case 'admin':
        alert('Connexion réussie - Redirection vers l\'administration');
        break;
      default:
        alert('Veuillez sélectionner un type de compte');
    }
  };

  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mck-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png" 
              alt="McK Africa" 
              className="h-12 w-auto mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-black">
            Connexion à votre espace
          </CardTitle>
          <p className="text-black mt-2">
            Accédez à votre compte McK Africa
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection du type de compte */}
            <div>
              <Label htmlFor="role">Type de compte *</Label>
              <Select onValueChange={(value) => {
                setSelectedRole(value);
                setLoginData(prev => ({ ...prev, role: value }));
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez votre type de compte" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {role.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
              {selectedRoleData && (
                <div className="mt-2 p-3 bg-mck-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <selectedRoleData.icon className="h-4 w-4 mt-0.5 text-mck-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-mck-blue-900">
                        {selectedRoleData.label}
                      </p>
                      <p className="text-xs text-mck-blue-700">
                        {selectedRoleData.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Email */}
            <div>
              <Label htmlFor="email">Adresse email *</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
                required
                className="mt-1"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <Label htmlFor="password">Mot de passe *</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-800" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-800" />
                  )}
                </Button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-mck-blue-600 focus:ring-mck-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="remember" className="ml-2 text-sm text-black">
                  Se souvenir de moi
                </Label>
              </div>
              <Button variant="link" className="text-sm text-mck-blue-600 p-0">
                Mot de passe oublié ?
              </Button>
            </div>

            {/* Bouton de connexion */}
            <Button 
              type="submit" 
              className="w-full bg-mck-blue-600 hover:bg-mck-blue-700 text-white py-3"
            >
              Se connecter
            </Button>

            <Separator />

            {/* Liens d'inscription */}
            <div className="text-center space-y-2">
              <p className="text-sm text-black">
                Vous n'avez pas encore de compte ?
              </p>
              <div className="space-y-1">
                <Button variant="outline" className="w-full text-sm" size="sm">
                  Créer un compte candidat
                </Button>
                <Button variant="outline" className="w-full text-sm" size="sm">
                  Inscription entreprise
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

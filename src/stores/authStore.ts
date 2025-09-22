import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'recruiter';
  avatar?: string;
  permissions: string[];
}

export interface AuthState {
  // État d'authentification
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // États initiaux
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null }, false, 'login-start');
          
          try {
            // Simulation d'une API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user data
            const user: User = {
              id: '1',
              email,
              name: 'John Doe',
              role: 'admin',
              permissions: ['read', 'write', 'admin'],
            };
            
            set({
              isAuthenticated: true,
              user,
              isLoading: false,
              error: null,
            }, false, 'login-success');
            
            return { success: true };
          } catch (error) {
            set({
              isLoading: false,
              error: 'Échec de la connexion. Vérifiez vos identifiants.',
            }, false, 'login-error');
            
            return { success: false, error: 'Échec de la connexion' };
          }
        },

        logout: () =>
          set(
            {
              isAuthenticated: false,
              user: null,
              error: null,
            },
            false,
            'logout'
          ),

        setUser: (user) => set({ user }, false, 'setUser'),

        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),

        setError: (error) => set({ error }, false, 'setError'),

        clearError: () => set({ error: null }, false, 'clearError'),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
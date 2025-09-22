import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: number;
}

export interface Modal {
  id: string;
  type: string;
  isOpen: boolean;
  data?: any;
}

export interface UIState {
  // États des notifications
  notifications: Notification[];
  
  // États des modales
  modals: Modal[];
  
  // États de l'interface
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark';
  
  // Actions pour les notifications
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Actions pour les modales
  openModal: (type: string, data?: any) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isModalOpen: (type: string) => boolean;
  getModalData: (type: string) => any;
  
  // Actions pour l'interface
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // États initiaux
      notifications: [],
      modals: [],
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      isLoading: false,
      theme: 'light',

      // Actions pour les notifications
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: Date.now(),
        };
        
        set(
          (state) => ({
            notifications: [...state.notifications, newNotification],
          }),
          false,
          'addNotification'
        );
        
        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          const duration = notification.duration || 5000;
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },
      
      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'removeNotification'
        ),
      
      clearNotifications: () =>
        set({ notifications: [] }, false, 'clearNotifications'),

      // Actions pour les modales
      openModal: (type, data) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newModal: Modal = {
          id,
          type,
          isOpen: true,
          data,
        };
        
        set(
          (state) => ({
            modals: [...state.modals.filter((m) => m.type !== type), newModal],
          }),
          false,
          'openModal'
        );
      },
      
      closeModal: (id) =>
        set(
          (state) => ({
            modals: state.modals.filter((m) => m.id !== id),
          }),
          false,
          'closeModal'
        ),
      
      closeAllModals: () => set({ modals: [] }, false, 'closeAllModals'),
      
      isModalOpen: (type) => {
        const state = get();
        return state.modals.some((m) => m.type === type && m.isOpen);
      },
      
      getModalData: (type) => {
        const state = get();
        const modal = state.modals.find((m) => m.type === type && m.isOpen);
        return modal?.data;
      },

      // Actions pour l'interface
      setSidebarCollapsed: (sidebarCollapsed) =>
        set({ sidebarCollapsed }, false, 'setSidebarCollapsed'),
      
      toggleSidebar: () =>
        set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'toggleSidebar'
        ),
      
      setMobileMenuOpen: (mobileMenuOpen) =>
        set({ mobileMenuOpen }, false, 'setMobileMenuOpen'),
      
      setIsLoading: (isLoading) => set({ isLoading }, false, 'setIsLoading'),
      
      setTheme: (theme) => set({ theme }, false, 'setTheme'),
      
      toggleTheme: () =>
        set(
          (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'toggleTheme'
        ),
    }),
    {
      name: 'ui-store',
    }
  )
);
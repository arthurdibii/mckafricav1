// Export all stores for easy importing
export { useNavigationStore } from './navigationStore';
export { useAuthStore } from './authStore';
export { useJobsStore } from './jobsStore';
export { useUIStore } from './uiStore';

// Export types for TypeScript
export type { NavigationState } from './navigationStore';
export type { AuthState } from './authStore';
export type { JobsState } from './jobsStore';
export type { UIState } from './uiStore';
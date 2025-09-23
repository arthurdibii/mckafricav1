import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ExpandedSubSections {
  managementRecruitment: boolean;
  humanCapitalAdvisory: boolean;
  developmentPrograms: boolean;
  performanceOrganisations: boolean;
  transformationOrganisations: boolean;
  marketIntelligence: boolean;
  itSolutions: boolean;
  evaluationCompetences: boolean;
  developpementCompetences: boolean;
  insertionProfessionnelle: boolean;
  travailTemporaire: boolean;
  recrutementExpert: boolean;
  administrationRH: boolean;
  expertises: boolean;
  industries: boolean;
  consulting: boolean;
  insights: boolean;
  about: boolean;
  careers: boolean;
  offices: boolean;
  global: boolean;
}

type NavigationLevel = 'main' | 'expertises' | 'sub-expertises';

export interface NavigationState {
  // États du menu mobile
  isOpen: boolean;
  isScrolled: boolean;
  
  // États des sous-sections
  expandedSubSections: ExpandedSubSections;
  
  // Navigation hiérarchique
  currentLevel: NavigationLevel;
  selectedExpertise: string | null;
  breadcrumb: string[];
  
  // Actions
  setIsOpen: (isOpen: boolean) => void;
  setIsScrolled: (isScrolled: boolean) => void;
  toggleSubSection: (section: keyof ExpandedSubSections) => void;
  setCurrentLevel: (level: NavigationLevel) => void;
  setSelectedExpertise: (expertise: string | null) => void;
  setBreadcrumb: (breadcrumb: string[]) => void;
  resetMobileMenu: () => void;
  navigateToExpertises: () => void;
  navigateToSubExpertises: (expertiseKey: string, expertiseTitle: string) => void;
  navigateBack: () => void;
}

const initialExpandedSubSections: ExpandedSubSections = {
  managementRecruitment: false,
  humanCapitalAdvisory: false,
  developmentPrograms: false,
  performanceOrganisations: false,
  transformationOrganisations: false,
  marketIntelligence: false,
  itSolutions: false,
  evaluationCompetences: false,
  developpementCompetences: false,
  insertionProfessionnelle: false,
  travailTemporaire: false,
  recrutementExpert: false,
  administrationRH: false,
  expertises: false,
  industries: false,
  consulting: false,
  insights: false,
  about: false,
  careers: false,
  offices: false,
  global: false
};

export const useNavigationStore = create<NavigationState>()(
  devtools(
    (set, get) => ({
      // États initiaux
      isOpen: false,
      isScrolled: false,
      expandedSubSections: initialExpandedSubSections,
      currentLevel: 'main',
      selectedExpertise: null,
      breadcrumb: ['Menu principal'],

      // Actions
      setIsOpen: (isOpen) => set({ isOpen }, false, 'setIsOpen'),
      
      setIsScrolled: (isScrolled) => set({ isScrolled }, false, 'setIsScrolled'),
      
      toggleSubSection: (section) =>
        set(
          (state) => ({
            expandedSubSections: {
              ...state.expandedSubSections,
              [section]: !state.expandedSubSections[section],
            },
          }),
          false,
          'toggleSubSection'
        ),
      
      setCurrentLevel: (currentLevel) => set({ currentLevel }, false, 'setCurrentLevel'),
      
      setSelectedExpertise: (selectedExpertise) => set({ selectedExpertise }, false, 'setSelectedExpertise'),
      
      setBreadcrumb: (breadcrumb) => set({ breadcrumb }, false, 'setBreadcrumb'),
      
      resetMobileMenu: () =>
        set(
          {
            currentLevel: 'main',
            breadcrumb: ['Menu principal'],
            selectedExpertise: null,
            isOpen: false,
          },
          false,
          'resetMobileMenu'
        ),
      
      navigateToExpertises: () =>
        set(
          {
            currentLevel: 'expertises',
            breadcrumb: ['Menu principal', 'Expertises'],
          },
          false,
          'navigateToExpertises'
        ),
      
      navigateToSubExpertises: (expertiseKey, expertiseTitle) =>
        set(
          {
            currentLevel: 'sub-expertises',
            selectedExpertise: expertiseKey,
            breadcrumb: ['Menu principal', 'Expertises', expertiseTitle],
          },
          false,
          'navigateToSubExpertises'
        ),
      
      navigateBack: () => {
        const state = get();
        if (state.currentLevel === 'sub-expertises') {
          set(
            {
              currentLevel: 'expertises',
              selectedExpertise: null,
              breadcrumb: ['Menu principal', 'Expertises'],
            },
            false,
            'navigateBack'
          );
        } else if (state.currentLevel === 'expertises') {
          set(
            {
              currentLevel: 'main',
              breadcrumb: ['Menu principal'],
            },
            false,
            'navigateBack'
          );
        }
      },
    }),
    {
      name: 'navigation-store',
    }
  )
);
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  applicationsCount: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resume?: string;
  appliedJobs: string[];
  status: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
  appliedAt: string;
  notes?: string;
}

export interface JobsState {
  // États des offres
  jobs: Job[];
  selectedJob: Job | null;
  jobsLoading: boolean;
  jobsError: string | null;
  
  // États des candidats
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  candidatesLoading: boolean;
  candidatesError: string | null;
  
  // Filtres et recherche
  searchQuery: string;
  locationFilter: string;
  typeFilter: string;
  levelFilter: string;
  statusFilter: string;
  
  // Actions pour les offres
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  setSelectedJob: (job: Job | null) => void;
  setJobsLoading: (loading: boolean) => void;
  setJobsError: (error: string | null) => void;
  
  // Actions pour les candidats
  setCandidates: (candidates: Candidate[]) => void;
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  setCandidatesLoading: (loading: boolean) => void;
  setCandidatesError: (error: string | null) => void;
  
  // Actions pour les filtres
  setSearchQuery: (query: string) => void;
  setLocationFilter: (location: string) => void;
  setTypeFilter: (type: string) => void;
  setLevelFilter: (level: string) => void;
  setStatusFilter: (status: string) => void;
  clearFilters: () => void;
  
  // Actions utilitaires
  getFilteredJobs: () => Job[];
  getFilteredCandidates: () => Candidate[];
}

export const useJobsStore = create<JobsState>()(
  devtools(
    (set, get) => ({
      // États initiaux
      jobs: [],
      selectedJob: null,
      jobsLoading: false,
      jobsError: null,
      
      candidates: [],
      selectedCandidate: null,
      candidatesLoading: false,
      candidatesError: null,
      
      searchQuery: '',
      locationFilter: '',
      typeFilter: '',
      levelFilter: '',
      statusFilter: '',

      // Actions pour les offres
      setJobs: (jobs) => set({ jobs }, false, 'setJobs'),
      
      addJob: (job) =>
        set((state) => ({ jobs: [...state.jobs, job] }), false, 'addJob'),
      
      updateJob: (id, updates) =>
        set(
          (state) => ({
            jobs: state.jobs.map((job) =>
              job.id === id ? { ...job, ...updates } : job
            ),
          }),
          false,
          'updateJob'
        ),
      
      deleteJob: (id) =>
        set(
          (state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
          }),
          false,
          'deleteJob'
        ),
      
      setSelectedJob: (job) => set({ selectedJob: job }, false, 'setSelectedJob'),
      
      setJobsLoading: (jobsLoading) => set({ jobsLoading }, false, 'setJobsLoading'),
      
      setJobsError: (jobsError) => set({ jobsError }, false, 'setJobsError'),

      // Actions pour les candidats
      setCandidates: (candidates) => set({ candidates }, false, 'setCandidates'),
      
      addCandidate: (candidate) =>
        set(
          (state) => ({ candidates: [...state.candidates, candidate] }),
          false,
          'addCandidate'
        ),
      
      updateCandidate: (id, updates) =>
        set(
          (state) => ({
            candidates: state.candidates.map((candidate) =>
              candidate.id === id ? { ...candidate, ...updates } : candidate
            ),
          }),
          false,
          'updateCandidate'
        ),
      
      deleteCandidate: (id) =>
        set(
          (state) => ({
            candidates: state.candidates.filter((candidate) => candidate.id !== id),
          }),
          false,
          'deleteCandidate'
        ),
      
      setSelectedCandidate: (candidate) =>
        set({ selectedCandidate: candidate }, false, 'setSelectedCandidate'),
      
      setCandidatesLoading: (candidatesLoading) =>
        set({ candidatesLoading }, false, 'setCandidatesLoading'),
      
      setCandidatesError: (candidatesError) =>
        set({ candidatesError }, false, 'setCandidatesError'),

      // Actions pour les filtres
      setSearchQuery: (searchQuery) => set({ searchQuery }, false, 'setSearchQuery'),
      
      setLocationFilter: (locationFilter) =>
        set({ locationFilter }, false, 'setLocationFilter'),
      
      setTypeFilter: (typeFilter) => set({ typeFilter }, false, 'setTypeFilter'),
      
      setLevelFilter: (levelFilter) => set({ levelFilter }, false, 'setLevelFilter'),
      
      setStatusFilter: (statusFilter) => set({ statusFilter }, false, 'setStatusFilter'),
      
      clearFilters: () =>
        set(
          {
            searchQuery: '',
            locationFilter: '',
            typeFilter: '',
            levelFilter: '',
            statusFilter: '',
          },
          false,
          'clearFilters'
        ),

      // Actions utilitaires
      getFilteredJobs: () => {
        const state = get();
        return state.jobs.filter((job) => {
          const matchesSearch = state.searchQuery
            ? job.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              job.company.toLowerCase().includes(state.searchQuery.toLowerCase())
            : true;
          
          const matchesLocation = state.locationFilter
            ? job.location.toLowerCase().includes(state.locationFilter.toLowerCase())
            : true;
          
          const matchesType = state.typeFilter ? job.type === state.typeFilter : true;
          
          const matchesLevel = state.levelFilter ? job.level === state.levelFilter : true;
          
          const matchesStatus = state.statusFilter ? job.status === state.statusFilter : true;
          
          return matchesSearch && matchesLocation && matchesType && matchesLevel && matchesStatus;
        });
      },
      
      getFilteredCandidates: () => {
        const state = get();
        return state.candidates.filter((candidate) => {
          const matchesSearch = state.searchQuery
            ? candidate.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              candidate.email.toLowerCase().includes(state.searchQuery.toLowerCase())
            : true;
          
          const matchesStatus = state.statusFilter
            ? candidate.status === state.statusFilter
            : true;
          
          return matchesSearch && matchesStatus;
        });
      },
    }),
    {
      name: 'jobs-store',
    }
  )
);
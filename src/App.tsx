
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Emplois from "./pages/Emplois";
import Insights from "./pages/Insights";
import JobDetail from "./pages/JobDetail";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
import AdminCandidates from "./pages/AdminCandidates";
import AdminSettings from "./pages/AdminSettings";
import JobPipeline from "./pages/JobPipeline";
import ZustandTest from "./pages/ZustandTest";
import NotFound from "./pages/NotFound";
import HumanCapital from "./pages/HumanCapital";
import StrategiePerformance from "./pages/StrategiePerformance";
import TechnologieInnovation from "./pages/TechnologieInnovation";
import EmployabiliteJeunes from "./pages/EmployabiliteJeunes";
import SourcingInterim from "./pages/SourcingInterim";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apropos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emplois" element={<Emplois />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/emploi/:id" element={<JobDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/connexion" element={<Login />} />

          {/* Routes des expertises */}
          <Route path="/human-capital" element={<HumanCapital />} />
          <Route path="/strategie-performance" element={<StrategiePerformance />} />
          <Route path="/technologie-innovation" element={<TechnologieInnovation />} />
          <Route path="/employabilite-jeunes" element={<EmployabiliteJeunes />} />
          <Route path="/sourcing-interim" element={<SourcingInterim />} />

          {/* Routes d'administration */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/offres" element={<AdminJobs />} />
          <Route path="/admin/candidats" element={<AdminCandidates />} />
          <Route path="/admin/parametres" element={<AdminSettings />} />
          <Route path="/admin/offres/:id/pipeline" element={<JobPipeline />} />
          <Route path="/admin/zustand-test" element={<ZustandTest />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

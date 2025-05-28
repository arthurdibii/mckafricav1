
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JobDetail from "./pages/JobDetail";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
import JobPipeline from "./pages/JobPipeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/emploi/:id" element={<JobDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/connexion" element={<Login />} />
          
          {/* Routes d'administration */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/offres" element={<AdminJobs />} />
          <Route path="/admin/offres/:id/pipeline" element={<JobPipeline />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

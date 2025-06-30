import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useEffect } from "react";
import UserManagement from "./components/UserManagement";
import { Users } from "./components/Users";
import { Payments } from "./components/Payments";
import { StartupVerification } from "./components/StartupVerification";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import AdminProfile from "./components/AdminProfile";
import ModerationQueue from "./components/admin/ModerationQueue";
import AnalyticsDashboard from "./components/admin/AnalyticsDashboard";
import SettingsPanel from "./components/admin/SettingsPanel";
import AuditLogsPanel from "./components/admin/AuditLogsPanel";
import NotesPanel from "./components/admin/NotesPanel";
import ComplianceCenter from "./components/admin/ComplianceCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StickyNote } from "lucide-react";
import './App.css';
import Container from '@mui/material/Container';
import Home from './components/Home.jsx';
import Startups from './components/Startups.jsx';
import Investor from './components/Investor.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Contact from './components/Contact.jsx';
import AboutUs from './components/AboutUs.jsx';
import AdminLayout from "./components/layouts/AdminLayout";
import StartupDashboard from './pages/StartupDashboard';
import BidReview from './pages/Bids';
import StartupProfile from './pages/StartupProfile';
import FundingSelectionDashboard from './pages/Funding';
import { Deals } from './pages/Mydeals';
import MyIdeas from './pages/MyIdeas';
import Pitch from './pages/StartupPitch.jsx';
import StartupAnalyticsDashboard from './pages/StartupAnalytics.jsx';
import StartupLayout from "./components/layouts/StartupLayout.js";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

// Import Firebase configuration
import './firebase/config';

//investor imports
import InvestorLayout from "./components/layouts/investor/InvestorLayout.js";
import InvestorDashboard from './pages/investor/InvestorDashboard';
import BrowseStartups from './pages/investor/startups/BrowseStartups.tsx';
import Portfolio from './pages/investor/portfolio/Portfolio.tsx';
import Bidding from './pages/investor/bidding/Bidding.tsx';
import InvestorMessaging from './pages/investor/Messaging';
import MarketInsights from './pages/investor/MarketInsights';
import InvestorProfile from './pages/investor/profile/Profile.tsx';
import StartupDetail from './pages/investor/startups/StartupDetail.tsx';
import BiddingDetail from './pages/investor/bidding/BiddingDetail.tsx';
import BiddingHistory from './pages/investor/bidding/BiddingHistory.tsx';
import BiddingSubmit from './pages/investor/bidding/BiddingSubmit.tsx';
import ProfileSettings from './pages/investor/profile/ProfileSettings.tsx';
import ProfileVerification from './pages/investor/profile/ProfileVerification.tsx'; 
import InvestmentPreferences from './pages/investor/profile/InvestmentPreferences.tsx';
import PortfolioAnalytics from './pages/investor/portfolio/PortfolioAnalytics.tsx';
import PortfolioPerformance from './pages/investor/portfolio/PortfolioPerformance.tsx';
import InvestmentDetail from "./pages/investor/portfolio/InvestmentDetail.tsx";

// Floating Profile Button (always visible)
const ProfileCircleButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed top-5 right-7 z-50 flex items-center justify-cente0r w-12 h-12 rounded-full bg-white border border-blue-200 shadow hover:bg-blue-50 transition-all"
      onClick={() => navigate("/profile")}
      aria-label="Profile"
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <Avatar className="w-9 h-9">
        <AvatarImage src="/placeholder.svg" alt="Profile" />
        <AvatarFallback>AU</AvatarFallback>
      </Avatar>
    </button>
  );
};

const queryClient = new QueryClient();

const AppContent = () => {
  // Check for session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/session', {
          credentials: 'include', // Important for cookies
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('User is authenticated:', data);
        } else {
          console.log('No active session');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkSession();
  }, []);
  
  return (
    <>
      <div className="flex min-h-screen">
        <main className="flex-1 bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/investor" element={<Investor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Startup Routes */}
            <Route element={<StartupLayout />}>
              <Route path="/startupDashboard" element={<StartupDashboard />} />
              <Route path="/pitch" element={<Pitch />} />
              <Route path="/bids" element={<BidReview />} />
              <Route path="/startprofile" element={<StartupProfile />} />
              <Route path="/funding" element={<FundingSelectionDashboard />} />
              <Route path="/my-ideas" element={<MyIdeas />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/startup-analytics" element={<StartupAnalyticsDashboard />} />
            </Route>

            {/* Investor Portal Routes */}
            <Route element={<ProtectedRoute requiredRole="investor"><InvestorLayout /></ProtectedRoute>}>
              <Route path="/investor/dashboard" element={<InvestorDashboard />} />
              {/* Browse Startups */}
              <Route path="/investor/browse-startups/:startupId" element={<StartupDetail />} />
              <Route path="/investor/browse-startups" element={<BrowseStartups />} />
              {/* Portfolio */}
              <Route path="/investor/portfolio" element={<Portfolio />} />
              <Route path="/investor/portfolio/:investmentId" element={<InvestmentDetail />} />
              <Route path="/investor/portfolio/analytics" element={<PortfolioAnalytics />} />
              <Route path="/investor/portfolio/performance" element={<PortfolioPerformance />} />
              {/* Bidding */}
              <Route path="/investor/bidding" element={<Bidding />} />
              <Route path="/investor/bidding/:bidId" element={<BiddingDetail />} />
              <Route path="/investor/bidding/history" element={<BiddingHistory />} />
              <Route path="/investor/bidding/submit" element={<BiddingSubmit />} />
              <Route path="/investor/messaging" element={<InvestorMessaging />} />
              <Route path="/investor/market-insights" element={<MarketInsights />} />
              {/* Profile */}
              <Route path="/investor/profile" element={<InvestorProfile />} />
              <Route path="/investor/profile/settings" element={<ProfileSettings />} />
              <Route path="/investor/profile/verification" element={<ProfileVerification />} />
              <Route path="/investor/profile/investment-preferences" element={<InvestmentPreferences />} />
            </Route>

            {/* Admin Routes - Protected */}
            <Route element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
              <Route path="/adminDashboard" element={<Dashboard />} />
              <Route path="/userManagement" element={<UserManagement />} />
              <Route path="/users" element={<Users />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/verification" element={<StartupVerification />} />
              <Route path="/profile" element={<AdminProfile />} />
              <Route path="/moderationQueue" element={<ModerationQueue />} />
              <Route path="/adminAnalytics" element={<AnalyticsDashboard />} />
              <Route path="/adminSettings" element={<SettingsPanel />} />
              <Route path="/auditLogs" element={<AuditLogsPanel />} />
              <Route path="/adminNotes" element={<NotesPanel />} />
              <Route path="/complianceCenter" element={<ComplianceCenter />} />
            </Route>

            {/* Startup Routes - Protected */}
            <Route element={<ProtectedRoute requiredRole="founder"><StartupLayout /></ProtectedRoute>}>
              <Route path="/startupDashboard" element={<StartupDashboard />} />
              <Route path="/pitch" element={<Pitch />} />
              <Route path="/bids" element={<BidReview />} />
              <Route path="/startprofile" element={<StartupProfile />} />
              <Route path="/funding" element={<FundingSelectionDashboard />} />
              <Route path="/my-ideas" element={<MyIdeas />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/startup-analytics" element={<StartupAnalyticsDashboard />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

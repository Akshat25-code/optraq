import React, { Suspense, lazy, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/legal/CookieConsent";
import { RouteMeta } from "@/lib/routeMeta";
import useKeyboardShortcuts from "@/features/shortcuts/useKeyboardShortcuts";
import AdminRoute from "@/components/layout/AdminRoute";
import ApiKeyModal from "@/components/auth/ApiKeyModal";
const OnboardingTour = lazy(() => import("@/features/onboarding/OnboardingTour"));
const CommandPalette = lazy(() => import("@/features/shortcuts/CommandPalette"));

// Lazy-load page components for code splitting
const WelcomePage = lazy(() => import("@/features/workspace/WelcomePage"));
const CodeOptimizer = lazy(() => import("@/features/optimization/CodeOptimizerPro"));
const WorkspacePage = lazy(() => import("@/features/workspace/WorkspacePage"));
const AuthPage = lazy(() => import("@/features/auth/AuthPage"));
const ProfilePage = lazy(() => import("@/features/profile/ProfilePage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/ResetPasswordPage"));
const AnalysisPage = lazy(() => import("@/features/analysis/AnalysisPage"));
const BugDetectionPage = lazy(() => import("@/features/analysis/BugDetectionPage"));
const RefactoringPage = lazy(() => import("@/features/optimization/RefactoringPage"));
const DebuggingPage = lazy(() => import("@/features/analysis/DebuggingPage"));
const PipelineView = lazy(() => import("@/features/review/PipelineView"));
const RulesManager = lazy(() => import("@/features/rules/RulesManager"));
const TeamDashboard = lazy(() => import("@/features/team/TeamDashboard"));
const AlgorithmVisualizer = lazy(() => import("@/features/visualization/AlgorithmVisualizer"));
const SettingsPage = lazy(() => import("@/features/settings/SettingsPage"));
const AdminDashboard = lazy(() => import("@/features/admin/AdminDashboard"));
const PrivacyPage = lazy(() => import("@/features/legal/PrivacyPage"));
const TermsPage = lazy(() => import("@/features/legal/TermsPage"));
const NotFoundPage = lazy(() => import("@/features/misc/NotFoundPage"));
const SharedSessionPage = lazy(() => import("@/features/misc/SharedSessionPage"));

// Loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-color, #0a0a0a)' }}>
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  </div>
);

/** First-run tour: only for signed-in users on editor pages (tour targets live there). */
function FirstRunTour() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return null;
  if (!pathname.startsWith('/workspace') && !pathname.startsWith('/optimize')) return null;
  return <OnboardingTour />;
}

/** Global command palette (Cmd/Ctrl+K) + tour, mounted once. */
function GlobalOverlays() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const shortcuts = useMemo(() => ([
    { key: 'k', ctrl: true, global: true, action: () => setPaletteOpen((v) => !v) },
  ]), []);
  useKeyboardShortcuts(shortcuts);
  return (
    <Suspense fallback={null}>
      <FirstRunTour />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ApiKeyModal />
    </Suspense>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  return children;
}

import UnderwaterBubbles from "@/features/workspace/sections/UnderwaterBubbles";

function OceanPageShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020b1c] text-white selection:bg-cyan-500 selection:text-black">
      <UnderwaterBubbles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {title && (
          <div className="mb-8 pb-6 border-b border-cyan-500/20">
            <h1 className="text-3xl font-semibold text-white tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-cyan-200/70 mt-1 font-mono">{subtitle}</p>}
          </div>
        )}
        <div className="rounded-2xl border border-cyan-500/20 bg-[#03152d]/65 backdrop-blur-xl p-6 shadow-[0_16px_50px_rgba(0,0,0,0.4)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function GuardedRoutes() {
  const gate = (el) => <ProtectedRoute>{el}</ProtectedRoute>;
  return (
    <>
      <RouteMeta />
      <GlobalOverlays />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/workspace" element={gate(<WorkspacePage />)} />
          <Route path="/optimize" element={gate(<CodeOptimizer />)} />
          {/* Individual Feature Pages */}
          <Route path="/optimization" element={<Navigate to="/optimize" replace />} />
          <Route path="/analysis" element={gate(<AnalysisPage />)} />
          <Route path="/bug-detection" element={gate(<BugDetectionPage />)} />
          <Route path="/debugging" element={gate(<DebuggingPage />)} />
          <Route path="/refactoring" element={gate(<RefactoringPage />)} />
          <Route path="/review" element={gate(<OceanPageShell title="Review Pipeline" subtitle="Multi-stage pull request audits & AST verification"><PipelineView /></OceanPageShell>)} />
          <Route path="/rules" element={gate(<OceanPageShell title="Rules Engine" subtitle="Custom enterprise AST invariants & compliance policies"><RulesManager /></OceanPageShell>)} />
          <Route path="/team" element={gate(<OceanPageShell title="Team Dashboard" subtitle="Shared telemetry metrics & workspace quotas"><TeamDashboard /></OceanPageShell>)} />
          <Route path="/visualize" element={gate(<OceanPageShell title="Algorithm Visualizer" subtitle="Step-by-step logic graph and execution visualizer"><AlgorithmVisualizer /></OceanPageShell>)} />
          {/* Admin Cockpit (Hardcoded Access Only) */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          {/* Auth Pages */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={gate(<ProfilePage />)} />
          <Route path="/settings" element={gate(<SettingsPage />)} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/share/:token" element={<SharedSessionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <GuardedRoutes />
    </AuthProvider>
  );
}

export default App;


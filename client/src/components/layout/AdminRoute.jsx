import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isUserAdmin } from '@/config/admin';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080E] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-white/20 border-t-[#FF3344] rounded-full animate-spin" />
          <p className="text-sm font-mono text-white/50">Verifying administrative credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  if (!isUserAdmin(user)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-[#07080E] text-white">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[rgba(15,18,32,0.7)] backdrop-blur-2xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#FF3344]/10 border border-[#FF3344]/30 flex items-center justify-center mx-auto mb-5 text-[#FF3344]">
            <ShieldAlert className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-2">Restricted Area</h1>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            Administrative access is restricted to hardcoded security operators. Your account <span className="font-mono text-white/90">({user.email})</span> does not have elevated privileges.
          </p>
          <Link
            to="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-medium text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Return to Workspace
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

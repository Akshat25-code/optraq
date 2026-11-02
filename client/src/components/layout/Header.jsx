import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Shield, Key, Sparkles } from 'lucide-react';
import { isUserAdmin } from '@/config/admin';
import OptraqLogo from './OptraqLogo';

// Items 1 to 5 strictly kept in the Features dropdown as requested:
const featureLinks = [
  { path: '/optimize', label: 'Optimization Lab', desc: 'Real-time AST transforms & heuristics' },
  { path: '/analysis', label: 'Semantic Analysis', desc: 'Code complexity & hotspot detection' },
  { path: '/bug-detection', label: 'Bug & Vulnerability', desc: 'Security flaws & memory leaks' },
  { path: '/refactoring', label: 'Clean Refactoring', desc: 'Architectural debt reduction' },
  { path: '/debugging', label: 'Sandbox Debugger', desc: 'Isolated trace execution' },
];

export default function Header() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const atAuth = location.pathname.startsWith('/auth');
  const [showFeatures, setShowFeatures] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const isAdmin = isUserAdmin(user);
  const isFeaturePage = featureLinks.some((f) => location.pathname === f.path);

  useEffect(() => {
    const checkKey = () => {
      try {
        const key = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('optraq_api_key') : null;
        setHasApiKey(Boolean(key));
      } catch {
        setHasApiKey(false);
      }
    };
    checkKey();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkKey);
      window.addEventListener('optraq-api-key-updated', checkKey);
      return () => {
        window.removeEventListener('storage', checkKey);
        window.removeEventListener('optraq-api-key-updated', checkKey);
      };
    }
  }, []);

  const openApiKeyModal = () => {
    window.dispatchEvent(new CustomEvent('open-api-key-modal'));
  };

  const handleFaqClick = (e) => {
    if (e) e.preventDefault();
    setShowMobileNav(false);
    if (location.pathname === '/') {
      const el = document.getElementById('faq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/#faq');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#020b1c]/85 backdrop-blur-[20px] border-b border-white/10">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-3.5 flex items-center justify-between">
        {/* (i) Brand Logo */}
        <Link
          to="/"
          className="flex items-center focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg p-0.5"
          aria-label="OPTRAQ Homepage"
        >
          <OptraqLogo size={28} />
        </Link>

        {/* (ii) Center Nav Pill (Desktop) */}
        <nav
          className="hidden lg:flex h-[52px] px-6 items-center gap-[24px] bg-[rgba(10,7,7,0.45)] rounded-[13px] backdrop-blur-[17px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
          aria-label="Main Navigation"
        >
          {/* Home Link (Dynamic: Hidden when already on Home '/') */}
          {location.pathname !== '/' && (
            <Link
              to="/"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Home
            </Link>
          )}

          {/* Features Dropdown Button (1-5 Only) */}
          <div
            className="relative"
            onMouseEnter={() => setShowFeatures(true)}
            onMouseLeave={() => setShowFeatures(false)}
          >
            <button
              onClick={() => setShowFeatures((prev) => !prev)}
              className={`text-[14px] font-[450] leading-[14px] transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none ${
                isFeaturePage ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              type="button"
              aria-haspopup="true"
              aria-expanded={showFeatures}
            >
              <span>Features</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${showFeatures ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-3 w-72 rounded-2xl overflow-hidden z-50 bg-[#03152d]/95 border border-cyan-500/20 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] p-2"
                  role="menu"
                >
                  <div className="space-y-0.5">
                    {featureLinks.map((f) => (
                      <Link
                        key={f.path}
                        to={f.path}
                        onClick={() => setShowFeatures(false)}
                        className={`flex flex-col px-3 py-2 rounded-xl transition-all ${
                          location.pathname === f.path ? 'bg-cyan-500/15 text-white' : 'hover:bg-white/5 text-white/80 hover:text-white'
                        }`}
                      >
                        <span className="text-sm font-medium leading-none mb-1">{f.label}</span>
                        <span className="text-[11px] text-white/40 leading-none">{f.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Workbench (Dynamic: Hidden when already on '/workspace') */}
          {!location.pathname.startsWith('/workspace') && (
            <Link
              to="/workspace"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Workbench
            </Link>
          )}

          {/* Review (Dynamic: Hidden when already on '/review') */}
          {!location.pathname.startsWith('/review') && (
            <Link
              to="/review"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Review
            </Link>
          )}

          {/* Rules (Dynamic: Hidden when already on '/rules') */}
          {!location.pathname.startsWith('/rules') && (
            <Link
              to="/rules"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Rules
            </Link>
          )}

          {/* Team (Dynamic: Hidden when already on '/team') */}
          {!location.pathname.startsWith('/team') && (
            <Link
              to="/team"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Team
            </Link>
          )}

          {/* Visualize (Dynamic: Hidden when already on '/visualize') */}
          {!location.pathname.startsWith('/visualize') && (
            <Link
              to="/visualize"
              className="text-[14px] font-[450] leading-[14px] transition-colors text-white/80 hover:text-white"
            >
              Visualize
            </Link>
          )}

          <button
            type="button"
            onClick={handleFaqClick}
            className="text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>

          {/* Admin link strictly rendered for authenticated hardcoded admin */}
          {isAdmin && !location.pathname.startsWith('/admin') && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-[14px] font-[450] leading-[14px] transition-colors text-[#FF3344]/80 hover:text-[#FF3344]"
            >
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              Admin
            </Link>
          )}
        </nav>

        {/* (iii) Right Auth Pill / User Controls (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* BYOK Status Pill / Trigger Button (Only rendered when user is logged in) */}
          {user && (
            <button
              onClick={openApiKeyModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                hasApiKey
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15'
                  : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={hasApiKey ? 'Unlimited BYOK Active (Click to edit)' : 'Attach API Key for Unlimited Optimizations'}
              type="button"
            >
              {hasApiKey ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>Unlimited BYOK</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                  <span>+ API Key</span>
                </>
              )}
            </button>
          )}

          {/* User Authentication state */}
          {loading ? (
            <div className="w-24 h-9 rounded-xl bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                aria-label="User Profile"
              >
                <div className="relative">
                  <img
                    src={user.profile_picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name || 'user'}`}
                    alt=""
                    className="w-7 h-7 rounded-full ring-1 ring-white/20 object-cover"
                    aria-hidden="true"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#07080E]" />
                </div>
                <span className="text-xs font-medium text-white max-w-[120px] truncate">
                  {user.name || user.email}
                </span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                Logout
              </button>
            </div>
          ) : (
            !atAuth && (
              <div className="h-[52px] p-[3px] bg-[rgba(10,7,7,0.45)] rounded-[13px] backdrop-blur-[17px] border border-white/10 flex items-center gap-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <Link
                  to="/auth"
                  className="h-[46px] px-6 rounded-[11px] text-white text-[14px] font-[450] leading-[14px] hover:bg-white/5 transition-colors flex items-center"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="h-[46px] px-6 bg-[#E9E9E9] rounded-[11px] text-[#0A0707] text-[14px] font-[450] leading-[14px] hover:bg-white transition-colors flex items-center btn-shine"
                >
                  Try OPTRAQ
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-white/10 bg-[rgba(10,7,7,0.45)] backdrop-blur-[17px] transition-colors hover:bg-white/10 lg:hidden focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
          aria-label={showMobileNav ? 'Close menu' : 'Open menu'}
          aria-expanded={showMobileNav}
          onClick={() => setShowMobileNav((v) => !v)}
        >
          {showMobileNav ? (
            <X className="h-5 w-5 text-white" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-white" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {showMobileNav && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden px-6 pb-6 pt-3 border-t border-white/10 bg-[#020b1c]/95 backdrop-blur-3xl space-y-3"
        >
          <div className="flex flex-col gap-1.5">
            {location.pathname !== '/' && (
              <Link
                to="/"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Home
              </Link>
            )}

            {!location.pathname.startsWith('/workspace') && (
              <Link
                to="/workspace"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Workbench
              </Link>
            )}

            <div className="py-1 border-y border-white/5 my-1">
              <span className="text-[11px] font-mono text-cyan-400/80 px-3 uppercase tracking-wider">Features (1-5)</span>
              {featureLinks.map((f) => (
                <Link
                  key={f.path}
                  to={f.path}
                  onClick={() => setShowMobileNav(false)}
                  className="block px-3 py-1.5 text-xs text-white/70 hover:text-white"
                >
                  {f.label}
                </Link>
              ))}
            </div>

            {!location.pathname.startsWith('/review') && (
              <Link
                to="/review"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Review
              </Link>
            )}

            {!location.pathname.startsWith('/rules') && (
              <Link
                to="/rules"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Rules
              </Link>
            )}

            {!location.pathname.startsWith('/team') && (
              <Link
                to="/team"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Team
              </Link>
            )}

            {!location.pathname.startsWith('/visualize') && (
              <Link
                to="/visualize"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Visualize
              </Link>
            )}

            <button
              type="button"
              onClick={handleFaqClick}
              className="px-3 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10 text-left w-full cursor-pointer"
            >
              FAQ
            </button>

            {isAdmin && !location.pathname.startsWith('/admin') && (
              <Link
                to="/admin"
                onClick={() => setShowMobileNav(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-[#FF3344] bg-[#FF3344]/10"
              >
                Admin Panel
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  onClick={() => setShowMobileNav(false)}
                  className="flex-1 py-2 text-center rounded-xl border border-white/15 text-sm text-white"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setShowMobileNav(false)}
                  className="flex-1 py-2 text-center rounded-xl bg-white text-black text-sm font-medium"
                >
                  Try OPTRAQ
                </Link>
              </div>
            ) : (
              <button
                onClick={() => { logout(); setShowMobileNav(false); }}
                className="w-full py-2 rounded-xl border border-white/15 text-sm text-white/70"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

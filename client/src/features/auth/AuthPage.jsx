import React, { useRef, useState } from 'react';
import authService from '@/services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import HoneypotField from '@/components/forms/HoneypotField';
import { validateEmail, validatePassword, validateName, validateForm } from '@/lib/validation';
import { isHoneypotFilled, isTooFast, createSubmitThrottle, HONEYPOT_FIELD } from '@/lib/spamGuard';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', password: '', [HONEYPOT_FIELD]: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { login, refresh } = useAuth();
  const mountedAt = useRef(Date.now());
  const throttle = useRef(createSubmitThrottle());

  const from = (location.state && location.state.from) || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Spam gates (server rate limits remain authoritative).
    if (isHoneypotFilled(formData) || isTooFast(mountedAt.current) || !throttle.current()) {
      setError('Something looked automated. Please wait a moment and try again.');
      return;
    }
    const schema = { email: validateEmail, password: (v) => (isLogin ? (v ? '' : 'Password is required.') : validatePassword(v)) };
    if (!isLogin) schema.name = validateName;
    const problems = validateForm(formData, schema);
    if (Object.keys(problems).length > 0) {
      setFieldErrors(problems);
      return;
    }
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
  result = await login({ email: formData.email.trim(), password: formData.password });
      } else {
        result = await authService.register({ name: formData.name.trim(), email: formData.email.trim(), password: formData.password });
        if (result.success) {
          await login({ email: formData.email.trim(), password: formData.password });
        }
      }

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider) => {
    setLoading(true);
    setError('');
    const result = await authService.loginWithProvider(provider);
    setLoading(false);
    if (result.success) {
      await refresh();
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <AuthLayout>
      <div className="rounded-[24px] p-8 sm:p-9 bg-[#03152d]/80 backdrop-blur-[24px] border border-cyan-500/20 shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Top edge cyan bioluminescent glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            v0.4.0
          </span>
        </div>
        <p className="text-sm text-cyan-100/60 mb-6">
          {isLogin ? 'Sign in to continue optimizing and reviewing your code.' : 'Start optimizing code with deterministic verification.'}
        </p>

        {error && (
          <div role="alert" className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl mb-5 text-sm flex items-start gap-2.5">
            <span className="text-rose-400 shrink-0 mt-0.5">⚠️</span>
            <div className="flex-1">
              <p>{error}</p>
              {error.toLowerCase().includes('popup') && (
                <p className="text-xs text-rose-300/70 mt-1">
                  Tip: Please allow popups in your browser address bar to complete OAuth sign-in.
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <HoneypotField value={formData[HONEYPOT_FIELD]} onChange={handleInputChange} />
          {!isLogin && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-mono uppercase tracking-wider text-cyan-200/70 mb-1.5">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                autoComplete="name"
                aria-invalid={!!fieldErrors.name}
                className="bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl px-3.5 py-2.5 w-full text-sm outline-none transition-all placeholder:text-white/30"
                placeholder="Ada Lovelace"
              />
              {fieldErrors.name && <p className="text-xs text-rose-400 mt-1">{fieldErrors.name}</p>}
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-mono uppercase tracking-wider text-cyan-200/70 mb-1.5">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              className="bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl px-3.5 py-2.5 w-full text-sm outline-none transition-all placeholder:text-white/30"
              placeholder="developer@example.com"
            />
            {fieldErrors.email && <p className="text-xs text-rose-400 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="auth-password" className="block text-xs font-mono uppercase tracking-wider text-cyan-200/70">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-cyan-400/80 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={8}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              aria-invalid={!!fieldErrors.password}
              className="bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl px-3.5 py-2.5 w-full text-sm outline-none transition-all placeholder:text-white/30"
              placeholder="••••••••••••"
            />
            {fieldErrors.password && <p className="text-xs text-rose-400 mt-1">{fieldErrors.password}</p>}
            {!isLogin && !fieldErrors.password && (
              <p className="text-xs text-white/40 mt-1">Minimum 8 characters with letters & numbers</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-[#020b1c] font-medium text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_4px_20px_rgba(0,229,255,0.25)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign In with Email' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setFieldErrors({}); }}
              className="text-cyan-400 hover:text-cyan-300 font-medium ml-1 transition-colors underline-offset-4 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-3 text-xs uppercase font-mono tracking-wider text-white/40 mb-4">
            <span className="h-px bg-white/10 flex-1" />
            <span>Or continue with</span>
            <span className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocial('google')}
              className="flex items-center justify-center gap-2.5 h-[44px] rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 text-white text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocial('github')}
              className="flex items-center justify-center gap-2.5 h-[44px] rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 text-white text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;


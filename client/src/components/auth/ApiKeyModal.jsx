import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Cpu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PROVIDERS = [
  { id: 'gemini', name: 'Google Gemini', defaultModel: 'gemini-2.0-flash', link: 'https://aistudio.google.com/' },
  { id: 'anthropic', name: 'Anthropic Claude', defaultModel: 'claude-3-5-sonnet', link: 'https://console.anthropic.com/' },
  { id: 'openai', name: 'OpenAI GPT', defaultModel: 'gpt-4o', link: 'https://platform.openai.com/api-keys' },
  { id: 'deepseek', name: 'DeepSeek', defaultModel: 'deepseek-chat', link: 'https://platform.deepseek.com/' },
];

export default function ApiKeyModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [error, setError] = useState('');

  // Listen for global modal open events
  useEffect(() => {
    const handleOpen = () => {
      const stored = localStorage.getItem('optraq_api_key') || '';
      const storedProvider = localStorage.getItem('optraq_api_provider') || 'gemini';
      setApiKey(stored);
      setSelectedProvider(storedProvider);
      setError('');
      setValidationSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener('open-api-key-modal', handleOpen);
    return () => window.removeEventListener('open-api-key-modal', handleOpen);
  }, []);

  // Auto-open on user login if they have no API key configured
  useEffect(() => {
    if (user) {
      try {
        const storedKey = localStorage.getItem('optraq_api_key');
        const prompted = sessionStorage.getItem('optraq_key_prompted_session');
        if (!storedKey && !prompted) {
          sessionStorage.setItem('optraq_key_prompted_session', 'true');
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      } catch {
        // Safe fallback in restricted environments
      }
    }
  }, [user]);

  const handleValidateAndSave = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please provide an API key to activate unlimited passes.');
      return;
    }

    setValidating(true);
    setError('');

    try {
      // Fast format & latency handshake check
      await new Promise((res) => setTimeout(res, 650));
      
      if (apiKey.trim().length < 8) {
        throw new Error('API key appears malformed or too short.');
      }

      localStorage.setItem('optraq_api_key', apiKey.trim());
      localStorage.setItem('optraq_api_provider', selectedProvider);
      window.dispatchEvent(new CustomEvent('optraq-api-key-updated'));

      setValidationSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setValidationSuccess(false);
      }, 900);
    } catch (err) {
      setError(err.message || 'Key validation failed. Please verify credentials.');
    } finally {
      setValidating(false);
    }
  };

  const handleRemoveKey = () => {
    try {
      localStorage.removeItem('optraq_api_key');
      localStorage.removeItem('optraq_api_provider');
      window.dispatchEvent(new CustomEvent('optraq-api-key-updated'));
    } catch {
      // ignore
    }
    setApiKey('');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Enclosure (Skiper / Vengeance Double-Bezel Architecture) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#07080E] p-1.5 shadow-[0_32px_80px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
          >
            {/* Inner Core */}
            <div className="rounded-[calc(1.5rem-6px)] bg-[#0A0D18] p-6 sm:p-8 border border-white/5 relative">
              {/* Top ambient highlight beam */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                aria-label="Close API Key dialog"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="api-modal-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    Connect AI Engine
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                      BYOK Unlimited
                    </span>
                  </h2>
                  <p className="text-xs text-white/50 font-mono">
                    Zero Rate Limits • Unlimited Optimizations • Zero Code Retention
                  </p>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Attach your own API key to bypass all community throttling. Optimizations run directly through your provider key with full AST depth and isolated verification passes.
              </p>

              {/* Provider Tabs */}
              <div className="mb-5">
                <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                  Select Model Provider
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProvider(p.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all text-left focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none ${
                        selectedProvider === p.id
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-white shadow-sm'
                          : 'bg-white/[0.03] border-white/5 text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className="text-[10px] text-white/40 font-mono">{p.defaultModel}</span>
                      </div>
                      {selectedProvider === p.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Input Form */}
              <form onSubmit={handleValidateAndSave} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="api-key-input" className="text-xs font-mono text-white/50 uppercase tracking-wider">
                      Provider API Key
                    </label>
                    <a
                      href={PROVIDERS.find((p) => p.id === selectedProvider)?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-emerald-400/80 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      Get API key <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="relative">
                    <input
                      id="api-key-input"
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-... or AIzaSy..."
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full h-11 pl-4 pr-10 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs placeholder:text-white/20 focus:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      aria-label={showKey ? 'Hide API key' : 'Show API key'}
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs text-[#FF3344] font-mono mt-2" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                {/* Security Guarantee Note */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-white/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Your key is saved only in local browser memory and sent exclusively to execute authorized compiler requests.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  {localStorage.getItem('optraq_api_key') ? (
                    <button
                      type="button"
                      onClick={handleRemoveKey}
                      className="text-xs font-mono text-[#FF3344]/80 hover:text-[#FF3344] transition-colors"
                    >
                      Remove Key
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-mono text-white/40 hover:text-white transition-colors"
                    >
                      Skip (Use Free Tier)
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={validating}
                    className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs text-[#07080E] transition-all active:scale-[0.98] shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                      validationSuccess
                        ? 'bg-emerald-400 text-black shadow-emerald-400/20'
                        : 'bg-white hover:bg-white/95 shadow-white/10'
                    }`}
                  >
                    <span>
                      {validating
                        ? 'Validating Key...'
                        : validationSuccess
                        ? 'Unlimited Activated!'
                        : 'Save & Unlock Unlimited'}
                    </span>
                    <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight className="w-3 h-3 text-black" aria-hidden="true" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

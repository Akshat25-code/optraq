import React from 'react';
import { motion } from 'framer-motion';

export default function OptimizerHeader({
  backendHealthy,
  task,
  taskLabels,
  currentSessionId,
  isOptimizing,
  handleOptimizeCode,
  handleRunCode,
  isRunning,
  handleSaveSession,
  saving,
  onOpenGitHubModal,
  onOpenCommandPalette,
}) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-white">
            AI Code Optimizer Pro
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
            PRO MAX
          </span>
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className={`w-2 h-2 rounded-full ${backendHealthy ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-rose-400'}`} />
          {backendHealthy ? 'System Active' : 'Offline Mode'}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCommandPalette}
          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition flex items-center gap-2"
        >
          <span>Cmd + K</span>
          <span className="text-gray-500">Search</span>
        </button>

        <button
          onClick={onOpenGitHubModal}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
        >
          GitHub Import
        </button>

        <button
          onClick={handleSaveSession}
          disabled={saving}
          className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Session'}
        </button>

        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOptimizeCode}
          disabled={isOptimizing}
          className="px-5 py-1.5 rounded-xl bg-[#E9E9E9] hover:bg-white text-xs font-bold text-[#0A0707] transition disabled:opacity-50"
        >
          {isOptimizing ? 'Analyzing...' : 'Optimize Code'}
        </motion.button>
      </div>
    </header>
  );
}


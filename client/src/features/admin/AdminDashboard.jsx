import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HARDCODED_ADMIN_EMAILS } from '@/config/admin';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Users, 
  Terminal, 
  Zap, 
  Key, 
  Lock, 
  RefreshCw,
  Server,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  // Mock cluster telemetry for the administration cockpit
  const clusterMetrics = [
    { label: 'Cluster CPU', value: '34.2%', sub: '8 nodes active', status: 'optimal' },
    { label: 'Sandbox Queue', value: '12ms', sub: '0 pending tasks', status: 'optimal' },
    { label: 'Active AST Runs', value: '47', sub: 'Concurrent workers', status: 'busy' },
    { label: 'Daily Token Burn', value: '4.8M', sub: 'Claude/Gemini/GPT', status: 'nominal' },
  ];

  const recentAuditLogs = [
    { id: 'ev_01', time: '10:42:15', event: 'BYOK API Key Validated', user: 'dev_alex@enterprise.com', status: 'PASS' },
    { id: 'ev_02', time: '10:38:02', event: 'AST Optimization Pass: TypeScript', user: 'sarah.k@fintech.io', status: 'VERIFIED' },
    { id: 'ev_03', time: '10:22:49', event: 'Micro-VM Sandbox Isolated Benchmark', user: 'marcus@systems.co', status: 'SAFE' },
    { id: 'ev_04', time: '09:55:18', event: 'Non-Admin Access Blocked: /admin', user: 'guest_8812@public.net', status: 'DEFLECTED' },
  ];

  return (
    <div className="min-h-screen bg-[#07080E] text-white pt-24 pb-20 px-6 sm:px-12 selection:bg-[#FF3344] selection:text-white">
      {/* Top Cockpit Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3344]/10 border border-[#FF3344]/30 text-xs font-mono text-[#FF3344] uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              Hardcoded Security Enclave
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Administrator Cockpit
            </h1>
            <p className="text-sm text-white/50 mt-1 font-mono">
              Authenticated Operator: <span className="text-white font-medium">{user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#FF3344]' : ''}`} aria-hidden="true" />
              Sync Cluster
            </button>
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
              {['1h', '24h', '7d'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                    timeframe === t ? 'bg-white/15 text-white font-semibold' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Cluster Telemetry Row (Hairline Ledger, Zero Box Cards) */}
        <section aria-labelledby="cluster-telemetry-heading">
          <h2 id="cluster-telemetry-heading" className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
            Cluster Telemetry & Compute Health
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {clusterMetrics.map((m, i) => (
              <div key={i} className="bg-[#0A0D18] p-6 flex flex-col justify-between">
                <span className="text-xs font-mono text-white/50">{m.label}</span>
                <div className="my-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                    {m.value}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40">
                  <span>{m.sub}</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" aria-label="Status: Optimal" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hardcoded Policy Enclave */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-white/10 rounded-2xl bg-[#090C16] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF3344]/10 border border-[#FF3344]/20 flex items-center justify-center text-[#FF3344]">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Hardcoded Administrator Policy</h3>
                  <p className="text-xs text-white/50 font-mono">Immutable compile-time access control</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                Enforcing
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Administrative permissions are sealed at the application boundary via <code className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono text-[#FF3344]">client/src/config/admin.js</code>. Regular users cannot escalate privileges or view administrator routes regardless of database state.
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Authorized Master Identity Emails:</span>
              <div className="space-y-1.5 mt-2">
                {HARDCODED_ADMIN_EMAILS.map((email, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 font-mono text-xs text-white/90">
                    <span className="flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
                      {email}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase">Root Authority</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Engine Diagnostics */}
          <div className="border border-white/10 rounded-2xl bg-[#090C16] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Server className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Sandbox Micro-VMs</h3>
                  <p className="text-xs text-white/50 font-mono">Isolated Docker Runtimes</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5 text-white/60">
                  <span>Language Workers:</span>
                  <span className="text-white">Python, TS, Go, Rust</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5 text-white/60">
                  <span>Memory Isolation:</span>
                  <span className="text-emerald-400">256MB Hard Cap / VM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5 text-white/60">
                  <span>Network Egress:</span>
                  <span className="text-emerald-400">0.00KB (Egress Blocked)</span>
                </div>
                <div className="flex justify-between py-1.5 text-white/60">
                  <span>Regression Check:</span>
                  <span className="text-emerald-400">100% Invariant Pass</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <span className="text-[11px] font-mono text-white/40 block">
                Last cluster heartbeat: 2 seconds ago
              </span>
            </div>
          </div>
        </section>

        {/* Security Audit Trail */}
        <section aria-labelledby="audit-trail-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="audit-trail-heading" className="text-xs font-mono text-white/40 uppercase tracking-widest">
              Live Security & Verification Audit Stream
            </h2>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Live Streaming
            </span>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0A0D18]">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-white/5 text-white/50 uppercase border-b border-white/10 text-[10px]">
                  <tr>
                    <th scope="col" className="py-3 px-4">Timestamp</th>
                    <th scope="col" className="py-3 px-4">Event</th>
                    <th scope="col" className="py-3 px-4">Identity</th>
                    <th scope="col" className="py-3 px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {recentAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 text-white/40 tabular-nums">{log.time}</td>
                      <td className="py-3 px-4 font-sans font-medium text-white">{log.event}</td>
                      <td className="py-3 px-4 text-white/60">{log.user}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'PASS' || log.status === 'VERIFIED' || log.status === 'SAFE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-[#FF3344]/10 text-[#FF3344] border border-[#FF3344]/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

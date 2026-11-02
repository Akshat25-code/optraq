import React from 'react';

/* Client-side paging: lists render one page, never everything at once.
   Reset to first page whenever the underlying list length changes. */
export function usePager(items, pageSize = 15) {
  const [page, setPage] = React.useState(0);
  const total = Math.max(1, Math.ceil(items.length / pageSize));
  const safe = Math.min(page, total - 1);
  React.useEffect(() => {
    setPage(0);
  }, [items.length]);
  const start = safe * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    page: safe,
    total,
    totalItems: items.length,
    start,
    pageSize,
    setPage,
  };
}

function pageWindow(page, total) {
  const pages = new Set([0, total - 1, page - 1, page, page + 1]);
  return [...pages].filter((p) => p >= 0 && p < total).sort((a, b) => a - b);
}

export default function Pager({ pager, onChange }) {
  const { page, total, totalItems, start, pageSize } = pager;
  if (total <= 1) return null;
  const end = Math.min(start + pageSize, totalItems);
  const go = (p) => onChange(Math.min(Math.max(p, 0), total - 1));
  const btn =
    'min-h-[44px] min-w-[44px] px-2 rounded-lg text-sm transition-colors disabled:opacity-40';
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-3 pt-3">
      <p className="text-xs text-muted">
        Showing {start + 1}–{end} of {totalItems}
      </p>
      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => go(page - 1)} className={`${btn} border border-white/10 text-white hover:bg-white/10`}>
          ‹
        </button>
        {pageWindow(page, total).map((p) => (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p + 1}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => go(p)}
            className={`${btn} border ${p === page ? 'border-white/30 bg-white/10 text-white' : 'border-transparent text-white/60 hover:bg-white/10'}`}
          >
            {p + 1}
          </button>
        ))}
        <button type="button" aria-label="Next page" disabled={page === total - 1} onClick={() => go(page + 1)} className={`${btn} border border-white/10 text-white hover:bg-white/10`}>
          ›
        </button>
      </div>
    </nav>
  );
}

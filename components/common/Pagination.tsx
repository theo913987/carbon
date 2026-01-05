
import React from 'react';

interface PaginationProps {
  total: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ total, currentPage = 1, pageSize = 10, onPageChange, className = '' }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={`p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500 ${className}`}>
       <span>共 {total} 条</span>
       <select className="border border-slate-200 rounded px-2 py-1 bg-white outline-none cursor-pointer">
          <option value={10}>10条/页</option>
          <option value={20}>20条/页</option>
          <option value={50}>50条/页</option>
       </select>
       <div className="flex gap-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &lt;
          </button>
          <button className="w-8 h-8 border rounded bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            {currentPage}
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &gt;
          </button>
       </div>
       <div className="flex items-center gap-2">
          <span>前往</span>
          <input type="text" defaultValue={currentPage} className="w-10 h-8 border rounded text-center outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
          <span>页</span>
       </div>
    </div>
  );
};


import React from 'react';

interface StatusBadgeProps {
  status: string; // The raw status code or label
  label?: string; // Optional override for display text
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const displayLabel = label || status;
  
  // Normalize status for checking
  const checkStatus = status?.toUpperCase() || '';

  // Green / Success
  if (['NORMAL', 'ISSUED', 'PUBLISHED', 'APPROVED', '已开户', '已签发', '已发布', '正常', '已开发'].includes(checkStatus)) {
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 ${className}`}>{displayLabel}</span>;
  }
  
  // Amber / Warning / Pending
  if (['PENDING', 'INITIATION', 'VALIDATION', 'RECORD_FILING', 'DRAFT', '待审核', '审定中', '已备案', '未发布', '待审批', 'INITIATION'].includes(checkStatus)) {
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 ${className}`}>{displayLabel}</span>;
  }
  
  // Slate / Disabled / Grey
  if (['DISABLED', 'OFFLINE', 'UNPUBLISHED', '禁用', '已下线', '未绑定'].includes(checkStatus)) {
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 ${className}`}>{displayLabel}</span>;
  }

  // Red / Error
  if (['REJECTED', '已驳回', '已删除'].includes(checkStatus)) {
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100 ${className}`}>{displayLabel}</span>;
  }

  // Blue / Info (Default)
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 ${className}`}>{displayLabel}</span>;
};

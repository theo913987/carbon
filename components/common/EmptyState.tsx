
import React from 'react';
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "暂无数据", 
  description = "当前条件下没有找到相关记录，请尝试调整筛选条件或创建新记录。",
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <FileSearch size={40} className="text-slate-300" />
      </div>
      <h3 className="text-slate-800 font-medium text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

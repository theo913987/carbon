
import React from 'react';
import { FilePlus, BookOpen, LineChart, Building2 } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    { 
      id: 1, 
      title: '项目立项', 
      desc: '查看项目立项，提供碳信用项目立项报表模板', 
      icon: FilePlus, 
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      target: 'project_create'
    },
    { 
      id: 2, 
      title: '项目方法学', 
      desc: '涵盖国内外各类碳信用开发方法学，最全方法', 
      icon: BookOpen, 
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      target: 'methodology'
    },
    { 
      id: 3, 
      title: '交易行情', 
      desc: '国内碳交易行情纵览，随时掌握交易动态', 
      icon: LineChart, 
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      target: 'trading'
    },
    { 
      id: 4, 
      title: '交易所开户', 
      desc: '国内外权威碳交易所列目，支持各大交易所开户', 
      icon: Building2, 
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      target: 'exchanges'
    },
  ];

  return (
    <div className="flex flex-col mt-8 mb-8">
      <div className="mb-4">
        <h3 className="font-medium text-slate-800 text-lg">常用功能</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div 
              key={action.id} 
              onClick={() => onNavigate(action.target)}
              className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
            >
              <div className="flex items-center gap-3 mb-3">
                 <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center ${action.color}`}>
                   <Icon size={20} />
                 </div>
                 <span className="font-medium text-slate-700">{action.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {action.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { LayoutDashboard, Leaf, LineChart, FileCheck, Settings, Users, Building, ScrollText, PieChart, BookOpen, Table, FileText, ArrowLeftRight, MessageSquareText, Landmark, Newspaper, UserCog, Building2, BellDot, BookOpenCheck, FolderKanban, FileStack, ArrowRightLeft, Shield, BookA, ClipboardCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: '系统看板', icon: LayoutDashboard, roles: [UserRole.OWNER, UserRole.PROVIDER, UserRole.ADMIN] },
    { id: 'news', label: '碳资讯', icon: Newspaper, roles: [UserRole.OWNER, UserRole.PROVIDER, UserRole.ADMIN] },
    { id: 'exchanges', label: '交易所管理', icon: Landmark, roles: [UserRole.OWNER, UserRole.ADMIN] },
    { id: 'assets', label: '碳资产开发', icon: Leaf, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'schedule', label: '开发进度', icon: Table, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'files', label: '项目文档管理', icon: FileText, roles: [UserRole.OWNER, UserRole.PROVIDER, UserRole.ADMIN] },
    { id: 'methodology', label: '方法学管理', icon: BookOpen, roles: [UserRole.OWNER, UserRole.PROVIDER, UserRole.ADMIN] },
    { id: 'credits', label: '碳信用资产', icon: ScrollText, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'quotas', label: '碳配额资产', icon: PieChart, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'supply_demand', label: '供需行情', icon: ArrowLeftRight, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'inquiries', label: '询报价管理', icon: MessageSquareText, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'trading', label: '碳交易管理', icon: LineChart, roles: [UserRole.OWNER, UserRole.PROVIDER] },
    { id: 'approvals', label: '审批管理', icon: FileCheck, roles: [UserRole.ADMIN] },
    { id: 'platform_approval', label: '平台审批', icon: ClipboardCheck, roles: [UserRole.ADMIN] },
    { id: 'accounts', label: '账户管理', icon: Users, roles: [UserRole.OWNER, UserRole.ADMIN] },
    { id: 'system_roles', label: '系统角色管理', icon: Shield, roles: [UserRole.ADMIN] },
    { id: 'system_accounts', label: '系统账户管理', icon: UserCog, roles: [UserRole.ADMIN] },
    { id: 'system_tenants', label: '系统租户管理', icon: Building2, roles: [UserRole.ADMIN] },
    { id: 'system_news', label: '系统资讯管理', icon: BellDot, roles: [UserRole.ADMIN] },
    { id: 'system_exchanges', label: '系统交易所管理', icon: ArrowRightLeft, roles: [UserRole.ADMIN] },
    { id: 'system_methodology', label: '系统方法学管理', icon: BookOpenCheck, roles: [UserRole.ADMIN] },
    { id: 'system_project_lib', label: '系统项目库管理', icon: FolderKanban, roles: [UserRole.ADMIN] },
    { id: 'system_project_docs', label: '系统项目文档管理', icon: FileStack, roles: [UserRole.ADMIN] },
    { id: 'system_dict', label: '系统字典管理', icon: BookA, roles: [UserRole.ADMIN] },
    { id: 'enterprise', label: '企业信息', icon: Building, roles: [UserRole.OWNER, UserRole.ADMIN] },
  ];

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 flex flex-col h-full shadow-xl transition-all duration-300 ease-in-out relative flex-shrink-0 z-20`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 text-slate-400 rounded-full p-1 hover:text-white shadow-md z-30"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Area */}
      <div className={`p-6 flex items-center gap-3 border-b border-slate-700 ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <div className="w-8 h-8 min-w-[2rem] bg-emerald-500 rounded-lg flex items-center justify-center">
          <Leaf className="text-white w-5 h-5" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <h1 className="text-white font-bold text-sm leading-tight tracking-wide">碳中和</h1>
            <h1 className="text-emerald-400 font-bold text-xs leading-tight tracking-wide">数字碳资产管理系统</h1>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          if (!item.roles.includes(userRole)) return null;
          
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-600/20 text-emerald-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className={`${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'} min-w-[20px]`} />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={() => setActiveTab('settings')}
          title={isCollapsed ? '系统设置' : ''}
          className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
            activeTab === 'settings' 
            ? 'bg-emerald-600/20 text-emerald-400' 
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings size={18} className={`${activeTab === 'settings' ? 'text-emerald-400' : 'text-slate-400'} min-w-[18px]`} />
          {!isCollapsed && <span className="font-medium whitespace-nowrap">系统设置</span>}
        </button>
      </div>
    </aside>
  );
};

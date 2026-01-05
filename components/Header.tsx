
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ShieldCheck, LogOut, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { UserRole } from '../types';
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from '../constants';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userName: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, userName, onNavigate, onLogout }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Generate consistent avatar based on username using UI Avatars
  // Green background (10b981) to match theme, white text
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=10b981&color=fff&size=100&bold=true`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: '新项目审核通过', desc: '您的“甘肃风电项目”已通过初审。', time: '10分钟前', type: 'success' },
    { id: 2, title: '系统维护通知', desc: '平台将于今晚 02:00 进行例行维护。', time: '2小时前', type: 'info' },
    { id: 3, title: '账户安全提醒', desc: '检测到新的设备登录您的账户。', time: '1天前', type: 'warning' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索资产、项目..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
        
        {/* Role Switcher for Demo */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">当前视角:</span>
          <select 
            value={userRole} 
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>{ROLE_LABELS[role]}</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-slate-400 hidden lg:block truncate max-w-xs" title={ROLE_DESCRIPTIONS[userRole]}>
          {ROLE_DESCRIPTIONS[userRole]}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mr-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold tracking-wide">区块链已同步</span>
          <ShieldCheck size={14} />
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2 transition-colors rounded-full ${isNotificationsOpen ? 'bg-slate-100 text-slate-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right overflow-hidden">
               <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h4 className="font-bold text-slate-700 text-sm">消息通知</h4>
                  <span className="text-xs text-emerald-600 cursor-pointer hover:underline">全部已读</span>
               </div>
               <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map(note => (
                    <div key={note.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                       <div className={`mt-1 flex-shrink-0`}>
                          {note.type === 'success' && <CheckCircle size={16} className="text-emerald-500" />}
                          {note.type === 'info' && <Info size={16} className="text-blue-500" />}
                          {note.type === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                       </div>
                       <div>
                          <div className="text-sm font-medium text-slate-800">{note.title}</div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2">{note.desc}</div>
                          <div className="text-[10px] text-slate-400 mt-2">{note.time}</div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-2 text-center border-t border-slate-100">
                  <button className="text-xs text-slate-500 hover:text-emerald-600 py-1 w-full">查看全部通知</button>
               </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" onClick={() => onNavigate('profile')}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{userName || 'User'}</p>
            <p className="text-xs text-slate-500 capitalize">{ROLE_LABELS[userRole].split(' ')[0]}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all ml-1 cursor-pointer"
          title="退出登录"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

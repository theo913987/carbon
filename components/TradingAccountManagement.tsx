import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { MOCK_TRADING_ACCOUNTS } from '../constants';
import { TradingAccount } from '../types';

interface TradingAccountManagementProps {
  onNavigate: (tab: string) => void;
}

export const TradingAccountManagement: React.FC<TradingAccountManagementProps> = ({ onNavigate }) => {
  const [accounts, setAccounts] = useState<TradingAccount[]>(MOCK_TRADING_ACCOUNTS);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setAccounts(MOCK_TRADING_ACCOUNTS);
      return;
    }
    const filtered = MOCK_TRADING_ACCOUNTS.filter(acc => 
      acc.accountName.includes(searchKeyword) || 
      acc.exchangeName.includes(searchKeyword)
    );
    setAccounts(filtered);
  };

  const handleView = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('暂无链接');
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
         <div className="flex-1 max-w-md flex items-center relative">
            <span className="absolute left-3 text-slate-500 text-sm font-medium border-r border-slate-300 pr-3 mr-3">搜索</span>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入账户名或交易所名称" 
              className="w-full pl-16 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearch}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           查询
         </button>
         <button 
           onClick={() => onNavigate('exchanges')}
           className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
         >
           <Plus size={14} /> 开户
         </button>
         <button 
           onClick={() => onNavigate('profile_trading')}
           className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
         >
           绑定交易账号
         </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-16">
               <tr>
                  <th className="px-6 w-16">序号</th>
                  <th className="px-6 w-48">账号名</th>
                  <th className="px-6 w-48">交易所</th>
                  <th className="px-6 w-32">开户时间</th>
                  <th className="px-6">业务范围</th>
                  <th className="px-6 w-24 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {accounts.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-16">
                     <td className="px-6 text-slate-500">{idx + 1}</td>
                     <td className="px-6 font-medium text-slate-800">{item.accountName}</td>
                     <td className="px-6 text-slate-600">{item.exchangeName}</td>
                     <td className="px-6 text-slate-500">{item.createdTime || '--'}</td>
                     <td className="px-6 text-slate-600 text-xs leading-relaxed line-clamp-2 py-4" title={item.businessScope}>
                        {item.businessScope || '--'}
                     </td>
                     <td className="px-6 text-center">
                        <button 
                          onClick={() => handleView(item.url)}
                          className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap"
                        >
                           查看
                        </button>
                     </td>
                  </tr>
               ))}
               {accounts.length === 0 && (
                  <tr>
                     <td colSpan={6} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {accounts.length} 条</span>
           <select className="border border-slate-200 rounded px-2 py-1 bg-white">
              <option>10条/页</option>
           </select>
           <div className="flex gap-1">
              <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&lt;</button>
              <button className="w-8 h-8 border rounded bg-emerald-600 text-white">1</button>
              <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&gt;</button>
           </div>
           <div className="flex items-center gap-2">
              <span>前往</span>
              <input type="text" defaultValue="1" className="w-10 h-8 border rounded text-center" />
              <span>页</span>
           </div>
        </div>
      </div>

    </div>
  );
};
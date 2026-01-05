import React, { useState } from 'react';
import { Search, ExternalLink, X } from 'lucide-react';
import { MOCK_EXCHANGES } from '../constants';
import { Exchange } from '../types';

export const ExchangeManagement: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>(MOCK_EXCHANGES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'OPEN_ACCOUNT' | 'TRADE';
    targetUrl: string;
  }>({ isOpen: false, type: 'OPEN_ACCOUNT', targetUrl: '' });

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setExchanges(MOCK_EXCHANGES);
      return;
    }
    const filtered = MOCK_EXCHANGES.filter(ex => 
      ex.name.includes(searchKeyword) || 
      ex.city.includes(searchKeyword) ||
      ex.businessScope.includes(searchKeyword)
    );
    setExchanges(filtered);
  };

  const handleOpenAccount = (url: string) => {
    setModalState({ isOpen: true, type: 'OPEN_ACCOUNT', targetUrl: url });
  };

  const handleTrade = (url: string) => {
    setModalState({ isOpen: true, type: 'TRADE', targetUrl: url });
  };

  const confirmAction = () => {
    window.open(modalState.targetUrl, '_blank');
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
         <div className="flex-1 max-w-md flex items-center relative">
            <span className="absolute left-3 text-slate-500 text-sm font-medium border-r border-slate-300 pr-3 mr-3">搜索</span>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="名称、编号、关键字等" 
              className="w-full pl-16 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearch}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           查询
         </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-16">
               <tr>
                  <th className="px-6 w-16">序号</th>
                  <th className="px-6 w-48">交易所名称</th>
                  <th className="px-6 w-24 text-center">城市</th>
                  <th className="px-6">业务范围</th>
                  <th className="px-6 w-48 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {exchanges.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-16">
                     <td className="px-6 text-slate-500">{idx + 1}</td>
                     <td className="px-6 font-medium text-slate-800">{item.name}</td>
                     <td className="px-6 text-slate-600 text-center">{item.city}</td>
                     <td className="px-6 text-slate-600 text-xs leading-relaxed line-clamp-2 py-4" title={item.businessScope}>
                        {item.businessScope}
                     </td>
                     <td className="px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => window.open(item.detailUrl, '_blank')}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                           >
                              查看
                           </button>
                           <button 
                             onClick={() => handleOpenAccount(item.website)}
                             className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap"
                           >
                              开户
                           </button>
                           <button 
                             onClick={() => handleTrade(item.website)}
                             className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap"
                           >
                              交易
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {exchanges.length === 0 && (
                  <tr>
                     <td colSpan={5} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {exchanges.length} 条</span>
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

      {/* Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded shadow-xl w-[560px] animate-in zoom-in-95 duration-200 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-lg font-medium text-slate-800">提示</h3>
                 <button onClick={() => setModalState({...modalState, isOpen: false})} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-8 pb-4">
                 <p className="text-slate-600 mb-8">
                    {modalState.type === 'OPEN_ACCOUNT' ? '是否确认开户？' : '是否确认交易？'}
                 </p>
                 <div className="flex justify-end">
                    <button 
                      onClick={confirmAction}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors"
                    >
                       确 定
                    </button>
                 </div>
              </div>

              {/* Footer */}
              <div className="bg-emerald-50/50 p-4 mt-4 flex items-center justify-between border-t border-emerald-100">
                 <span className="text-emerald-600 text-sm">如需帮助，可添加交易专员企业微信，为您做开户引导服务</span>
                 <div className="w-12 h-12 bg-white p-1 rounded shadow-sm">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ServiceSupport" 
                      alt="QR" 
                      className="w-full h-full"
                    />
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
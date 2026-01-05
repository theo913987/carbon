
import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { MOCK_EXCHANGES } from '../constants';
import { Exchange } from '../types';

export const SystemExchangeManagement: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>(MOCK_EXCHANGES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Search Logic
  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setExchanges(MOCK_EXCHANGES);
      return;
    }
    const filtered = MOCK_EXCHANGES.filter(ex => 
      ex.name.includes(searchKeyword) || 
      ex.city.includes(searchKeyword)
    );
    setExchanges(filtered);
  };

  // Actions
  const handleView = (url?: string) => {
    if (url) window.open(url, '_blank');
    else alert('暂无详情链接');
  };

  const handleEdit = (url?: string) => {
    if (url) window.open(url, '_blank');
    else alert('暂无编辑链接');
  };

  const handlePublish = (id: string) => {
    setExchanges(prev => prev.map(ex => ex.id === id ? { ...ex, status: 'PUBLISHED' as const } : ex));
    alert('发布成功');
  };

  const handleOffline = (id: string) => {
    setExchanges(prev => prev.map(ex => ex.id === id ? { ...ex, status: 'UNPUBLISHED' as const } : ex));
    alert('下线成功');
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setExchanges(prev => prev.filter(ex => ex.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      alert('删除成功');
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'PUBLISHED': return '已发布';
      case 'UNPUBLISHED': return '未发布';
      default: return status;
    }
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
              placeholder="输入名称" 
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
                  <th className="px-6 w-24">城市</th>
                  <th className="px-6">业务范围</th>
                  <th className="px-6 w-24 text-center">状态</th>
                  <th className="px-6 w-64 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {exchanges.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-20">
                     <td className="px-6 text-slate-500">{idx + 1}</td>
                     <td className="px-6 font-medium text-slate-800">{item.name}</td>
                     <td className="px-6 text-slate-600">{item.city}</td>
                     <td className="px-6 text-slate-600 text-xs leading-relaxed line-clamp-2 py-2" title={item.businessScope}>
                        {item.businessScope}
                     </td>
                     <td className="px-6 text-center">
                        <span className={item.status === 'PUBLISHED' ? 'text-slate-600' : 'text-amber-600'}>
                           {getStatusLabel(item.status)}
                        </span>
                     </td>
                     <td className="px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => handleView(item.detailUrl)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                           >
                              查看
                           </button>
                           
                           {/* Using 'website' as edit link mock */}
                           <button 
                             onClick={() => handleEdit(item.website)}
                             className={`font-medium text-xs whitespace-nowrap ${item.status === 'PUBLISHED' ? 'text-slate-400 cursor-not-allowed' : 'text-emerald-500 hover:text-emerald-700'}`}
                           >
                              编辑
                           </button>

                           {item.status === 'PUBLISHED' ? (
                              <span className="text-blue-300 font-medium text-xs whitespace-nowrap cursor-not-allowed">发布</span>
                           ) : (
                              <button 
                                onClick={() => handlePublish(item.id)}
                                className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                              >
                                 发布
                              </button>
                           )}

                           {item.status === 'PUBLISHED' ? (
                              <button 
                                onClick={() => handleOffline(item.id)}
                                className="text-red-500 hover:text-red-700 font-medium text-xs whitespace-nowrap"
                              >
                                 下线
                              </button>
                           ) : (
                              <span className="text-slate-400 font-medium text-xs whitespace-nowrap cursor-not-allowed">下线</span>
                           )}

                           <button 
                             onClick={() => handleDeleteClick(item.id)}
                             className="text-red-500 hover:text-red-700 font-medium text-xs whitespace-nowrap"
                           >
                              删除
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {exchanges.length === 0 && (
                  <tr>
                     <td colSpan={6} className="text-center py-10 text-slate-400">暂无数据</td>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded shadow-xl w-[400px] animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                 <h3 className="text-base font-medium text-slate-800">提示</h3>
                 <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
              </div>
              <div className="p-8 text-center text-slate-600">
                 删除内容不可复原，请谨慎操作
              </div>
              <div className="flex justify-center gap-4 pb-6">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 border border-emerald-500 text-emerald-600 rounded text-sm hover:bg-emerald-50 transition-colors">取消</button>
                 <button onClick={confirmDelete} className="px-6 py-2 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 transition-colors">确定</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

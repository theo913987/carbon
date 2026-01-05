
import React, { useState } from 'react';
import { Search, Plus, X, RefreshCw } from 'lucide-react';
import { MOCK_ARTICLES } from '../constants';
import { Article } from '../types';

export const SystemNewsManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');

  // Modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter Logic
  const handleSearch = () => {
    let filtered = MOCK_ARTICLES;
    if (filterType !== '全部') filtered = filtered.filter(a => a.categoryName === filterType);
    if (filterStatus !== '全部') {
       const statusMap: Record<string, string> = { '未发布': 'DRAFT', '已发布': 'PUBLISHED', '已下线': 'OFFLINE' };
       filtered = filtered.filter(a => a.status === statusMap[filterStatus]);
    }
    
    if (searchKeyword) {
      filtered = filtered.filter(a => a.title.includes(searchKeyword));
    }
    setArticles(filtered);
  };

  const handleEdit = (url: string) => {
    window.open(url, '_blank');
  };

  const handleAdd = () => {
    alert('正在连接飞书...');
    setTimeout(() => {
        window.open('https://www.feishu.cn/docx/new', '_blank');
    }, 500);
  };

  const handleSync = () => {
    alert('操作成功');
    // Mock reload logic
    setArticles([...MOCK_ARTICLES]); 
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setArticles(prev => prev.filter(a => a.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handlePublish = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'PUBLISHED' as const } : a));
    alert('发布成功');
  };

  const handleOffline = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'OFFLINE' as const } : a));
    alert('下线成功');
  };

  const getStatusLabel = (status: string | undefined) => {
    switch(status) {
      case 'PUBLISHED': return '已发布';
      case 'OFFLINE': return '已下线';
      case 'DRAFT': return '未发布';
      default: return '未发布';
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">文章类型 |</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
               <option>全部</option>
               <option>行业动态</option>
               <option>行业知识库</option>
               <option>常见问题</option>
               <option>平台公告</option>
            </select>
         </div>
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">文章状态 |</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
               <option>全部</option>
               <option>未发布</option>
               <option>已发布</option>
               <option>已下线</option>
            </select>
         </div>
         <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">文章搜索 |</label>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入名称" 
              className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearch}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           搜索
         </button>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4">
         <button 
           onClick={handleAdd}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
         >
           <Plus size={16} /> 添加文章
         </button>
         <button 
           onClick={handleSync}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
         >
           <RefreshCw size={16} /> 同步文章
         </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-16">
               <tr>
                  <th className="px-6 w-16">序号</th>
                  <th className="px-6">文章名称</th>
                  <th className="px-6 w-32">文章类型</th>
                  <th className="px-6 w-32">作者</th>
                  <th className="px-6 w-24">文章状态</th>
                  <th className="px-6 w-24">浏览量</th>
                  <th className="px-6 w-32">发布日期</th>
                  <th className="px-6 w-64 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {articles.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-16">
                     <td className="px-6 text-slate-500">{idx + 1}</td>
                     <td className="px-6 font-medium text-slate-800 truncate max-w-xs" title={item.title}>{item.title}</td>
                     <td className="px-6 text-slate-600">{item.categoryName}</td>
                     <td className="px-6 text-slate-600">{item.author}</td>
                     <td className="px-6 text-slate-600">{getStatusLabel(item.status)}</td>
                     <td className="px-6 text-slate-500">{item.browseNum === 0 ? '--' : item.browseNum}</td>
                     <td className="px-6 text-slate-500">{item.updatedTime}</td>
                     <td className="px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => handleEdit(item.url)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                           >
                              查看
                           </button>
                           {item.status === 'PUBLISHED' ? (
                              <span className="text-slate-400 text-xs cursor-not-allowed">编辑</span>
                           ) : (
                              <button 
                                onClick={() => handleEdit(item.url)}
                                className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap"
                              >
                                 编辑
                              </button>
                           )}
                           
                           {item.status === 'PUBLISHED' ? (
                              <span className="text-slate-400 text-xs cursor-not-allowed">发布</span>
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
                              <span className="text-slate-400 text-xs cursor-not-allowed">下线</span>
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
               {articles.length === 0 && (
                  <tr>
                     <td colSpan={8} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {articles.length} 条</span>
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

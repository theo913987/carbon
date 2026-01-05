
import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { MOCK_METHODOLOGIES } from '../constants';
import { Methodology } from '../types';

export const SystemMethodologyManagement: React.FC = () => {
  const [methodologies, setMethodologies] = useState<Methodology[]>(MOCK_METHODOLOGIES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters
  const [filterStandard, setFilterStandard] = useState('全部');
  const [filterField, setFilterField] = useState('全部');
  const [filterIndustry, setFilterIndustry] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentMethod, setCurrentMethod] = useState<Partial<Methodology>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter Logic
  const handleSearch = () => {
    let filtered = MOCK_METHODOLOGIES;
    if (filterStandard !== '全部') filtered = filtered.filter(m => m.standard.includes(filterStandard));
    if (filterField !== '全部') filtered = filtered.filter(m => m.field.includes(filterField));
    if (filterIndustry !== '全部') filtered = filtered.filter(m => m.industry.includes(filterIndustry));
    if (filterStatus !== '全部') {
       const statusMap: Record<string, string> = { '未发布': 'DRAFT', '已发布': 'PUBLISHED', '已下线': 'OFFLINE' };
       filtered = filtered.filter(m => m.status === statusMap[filterStatus]);
    }
    
    if (searchKeyword) {
      filtered = filtered.filter(m => m.name.includes(searchKeyword) || m.methodCode.includes(searchKeyword));
    }
    setMethodologies(filtered);
  };

  const handleEdit = (method: Methodology) => {
    setCurrentMethod({ ...method });
    setIsEditModalOpen(true);
  };

  const handleView = (url: string | undefined) => {
    if (url) window.open(url, '_blank');
    else alert('暂无文档链接');
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setMethodologies(prev => prev.filter(m => m.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSave = () => {
    if (currentMethod.id) {
      setMethodologies(prev => prev.map(m => m.id === currentMethod.id ? { ...m, ...currentMethod } as Methodology : m));
    } else {
      const newMethod = {
        ...currentMethod,
        id: Date.now().toString(),
        status: 'DRAFT',
      } as Methodology;
      setMethodologies(prev => [newMethod, ...prev]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handlePublish = (id: string) => {
    setMethodologies(prev => prev.map(m => m.id === id ? { ...m, status: 'PUBLISHED' as const } : m));
    alert('发布成功');
  };

  const handleOffline = (id: string) => {
    setMethodologies(prev => prev.map(m => m.id === id ? { ...m, status: 'OFFLINE' as const } : m));
    alert('下线成功');
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'PUBLISHED': return '已发布';
      case 'OFFLINE': return '已下线';
      case 'DRAFT': return '未发布';
      default: return status;
    }
  };

  // Reusable Form Content
  const MethodForm = () => (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto px-1">
       <div>
          <label className="block text-sm text-slate-500 mb-1">方法学编号 <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            value={currentMethod.methodCode || ''}
            onChange={e => setCurrentMethod({...currentMethod, methodCode: e.target.value})}
            placeholder="请输入方法学编号"
            className="w-full p-2.5 border border-slate-300 rounded text-sm" 
          />
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">方法学字典码 <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            value={currentMethod.dictCode || ''}
            onChange={e => setCurrentMethod({...currentMethod, dictCode: e.target.value})}
            placeholder="请输入方法学字典码"
            className="w-full p-2.5 border border-slate-300 rounded text-sm" 
          />
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">方法学名称 <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            value={currentMethod.name || ''}
            onChange={e => setCurrentMethod({...currentMethod, name: e.target.value})}
            placeholder="请输入方法学名称"
            className="w-full p-2.5 border border-slate-300 rounded text-sm" 
          />
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">领域 <span className="text-red-500">*</span></label>
          <select 
            value={currentMethod.field || ''}
            onChange={e => setCurrentMethod({...currentMethod, field: e.target.value})}
            className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white"
          >
             <option value="">请选择领域</option>
             <option value="能源工业/可再生能源">能源工业/可再生能源</option>
             <option value="工业/制造业">工业/制造业</option>
             <option value="农业">农业</option>
             <option value="废弃物处理">废弃物处理</option>
             <option value="碳捕获与储存">碳捕获与储存</option>
          </select>
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">行业</label>
          <select 
            value={currentMethod.industry || ''}
            onChange={e => setCurrentMethod({...currentMethod, industry: e.target.value})}
            className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white"
          >
             <option value="">请选择行业</option>
             <option value="电力业">电力业</option>
             <option value="制造业">制造业</option>
             <option value="农业">农业</option>
             <option value="林业">林业</option>
          </select>
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">类型</label>
          <select 
            value={currentMethod.type || ''}
            onChange={e => setCurrentMethod({...currentMethod, type: e.target.value})}
            className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white"
          >
             <option value="">请选择类型</option>
             <option value="可再生能源">可再生能源</option>
             <option value="甲烷利用">甲烷利用</option>
             <option value="垃圾焚烧">垃圾焚烧</option>
          </select>
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">核证标准 <span className="text-red-500">*</span></label>
          <select 
            value={currentMethod.standard || ''}
            onChange={e => setCurrentMethod({...currentMethod, standard: e.target.value})}
            className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white"
          >
             <option value="">请选择核证标准</option>
             <option value="CCER（中国核证自愿减排量）">CCER</option>
             <option value="VCS">VCS</option>
             <option value="GS">GS</option>
          </select>
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">pdf文档url <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            value={currentMethod.sourceFileUrl || ''}
            onChange={e => setCurrentMethod({...currentMethod, sourceFileUrl: e.target.value})}
            placeholder="请输入pdf文档url"
            className="w-full p-2.5 border border-slate-300 rounded text-sm" 
          />
       </div>
       <div>
          <label className="block text-sm text-slate-500 mb-1">word文档url</label>
          <input 
            type="text" 
            value={currentMethod.wordUrl || ''}
            onChange={e => setCurrentMethod({...currentMethod, wordUrl: e.target.value})}
            placeholder="请输入word文档url"
            className="w-full p-2.5 border border-slate-300 rounded text-sm" 
          />
       </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
         <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">核证标准 |</label>
               <select value={filterStandard} onChange={e => setFilterStandard(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>CCER</option>
                  <option>VCS</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">领域 |</label>
               <select value={filterField} onChange={e => setFilterField(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>能源工业</option>
                  <option>工业/制造业</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">行业 |</label>
               <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>电力业</option>
                  <option>制造业</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">状态 |</label>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-24">
                  <option>全部</option>
                  <option>未发布</option>
                  <option>已发布</option>
                  <option>已下线</option>
               </select>
            </div>
         </div>
         
         <div className="flex items-center gap-2 w-full">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">方法学搜索 |</label>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入名称或编号" 
              className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              查询
            </button>
         </div>
      </div>

      {/* Action Bar */}
      <div>
         <button 
           onClick={() => { setCurrentMethod({}); setIsAddModalOpen(true); }}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors mb-4"
         >
           <Plus size={16} /> 添加方法学
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-12">
                  <tr>
                     <th className="px-6 w-16"></th>
                     <th className="px-6 w-32">编号</th>
                     <th className="px-6">名称</th>
                     <th className="px-6 w-48">领域</th>
                     <th className="px-6 w-24">行业</th>
                     <th className="px-6 w-48">核证标准</th>
                     <th className="px-6 w-24">状态</th>
                     <th className="px-6 w-64 text-center">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {methodologies.map((item) => (
                     <tr 
                        key={item.id} 
                        className="hover:bg-slate-50 transition-colors h-14"
                     >
                        <td className="px-6"></td>
                        <td className="px-6 text-slate-600 font-mono text-xs">{item.methodCode}</td>
                        <td className="px-6 text-slate-800 font-medium">{item.name}</td>
                        <td className="px-6 text-slate-600">{item.field}</td>
                        <td className="px-6 text-slate-600">{item.industry}</td>
                        <td className="px-6 text-slate-600 truncate max-w-xs" title={item.standard}>{item.standard}</td>
                        <td className="px-6 text-slate-600">{getStatusLabel(item.status)}</td>
                        <td className="px-6 text-center">
                           <div className="flex items-center justify-center gap-3">
                              <button 
                                onClick={() => handleView(item.sourceFileUrl)}
                                className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                              >
                                 查看
                              </button>
                              
                              {item.status === 'PUBLISHED' ? (
                                 <span className="text-slate-400 text-xs cursor-not-allowed">编辑</span>
                              ) : (
                                 <button 
                                   onClick={() => handleEdit(item)}
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
               </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
               <span>共 {methodologies.length} 条</span>
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

      {/* Add / Edit Modals */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                 <h3 className="text-lg font-medium text-slate-800">
                    {isEditModalOpen ? '修改方法学' : '添加方法学'}
                 </h3>
                 <button 
                   onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
                   className="text-slate-400 hover:text-slate-600"
                 >
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-8">
                 <MethodForm />
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-4">
                 <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-8 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">取消</button>
                 <button onClick={handleSave} className="px-8 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                    保存
                 </button>
              </div>
           </div>
        </div>
      )}

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

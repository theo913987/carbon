
import React, { useState } from 'react';
import { Search, Eye, PlusCircle } from 'lucide-react';
import { MOCK_METHODOLOGIES } from '../constants';

export const MethodologyManagement: React.FC = () => {
  const [methodologies, setMethodologies] = useState(MOCK_METHODOLOGIES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters State
  const [selectedStandard, setSelectedStandard] = useState('全部');
  const [selectedField, setSelectedField] = useState('全部');
  const [selectedIndustry, setSelectedIndustry] = useState('全部');

  const handleSearch = () => {
    // Simple mock search filtering
    let filtered = MOCK_METHODOLOGIES;
    
    if (selectedStandard !== '全部') {
      filtered = filtered.filter(m => m.standard.includes(selectedStandard));
    }
    if (selectedField !== '全部') {
      filtered = filtered.filter(m => m.field.includes(selectedField));
    }
    if (selectedIndustry !== '全部') {
      filtered = filtered.filter(m => m.industry.includes(selectedIndustry));
    }
    if (searchKeyword) {
      filtered = filtered.filter(m => m.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    }
    
    setMethodologies(filtered);
  };

  const handleView = (url?: string) => {
    if (url) {
      alert(`正在打开文档: ${url}`);
      // In a real app: window.open(url, '_blank');
    } else {
      alert('暂无文档链接');
    }
  };

  const handleCreateProject = (name: string) => {
    alert(`基于方法学 "${name}" 创建项目... (跳转至项目创建页)`);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-800">方法学管理</h2>
        <p className="text-slate-500 mt-1">查询、查看各类碳减排方法学，并基于方法学快速立项。</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 xl:items-center">
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">核证标准 |</label>
            <select 
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full xl:w-40 p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-emerald-500"
            >
               <option>全部</option>
               <option>CCER</option>
               <option>VCS</option>
               <option>GS</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">领域 |</label>
            <select 
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full xl:w-40 p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-emerald-500"
            >
               <option>全部</option>
               <option>能源工业</option>
               <option>工业/制造业</option>
               <option>碳捕获与储存</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">行业 |</label>
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full xl:w-40 p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-emerald-500"
            >
               <option>全部</option>
               <option>电力业</option>
               <option>制造业</option>
            </select>
         </div>

         <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">方法学搜索 |</span>
               <input 
                 type="text" 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 placeholder="输入名称" 
                 className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
               />
            </div>
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              查询
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 w-24">编号</th>
                  <th className="px-6 py-4">名称</th>
                  <th className="px-6 py-4 w-48">领域</th>
                  <th className="px-6 py-4 w-48">行业</th>
                  <th className="px-6 py-4 w-64">核证标准</th>
                  <th className="px-6 py-4 w-48 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {methodologies.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4 text-slate-500 font-mono">{item.code}</td>
                     <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                     <td className="px-6 py-4 text-slate-600">{item.field}</td>
                     <td className="px-6 py-4 text-slate-600">{item.industry}</td>
                     <td className="px-6 py-4 text-slate-600 truncate max-w-xs" title={item.standard}>{item.standard}</td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-center gap-4">
                           <button 
                             onClick={() => handleView(item.fileUrl)}
                             className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium"
                           >
                              <Eye size={14} /> 查看
                           </button>
                           <button 
                             onClick={() => handleCreateProject(item.name)}
                             className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-xs font-medium"
                           >
                              <PlusCircle size={14} /> 创建项目
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {methodologies.length === 0 && (
                  <tr>
                     <td colSpan={6} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
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
  );
};

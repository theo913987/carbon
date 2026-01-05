
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_SYSTEM_PROJECT_LIB } from '../constants';
import { CarbonProject, ProjectStatus } from '../types';

interface SystemProjectLibraryProps {
  onView: (id: string) => void;
  onDocs: (id: string, name: string) => void;
}

export const SystemProjectLibrary: React.FC<SystemProjectLibraryProps> = ({ onView, onDocs }) => {
  const [projects, setProjects] = useState<CarbonProject[]>(MOCK_SYSTEM_PROJECT_LIB);
  
  // Filters
  const [filterStandard, setFilterStandard] = useState('全部');
  const [filterField, setFilterField] = useState('全部');
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');
  const [filterIndustry, setFilterIndustry] = useState('全部');
  
  const [searchProject, setSearchProject] = useState('');
  const [searchMethod, setSearchMethod] = useState('');

  // Date Filters
  const [filingDateStart, setFilingDateStart] = useState('');
  const [filingDateEnd, setFilingDateEnd] = useState('');
  const [issuanceDateStart, setIssuanceDateStart] = useState('');
  const [issuanceDateEnd, setIssuanceDateEnd] = useState('');

  const statusMap: Record<string, string> = {
    'INITIATION': '待审核',
    'DEVELOPMENT': '已开发',
    'RECORD_FILING': '已备案', // Custom map for this view
    'ISSUED': '已签发'
  };

  // Filter Logic
  const handleSearch = () => {
    let filtered = MOCK_SYSTEM_PROJECT_LIB;
    
    if (filterStandard !== '全部') filtered = filtered.filter(p => p.standard.includes(filterStandard));
    if (filterField !== '全部') filtered = filtered.filter(p => p.field === filterField);
    // if (filterType !== '全部') filtered = filtered.filter(p => p.type === filterType); // Mock data type often '--'
    if (filterStatus !== '全部') {
       const statusKey = Object.keys(statusMap).find(key => statusMap[key] === filterStatus);
       if (statusKey) filtered = filtered.filter(p => p.status === statusKey);
    }
    if (filterIndustry !== '全部') filtered = filtered.filter(p => p.industry === filterIndustry);

    if (searchProject) {
      filtered = filtered.filter(p => p.name.includes(searchProject) || (p.refId && p.refId.includes(searchProject)));
    }
    if (searchMethod) {
      filtered = filtered.filter(p => p.methodology.includes(searchMethod));
    }

    setProjects(filtered);
  };

  const getStatusLabel = (status: ProjectStatus | string) => {
    return statusMap[status as string] || status;
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar Row 1 */}
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
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">类型 |</label>
               <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>光伏</option>
                  <option>风电</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">状态 |</label>
               <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>已备案</option>
                  <option>已签发</option>
               </select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
               <span className="whitespace-nowrap font-medium text-slate-700">备案时间 |</span>
               <input type="date" value={filingDateStart} onChange={e => setFilingDateStart(e.target.value)} className="bg-transparent outline-none text-slate-700 w-28" />
               <span>-</span>
               <input type="date" value={filingDateEnd} onChange={e => setFilingDateEnd(e.target.value)} className="bg-transparent outline-none text-slate-700 w-28" />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
               <span className="whitespace-nowrap font-medium text-slate-700">签发时间 |</span>
               <input type="date" value={issuanceDateStart} onChange={e => setIssuanceDateStart(e.target.value)} className="bg-transparent outline-none text-slate-700 w-28" />
               <span>-</span>
               <input type="date" value={issuanceDateEnd} onChange={e => setIssuanceDateEnd(e.target.value)} className="bg-transparent outline-none text-slate-700 w-28" />
            </div>
         </div>
         
         {/* Filters Bar Row 2 */}
         <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">行业 |</label>
               <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
                  <option>全部</option>
                  <option>电力业</option>
                  <option>制造业</option>
               </select>
            </div>

            <div className="flex items-center gap-2 flex-1">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">按项目搜索 |</label>
               <input 
                 type="text" 
                 value={searchProject}
                 onChange={(e) => setSearchProject(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 placeholder="输入名称或编号" 
                 className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
               />
               <button onClick={handleSearch} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors">查询</button>
            </div>

            <div className="flex items-center gap-2 flex-1">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">按方法学搜索 |</label>
               <input 
                 type="text" 
                 value={searchMethod}
                 onChange={(e) => setSearchMethod(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 placeholder="输入名称" 
                 className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
               />
               <button onClick={handleSearch} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors">查询</button>
            </div>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
         <table className="w-full text-left text-sm min-w-[1400px]">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-12">
               <tr>
                  <th className="px-6 w-16">序号</th>
                  <th className="px-6 w-24">备案号</th>
                  <th className="px-6 w-48">项目名称</th>
                  <th className="px-6 w-32">项目领域</th>
                  <th className="px-6 w-32">项目类型</th>
                  <th className="px-6 w-32">业主名称</th>
                  <th className="px-6 w-48">核证标准</th>
                  <th className="px-6 w-48">方法学</th>
                  <th className="px-6 w-24">状态</th>
                  <th className="px-6 w-32">审定日期</th>
                  <th className="px-6 w-32">备案日期</th>
                  <th className="px-6 w-32">核证日期</th>
                  <th className="px-6 w-32">签发日期</th>
                  <th className="px-6 w-32">年排放量</th>
                  <th className="px-6 w-40 text-center sticky right-0 bg-slate-50 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {projects.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-14">
                     <td className="px-6 text-slate-500">{idx + 1}</td>
                     <td className="px-6 text-slate-600 font-mono">{item.refId}</td>
                     <td className="px-6 text-slate-800 font-medium truncate max-w-xs" title={item.name}>{item.name}</td>
                     <td className="px-6 text-slate-600">{item.field}</td>
                     <td className="px-6 text-slate-600">{item.type || '--'}</td>
                     <td className="px-6 text-slate-600 truncate max-w-[150px]" title={item.owner}>{item.owner}</td>
                     <td className="px-6 text-slate-600 truncate max-w-[150px]" title={item.standard}>{item.standard}</td>
                     <td className="px-6 text-slate-600 truncate max-w-[150px]" title={item.methodology}>{item.methodology}</td>
                     <td className="px-6 text-slate-600">{getStatusLabel(item.status)}</td>
                     <td className="px-6 text-slate-500">{item.approvalDate || '--'}</td>
                     <td className="px-6 text-slate-500">{item.filingDate || '--'}</td>
                     <td className="px-6 text-slate-500">{item.certificationDate || '--'}</td>
                     <td className="px-6 text-slate-500">{item.issuanceDate || '--'}</td>
                     <td className="px-6 text-slate-600">{item.estimatedReduction.toLocaleString()} tCO2e</td>
                     <td className="px-6 text-center sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => onView(item.id)}
                             className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap"
                           >
                              查看
                           </button>
                           <button 
                             onClick={() => onDocs(item.id, item.name)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                           >
                              文档
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 flex items-center justify-end gap-4 text-sm text-slate-500">
         <span>共 {projects.length} 条</span>
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
  );
};

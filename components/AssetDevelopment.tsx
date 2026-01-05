
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import { ProjectStatus } from '../types';
import { Pagination } from './common/Pagination';
import { StatusBadge } from './common/StatusBadge';
import { EmptyState } from './common/EmptyState';

interface AssetDevelopmentProps {
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDetail: (id: string) => void;
}

export const AssetDevelopment: React.FC<AssetDevelopmentProps> = ({ onCreate, onEdit, onDetail }) => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState(MOCK_PROJECTS);
  
  // Filters State
  const [selectedStandard, setSelectedStandard] = useState('全部');
  const [selectedField, setSelectedField] = useState('全部');
  const [selectedIndustry, setSelectedIndustry] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const [searchProject, setSearchProject] = useState('');
  const [searchMethod, setSearchMethod] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Apply filters whenever state changes
  useEffect(() => {
    let result = projects;

    if (selectedStandard !== '全部') {
      result = result.filter(p => p.standard === selectedStandard);
    }
    if (selectedField !== '全部') {
      result = result.filter(p => p.field === selectedField);
    }
    if (selectedIndustry !== '全部') {
      result = result.filter(p => p.industry === selectedIndustry);
    }
    if (selectedStatus !== '全部') {
      // Map display label to enum value if needed, or rely on StatusBadge logic mapping
      const statusMapInv: Record<string, ProjectStatus> = {
        '待审核': ProjectStatus.INITIATION,
        '已开发': ProjectStatus.DEVELOPMENT,
        '审定中': ProjectStatus.VALIDATION,
        '已签发': ProjectStatus.ISSUED,
        '已备案': ProjectStatus.RECORD_FILING
      };
      if (statusMapInv[selectedStatus]) {
         result = result.filter(p => p.status === statusMapInv[selectedStatus]);
      }
    }
    if (searchProject) {
      result = result.filter(p => p.name.toLowerCase().includes(searchProject.toLowerCase()));
    }
    if (searchMethod) {
      result = result.filter(p => p.methodology.toLowerCase().includes(searchMethod.toLowerCase()));
    }

    setFilteredProjects(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [projects, selectedStandard, selectedField, selectedIndustry, selectedStatus, searchProject, searchMethod]);

  const handleDelete = (id: string) => {
    if (window.confirm('项目删除不可复原，请谨慎操作')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const statusMap: Record<ProjectStatus, string> = {
    [ProjectStatus.INITIATION]: '待审核',
    [ProjectStatus.DEVELOPMENT]: '已开发',
    [ProjectStatus.VALIDATION]: '审定中',
    [ProjectStatus.ISSUED]: '已签发',
    [ProjectStatus.RECORD_FILING]: '已备案'
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTableData = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
         <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700 whitespace-nowrap">核证标准 |</span>
               <select 
                 value={selectedStandard}
                 onChange={(e) => setSelectedStandard(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
               >
                  <option>全部</option>
                  <option>CCER</option>
                  <option>VCS</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700 whitespace-nowrap">领域 |</span>
               <select 
                 value={selectedField}
                 onChange={(e) => setSelectedField(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
               >
                  <option>全部</option>
                  <option>能源工业</option>
                  <option>工业/制造业</option>
                  <option>林业碳汇</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700 whitespace-nowrap">行业 |</span>
               <select 
                 value={selectedIndustry}
                 onChange={(e) => setSelectedIndustry(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
               >
                  <option>全部</option>
                  <option>电力业</option>
                  <option>制造业</option>
                  <option>林业</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700 whitespace-nowrap">状态 |</span>
               <select 
                 value={selectedStatus}
                 onChange={(e) => setSelectedStatus(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
               >
                  <option>全部</option>
                  <option>待审核</option>
                  <option>已开发</option>
                  <option>审定中</option>
                  <option>已备案</option>
                  <option>已签发</option>
               </select>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 bg-slate-50">
               <span className="whitespace-nowrap">立项日期 |</span>
               <input type="date" className="bg-transparent outline-none text-slate-700" />
               <span>-</span>
               <input type="date" className="bg-transparent outline-none text-slate-700" />
            </div>
         </div>

         <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
               <div className="relative flex-1 max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">按项目搜索 |</span>
                  <input 
                    type="text" 
                    value={searchProject}
                    onChange={e => setSearchProject(e.target.value)}
                    placeholder="输入名称" 
                    className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none transition-colors" 
                  />
               </div>
            </div>
             <div className="flex-1 flex gap-2">
               <div className="relative flex-1 max-w-sm">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">按方法学搜索 |</span>
                  <input 
                    type="text" 
                    value={searchMethod}
                    onChange={e => setSearchMethod(e.target.value)}
                    placeholder="输入名称" 
                    className="w-full pl-32 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none transition-colors" 
                  />
               </div>
            </div>
         </div>
      </div>

      <div>
         <button onClick={onCreate} className="px-5 py-2 mb-4 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            创建项目
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {currentTableData.length > 0 ? (
              <>
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                      <tr>
                         <th className="px-6 py-4 w-16">序号</th>
                         <th className="px-6 py-4 w-48">项目名称</th>
                         <th className="px-6 py-4 w-32">核证标准</th>
                         <th className="px-6 py-4 w-32">领域</th>
                         <th className="px-6 py-4 w-24">行业</th>
                         <th className="px-6 py-4 w-24">状态</th>
                         <th className="px-6 py-4 w-48">项目所在地</th>
                         <th className="px-6 py-4 w-32">业主名称</th>
                         <th className="px-6 py-4 w-32">立项日期</th>
                         <th className="px-6 py-4 w-[240px] text-center">操作</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {currentTableData.map((item, idx) => (
                         <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-slate-500">{startIndex + idx + 1}</td>
                            <td className="px-6 py-4 font-medium text-slate-800 truncate max-w-xs" title={item.name}>{item.name}</td>
                            <td className="px-6 py-4 text-slate-600 truncate max-w-[120px]" title={item.standard}>{item.standard}</td>
                            <td className="px-6 py-4 text-slate-600">{item.field}</td>
                            <td className="px-6 py-4 text-slate-600">{item.industry}</td>
                            <td className="px-6 py-4">
                               <StatusBadge status={item.status} label={statusMap[item.status]} />
                            </td>
                            <td className="px-6 py-4 text-slate-600 truncate max-w-[180px]" title={item.location}>{item.location}</td>
                            <td className="px-6 py-4 text-slate-600 truncate max-w-[120px]" title={item.owner}>{item.owner}</td>
                            <td className="px-6 py-4 text-slate-500">{item.initiationDate || '--'}</td>
                            <td className="px-6 py-4 text-right">
                               <div className="flex items-center justify-center gap-3">
                                  <button onClick={() => onDetail(item.id)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                                     查看
                                  </button>
                                  <button onClick={() => onEdit(item.id)} className="text-amber-500 hover:text-amber-700 flex items-center gap-1 text-xs font-medium">
                                     修改
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-medium">
                                     删除
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
                <Pagination 
                   total={filteredProjects.length} 
                   currentPage={currentPage} 
                   pageSize={pageSize}
                   onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState 
                description="未找到符合条件的项目，您可以调整筛选条件或创建新项目"
                action={
                  <button onClick={onCreate} className="mt-2 px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded text-sm font-medium transition-colors">
                    立即创建项目
                  </button>
                }
              />
            )}
         </div>
      </div>

    </div>
  );
};

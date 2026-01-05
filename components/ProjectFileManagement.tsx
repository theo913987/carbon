import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, X, Upload, Check } from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_PROJECTS } from '../constants';
import { ProjectStatus } from '../types';

interface ProjectFileManagementProps {
  initialProjectId?: string;
  initialProjectName?: string;
}

export const ProjectFileManagement: React.FC<ProjectFileManagementProps> = ({ initialProjectId, initialProjectName }) => {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [searchKeyword, setSearchKeyword] = useState(initialProjectName || '');
  
  // Filters State
  const [selectedType, setSelectedType] = useState('全部');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProjectSelectModalOpen, setIsProjectSelectModalOpen] = useState(false);
  
  // Upload Form State
  const [uploadForm, setUploadForm] = useState({
    projectName: '',
    projectId: '',
    docType: '',
    fileName: ''
  });

  useEffect(() => {
    if (initialProjectName) {
      handleSearch(initialProjectName);
    }
  }, [initialProjectName]);

  const handleSearch = (keyword = searchKeyword) => {
    let filtered = MOCK_DOCUMENTS;
    
    if (selectedType !== '全部') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }
    if (startDate) {
      filtered = filtered.filter(doc => doc.completionDate >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(doc => doc.completionDate <= endDate);
    }
    if (keyword) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(keyword.toLowerCase()) || 
        doc.projectName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    setDocuments(filtered);
  };

  const handleSelectProject = (project: any) => {
    setUploadForm({ ...uploadForm, projectName: project.name, projectId: project.id });
    setIsProjectSelectModalOpen(false);
  };

  const handleUploadSubmit = () => {
    if (!uploadForm.projectName || !uploadForm.docType || !uploadForm.fileName) {
      alert('请填写所有必填项');
      return;
    }
    alert('文档上传成功！');
    setIsUploadModalOpen(false);
    // Reset form
    setUploadForm({ projectName: '', projectId: '', docType: '', fileName: '' });
  };

  const statusMap: Record<ProjectStatus, string> = {
    [ProjectStatus.INITIATION]: '待审核',
    [ProjectStatus.DEVELOPMENT]: '已开发',
    [ProjectStatus.VALIDATION]: '审定中',
    [ProjectStatus.ISSUED]: '已签发',
    [ProjectStatus.RECORD_FILING]: '已备案'
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-800">项目文档管理</h2>
        <p className="text-slate-500 mt-1">上传、查看与管理各个阶段的项目文档。</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 xl:items-center">
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">文档类型 |</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full xl:w-40 p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-emerald-500"
            >
               <option>全部</option>
               <option>监测报告</option>
               <option>设计文档</option>
               <option>审定报告</option>
               <option>核证报告</option>
            </select>
         </div>

         <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
            <span className="whitespace-nowrap font-medium text-slate-700">完成日期 |</span>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent outline-none text-slate-700 w-32" 
            />
            <span>-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent outline-none text-slate-700 w-32" 
            />
         </div>

         <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">按名称搜索 |</span>
               <input 
                 type="text" 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 placeholder="输入名称或项目名" 
                 className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
               />
            </div>
            <button 
              onClick={() => handleSearch(searchKeyword)}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              查询
            </button>
         </div>
      </div>

      <div>
         <button 
           onClick={() => setIsUploadModalOpen(true)}
           className="px-5 py-2 mb-4 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
         >
            <Plus size={16} />
            上传文档
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-4 w-24">编号</th>
                     <th className="px-6 py-4">文档名称</th>
                     <th className="px-6 py-4 w-48">所属项目</th>
                     <th className="px-6 py-4 w-32">文档类型</th>
                     <th className="px-6 py-4 w-32">完成日期</th>
                     <th className="px-6 py-4 w-32">更新日期</th>
                     <th className="px-6 py-4 w-24 text-center">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {documents.map((item) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-500 font-mono">{item.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                        <td className="px-6 py-4 text-slate-600 truncate max-w-xs" title={item.projectName}>{item.projectName}</td>
                        <td className="px-6 py-4 text-slate-600">{item.type}</td>
                        <td className="px-6 py-4 text-slate-500">{item.completionDate}</td>
                        <td className="px-6 py-4 text-slate-500">{item.updatedDate}</td>
                        <td className="px-6 py-4 text-center">
                           <button 
                             onClick={() => alert(`查看文档: ${item.name}`)}
                             className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                           >
                              查看
                           </button>
                        </td>
                     </tr>
                  ))}
                  {documents.length === 0 && (
                     <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-400">暂无数据</td>
                     </tr>
                  )}
               </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
               <span>共 {documents.length} 条</span>
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

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200 relative">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">上传文档</h3>
                 <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">所属项目 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={uploadForm.projectName}
                         readOnly
                         placeholder="右侧按钮选择项目" 
                         className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" 
                       />
                       <button 
                         onClick={() => setIsProjectSelectModalOpen(true)}
                         className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors whitespace-nowrap"
                       >
                         选择项目
                       </button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">文档类型 <span className="text-red-500">*</span></label>
                    <select 
                      value={uploadForm.docType}
                      onChange={(e) => setUploadForm({...uploadForm, docType: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                    >
                       <option value="">请选择</option>
                       <option value="监测报告">监测报告</option>
                       <option value="设计文档">设计文档</option>
                       <option value="审定报告">审定报告</option>
                       <option value="核证报告">核证报告</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">项目文档 <span className="text-red-500">*</span></label>
                    <div className="border border-slate-200 rounded-lg p-3">
                       <button onClick={() => setUploadForm({...uploadForm, fileName: 'new_doc.pdf'})} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm mb-2 transition-colors flex items-center gap-2">
                         <Upload size={16} /> 上传
                       </button>
                       {uploadForm.fileName && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 p-2 bg-slate-50 rounded border border-slate-100 mt-2">
                             <span className="truncate flex-1">{uploadForm.fileName}</span>
                             <Check size={14} className="text-emerald-500" />
                          </div>
                       )}
                    </div>
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                 <button onClick={() => setIsUploadModalOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    取消
                 </button>
                 <button onClick={handleUploadSubmit} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    确定
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Project Selection Modal (Stacked) */}
      {isProjectSelectModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800">项目列表</h3>
                 <button onClick={() => setIsProjectSelectModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="p-5">
                 {/* Simple Search Mock */}
                 <div className="flex gap-3 mb-4">
                    <input type="text" placeholder="输入项目名称" className="flex-1 p-2 border border-slate-300 rounded-lg text-sm" />
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">查询</button>
                 </div>
                 
                 <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                             <th className="px-4 py-3">编号</th>
                             <th className="px-4 py-3">名称</th>
                             <th className="px-4 py-3">行业</th>
                             <th className="px-4 py-3">核证标准</th>
                             <th className="px-4 py-3">状态</th>
                             <th className="px-4 py-3 text-right">操作</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {MOCK_PROJECTS.map((proj) => (
                             <tr key={proj.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-slate-500">{proj.id}</td>
                                <td className="px-4 py-3 text-slate-800 font-medium truncate max-w-xs" title={proj.name}>{proj.name}</td>
                                <td className="px-4 py-3 text-slate-600">{proj.industry}</td>
                                <td className="px-4 py-3 text-slate-600 truncate max-w-[100px]">{proj.standard}</td>
                                <td className="px-4 py-3">
                                   <span className={`px-2 py-1 rounded text-xs font-medium ${proj.status === 'INITIATION' ? 'text-amber-600' : 'text-slate-600'}`}>
                                      {statusMap[proj.status]}
                                   </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                   <button 
                                     onClick={() => handleSelectProject(proj)}
                                     className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                                   >
                                     选择
                                   </button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 
                 {/* Pagination Mock */}
                 <div className="flex justify-end items-center gap-2 mt-4 text-xs text-slate-500">
                    <span>共 {MOCK_PROJECTS.length} 条</span>
                    <button className="w-6 h-6 border rounded bg-slate-50 disabled:opacity-50">&lt;</button>
                    <button className="w-6 h-6 border rounded bg-emerald-600 text-white">1</button>
                    <button className="w-6 h-6 border rounded bg-slate-50 disabled:opacity-50">&gt;</button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
import React, { useState } from 'react';
import { X, Upload, Search, Check } from 'lucide-react';
import { MOCK_PROJECT_SELECTION_LIST } from '../constants';

interface CarbonCreditUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CarbonCreditUploadModal: React.FC<CarbonCreditUploadModalProps> = ({ onClose, onSuccess }) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [file1, setFile1] = useState<string | null>(null);
  const [file2, setFile2] = useState<string | null>(null);

  const handleSelectProject = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedProject) {
      alert('请选择项目');
      return;
    }
    alert('碳信用项目上传成功！');
    onSuccess();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">碳信用项目上传</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8 space-y-6">
             {/* Project Selection Row */}
             <div className="flex gap-4 items-end">
                <div className="flex-1">
                   <label className="block text-sm font-medium text-slate-700 mb-1">项目名称 <span className="text-red-500">*</span></label>
                   <input 
                     type="text" 
                     value={selectedProject?.name || ''} 
                     readOnly 
                     placeholder="请选择项目" 
                     className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 cursor-not-allowed" 
                   />
                </div>
                <button 
                  onClick={() => setIsProjectModalOpen(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors mb-[1px]"
                >
                  选择项目
                </button>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">采用方法学</label>
                   <input type="text" value={selectedProject ? '可再生能源联网发电' : ''} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                   <input type="text" value={selectedProject?.field || ''} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">持仓总量(tCO2e) <span className="text-red-500">*</span></label>
                   <input type="number" defaultValue={100} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">交易单价(￥)</label>
                   <input type="number" defaultValue={100} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">交易总价(￥)</label>
                   <input type="number" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">核证机构</label>
                   <input type="text" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">签发日期</label>
                   <input type="date" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">交易日期</label>
                   <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">交易所</label>
                   <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                      <option>重庆联合产权交易所</option>
                      <option>上海环境能源交易所</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">持仓凭证 <span className="text-red-500">*</span></label>
                   <div className="border border-slate-200 rounded-lg p-3">
                      <button onClick={() => setFile1("cert.jpg")} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm mb-2 transition-colors">
                        上传
                      </button>
                      {file1 && (
                         <div className="flex items-center gap-2 text-xs text-slate-600 p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="truncate flex-1">12814849_13.jpg</span>
                            <Check size={14} className="text-emerald-500" />
                         </div>
                      )}
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">交易凭证</label>
                   <div className="border border-slate-200 rounded-lg p-3">
                      <button onClick={() => setFile2("trade.jpg")} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm mb-2 transition-colors">
                        上传
                      </button>
                      {file2 && (
                         <div className="flex items-center gap-2 text-xs text-slate-600 p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="truncate flex-1">trade_receipt.jpg</span>
                            <Check size={14} className="text-emerald-500" />
                         </div>
                      )}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
             <button onClick={onClose} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                取消
             </button>
             <button onClick={handleSubmit} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                保存
             </button>
             <button onClick={handleSubmit} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                提交
             </button>
          </div>
        </div>
      </div>

      {/* Project Selection Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800">项目列表</h3>
                 <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="p-5">
                 <div className="flex gap-3 mb-4">
                    <input type="text" placeholder="输入项目名称" className="flex-1 p-2 border border-slate-300 rounded-lg text-sm" />
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">查询</button>
                 </div>
                 
                 <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                             <th className="px-4 py-3">序号</th>
                             <th className="px-4 py-3">名称</th>
                             <th className="px-4 py-3">领域</th>
                             <th className="px-4 py-3">核证标准</th>
                             <th className="px-4 py-3 text-right">操作</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {MOCK_PROJECT_SELECTION_LIST.map((proj, idx) => (
                             <tr key={proj.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                                <td className="px-4 py-3 text-slate-800 font-medium truncate max-w-xs" title={proj.name}>{proj.name}</td>
                                <td className="px-4 py-3 text-slate-600">{proj.field}</td>
                                <td className="px-4 py-3 text-slate-600">{proj.standard}</td>
                                <td className="px-4 py-3 text-right">
                                   <button 
                                     onClick={() => handleSelectProject(proj)}
                                     className="text-emerald-600 hover:text-emerald-800 font-medium text-xs"
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
                    <span>共 2 条</span>
                    <button className="w-6 h-6 border rounded bg-slate-50 disabled:opacity-50">&lt;</button>
                    <button className="w-6 h-6 border rounded bg-emerald-600 text-white">1</button>
                    <button className="w-6 h-6 border rounded bg-slate-50 disabled:opacity-50">&gt;</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
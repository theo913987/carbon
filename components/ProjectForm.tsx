
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, Search, X, Check, CloudUpload, Loader2, Trash2 } from 'lucide-react';
import { MOCK_METHODOLOGIES, MOCK_PROJECTS } from '../constants';
import { Methodology, CarbonProject, ProjectStatus } from '../types';
import { useToast } from './common/Toast';

interface ProjectFormProps {
  id?: string;
  onBack: () => void;
  onSubmit: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ id, onBack, onSubmit }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [methodologies, setMethodologies] = useState(MOCK_METHODOLOGIES);
  const [searchMethod, setSearchMethod] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<CarbonProject>>({
    name: '',
    owner: '',
    country: '中国',
    province: '',
    city: '',
    address: '',
    developer: '上海诺涵科技',
    estimatedReduction: 0,
    description: '',
    methodology: '',
    // Step 2
    legalPersonName: '',
    legalPersonPhone: '',
    principalName: '',
    principalPhone: '',
    documents: []
  });

  useEffect(() => {
    if (id) {
      const project = MOCK_PROJECTS.find(p => p.id === id);
      if (project) {
        setFormData(project);
      }
    }
  }, [id]);

  const handleMethodSearch = () => {
    if (searchMethod) {
      setMethodologies(MOCK_METHODOLOGIES.filter(m => m.name.includes(searchMethod) || m.code.includes(searchMethod)));
    } else {
      setMethodologies(MOCK_METHODOLOGIES);
    }
  };

  const handleSelectMethod = (method: Methodology) => {
    setFormData(prev => ({ ...prev, methodology: method.name }));
    setIsMethodModalOpen(false);
  };

  // Improved Upload Component with simulation
  const UploadBox = ({ label }: { label: string }) => {
    const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'DONE'>('IDLE');
    const [fileName, setFileName] = useState('');

    const handleClick = () => {
      if (status === 'DONE') return;
      setStatus('UPLOADING');
      // Simulate network request
      setTimeout(() => {
        setStatus('DONE');
        setFileName(`${label}_scan.pdf`);
        showToast(`${label} 上传成功`);
      }, 1500);
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setStatus('IDLE');
      setFileName('');
    };

    return (
      <div 
        onClick={handleClick}
        className={`border rounded-lg p-3 flex items-center justify-between transition-all cursor-pointer group h-14
          ${status === 'IDLE' ? 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/10' : ''}
          ${status === 'UPLOADING' ? 'border-emerald-200 bg-emerald-50' : ''}
          ${status === 'DONE' ? 'border-emerald-500 bg-emerald-50' : ''}
        `}
      >
         <div className="flex-1 truncate mr-2">
            <span className={`text-sm ${status === 'DONE' ? 'text-emerald-700 font-medium' : 'text-slate-600'}`}>
              {status === 'DONE' ? fileName : label}
            </span>
         </div>
         
         {status === 'IDLE' && <CloudUpload size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />}
         {status === 'UPLOADING' && <Loader2 size={18} className="text-emerald-500 animate-spin" />}
         {status === 'DONE' && (
            <div className="flex items-center gap-2">
               <Check size={18} className="text-emerald-600" />
               <button onClick={handleRemove} className="p-1 hover:bg-emerald-200 rounded text-emerald-600">
                  <Trash2 size={14} />
               </button>
            </div>
         )}
      </div>
    );
  };

  const handleSave = () => {
    showToast('项目草稿已保存', 'success');
  };

  const handleFinalSubmit = () => {
    if (!formData.name) {
      showToast('请填写项目名称', 'error');
      return;
    }
    showToast('项目已提交审核', 'success');
    onSubmit();
  };

  return (
    <div className="p-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-100px)]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-2 mb-4 text-emerald-600 font-medium text-sm">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              {id ? '修改项目' : '创建项目'}
           </div>
           <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-slate-800 max-w-3xl leading-snug">
                {id ? `修改项目: ${formData.name}` : '填写项目信息'}
              </h1>
           </div>
        </div>

        {/* Steps */}
        <div className="flex gap-4 p-8 pb-0">
           <button 
             onClick={() => setStep(1)}
             className={`px-6 py-2 rounded font-medium text-sm transition-colors ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}
           >
             1 填写项目基本信息
           </button>
           <button 
             onClick={() => setStep(2)}
             className={`px-6 py-2 rounded font-medium text-sm transition-colors ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}
           >
             2 上传项目业主资料
           </button>
        </div>

        <div className="p-8 space-y-8">
           {step === 1 ? (
             <>
               {/* Step 1 Content */}
               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMethodModalOpen(true)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    选择方法学
                  </button>
                  <input 
                    type="text" 
                    value={formData.methodology}
                    readOnly
                    placeholder="左侧按钮选择方法学"
                    className="flex-1 max-w-md p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500"
                  />
               </div>

               <div className="flex items-center gap-2">
                  <Leaf size={18} className="text-slate-400" />
                  <h3 className="font-bold text-slate-700">项目信息</h3>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">项目 <span className="text-red-500">*</span></label>
                     <input 
                       type="text" 
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                       placeholder="输入项目名称"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">业主名称 <span className="text-red-500">*</span></label>
                     <input 
                       type="text" 
                       value={formData.owner}
                       onChange={e => setFormData({...formData, owner: e.target.value})}
                       className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                       placeholder="请输入内容"
                     />
                  </div>
                  
                  {/* Location Row */}
                  <div className="col-span-2 grid grid-cols-3 gap-8">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">国家 <span className="text-red-500">*</span></label>
                        <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                           <option>中国</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">省份 <span className="text-red-500">*</span></label>
                        <select 
                           value={formData.province}
                           onChange={e => setFormData({...formData, province: e.target.value})}
                           className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                        >
                           <option value="">请选择</option>
                           <option value="海南省">海南省</option>
                           <option value="天津市">天津市</option>
                           <option value="甘肃省">甘肃省</option>
                           <option value="内蒙古自治区">内蒙古自治区</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">市/县/郡 <span className="text-red-500">*</span></label>
                        <select 
                           value={formData.city}
                           onChange={e => setFormData({...formData, city: e.target.value})}
                           className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                        >
                           <option value="">请选择</option>
                           {formData.province === '海南省' && (
                              <>
                                 <option value="东方市">东方市</option>
                                 <option value="海口市">海口市</option>
                                 <option value="三亚市">三亚市</option>
                              </>
                           )}
                           <option value="北辰区">北辰区</option>
                           <option value="酒泉市">酒泉市</option>
                        </select>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">项目地点 <span className="text-red-500">*</span></label>
                     <input 
                       type="text" 
                       value={formData.address}
                       onChange={e => setFormData({...formData, address: e.target.value})}
                       className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                       placeholder="请输入项目地点"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">资产开发机构名称 <span className="text-red-500">*</span></label>
                     <input 
                       type="text" 
                       value={formData.developer}
                       onChange={e => setFormData({...formData, developer: e.target.value})}
                       className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                       placeholder="请输入内容"
                     />
                  </div>
                  
                  <div className="col-span-1">
                     <label className="block text-sm font-medium text-slate-700 mb-1">减排量 <span className="text-red-500">*</span></label>
                     <input 
                       type="number" 
                       value={formData.estimatedReduction}
                       onChange={e => setFormData({...formData, estimatedReduction: Number(e.target.value)})}
                       className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                       placeholder="输入减排量"
                     />
                  </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf size={18} className="text-slate-400" />
                    <h3 className="font-bold text-slate-700">项目介绍</h3>
                  </div>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full p-4 border border-slate-300 rounded-lg text-sm h-32 resize-none" 
                    placeholder="输入项目介绍"
                  ></textarea>
               </div>
             </>
           ) : (
             <>
               {/* Step 2 Content */}
               <div className="flex items-center gap-2">
                  <Leaf size={18} className="text-slate-400" />
                  <h3 className="font-bold text-slate-700">基本信息</h3>
               </div>
               
               <div className="grid grid-cols-3 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">业主法人姓名 <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        placeholder="输入业主法人姓名" 
                        value={formData.legalPersonName}
                        onChange={e => setFormData({...formData, legalPersonName: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">法人联系方式 <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        placeholder="输入法人联系方式" 
                        value={formData.legalPersonPhone}
                        onChange={e => setFormData({...formData, legalPersonPhone: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">法人营业执照</label>
                     <div className="border border-slate-200 rounded-lg p-2.5 bg-white flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors group">
                        <CloudUpload size={20} className="text-slate-400 group-hover:text-emerald-500" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">开发负责人姓名 <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        placeholder="输入负责人姓名" 
                        value={formData.principalName}
                        onChange={e => setFormData({...formData, principalName: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">开发负责人电话 <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        placeholder="输入负责人电话" 
                        value={formData.principalPhone}
                        onChange={e => setFormData({...formData, principalPhone: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                     />
                  </div>
               </div>

               <div className="flex items-center gap-2 mt-4">
                  <Leaf size={18} className="text-slate-400" />
                  <h3 className="font-bold text-slate-700">材料信息</h3>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  <UploadBox label="项目核准/批复文件" />
                  <UploadBox label="可行性研究报告" />
                  <UploadBox label="环评批复文件" />
                  <UploadBox label="环评报告表" />
                  <UploadBox label="节能评估报告" />
                  <UploadBox label="项目开工建设证明文件" />
                  <UploadBox label="项目投产证明文件" />
                  <UploadBox label="施工合同" />
                  <UploadBox label="主要设备购买合同" />
                  <UploadBox label="银行贷款合同/承诺书" />
                  <UploadBox label="委托开发合同" />
               </div>
             </>
           )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4 rounded-b-xl">
           {step === 1 ? (
             <>
               <button onClick={onBack} className="px-6 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  返回
               </button>
               <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
                  保存
               </button>
               <button onClick={() => setStep(2)} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
                  下一步
               </button>
             </>
           ) : (
             <>
               <button onClick={() => setStep(1)} className="px-6 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  上一步
               </button>
               <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
                  保存
               </button>
               <button onClick={handleFinalSubmit} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
                  提交
               </button>
             </>
           )}
        </div>
      </div>

      {/* Methodology Selection Modal */}
      {isMethodModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800">方法学列表</h3>
                 <button onClick={() => setIsMethodModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="p-5">
                 {/* Filters */}
                 <div className="flex gap-4 mb-4">
                    <select className="p-2 border border-slate-300 rounded-lg text-sm bg-white"><option>核证标准 | 全部</option></select>
                    <select className="p-2 border border-slate-300 rounded-lg text-sm bg-white"><option>领域 | 全部</option></select>
                    <select className="p-2 border border-slate-300 rounded-lg text-sm bg-white"><option>行业 | 全部</option></select>
                 </div>
                 
                 <div className="flex gap-3 mb-6">
                    <input 
                      type="text" 
                      placeholder="输入名称、编号、关键词等" 
                      className="flex-1 p-2 border border-slate-300 rounded-lg text-sm"
                      value={searchMethod}
                      onChange={e => setSearchMethod(e.target.value)}
                    />
                    <button onClick={handleMethodSearch} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">查询</button>
                 </div>
                 
                 <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                             <th className="px-4 py-3">编号</th>
                             <th className="px-4 py-3">名称</th>
                             <th className="px-4 py-3">行业</th>
                             <th className="px-4 py-3">核证标准</th>
                             <th className="px-4 py-3 text-right">操作</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {methodologies.map((m) => (
                             <tr key={m.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-slate-500">{m.code}</td>
                                <td className="px-4 py-3 text-slate-800 font-medium truncate max-w-sm" title={m.name}>{m.name}</td>
                                <td className="px-4 py-3 text-slate-600">{m.industry}</td>
                                <td className="px-4 py-3 text-slate-600">{m.standard}</td>
                                <td className="px-4 py-3 text-right">
                                   <button 
                                     onClick={() => handleSelectMethod(m)}
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
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

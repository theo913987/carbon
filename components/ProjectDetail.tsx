import React from 'react';
import { ArrowLeft, Leaf, FileText, ChevronRight } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';

interface ProjectDetailProps {
  id: string;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ id, onBack }) => {
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];

  const InfoItem = ({ label, value, isFile = false }: { label: string, value: string, isFile?: boolean }) => (
    <div className="mb-4">
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <div className={`text-sm ${isFile ? 'text-blue-600 cursor-pointer hover:underline' : 'text-slate-800 font-medium'}`}>
        {value}
      </div>
    </div>
  );

  return (
    <div className="p-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-100px)]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-2 mb-4 text-emerald-600 font-medium text-sm">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              项目详情
           </div>
           <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-slate-800 max-w-3xl leading-snug">{project.name}</h1>
              <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-sm border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50">
                 <ArrowLeft size={16} /> 返回
              </button>
           </div>
        </div>

        <div className="p-8 space-y-10">
           
           {/* Basic Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <Leaf size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">基本信息</h3>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                 <InfoItem label="国家" value={project.country || '--'} />
                 <InfoItem label="省份" value={project.province || '--'} />
                 <InfoItem label="市/县/郡" value={project.city || '--'} />
                 <InfoItem label="项目地点" value={project.address || '--'} />
                 <InfoItem label="立项日期" value={project.initiationDate} />
                 <InfoItem label="采用方法学" value={project.methodology} />
                 <InfoItem label="开发机构" value={project.developer} />
                 <InfoItem label="开发负责人" value={project.principalName || '--'} />
                 <InfoItem label="开发负责人电话" value={project.principalPhone || '--'} />
              </div>
           </section>

           {/* Project Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <FileText size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">项目信息</h3>
                 <button className="text-xs text-emerald-600 flex items-center hover:underline ml-auto">查看详情 <ChevronRight size={12}/></button>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                 {project.description || '--'}
              </div>
           </section>

           {/* Owner Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <Leaf size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">业主信息</h3>
                 <button className="text-xs text-emerald-600 flex items-center hover:underline ml-auto">查看详情 <ChevronRight size={12}/></button>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                 <InfoItem label="业主名称" value={project.owner} />
                 <InfoItem label="业主法人姓名" value={project.legalPersonName || '--'} />
                 <InfoItem label="法人联系方式" value={project.legalPersonPhone || '--'} />
                 <InfoItem label="业主营业执照" value={project.documents?.find(d => d.type === 'LICENSE')?.name || 'license.jpg'} isFile />
              </div>
           </section>

           {/* Materials Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <Leaf size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">材料信息</h3>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {project.documents?.filter(d => d.type !== 'LICENSE').map((doc, idx) => (
                    <div key={idx}>
                       <span className="block text-sm text-slate-500 mb-1">{doc.name.split('.')[0]}</span>
                       <span className="text-sm text-blue-600 cursor-pointer hover:underline">{doc.name}</span>
                    </div>
                 )) || (
                    <span className="text-sm text-slate-400">暂无其他材料</span>
                 )}
                 {/* Mocking some standard docs if empty */}
                 {!project.documents && (
                    <>
                       <div>
                          <span className="block text-sm text-slate-500 mb-1">项目核准/批复文件</span>
                          <span className="text-sm text-blue-600 cursor-pointer hover:underline">approval.pdf</span>
                       </div>
                       <div>
                          <span className="block text-sm text-slate-500 mb-1">可行性研究报告</span>
                          <span className="text-sm text-blue-600 cursor-pointer hover:underline">feasibility.pdf</span>
                       </div>
                    </>
                 )}
              </div>
           </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4 rounded-b-xl">
           <button onClick={onBack} className="px-6 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              返回
           </button>
        </div>
      </div>
    </div>
  );
};
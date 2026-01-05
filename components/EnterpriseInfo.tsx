
import React, { useState } from 'react';
import { Crown, Edit2, Save, X } from 'lucide-react';
import { ENTERPRISE_DATA } from '../constants';
import { useToast } from './common/Toast';

export const EnterpriseInfo: React.FC = () => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(ENTERPRISE_DATA);

  const handleSave = () => {
    setIsEditing(false);
    showToast('企业信息已更新', 'success');
  };

  const handleCancel = () => {
    setInfo(ENTERPRISE_DATA);
    setIsEditing(false);
  };

  const InputField = ({ label, value, field, readOnly = false }: { label: string, value: string, field: keyof typeof ENTERPRISE_DATA, readOnly?: boolean }) => (
    <div className="flex items-center">
      <span className="w-24 text-slate-500 text-sm text-center mr-4">{label}</span>
      {isEditing && !readOnly ? (
        <input 
          type="text" 
          value={info[field]} 
          onChange={(e) => setInfo({...info, [field]: e.target.value})}
          className="flex-1 p-2.5 border border-emerald-300 rounded-md text-sm text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500" 
        />
      ) : (
        <div className={`flex-1 p-2.5 rounded-md text-sm text-slate-700 select-none ${readOnly ? 'bg-slate-50 border border-slate-200 cursor-not-allowed' : 'bg-white border border-transparent'}`}>
          {value}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm min-h-[600px] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">基本信息</h2>
            <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded text-xs border border-amber-100 font-medium">
               <Crown size={12} className="fill-amber-600" /> 
               {info.accountTypeName}
            </span>
          </div>
          
          <div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Edit2 size={14} /> 编辑
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <X size={14} /> 取消
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                >
                  <Save size={14} /> 保存
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
           <InputField label="企业名称" value={info.tenantName} field="tenantName" readOnly />
           <InputField label="企业电话" value={info.telephone} field="telephone" />
           <InputField label="企业传真" value={info.faxNumber} field="faxNumber" />
           
           <InputField label="所属行业" value={info.industry} field="industry" />
           <InputField label="开户日期" value={info.createdTime} field="createdTime" readOnly />
           <InputField label="租户有效期" value={info.validityDate} field="validityDate" readOnly />
        </div>

        {/* Address Row */}
        <div className="mt-6 flex items-center pr-[calc(33.33%+1rem)] lg:pr-[calc(33.33%-2rem)]">
           <span className="w-24 text-slate-500 text-sm text-center mr-4">企业地址</span>
           {isEditing ? (
             <input 
               type="text" 
               value={info.address} 
               onChange={(e) => setInfo({...info, address: e.target.value})}
               className="flex-1 p-2.5 border border-emerald-300 rounded-md text-sm text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500" 
             />
           ) : (
             <div className="flex-1 p-2.5 bg-white border border-transparent rounded-md text-sm text-slate-700">
               {info.address}
             </div>
           )}
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-dashed border-slate-200"></div>

        {/* Introduction Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800">企业介绍</h2>
        </div>

        {/* Content */}
        {isEditing ? (
          <textarea 
            value={info.introduction}
            onChange={(e) => setInfo({...info, introduction: e.target.value})}
            className="w-full p-4 border border-emerald-300 rounded-lg text-sm h-40 resize-none outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
          ></textarea>
        ) : (
          <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap p-4 bg-slate-50 rounded-lg border border-slate-100">
             {info.introduction}
          </div>
        )}

      </div>
    </div>
  );
};

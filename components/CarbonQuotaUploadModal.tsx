import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CarbonQuotaUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CarbonQuotaUploadModal: React.FC<CarbonQuotaUploadModalProps> = ({ onClose, onSuccess }) => {
  const [file1, setFile1] = useState<string | null>(null);

  const handleSubmit = () => {
    alert('碳配额资产上传成功！');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">碳配额项目上传</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           {/* Agency Name */}
           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">名称(一级持有机构) <span className="text-red-500">*</span></label>
              <input type="text" placeholder="请输入内容" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">持仓总量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">购入单价(￥)</label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">购入总价(￥)</label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">购入日期</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">交易所</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>请选择</option>
                    <option>北京绿色交易所</option>
                    <option>上海环境能源交易所</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">可用数量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">锁定数量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">冻结数量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">资产估值(￥)</label>
                 <input type="number" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">有效期</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">签发日期 <span className="text-red-500">*</span></label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">签发机构 <span className="text-red-500">*</span></label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>请选择</option>
                    <option>生态环境部</option>
                    <option>北京市生态环境局</option>
                 </select>
              </div>
           </div>

           <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">持仓凭证 <span className="text-red-500">*</span></label>
              <div className="border border-slate-200 rounded-lg p-3 w-1/2">
                 <button onClick={() => setFile1("cert.jpg")} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm mb-2 transition-colors">
                   上传
                 </button>
                 {file1 && (
                    <div className="flex items-center gap-2 text-xs text-slate-600 p-2 bg-slate-50 rounded border border-slate-100">
                       <span className="truncate flex-1">quota_cert_123.jpg</span>
                       <Check size={14} className="text-emerald-500" />
                    </div>
                 )}
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
  );
};
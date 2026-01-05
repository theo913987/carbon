import React from 'react';
import { X } from 'lucide-react';

interface OffMarketListingModalProps {
  projectName: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const OffMarketListingModal: React.FC<OffMarketListingModalProps> = ({ projectName, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 truncate pr-4" title={`场外上架 : ${projectName}`}>
            场外上架 : {projectName}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-1 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">出售数量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">出售单价(¥)</label>
                 <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">出售截止时间</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割时间</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割方式</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                    <option>协议转让</option>
                    <option>竞价交易</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割场所</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                    <option>上海环境能源交易所</option>
                    <option>北京绿色交易所</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end">
           <button onClick={onSubmit} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              确定
           </button>
        </div>
      </div>
    </div>
  );
};
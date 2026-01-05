import React from 'react';
import { X } from 'lucide-react';

interface PurchaseRequestModalProps {
  onClose: () => void;
}

export const PurchaseRequestModal: React.FC<PurchaseRequestModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">采购单</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购机构 <span className="text-red-500">*</span></label>
                 <input type="text" value="上海诺涵科技" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购联系人 <span className="text-red-500">*</span></label>
                 <input type="text" value="admin" readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">联系电话 <span className="text-red-500">*</span></label>
                 <input type="text" value="021-45345323" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
                 <input type="email" placeholder="请输入邮箱" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
           </div>

           <div className="h-px bg-slate-100 my-4"></div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">项目领域</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                    <option>能源工业</option>
                    <option>林业碳汇</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">资产类型</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                    <option>CCER</option>
                    <option>SHEA</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">项目类型</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                 </select>
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购数量(tCO2e) <span className="text-red-500">*</span></label>
                 <input type="number" placeholder="请输入采购数量" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">询价(¥)</label>
                 <input type="number" placeholder="请输入询价" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">截止采购日期</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割日期</label>
                 <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割方式</label>
                 <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>全部</option>
                    <option>协议转让</option>
                    <option>竞价交易</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end">
           <button onClick={() => { alert('提交成功'); onClose(); }} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              提交
           </button>
        </div>
      </div>
    </div>
  );
};
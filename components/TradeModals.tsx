import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { TradeItem } from '../types';

// Detail Modal
interface DetailModalProps {
  item: TradeItem;
  onClose: () => void;
  title: string; // e.g. "采购单", "供应单"
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose, title }) => {
  const isBuy = item.direction === 'BUY';
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-1 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">{isBuy ? '采购方' : '供应方'}</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.institutionName}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">资产类型</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.assetType}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">项目类型</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.projectType}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">{isBuy ? '采购数量(tCO2e)' : '供应数量(tCO2e)'}</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.quantity}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">{isBuy ? '询价(¥)' : '报价(¥)'}</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.price === 0 ? '--' : item.price}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">期望交割日期</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.deliveryDate || '--'}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">期望交割方式</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.deliveryMethod || '--'}</div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-500 mb-1">期望交割场所</label>
                 <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">{item.exchange || '--'}</div>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end">
           <button onClick={onClose} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              确定
           </button>
        </div>
      </div>
    </div>
  );
};

// Response Modal (Quote or Inquiry)
interface TradeResponseModalProps {
  item: TradeItem;
  onClose: () => void;
  title: string; // e.g. "报价单", "询价单"
  btnText: string; // e.g. "报价", "询价"
}

export const TradeResponseModal: React.FC<TradeResponseModalProps> = ({ item, onClose, title, btnText }) => {
  const isBuy = item.direction === 'BUY';
  const [formData, setFormData] = useState({
    price: item.price || 0,
    quantity: item.quantity || 0,
    deliveryDate: '',
    deliveryMethod: '',
    exchange: ''
  });

  const handleSubmit = () => {
    alert(`${btnText}已提交！`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-1 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">{isBuy ? '采购方' : '供应方'}</label>
                 <input type="text" value={item.institutionName} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              
              {/* Read-only Asset/Project Info with grey background like vue */}
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">资产类型 <span className="text-red-500">*</span></label>
                 <input type="text" value={item.assetType} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">项目领域 <span className="text-red-500">*</span></label>
                 <input type="text" value={item.projectScope || '--'} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">项目类型 <span className="text-red-500">*</span></label>
                 <input type="text" value={item.projectType} readOnly className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
              </div>

              {/* Editable Fields */}
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">{isBuy ? '供应数量' : '采购数量'}(tCO2e) <span className="text-red-500">*</span></label>
                 <input 
                   type="number" 
                   value={formData.quantity} 
                   onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">{isBuy ? '报价' : '询价'}(¥) <span className="text-red-500">*</span></label>
                 <input 
                   type="number" 
                   value={formData.price} 
                   onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割日期</label>
                 <input 
                   type="date" 
                   value={formData.deliveryDate} 
                   onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割方式</label>
                 <select 
                   value={formData.deliveryMethod} 
                   onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">全部</option>
                    <option value="协议转让">协议转让</option>
                    <option value="竞价交易">竞价交易</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">期望交割场所</label>
                 <select 
                   value={formData.exchange} 
                   onChange={(e) => setFormData({...formData, exchange: e.target.value})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">全部</option>
                    <option value="上海环境能源交易所">上海环境能源交易所</option>
                    <option value="北京绿色交易所">北京绿色交易所</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end">
           <button onClick={handleSubmit} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              {btnText}
           </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { InquiryItem } from '../types';

interface IntentOrderModalProps {
  item: InquiryItem;
  onClose: () => void;
  onSubmit: () => void;
}

export const IntentOrderModal: React.FC<IntentOrderModalProps> = ({ item, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    sellerName: item.sellerName || '',
    sellerContacts: item.sellerContacts || '',
    sellerPhone: item.sellerPhone || '',
    sellerEmail: item.sellerEmail || '',
    buyerName: item.buyerName || '',
    buyerContacts: item.buyerContacts || '',
    buyerPhone: item.buyerPhone || '',
    buyerEmail: item.buyerEmail || '',
    assetType: item.assetType === '全部' ? '' : item.assetType,
    projectType: item.projectType === '全部' ? '' : item.projectType,
    tradeQuantity: typeof item.buyerQuantity === 'number' ? item.buyerQuantity : 0,
    assetUnitPrice: typeof item.buyerPrice === 'number' ? item.buyerPrice : 0,
    deliveryTime: '',
    deliveryMethod: '',
    deliveryExchange: '',
    expirationDate: '',
    mark: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.sellerName || !formData.tradeQuantity || !formData.assetUnitPrice) {
        alert('请填写所有必填字段');
        return;
    }
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-slate-800">意向成交</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
           {/* Seller Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">供应方机构名称 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.sellerName}
                    onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                    placeholder="请输入供应方机构名称" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">供应方联系人姓名 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.sellerContacts}
                    onChange={(e) => setFormData({...formData, sellerContacts: e.target.value})}
                    placeholder="请输入供应方联系人姓名" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">供应方联系电话 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.sellerPhone}
                    onChange={(e) => setFormData({...formData, sellerPhone: e.target.value})}
                    placeholder="请输入供应方联系电话" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">供应方邮箱 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.sellerEmail}
                    onChange={(e) => setFormData({...formData, sellerEmail: e.target.value})}
                    placeholder="请输入供应方邮箱" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
           </div>

           <div className="h-px bg-slate-100 my-4"></div>

           {/* Buyer Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购方机构名称 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.buyerName}
                    onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                    placeholder="请输入采购方机构名称" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购方联系人姓名 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.buyerContacts}
                    onChange={(e) => setFormData({...formData, buyerContacts: e.target.value})}
                    placeholder="请输入采购方联系人姓名" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购方联系电话 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.buyerPhone}
                    onChange={(e) => setFormData({...formData, buyerPhone: e.target.value})}
                    placeholder="请输入采购方联系电话" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">采购方邮箱 <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    value={formData.buyerEmail}
                    onChange={(e) => setFormData({...formData, buyerEmail: e.target.value})}
                    placeholder="请输入采购方邮箱" 
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
           </div>

           <div className="h-px bg-slate-100 my-4"></div>

           {/* Trade Details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">资产类型 <span className="text-red-500">*</span></label>
                 <select 
                    value={formData.assetType} 
                    onChange={(e) => setFormData({...formData, assetType: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">请选择</option>
                    <option value="碳信用">碳信用</option>
                    <option value="碳配额">碳配额</option>
                 </select>
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">项目类型 <span className="text-red-500">*</span></label>
                 <select 
                    value={formData.projectType} 
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">全部</option>
                    <option value="改善灌溉管理">改善灌溉管理</option>
                    <option value="牧场添加堆肥">牧场添加堆肥</option>
                    <option value="饲料添加剂">饲料添加剂</option>
                    <option value="造林和再造林">造林和再造林</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">交易量(tCO2e) <span className="text-red-500">*</span></label>
                 <input 
                   type="number" 
                   value={formData.tradeQuantity}
                   onChange={(e) => setFormData({...formData, tradeQuantity: Number(e.target.value)})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">协议价格(¥) <span className="text-red-500">*</span></label>
                 <input 
                   type="number" 
                   value={formData.assetUnitPrice}
                   onChange={(e) => setFormData({...formData, assetUnitPrice: Number(e.target.value)})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
           </div>

           <div className="h-px bg-slate-100 my-4"></div>

           {/* Delivery Details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">交割日期</label>
                 <input 
                   type="date" 
                   value={formData.deliveryTime}
                   onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">交割方式 <span className="text-red-500">*</span></label>
                 <select 
                    value={formData.deliveryMethod} 
                    onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">全部</option>
                    <option value="协议转让">协议转让</option>
                    <option value="竞价交易">竞价交易</option>
                    <option value="定价交易">定价交易</option>
                 </select>
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">交割场所 <span className="text-red-500">*</span></label>
                 <select 
                    value={formData.deliveryExchange} 
                    onChange={(e) => setFormData({...formData, deliveryExchange: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                 >
                    <option value="">全部</option>
                    <option value="上海环境能源交易所">上海环境能源交易所</option>
                    <option value="北京绿色交易所">北京绿色交易所</option>
                 </select>
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">截止交易日期</label>
                 <input 
                   type="date" 
                   value={formData.expirationDate}
                   onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
                 <textarea 
                   rows={3}
                   value={formData.mark}
                   onChange={(e) => setFormData({...formData, mark: e.target.value})}
                   placeholder="请输入内容"
                   className="w-full p-2.5 border border-slate-300 rounded-lg text-sm resize-none" 
                 ></textarea>
              </div>
           </div>
        </form>

        <div className="p-6 border-t border-slate-100 flex justify-end sticky bottom-0 bg-white">
           <button onClick={handleSubmit} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              提交
           </button>
        </div>
      </div>
    </div>
  );
};
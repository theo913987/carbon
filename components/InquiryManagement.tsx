import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { MOCK_INQUIRIES } from '../constants';
import { IntentOrderModal } from './IntentOrderModal';
import { InquiryItem } from '../types';

export const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);
  
  // Filters State
  const [selectedRole, setSelectedRole] = useState('全部');
  const [selectedAsset, setSelectedAsset] = useState('全部');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchSeller, setSearchSeller] = useState('');
  const [searchBuyer, setSearchBuyer] = useState('');

  // Modals State
  const [intentModalOpen, setIntentModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InquiryItem | null>(null);
  const [qrCodeOpen, setQrCodeOpen] = useState(false);

  // Filter Logic
  const filteredInquiries = inquiries.filter(item => {
    if (selectedRole !== '全部' && item.tradeRole !== selectedRole) return false;
    if (selectedAsset !== '全部' && item.assetType !== selectedAsset) return false;
    // Simple date string comparison for mock data (yyyy-MM-dd)
    if (startDate && item.deadline !== '--' && item.deadline < startDate) return false;
    if (endDate && item.deadline !== '--' && item.deadline > endDate) return false;
    if (searchSeller && !item.conversation.includes(searchSeller)) return false; // Using conversation as proxy for mock
    if (searchBuyer && !item.buyerName?.includes(searchBuyer)) return false;
    return true;
  });

  const handleIntentClick = (item: InquiryItem) => {
    setSelectedItem(item);
    setIntentModalOpen(true);
  };

  const handleInquiryClick = () => {
    setQrCodeOpen(true);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Area */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
         <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">交易角色 |</label>
               <select 
                 value={selectedRole}
                 onChange={(e) => setSelectedRole(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px] focus:outline-none focus:border-emerald-500"
               >
                  <option>全部</option>
                  <option>卖方</option>
                  <option>买方</option>
               </select>
            </div>
            
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">资产类型 |</label>
               <select 
                 value={selectedAsset}
                 onChange={(e) => setSelectedAsset(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px] focus:outline-none focus:border-emerald-500"
               >
                  <option>全部</option>
                  <option>碳信用</option>
                  <option>碳配额</option>
               </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
               <span className="whitespace-nowrap font-medium text-slate-700">询报价截止日期 |</span>
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
         </div>

         <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
               <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">卖方机构搜索 |</span>
                  <input 
                    type="text" 
                    value={searchSeller}
                    onChange={(e) => setSearchSeller(e.target.value)}
                    placeholder="输入卖方机构名称" 
                    className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
                  />
               </div>
            </div>
            <div className="flex-1 flex gap-2">
               <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">买方机构搜索 |</span>
                  <input 
                    type="text" 
                    value={searchBuyer}
                    onChange={(e) => setSearchBuyer(e.target.value)}
                    placeholder="输入买方机构名称" 
                    className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
                  />
               </div>
            </div>
            <button 
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              查询
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[1400px]">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                  <th className="px-4 py-4 w-12">序号</th>
                  <th className="px-4 py-4 w-48">对话</th>
                  <th className="px-4 py-4 w-24">交易角色</th>
                  <th className="px-4 py-4 w-24">资产类型</th>
                  <th className="px-4 py-4 w-24">项目类型</th>
                  <th className="px-4 py-4 w-32">报价量(tCO2e)</th>
                  <th className="px-4 py-4 w-32">报价(元/tCO2e)</th>
                  <th className="px-4 py-4 w-32">询价量(tCO2e)</th>
                  <th className="px-4 py-4 w-32">询价(元/tCO2e)</th>
                  <th className="px-4 py-4 w-32">截止日期</th>
                  <th className="px-4 py-4 w-32">拟交割方式</th>
                  <th className="px-4 py-4 w-32">拟交割时间</th>
                  <th className="px-4 py-4 w-[160px] text-center sticky right-0 bg-slate-50 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredInquiries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-4 text-slate-500">{idx + 1}</td>
                     <td className="px-4 py-4 text-slate-700 font-medium truncate max-w-xs" title={item.conversation}>{item.conversation}</td>
                     <td className="px-4 py-4 text-slate-600">{item.tradeRole}</td>
                     <td className="px-4 py-4 text-slate-600">{item.assetType}</td>
                     <td className="px-4 py-4 text-slate-600">{item.projectType}</td>
                     <td className="px-4 py-4 text-slate-600">{item.sellerQuantity}</td>
                     <td className="px-4 py-4 text-slate-600">{item.sellerPrice}</td>
                     <td className="px-4 py-4 text-slate-600">{item.buyerQuantity}</td>
                     <td className="px-4 py-4 text-slate-600">{item.buyerPrice}</td>
                     <td className="px-4 py-4 text-slate-500">{item.deadline}</td>
                     <td className="px-4 py-4 text-slate-500">{item.deliveryMethod}</td>
                     <td className="px-4 py-4 text-slate-500">{item.deliveryTime}</td>
                     <td className="px-4 py-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0px_10px_-5px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={handleInquiryClick}
                             className="text-emerald-600 hover:text-emerald-800 font-medium text-xs whitespace-nowrap"
                           >
                              询报价
                           </button>
                           <button 
                             onClick={() => handleIntentClick(item)}
                             className="text-blue-600 hover:text-blue-800 font-medium text-xs whitespace-nowrap"
                           >
                              意向成交
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {filteredInquiries.length === 0 && (
                  <tr>
                     <td colSpan={13} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {filteredInquiries.length} 条</span>
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

      {/* QR Code Overlay (Inquiry) */}
      {qrCodeOpen && (
        <div className="fixed right-5 top-1/4 z-50 animate-in slide-in-from-right duration-300">
           <div className="bg-slate-800/90 backdrop-blur rounded-lg p-6 shadow-2xl relative w-72 flex flex-col items-center">
             <button 
               onClick={() => setQrCodeOpen(false)}
               className="absolute top-2 right-2 text-white/50 hover:text-white"
             >
               <X size={20} />
             </button>
             <div className="w-48 h-48 bg-white p-2 rounded-lg mb-4">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=WeChatInquiry" 
                  alt="QR Code" 
                  className="w-full h-full"
                />
             </div>
             <p className="text-white text-sm font-medium">扫码进入询报价对话框</p>
           </div>
        </div>
      )}

      {/* Intent Order Modal */}
      {intentModalOpen && selectedItem && (
        <IntentOrderModal 
           item={selectedItem}
           onClose={() => setIntentModalOpen(false)}
           onSubmit={() => {
              alert("意向成交单已提交，跳转交易所完成后续履约");
              setIntentModalOpen(false);
           }}
        />
      )}

    </div>
  );
};
import React, { useState } from 'react';
import { Search, ShoppingCart, Eye, HandCoins, MessagesSquare } from 'lucide-react';
import { MOCK_TRADE_ITEMS } from '../constants';
import { PurchaseRequestModal } from './PurchaseRequestModal';
import { DetailModal, TradeResponseModal } from './TradeModals';
import { TradeItem } from '../types';

export const SupplyDemandMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeItems, setTradeItems] = useState(MOCK_TRADE_ITEMS);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters State
  const [selectedAssetType, setSelectedAssetType] = useState('全部');
  const [selectedProjectType, setSelectedProjectType] = useState('全部');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [activeDetailItem, setActiveDetailItem] = useState<TradeItem | null>(null);
  const [activeResponseItem, setActiveResponseItem] = useState<TradeItem | null>(null);

  // Filter items based on active tab and filters
  const filteredItems = tradeItems.filter(item => {
    if (item.direction !== activeTab) return false;
    
    if (selectedAssetType !== '全部' && item.assetType !== selectedAssetType) return false;
    if (selectedProjectType !== '全部' && item.projectType !== selectedProjectType) return false;
    
    if (startDate && item.deadline !== '--' && item.deadline < startDate) return false;
    if (endDate && item.deadline !== '--' && item.deadline > endDate) return false;
    
    if (searchKeyword && !item.institutionName.includes(searchKeyword)) return false;
    
    return true;
  });

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Tabs */}
      <div className="border-b border-slate-200 flex mb-6">
         <button
           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
             activeTab === 'BUY' ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
           }`}
           onClick={() => setActiveTab('BUY')}
         >
           采购行情
         </button>
         <button
           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
             activeTab === 'SELL' ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
           }`}
           onClick={() => setActiveTab('SELL')}
         >
           供应行情
         </button>
      </div>

      {/* "I want to buy" Button (Only on Buy Tab or generally available?) */}
      {/* Screenshot shows it on top right, positioned absolutely in the Vue template */}
      <div className="absolute top-8 right-8">
         <button 
           onClick={() => setIsBuyModalOpen(true)}
           className="px-5 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
         >
            <ShoppingCart size={16} /> 我想买
         </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
         <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">资产类型 |</label>
               <select 
                 value={selectedAssetType}
                 onChange={(e) => setSelectedAssetType(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px] focus:outline-none focus:border-emerald-500"
               >
                  <option>全部</option>
                  <option>碳信用</option>
                  <option>碳配额</option>
               </select>
            </div>
            
            <div className="flex items-center gap-2">
               <label className="text-sm font-medium text-slate-700 whitespace-nowrap">项目类型 |</label>
               <select 
                 value={selectedProjectType}
                 onChange={(e) => setSelectedProjectType(e.target.value)}
                 className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px] focus:outline-none focus:border-emerald-500"
               >
                  <option>全部</option>
                  <option>改善灌溉管理</option>
                  <option>牧场添加堆肥</option>
                  <option>饲料添加剂</option>
                  <option>造林和再造林</option>
               </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 ml-auto">
               <span className="whitespace-nowrap font-medium text-slate-700">{activeTab === 'BUY' ? '采购' : '供应'}截止日期 |</span>
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

         <div className="flex gap-2">
            <div className="relative flex-1">
               <input 
                 type="text" 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 placeholder="输入机构名称搜索" 
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
               />
            </div>
            <button 
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              搜索
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 w-16">序号</th>
                  {activeTab === 'SELL' && <th className="px-6 py-4">资产类型</th>}
                  <th className="px-6 py-4">项目类型</th>
                  <th className="px-6 py-4">机构名称</th>
                  {activeTab === 'BUY' && <th className="px-6 py-4">资产类型</th>}
                  <th className="px-6 py-4 w-32">{activeTab === 'BUY' ? '采购量' : '出售量'}(tCO2e)</th>
                  <th className="px-6 py-4 w-32">{activeTab === 'BUY' ? '询价' : '报价'}(元/tCO2e)</th>
                  <th className="px-6 py-4 w-32">{activeTab === 'BUY' ? '采购' : '出售'}截止日期</th>
                  <th className="px-6 py-4 w-[200px] text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4 text-slate-500">{idx + 1}</td>
                     {activeTab === 'SELL' && <td className="px-6 py-4 text-slate-600">{item.assetType}</td>}
                     <td className="px-6 py-4 text-slate-600">{item.projectType}</td>
                     <td className="px-6 py-4 text-slate-600">{item.institutionName}</td>
                     {activeTab === 'BUY' && <td className="px-6 py-4 text-slate-600">{item.assetType}</td>}
                     <td className="px-6 py-4 text-slate-600">{item.quantity}</td>
                     <td className="px-6 py-4 text-slate-600">{item.price === 0 ? '--' : item.price}</td>
                     <td className="px-6 py-4 text-slate-500">{item.deadline}</td>
                     <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => setActiveDetailItem(item)}
                             className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium"
                           >
                              <Eye size={14} /> 查看
                           </button>
                           <button 
                             onClick={() => setActiveResponseItem(item)}
                             className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-xs font-medium"
                           >
                              {activeTab === 'BUY' ? <HandCoins size={14} /> : <MessagesSquare size={14} />} 
                              {activeTab === 'BUY' ? '报价' : '询价'}
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {filteredItems.length === 0 && (
                  <tr>
                     <td colSpan={8} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {filteredItems.length} 条</span>
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

      {/* Modals */}
      {isBuyModalOpen && (
         <PurchaseRequestModal 
            onClose={() => setIsBuyModalOpen(false)} 
         />
      )}

      {activeDetailItem && (
         <DetailModal
            item={activeDetailItem}
            title={activeTab === 'BUY' ? '采购单' : '供应单'}
            onClose={() => setActiveDetailItem(null)}
         />
      )}

      {activeResponseItem && (
         <TradeResponseModal
            item={activeResponseItem}
            title={activeTab === 'BUY' ? '报价单' : '询价单'}
            btnText={activeTab === 'BUY' ? '报价' : '询价'}
            onClose={() => setActiveResponseItem(null)}
         />
      )}

    </div>
  );
};
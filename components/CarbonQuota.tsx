
import React, { useState, useEffect } from 'react';
import { Upload, ShoppingCart, Search, Eye, Share2, ArrowRightLeft } from 'lucide-react';
import { MOCK_QUOTAS } from '../constants';
import { CarbonQuotaUploadModal } from './CarbonQuotaUploadModal';
import { PurchaseRequestModal } from './PurchaseRequestModal';
import { OffMarketQuotationModal } from './OffMarketQuotationModal';

interface CarbonQuotaProps {
  onNavigateDetail: (id: string) => void;
}

export const CarbonQuota: React.FC<CarbonQuotaProps> = ({ onNavigateDetail }) => {
  const [quotas, setQuotas] = useState(MOCK_QUOTAS);
  const [filteredQuotas, setFilteredQuotas] = useState(MOCK_QUOTAS);
  
  // Filter States
  const [filterStatus, setFilterStatus] = useState('全部');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [activeQuotation, setActiveQuotation] = useState<any>(null);

  // Filter Logic
  useEffect(() => {
    let result = quotas;

    if (filterStatus !== '全部') {
       const statusMap: Record<string, string> = { '待审核': 'PENDING', '已签发': 'NORMAL', '正常': 'NORMAL' };
       result = result.filter(q => q.status === statusMap[filterStatus]);
    }

    if (dateStart) {
       result = result.filter(q => q.expiryDate >= dateStart);
    }
    if (dateEnd) {
       result = result.filter(q => q.expiryDate <= dateEnd);
    }

    if (searchKeyword) {
       result = result.filter(q => 
          q.agencyName.toLowerCase().includes(searchKeyword.toLowerCase()) || 
          (q.exchangeName && q.exchangeName.toLowerCase().includes(searchKeyword.toLowerCase()))
       );
    }

    setFilteredQuotas(result);
  }, [quotas, filterStatus, dateStart, dateEnd, searchKeyword]);

  // Stats (Calculated from filtered data)
  const totalHoldings = filteredQuotas.reduce((acc, curr) => acc + curr.total, 0);
  const available = filteredQuotas.reduce((acc, curr) => acc + curr.availableAmount, 0);
  const locked = filteredQuotas.reduce((acc, curr) => acc + curr.lockedAmount, 0);
  const frozen = filteredQuotas.reduce((acc, curr) => acc + curr.frozenAmount, 0);

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Header Stats Bar */}
      <div className="bg-emerald-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-100">
        <div className="flex items-center gap-2 text-emerald-800 font-medium">
           <span className="text-2xl mr-2">💰</span>
           <span className="font-bold">我的碳配额资产</span>
        </div>
        
        <div className="flex-1 flex flex-wrap gap-x-8 gap-y-2 text-sm text-emerald-700 justify-center md:justify-start px-4">
           <span>持仓总量 <span className="font-bold">{totalHoldings.toLocaleString()}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>可用数量 <span className="font-bold">{available.toLocaleString()}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>锁定数量 <span className="font-bold">{locked.toLocaleString()}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>冻结数量 <span className="font-bold">{frozen.toLocaleString()}</span>(tCO2e)</span>
        </div>

        <div className="flex gap-3">
           <button onClick={() => setIsUploadModalOpen(true)} className="px-5 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Upload size={16} /> 上传
           </button>
           <button onClick={() => setIsBuyModalOpen(true)} className="px-5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
              <ShoppingCart size={16} /> 我想买
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="flex items-center gap-2 min-w-[200px]">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">资产状态 |</label>
            <select 
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
               className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-emerald-500"
            >
               <option>全部</option>
               <option>待审核</option>
               <option>已签发</option>
            </select>
         </div>

         <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50">
            <span className="whitespace-nowrap font-medium text-slate-700">有效日期 |</span>
            <input 
               type="date" 
               value={dateStart}
               onChange={(e) => setDateStart(e.target.value)}
               className="bg-transparent outline-none text-slate-700 w-32" 
            />
            <span>-</span>
            <input 
               type="date" 
               value={dateEnd}
               onChange={(e) => setDateEnd(e.target.value)}
               className="bg-transparent outline-none text-slate-700 w-32" 
            />
         </div>

         <div className="flex-1 flex gap-2 w-full">
            <div className="relative flex-1">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">关键词搜索 |</span>
               <input 
                  type="text" 
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="输入机构或交易所名称" 
                  className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
               />
            </div>
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors">查询</button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 w-16">序号</th>
                  <th className="px-6 py-4">一级市场持有机构</th>
                  <th className="px-6 py-4 w-32">持仓量(tCO2e)</th>
                  <th className="px-6 py-4 w-32">资产估值(¥)</th>
                  <th className="px-6 py-4 w-24">资产状态</th>
                  <th className="px-6 py-4 w-32">有效日期</th>
                  <th className="px-6 py-4 w-[300px] text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredQuotas.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => onNavigateDetail(item.id)}>
                     <td className="px-6 py-4 text-slate-500">{idx + 1}</td>
                     <td className="px-6 py-4 font-medium text-slate-800 truncate">{item.agencyName}</td>
                     <td className="px-6 py-4 text-slate-600">{item.total.toLocaleString()}</td>
                     <td className="px-6 py-4 text-slate-600">{item.valuation.toLocaleString()}</td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                           {item.status === 'PENDING' ? '待审核' : '正常'}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-slate-500">{item.expiryDate}</td>
                     <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-4">
                           <button onClick={() => onNavigateDetail(item.id)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                              <Eye size={14} /> 查看
                           </button>
                           <button onClick={() => setActiveQuotation(item)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                              <Share2 size={14} /> 场外报价
                           </button>
                           <button className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-xs font-medium">
                              <ArrowRightLeft size={14} /> 场内交易
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {filteredQuotas.length === 0 && (
                  <tr>
                     <td colSpan={7} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {filteredQuotas.length} 条</span>
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
      {isUploadModalOpen && (
         <CarbonQuotaUploadModal 
            onClose={() => setIsUploadModalOpen(false)} 
            onSuccess={() => setIsUploadModalOpen(false)} 
         />
      )}

      {isBuyModalOpen && (
         <PurchaseRequestModal 
            onClose={() => setIsBuyModalOpen(false)} 
         />
      )}

      {activeQuotation && (
         <OffMarketQuotationModal
            title={activeQuotation.agencyName}
            onClose={() => setActiveQuotation(null)}
            onSubmit={() => { alert('报价申请已提交'); setActiveQuotation(null); }}
         />
      )}

    </div>
  );
};

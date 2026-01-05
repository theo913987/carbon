
import React, { useState, useEffect } from 'react';
import { Upload, ShoppingCart, Search, Eye, Share2, ArrowRightLeft, Edit, Trash2 } from 'lucide-react';
import { MOCK_CREDITS } from '../constants';
import { CarbonCreditUploadModal } from './CarbonCreditUploadModal';
import { PurchaseRequestModal } from './PurchaseRequestModal';

interface CarbonCreditProps {
  onNavigateDetail: (id: string) => void;
}

export const CarbonCredit: React.FC<CarbonCreditProps> = ({ onNavigateDetail }) => {
  const [credits, setCredits] = useState(MOCK_CREDITS);
  const [filteredCredits, setFilteredCredits] = useState(MOCK_CREDITS);
  
  // Filter States
  const [filterStandard, setFilterStandard] = useState('全部');
  const [filterField, setFilterField] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');
  const [searchProject, setSearchProject] = useState('');
  const [searchMethod, setSearchMethod] = useState('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // Stats
  const totalHoldings = filteredCredits.reduce((acc, curr) => acc + curr.holdings, 0);
  const available = filteredCredits.reduce((acc, curr) => acc + curr.availableAmount, 0);
  const locked = filteredCredits.reduce((acc, curr) => acc + curr.lockedAmount, 0);
  const frozen = filteredCredits.reduce((acc, curr) => acc + curr.frozenAmount, 0);

  // Filter Logic
  useEffect(() => {
    let result = credits;

    if (filterStandard !== '全部') {
        result = result.filter(c => c.standard === filterStandard);
    }
    if (filterField !== '全部') {
        result = result.filter(c => c.type === filterField); // Assuming 'type' maps to field here or similar concept
    }
    if (filterStatus !== '全部') {
        const statusMap: Record<string, string> = { '待审核': 'PENDING', '正常': 'NORMAL' };
        result = result.filter(c => c.status === statusMap[filterStatus]);
    }
    if (searchProject) {
        result = result.filter(c => c.projectName.toLowerCase().includes(searchProject.toLowerCase()));
    }
    if (searchMethod) {
        result = result.filter(c => c.methodology.toLowerCase().includes(searchMethod.toLowerCase()));
    }

    setFilteredCredits(result);
  }, [credits, filterStandard, filterField, filterStatus, searchProject, searchMethod]);

  const handleDelete = (id: string) => {
    if (window.confirm('删除内容不可恢复，请谨慎操作')) {
      setCredits(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Header Stats Bar */}
      <div className="bg-emerald-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-100">
        <div className="flex items-center gap-2 text-emerald-800 font-medium">
           <span className="text-2xl mr-2">💰</span>
           <span className="font-bold">我的碳信用资产</span>
        </div>
        
        <div className="flex-1 flex flex-wrap gap-x-8 gap-y-2 text-sm text-emerald-700 justify-center md:justify-start px-4">
           <span>持仓总量 <span className="font-bold">{totalHoldings}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>可用数量 <span className="font-bold">{available}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>锁定数量 <span className="font-bold">{locked}</span>(tCO2e)</span>
           <span className="text-emerald-300">|</span>
           <span>冻结数量 <span className="font-bold">{frozen}</span>(tCO2e)</span>
        </div>

        <div className="flex gap-3">
           <button onClick={() => setIsUploadModalOpen(true)} className="px-5 py-2 bg-white text-emerald-600 border border-emerald-200 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2">
              <Upload size={16} /> 上传
           </button>
           <button onClick={() => setIsBuyModalOpen(true)} className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
              <ShoppingCart size={16} /> 我想买
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
         <div className="flex flex-wrap gap-4">
            <select 
                value={filterStandard}
                onChange={e => setFilterStandard(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
            >
               <option value="全部">核证标准 | 全部</option>
               <option value="CCER">CCER</option>
               <option value="VCS">VCS</option>
            </select>
            <select 
                value={filterField}
                onChange={e => setFilterField(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
            >
               <option value="全部">领域 | 全部</option>
               <option value="风电">风电</option>
               <option value="林业">林业</option>
               <option value="光伏">光伏</option>
            </select>
            <select 
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[120px]"
            >
               <option value="全部">资产状态 | 全部</option>
               <option value="待审核">待审核</option>
               <option value="正常">正常</option>
            </select>
            <div className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 bg-slate-50">
               <span>签发日期</span>
               <input type="date" className="bg-transparent outline-none text-slate-700" />
               <span>-</span>
               <input type="date" className="bg-transparent outline-none text-slate-700" />
            </div>
         </div>

         <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
               <div className="relative flex-1 max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">按项目搜索 |</span>
                  <input 
                    type="text" 
                    value={searchProject}
                    onChange={e => setSearchProject(e.target.value)}
                    placeholder="输入项目名称" 
                    className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none transition-colors" 
                  />
               </div>
            </div>
             <div className="flex-1 flex gap-2">
               <div className="relative flex-1 max-w-sm">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">方法学搜索 |</span>
                  <input 
                    type="text" 
                    value={searchMethod}
                    onChange={e => setSearchMethod(e.target.value)}
                    placeholder="输入方法学名称" 
                    className="w-full pl-24 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none transition-colors" 
                  />
               </div>
            </div>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 w-16">序号</th>
                  <th className="px-6 py-4">项目名称</th>
                  <th className="px-6 py-4 w-24">核证标准</th>
                  <th className="px-6 py-4 w-32">持仓量(tCO2e)</th>
                  <th className="px-6 py-4 w-32">资产估值(¥)</th>
                  <th className="px-6 py-4 w-24">类型</th>
                  <th className="px-6 py-4 w-24">资产状态</th>
                  <th className="px-6 py-4 w-32">签发日期</th>
                  <th className="px-6 py-4 w-[340px] text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredCredits.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4 text-slate-500">{idx + 1}</td>
                     <td className="px-6 py-4 font-medium text-slate-800 truncate max-w-xs" title={item.projectName}>{item.projectName}</td>
                     <td className="px-6 py-4 text-slate-600">{item.standard}</td>
                     <td className="px-6 py-4 text-slate-600">{item.holdings}</td>
                     <td className="px-6 py-4 text-slate-600">{item.valuation.toLocaleString()}</td>
                     <td className="px-6 py-4 text-slate-600">{item.type}</td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                           {item.status === 'PENDING' ? '待审核' : '正常'}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-slate-500">{item.issuanceDate}</td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-center gap-3">
                           <button onClick={() => onNavigateDetail(item.id)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                              <Eye size={14} /> 查看
                           </button>
                           <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                              <Share2 size={14} /> 场外上架
                           </button>
                           <button className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-xs font-medium">
                              <ArrowRightLeft size={14} /> 场内交易
                           </button>
                           <button className="text-amber-600 hover:text-amber-800 flex items-center gap-1 text-xs font-medium">
                              <Edit size={14} /> 修改
                           </button>
                           <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-medium">
                              <Trash2 size={14} /> 删除
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {filteredCredits.length === 0 && (
                  <tr>
                     <td colSpan={9} className="text-center py-10 text-slate-400">暂无数据</td>
                  </tr>
               )}
            </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {filteredCredits.length} 条</span>
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
         <CarbonCreditUploadModal 
            onClose={() => setIsUploadModalOpen(false)} 
            onSuccess={() => setIsUploadModalOpen(false)} 
         />
      )}

      {isBuyModalOpen && (
         <PurchaseRequestModal 
            onClose={() => setIsBuyModalOpen(false)} 
         />
      )}

    </div>
  );
};

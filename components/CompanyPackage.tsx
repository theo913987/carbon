
import React from 'react';
import { ArrowUp, ArrowDown, Crown, ShieldCheck, Clock } from 'lucide-react';
import { DASHBOARD_DATA } from '../constants';

export const CompanyPackage: React.FC<{ userName: string }> = ({ userName }) => {
  const { assetsIncome, fundIncome, carbonCredit, carbonQuota, greenScore, accountVo } = DASHBOARD_DATA;

  const renderRatio = (ratio: string) => {
    const r = parseFloat(ratio);
    const isPositive = r >= 0;
    return (
      <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-red-500' : 'text-emerald-500'}`}>
        {ratio}%
        {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Left Card: Assets & Fund Income */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-100 p-5">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Assets Income Section */}
          <div className="flex-1">
             <div className="flex items-end gap-2 mb-4">
                <h3 className="font-medium text-slate-800">资产收入</h3>
                <span className="text-xs text-slate-500 pb-0.5">上月({assetsIncome.statDate})</span>
             </div>
             
             <div className="mb-4">
               <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
                 {assetsIncome.totalIncome} <span className="text-sm text-emerald-600 font-medium">CNC</span>
               </div>
             </div>

             <div className="flex gap-6 mb-4">
               <div>
                 <span className="text-xs text-slate-500 block">环比</span>
                 {renderRatio(assetsIncome.monthOnMonthRatio)}
               </div>
               <div>
                 <span className="text-xs text-slate-500 block">同比</span>
                 {renderRatio(assetsIncome.yearOnYearRatio)}
               </div>
               <div>
                 <span className="text-xs text-slate-500 block">总收入</span>
                 <span className="text-sm font-medium text-slate-700">¥ {assetsIncome.totalIncome}</span>
               </div>
             </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-slate-200 border-l border-dashed border-slate-300 h-32 self-center mx-2"></div>

          {/* Fund Income Section */}
          <div className="flex-1">
             <div className="flex items-end gap-2 mb-4">
                <h3 className="font-medium text-slate-800">资金收入</h3>
                <span className="text-xs text-slate-500 pb-0.5">上月({fundIncome.statDate})</span>
             </div>
             
             <div className="mb-4">
               <div className="text-3xl font-bold text-slate-700">
                 <span className="text-lg">¥</span> {fundIncome.monthIncome}
               </div>
             </div>

             <div className="flex gap-6 mb-4">
               <div>
                 <span className="text-xs text-slate-500 block">环比</span>
                 {renderRatio(fundIncome.monthOnMonthRatio)}
               </div>
               <div>
                 <span className="text-xs text-slate-500 block">同比</span>
                 {renderRatio(fundIncome.yearOnYearRatio)}
               </div>
               <div>
                 <span className="text-xs text-slate-500 block">总收入</span>
                 <span className="text-sm font-medium text-slate-700">¥ {fundIncome.totalIncome}</span>
               </div>
             </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-8">
           <div className="flex gap-2 text-sm">
             <span className="text-slate-500">碳信用:</span>
             <span className="font-medium text-slate-700">{carbonCredit} tCO2e</span>
           </div>
           <div className="flex gap-2 text-sm">
             <span className="text-slate-500">碳配额:</span>
             <span className="font-medium text-slate-700">{carbonQuota} tCO2e</span>
           </div>
           <div className="flex gap-2 text-sm">
             <span className="text-slate-500">绿证:</span>
             <span className="font-medium text-slate-700">{greenScore} kWh</span>
           </div>
        </div>
      </div>

      {/* Right Card: Account Info */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5 flex flex-col justify-between relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-medium text-slate-800">账户</h3>
          </div>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
               <img src={accountVo.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
               <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white">V</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{userName}</span>
                <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-xs border border-amber-100">
                  <Crown size={10} /> {accountVo.roleNames[0]}
                </span>
                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs border border-blue-100">
                  <ShieldCheck size={10} /> {accountVo.productVersionName}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{accountVo.enterpriseName}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-y-2 text-sm">
           <div className="flex justify-between pr-4 border-r border-slate-100">
             <span className="text-slate-500">碳中和比例:</span>
             <span className="font-medium text-slate-700">{accountVo.carbonNeutralRatio}</span>
           </div>
           <div className="flex justify-between pl-4">
             <span className="text-slate-500">ESG评分:</span>
             <span className="font-medium text-slate-700">{accountVo.esgScore}</span>
           </div>
           <div className="col-span-2 mt-2 flex justify-between">
              <span className="text-slate-500">账户有效期:</span>
              <span className="font-medium text-slate-700 flex items-center gap-1">
                 <Clock size={12} className="text-slate-400" />
                 {accountVo.accountValidity}
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Database, Hammer, ShoppingCart } from 'lucide-react';
import { DASHBOARD_DATA } from '../constants';

interface StatCardProps {
  title: string;
  date: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  data: typeof DASHBOARD_DATA.monthSupply;
}

const StatCard: React.FC<StatCardProps> = ({ title, date, icon: Icon, iconColor, iconBg, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-5 flex flex-col">
      <div className="flex items-end gap-2 mb-4">
        <h3 className="font-medium text-slate-800">{title}</h3>
        <span className="text-xs text-slate-500 pb-0.5">上月({date})</span>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-1 pr-4 border-r border-dashed border-slate-200">
          <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} mb-2`}>
            <Icon size={24} />
          </div>
          <span className="text-xl font-bold text-emerald-600 leading-none">{data.carbonSupply}</span>
          <span className="text-xs text-emerald-600 font-medium">CNC</span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="flex justify-between items-center text-sm">
             <span className="text-slate-500 text-xs">碳信用</span>
             <span className="font-medium text-slate-700">{data.carbonCredit} <span className="text-xs text-slate-400">tCO2e</span></span>
          </div>
          <div className="flex justify-between items-center text-sm">
             <span className="text-slate-500 text-xs">碳配额</span>
             <span className="font-medium text-slate-700">{data.carbonQuota} <span className="text-xs text-slate-400">tCO2e</span></span>
          </div>
          <div className="flex justify-between items-center text-sm">
             <span className="text-slate-500 text-xs">绿证</span>
             <span className="font-medium text-slate-700">{data.greenScore} <span className="text-xs text-slate-400">kWh</span></span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between text-xs">
         <div>
           <span className="text-slate-500 mr-1">总供应量:</span>
           <span className="font-medium text-emerald-600">{data.carbonSupplyTotal} CNC</span>
         </div>
         <div>
           <span className="text-slate-500 mr-1">碳资产估值:</span>
           <span className="font-medium text-slate-700">¥ {data.carbonValuation}</span>
         </div>
      </div>
    </div>
  );
};

export const CapitalStat: React.FC = () => {
  const { monthSupply, monthDevelopment, monthSales } = DASHBOARD_DATA;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatCard 
        title="供应量" 
        date={monthSupply.statDate} 
        icon={Database} 
        iconColor="text-blue-500" 
        iconBg="bg-blue-50" 
        data={monthSupply} 
      />
      <StatCard 
        title="开发量" 
        date={monthDevelopment.statDate} 
        icon={Hammer} 
        iconColor="text-amber-500" 
        iconBg="bg-amber-50" 
        data={monthDevelopment} 
      />
      <StatCard 
        title="销售量" 
        date={monthSales.statDate} 
        icon={ShoppingCart} 
        iconColor="text-emerald-500" 
        iconBg="bg-emerald-50" 
        data={monthSales} 
      />
    </div>
  );
};

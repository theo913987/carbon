import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DASHBOARD_DATA } from '../constants';

export const TradeInfoPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CCER' | 'VCS'>('VCS');
  const { quotation } = DASHBOARD_DATA;

  // Mock data derivation based on Vue logic (percentages)
  const chartData1 = [
    { name: '存量', value: quotation.stockCount, color: '#0065FF' },
    { name: '已核销', value: quotation.writtenOffCount, color: '#26B581' },
  ];

  const chartData2 = [
    { name: '已审定', value: quotation.approvedCount, color: '#26B581' },
    { name: '已备案', value: quotation.filingCount, color: '#0065FF' },
    { name: '已签发', value: quotation.singCount, color: '#15AABF' },
  ];

  const renderCustomLabel = (value: number, title: string, unit: string) => {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-bold text-slate-700">{value}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
       <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-6">
           <h3 className="font-medium text-slate-800 text-lg">碳交易行情</h3>
           <div className="flex gap-4 border-b border-slate-200">
              {['VCS', 'CCER'].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === tab ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>}
                </button>
              ))}
           </div>
        </div>
        <button className="text-sm text-emerald-600 hover:underline">查看更多 &gt;</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex flex-col lg:flex-row gap-8 h-[368px]">
         {/* Charts Section */}
         <div className="flex flex-col sm:flex-row gap-8 flex-shrink-0">
            {/* Chart 1 */}
            <div className="w-[200px] flex flex-col items-center relative">
               <div className="text-sm font-medium text-slate-700 mb-2">{activeTab} 签发量: {quotation.ccerCount}</div>
               <div className="w-[160px] h-[160px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData1}
                        innerRadius={50}
                        outerRadius={75}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData1.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {renderCustomLabel(quotation.ccerCount, '', '')}
               </div>
               <div className="text-xs text-slate-400 mt-1">单位: tCO2e</div>
               
               <div className="mt-4 w-full space-y-2">
                  <div className="flex items-center text-xs">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                     <span className="text-slate-600">已核销 {quotation.writtenOffCount}</span>
                  </div>
                  <div className="flex items-center text-xs">
                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                     <span className="text-slate-600">存量 {quotation.stockCount}</span>
                  </div>
               </div>
            </div>

            {/* Chart 2 */}
            <div className="w-[200px] flex flex-col items-center relative">
               <div className="text-sm font-medium text-slate-700 mb-2">{activeTab} 项目量: {quotation.ccerProjectCount}</div>
               <div className="w-[160px] h-[160px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData2}
                        innerRadius={50}
                        outerRadius={75}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData2.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {renderCustomLabel(quotation.ccerProjectCount, '', '')}
               </div>
               <div className="text-xs text-slate-400 mt-1">单位: 个</div>

                <div className="mt-4 w-full space-y-2">
                  <div className="flex items-center text-xs">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                     <span className="text-slate-600">已审定 {quotation.approvedCount}</span>
                  </div>
                  <div className="flex items-center text-xs">
                     <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                     <span className="text-slate-600">已备案 {quotation.filingCount}</span>
                  </div>
                   <div className="flex items-center text-xs">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                     <span className="text-slate-600">已签发 {quotation.singCount}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Table Section */}
         <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 sticky top-0">
              <tr>
                <th className="px-4 py-3 font-medium">项目类型</th>
                <th className="px-4 py-3 font-medium text-center">签发量(tCO2e)</th>
                <th className="px-4 py-3 font-medium text-center">存量(tCO2e)</th>
                <th className="px-4 py-3 font-medium text-center">项目数量(个)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotation.projects.map((proj, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium">{proj.type}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{proj.singCount}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{proj.stockCount}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{proj.projectCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
      </div>
    </div>
  );
};

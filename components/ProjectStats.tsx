
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DASHBOARD_DATA } from '../constants';

export const ProjectStats: React.FC = () => {
  const { projectStat } = DASHBOARD_DATA;

  // Mock Trend Data
  const trendData = [
    { month: '1月', value: 120000 },
    { month: '2月', value: 132000 },
    { month: '3月', value: 101000 },
    { month: '4月', value: 134000 },
    { month: '5月', value: 190000 },
    { month: '6月', value: 230000 },
    { month: '7月', value: 210000 },
    { month: '8月', value: 250000 },
    { month: '9月', value: 270000 },
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-slate-800 text-lg">项目减排趋势</h3>
        <select className="text-xs border border-slate-200 rounded p-1 bg-white text-slate-500 outline-none">
           <option>近半年</option>
           <option>近一年</option>
        </select>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex flex-col lg:flex-row gap-8 min-h-[368px]">
        {/* Left: Interactive Chart */}
        <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col relative">
           <div className="mb-6 flex justify-between items-end">
              <div>
                 <p className="text-sm text-slate-500 mb-1">预计总减排量</p>
                 <h4 className="text-3xl font-bold text-slate-800">{projectStat.reductionTotal} <span className="text-sm font-normal text-slate-400">tCO2e</span></h4>
              </div>
              <div className="text-right">
                 <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded">+12.5% 环比</span>
              </div>
           </div>

           <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#94a3b8'}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#94a3b8'}} 
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    itemStyle={{color: '#059669', fontWeight: 600}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Right: Table */}
        <div className="flex-1 overflow-x-auto border-l border-slate-100 pl-8">
          <div className="flex items-center justify-between mb-4">
             <h4 className="font-bold text-slate-700 text-sm">Top 项目贡献</h4>
             <button className="text-xs text-blue-600 hover:underline">查看全部</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">项目名称</th>
                <th className="px-4 py-3 font-medium text-center">减排量(tCO2e)</th>
                <th className="px-4 py-3 font-medium text-center">估值(¥)</th>
                <th className="px-4 py-3 font-medium text-center rounded-tr-lg">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectStat.projectList.map((project, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium truncate max-w-[140px]" title={project.projectName}>
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-slate-400' : 'bg-orange-400'}`}></span>
                       {project.projectName}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-mono">{project.reduction.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-600 font-mono">{project.carbonValuation.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.developmentStateName === '已立项' ? 'bg-emerald-50 text-emerald-600' : 
                      project.developmentStateName === '审定中' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {project.developmentStateName}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Added Mock Rows to fill space */}
              <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium truncate max-w-[140px]">
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                       新疆光伏三期
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-mono">35,000</td>
                  <td className="px-4 py-3 text-center text-slate-600 font-mono">1,750,000</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">待开发</span>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

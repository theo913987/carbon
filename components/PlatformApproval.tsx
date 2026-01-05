
import React, { useState } from 'react';
import { ExternalLink, Share2, Menu, Undo, Redo, Printer, PaintBucket, AlignLeft, Bold, Italic, Underline, ChevronDown, Plus } from 'lucide-react';

export const PlatformApproval: React.FC = () => {
  const feishuUrl = "https://zfx2bso66l.feishu.cn/sheets/shtcnbYcQtLLL3qrapu0gj1xELe";
  const [activeSheet, setActiveSheet] = useState('注册开户跟进');

  const sheets = [
    '注册开户跟进',
    '交易开户跟进',
    '采购客户跟进',
    '出售客户跟进',
    '交易履约跟进',
    '开发业务跟进'
  ];

  const handleOpenFeishu = () => {
    window.open(feishuUrl, '_blank');
  };

  const tableData = [
    { id: 1, account: '碳小善', org: '碳小善科技', contact: '碳小信', phone: '15266448855', email: '123@123.com' },
    { id: 2, account: '张三', org: '电力集团', contact: '张思睿', phone: '13022554466', email: '456@456.com' },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      
      {/* Top Bar - Feishu Header Simulation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
           <button onClick={() => window.history.back()} className="text-slate-500 hover:bg-slate-100 p-1 rounded transition-colors">
             &lt;
           </button>
           <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white">
             <span className="font-bold text-xs">表</span>
           </div>
           <div>
             <h1 className="text-sm font-medium text-slate-800 flex items-center gap-2">
               平台审批管理 
               <span className="text-amber-400">★</span>
             </h1>
             <span className="text-xs text-slate-400">已保存到云端</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleOpenFeishu}
             className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded flex items-center gap-1 hover:bg-blue-700 transition-colors shadow-sm"
           >
             <ExternalLink size={14} /> 跳转至飞书文档
           </button>
           <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded flex items-center gap-1 hover:bg-slate-50 transition-colors">
             <Share2 size={14} /> 分享
           </button>
           <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">
             Admin
           </div>
        </div>
      </div>

      {/* Toolbar Simulation */}
      <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-[#fcfcfc] gap-4 overflow-x-auto">
         <div className="flex gap-1 text-slate-600">
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Menu size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Undo size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Redo size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Printer size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><PaintBucket size={15}/></button>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex gap-1 items-center">
            <div className="flex items-center border border-slate-300 rounded px-2 py-0.5 bg-white cursor-pointer hover:border-blue-400">
               <span className="text-xs mr-2">常规</span>
               <ChevronDown size={12} className="text-slate-400" />
            </div>
            <span className="font-serif font-bold text-sm px-2 text-slate-600 cursor-pointer hover:bg-slate-200 rounded">¥</span>
            <span className="font-bold text-sm px-2 text-slate-600 cursor-pointer hover:bg-slate-200 rounded">%</span>
            <span className="font-bold text-sm px-2 text-slate-600 cursor-pointer hover:bg-slate-200 rounded">.00</span>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex gap-1 text-slate-600">
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Bold size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Italic size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Underline size={15}/></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><AlignLeft size={15}/></button>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="px-1">10</span>
            <ChevronDown size={10} />
         </div>
      </div>

      {/* Formula Bar Simulation */}
      <div className="flex items-center px-2 py-1.5 border-b border-slate-200 bg-white">
         <div className="w-10 text-center text-xs text-slate-500 font-medium border-r border-slate-200 pr-2">D7</div>
         <div className="flex-1 px-2 text-sm text-slate-800 font-mono"></div>
      </div>

      {/* Spreadsheet Content */}
      <div className="flex-1 overflow-auto bg-[#f5f5f5] p-0 relative">
         <div className="bg-white w-full min-h-full relative overflow-auto">
            
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#f8f9fa] border-b border-slate-300 text-xs font-bold text-slate-500">
               <div className="w-10 min-w-[40px] flex items-center justify-center border-r border-slate-300 bg-[#f8f9fa]"></div>
               <div className="w-[180px] min-w-[180px] px-2 py-1 border-r border-slate-300 text-center">A</div>
               <div className="w-[220px] min-w-[220px] px-2 py-1 border-r border-slate-300 text-center">B</div>
               <div className="w-[150px] min-w-[150px] px-2 py-1 border-r border-slate-300 text-center">C</div>
               <div className="w-[200px] min-w-[200px] px-2 py-1 border-r border-slate-300 border-t-2 border-t-blue-500 bg-blue-50/20 text-center">D</div>
               <div className="w-[250px] min-w-[250px] px-2 py-1 border-r border-slate-300 text-center">E</div>
               <div className="flex-1 border-r border-slate-300 text-center">F</div>
            </div>

            {/* Row 1: Headers */}
            <div className="flex h-9 border-b border-slate-200 hover:bg-slate-50">
               <div className="w-10 min-w-[40px] flex items-center justify-center border-r border-slate-300 bg-[#f8f9fa] text-xs text-slate-500">1</div>
               <div className="w-[180px] min-w-[180px] px-2 py-1 border-r border-slate-200 text-sm text-slate-700 flex items-center">账户名</div>
               <div className="w-[220px] min-w-[220px] px-2 py-1 border-r border-slate-200 text-sm text-slate-700 flex items-center">机构名</div>
               <div className="w-[150px] min-w-[150px] px-2 py-1 border-r border-slate-200 text-sm text-slate-700 flex items-center">联系人名称</div>
               <div className="w-[200px] min-w-[200px] px-2 py-1 border-r border-slate-200 text-sm text-slate-700 flex items-center">联系电话</div>
               <div className="w-[250px] min-w-[250px] px-2 py-1 border-r border-slate-200 text-sm text-slate-700 flex items-center">联系邮箱</div>
               <div className="flex-1 border-r border-slate-200 px-2 py-1 text-sm text-slate-700 flex items-center">注册时间</div>
            </div>

            {/* Data Rows */}
            {tableData.map((row, idx) => (
               <div key={row.id} className="flex h-9 border-b border-slate-200 hover:bg-slate-50">
                  <div className="w-10 min-w-[40px] flex items-center justify-center border-r border-slate-300 bg-[#f8f9fa] text-xs text-slate-500">{idx + 2}</div>
                  <div className="w-[180px] min-w-[180px] px-2 py-1 border-r border-slate-200 text-sm text-slate-800 flex items-center">{row.account}</div>
                  <div className="w-[220px] min-w-[220px] px-2 py-1 border-r border-slate-200 text-sm text-slate-800 flex items-center">{row.org}</div>
                  <div className="w-[150px] min-w-[150px] px-2 py-1 border-r border-slate-200 text-sm text-slate-800 flex items-center">{row.contact}</div>
                  <div className="w-[200px] min-w-[200px] px-2 py-1 border-r border-slate-200 text-sm text-slate-800 flex items-center text-right font-mono">{row.phone}</div>
                  <div className="w-[250px] min-w-[250px] px-2 py-1 border-r border-slate-200 text-sm text-blue-600 underline flex items-center cursor-pointer">{row.email}</div>
                  <div className="flex-1 border-r border-slate-200 px-2 py-1 text-sm text-slate-800 flex items-center"></div>
               </div>
            ))}

            {/* Empty Rows */}
            {Array.from({ length: 20 }).map((_, idx) => (
               <div key={`empty-${idx}`} className="flex h-9 border-b border-slate-200 hover:bg-slate-50">
                  <div className="w-10 min-w-[40px] flex items-center justify-center border-r border-slate-300 bg-[#f8f9fa] text-xs text-slate-500">{idx + 2 + tableData.length}</div>
                  <div className="w-[180px] min-w-[180px] border-r border-slate-200"></div>
                  <div className="w-[220px] min-w-[220px] border-r border-slate-200"></div>
                  <div className="w-[150px] min-w-[150px] border-r border-slate-200"></div>
                  {/* Selected Cell Simulation */}
                  {idx === 4 ? (
                     <div className="w-[200px] min-w-[200px] border-r border-slate-200 border-2 border-blue-500 relative shadow-[0_0_0_1px_rgba(59,130,246,0.2)] z-10">
                        <div className="absolute bottom-[-4px] right-[-4px] w-1.5 h-1.5 bg-blue-500 border border-white cursor-crosshair"></div>
                     </div>
                  ) : (
                     <div className="w-[200px] min-w-[200px] border-r border-slate-200"></div>
                  )}
                  <div className="w-[250px] min-w-[250px] border-r border-slate-200"></div>
                  <div className="flex-1 border-r border-slate-200"></div>
               </div>
            ))}
         </div>
      </div>

      {/* Bottom Tabs */}
      <div className="h-10 bg-[#f8f9fa] border-t border-slate-300 flex items-center px-2 gap-1 overflow-x-auto">
         <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded text-slate-600">
            <Plus size={16} />
         </button>
         <div className="h-5 w-px bg-slate-300 mx-1"></div>
         <button className="px-2 hover:bg-slate-200 rounded transition-colors"><Menu size={16} className="text-slate-600" /></button>
         
         {sheets.map(sheet => (
            <button
               key={sheet}
               onClick={() => setActiveSheet(sheet)}
               className={`px-4 py-1 text-sm rounded-t-sm whitespace-nowrap transition-colors ${
                  activeSheet === sheet 
                  ? 'bg-white text-emerald-600 font-medium border-b-2 border-emerald-500 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200'
               }`}
            >
               {sheet}
            </button>
         ))}
      </div>
    </div>
  );
};

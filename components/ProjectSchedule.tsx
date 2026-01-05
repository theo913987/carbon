
import React from 'react';
import { Share2, ExternalLink, Menu, Undo, Redo, Printer, PaintBucket, AlignLeft, Bold, Italic, Underline } from 'lucide-react';
import { MOCK_SCHEDULE_DATA } from '../constants';

interface ProjectScheduleProps {
  onBack?: () => void;
}

export const ProjectSchedule: React.FC<ProjectScheduleProps> = ({ onBack }) => {
  const feishuUrl = "https://zfx2bso66l.feishu.cn/sheets/shtcnoHokr9Y571RpgiWODMHaHd";

  const handleOpenFeishu = () => {
    window.open(feishuUrl, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      
      {/* Top Bar - Feishu Header Mock */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
           <button 
             onClick={onBack ? onBack : () => window.history.back()} 
             className="text-slate-500 hover:bg-slate-100 p-1 rounded transition-colors"
           >
             &lt; 返回
           </button>
           <h1 className="text-sm font-medium text-slate-800 flex items-center gap-2 ml-2">
             资产开发进度管理 
             <span className="text-amber-400">★</span>
             <span className="text-xs text-slate-400 font-normal">已保存到云端</span>
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleOpenFeishu}
             className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded flex items-center gap-1 hover:bg-blue-700 transition-colors"
           >
             <ExternalLink size={14} /> 打开飞书文档
           </button>
           <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded flex items-center gap-1 hover:bg-blue-100 transition-colors">
             <Share2 size={14} /> 分享
           </button>
           <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
             C
           </div>
        </div>
      </div>

      {/* Toolbar Mock */}
      <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-slate-50 gap-4 overflow-x-auto">
         <div className="flex gap-1 text-slate-600">
            <button className="p-1 hover:bg-slate-200 rounded"><Menu size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><Undo size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><Redo size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><Printer size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><PaintBucket size={16}/></button>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex gap-1 items-center">
            <select className="bg-transparent text-xs border border-slate-300 rounded px-1 py-0.5 w-16">
               <option>常规</option>
            </select>
            <span className="font-serif font-bold text-sm px-2">¥</span>
            <span className="font-bold text-sm px-2">%</span>
            <span className="font-bold text-sm px-2">.00</span>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex gap-1 text-slate-600">
            <button className="p-1 hover:bg-slate-200 rounded"><Bold size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><Italic size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><Underline size={16}/></button>
            <button className="p-1 hover:bg-slate-200 rounded"><AlignLeft size={16}/></button>
         </div>
      </div>

      {/* Spreadsheet Content */}
      <div className="flex-1 overflow-auto bg-slate-100 p-4">
         <div className="bg-white shadow-sm border border-slate-300 w-full max-w-[1200px] mx-auto min-h-[500px] relative">
            
            {/* Headers */}
            <div className="grid grid-cols-[50px_1fr_1fr_1.5fr_2fr_1.5fr_1fr_1fr] border-b border-slate-300 bg-slate-50 sticky top-0 z-10">
               <div className="border-r border-slate-300"></div> {/* Row Number Header */}
               {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((col) => (
                  <div key={col} className="border-r border-slate-300 px-2 py-1 text-center text-xs font-bold text-slate-500 bg-slate-50">
                     {col}
                  </div>
               ))}
            </div>

            {/* Row 1: Titles */}
            <div className="grid grid-cols-[50px_1fr_1fr_1.5fr_2fr_1.5fr_1fr_1fr] border-b border-slate-200 hover:bg-blue-50/10">
               <div className="border-r border-slate-300 bg-slate-50 text-center py-2 text-xs text-slate-500">1</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">开发负责人</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">开发负责人电话</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">开发机构</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">项目名称</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">采用方法学</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">国家</div>
               <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-800">省份</div>
            </div>

            {/* Data Rows */}
            {MOCK_SCHEDULE_DATA.map((row, idx) => (
               <div key={idx} className="grid grid-cols-[50px_1fr_1fr_1.5fr_2fr_1.5fr_1fr_1fr] border-b border-slate-200 hover:bg-blue-50/10">
                  <div className="border-r border-slate-300 bg-slate-50 text-center py-2 text-xs text-slate-500">{idx + 2}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600">{row.devLead}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600 font-mono text-right">{row.phone}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600">{row.agency}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600 truncate" title={row.project}>{row.project}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600 truncate">{row.methodology}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600">{row.country}</div>
                  <div className="border-r border-slate-200 px-3 py-2 text-sm text-slate-600">{row.province}</div>
               </div>
            ))}

            {/* Empty Rows Fill */}
            {Array.from({ length: 15 }).map((_, idx) => (
               <div key={`empty-${idx}`} className="grid grid-cols-[50px_1fr_1fr_1.5fr_2fr_1.5fr_1fr_1fr] border-b border-slate-200 h-[37px] hover:bg-blue-50/10">
                  <div className="border-r border-slate-300 bg-slate-50 text-center py-2 text-xs text-slate-500">{idx + 2 + MOCK_SCHEDULE_DATA.length}</div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
                  <div className="border-r border-slate-200"></div>
               </div>
            ))}

         </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { DASHBOARD_DATA } from '../constants';

export const NewsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dynamics' | 'knowledge'>('dynamics');
  const { news, notices, questions } = DASHBOARD_DATA;

  // Render News List Item
  const NewsItem = ({ item }: { item: any }) => (
    <div className="flex items-center py-3 border-b border-slate-50 hover:bg-slate-50 px-2 cursor-pointer group transition-colors">
      <div className="w-6 flex-shrink-0">
        {item.isHot ? (
          <Flame size={14} className="text-red-500 fill-red-500" />
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-auto"></div>
        )}
      </div>
      <div className="flex-1 text-sm text-slate-700 truncate group-hover:text-emerald-600 transition-colors">
        {item.title}
      </div>
      <div className="text-xs text-slate-400 w-24 text-right">{item.date}</div>
    </div>
  );

  return (
    <div className="flex flex-col mt-4">
      <div className="mb-4">
        <h3 className="font-medium text-slate-800 text-lg">碳行业资讯</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[490px]">
        {/* Left: Dynamics & Knowledge */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-0 flex flex-col h-full overflow-hidden">
           <div className="flex border-b border-slate-100 px-4 pt-4">
              <button
                 className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'dynamics' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                 }`}
                 onClick={() => setActiveTab('dynamics')}
              >
                动态
              </button>
              <button
                 className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'knowledge' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                 }`}
                 onClick={() => setActiveTab('knowledge')}
              >
                知识库
              </button>
              <div className="flex-1 flex justify-end pb-3">
                 <button className="text-xs text-slate-400 hover:text-emerald-600 flex items-center">
                   查看更多 <ChevronRight size={12} />
                 </button>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2">
              {news.map((item) => (
                <NewsItem key={item.id} item={item} />
              ))}
              {/* Duplicate for demo scrolling */}
              {news.map((item) => (
                <NewsItem key={`dup-${item.id}`} item={{...item, id: `dup-${item.id}`}} />
              ))}
           </div>
        </div>

        {/* Right: Notices & FAQ */}
        <div className="flex flex-col gap-5 h-full">
           {/* Top: Notices */}
           <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-50">
                <span className="font-medium text-slate-800">公告</span>
                <button className="text-xs text-slate-400 hover:text-emerald-600 flex items-center">
                   查看更多 <ChevronRight size={12} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                 {notices.map((item) => (
                   <div key={item.id} className="py-2.5 text-sm text-slate-600 truncate hover:text-emerald-600 cursor-pointer border-b border-dashed border-slate-50 last:border-0">
                     {item.title}
                   </div>
                 ))}
              </div>
           </div>

           {/* Bottom: FAQ */}
           <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-50">
                <span className="font-medium text-slate-800">常见问题</span>
                <button className="text-xs text-slate-400 hover:text-emerald-600 flex items-center">
                   查看更多 <ChevronRight size={12} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                 {questions.map((item) => (
                   <div key={item.id} className="py-2.5 text-sm text-slate-600 truncate hover:text-emerald-600 cursor-pointer border-b border-dashed border-slate-50 last:border-0">
                     {item.title}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

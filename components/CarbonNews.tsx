import React, { useState } from 'react';
import { Search, Star, X } from 'lucide-react';
import { MOCK_ARTICLES } from '../constants';
import { Article } from '../types';

export const CarbonNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [currentCollectionUrl, setCurrentCollectionUrl] = useState('');

  const handleSearch = () => {
    let filtered = MOCK_ARTICLES;
    
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(item => item.categoryName === selectedCategory);
    }
    
    if (searchKeyword.trim()) {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }
    
    setArticles(filtered);
  };

  const handleLoadMore = () => {
    // Mock loading more data by duplicating current list
    setArticles(prev => [...prev, ...MOCK_ARTICLES.map(item => ({...item, id: `${item.id}-${Date.now()}`}))]);
  };

  const handleCollect = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCollectionUrl(url);
    setIsCollectionModalOpen(true);
  };

  const confirmCollection = () => {
    window.open(currentCollectionUrl, '_blank');
    setIsCollectionModalOpen(false);
  };

  const categories = ['全部', '行业动态', '行业知识库', '常见问题', '平台公告'];

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
         
         <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">文章类型 |</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 min-w-[150px] focus:outline-none focus:border-emerald-500"
            >
               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
         </div>

         <div className="flex items-center gap-2 flex-1 w-full">
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">文章搜索 |</span>
            <div className="relative flex-1">
               <input 
                 type="text" 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 placeholder="输入标题" 
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
               />
            </div>
         </div>
         
         <button 
           onClick={handleSearch}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors w-full md:w-auto"
         >
           查询
         </button>
      </div>

      {/* Article List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
         {articles.length > 0 ? (
            <div className="divide-y divide-slate-100">
               {articles.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                     <div className="flex-1 pr-8">
                        <h3 className="text-base font-medium text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                           {item.title}
                        </h3>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                           <span className="text-emerald-600 font-medium">#{item.categoryName}</span>
                           <span>{item.updatedTime}</span>
                           <span>{item.author}</span>
                        </div>
                     </div>
                     
                     <div className="flex items-center border-l border-slate-200 pl-8 h-12">
                        <button 
                          onClick={(e) => handleCollect(item.url, e)}
                          className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 transition-colors text-sm font-medium"
                        >
                           <Star size={18} />
                           收藏
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="p-10 text-center text-slate-400">暂无相关文章</div>
         )}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
         <button 
           onClick={handleLoadMore}
           className="px-8 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors shadow-sm"
         >
           加载更多
         </button>
      </div>

      {/* Collection Hint Modal */}
      {isCollectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded shadow-xl w-[560px] animate-in zoom-in-95 duration-200 overflow-hidden relative">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-lg font-medium text-slate-800">提示</h3>
                 <button onClick={() => setIsCollectionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-8 pb-4">
                 <p className="text-slate-600 mb-8 text-center">
                    请进入飞书文档，点击标题右侧按钮收藏！
                 </p>
                 <div className="flex justify-end">
                    <button 
                      onClick={confirmCollection}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors"
                    >
                       确 定
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { Search, ArrowRightLeft, TrendingUp, Filter } from 'lucide-react';
import { MOCK_MARKET_DATA } from '../constants';
import { AssetType } from '../types';
import { PurchaseRequestModal } from './PurchaseRequestModal';
import { OffMarketQuotationModal } from './OffMarketQuotationModal';

export const TradingMarket: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  // Filter States (Mock for visual toggle)
  const [assetTypeFilter, setAssetTypeFilter] = useState('全部');

  const filteredData = MOCK_MARKET_DATA.filter(item => 
    assetTypeFilter === '全部' ? true : 
    assetTypeFilter === 'CREDIT' ? item.type === AssetType.CREDIT : 
    item.type === AssetType.QUOTA
  );

  const handleTradeClick = (item: any) => {
    setSelectedAsset(item);
    setIsTradeModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">碳交易市场</h2>
          <p className="text-slate-500 mt-1">实时行情、场外撮合与交易所集成。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`px-4 py-2 bg-white border border-slate-300 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 ${isFilterOpen ? 'text-emerald-600 border-emerald-500 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'}`}
             >
               <Filter size={16} />
               筛选
             </button>
             {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 p-2 animate-in zoom-in-95">
                   <div className="text-xs font-semibold text-slate-400 mb-2 px-2">资产类型</div>
                   <button onClick={() => setAssetTypeFilter('全部')} className={`w-full text-left px-3 py-2 rounded text-sm ${assetTypeFilter === '全部' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50'}`}>全部</button>
                   <button onClick={() => setAssetTypeFilter('QUOTA')} className={`w-full text-left px-3 py-2 rounded text-sm ${assetTypeFilter === 'QUOTA' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50'}`}>碳配额 (Quota)</button>
                   <button onClick={() => setAssetTypeFilter('CREDIT')} className={`w-full text-left px-3 py-2 rounded text-sm ${assetTypeFilter === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50'}`}>碳信用 (Credit)</button>
                </div>
             )}
          </div>
          
          <button 
            onClick={() => setIsPublishModalOpen(true)}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <ArrowRightLeft size={16} />
            发布挂单
          </button>
        </div>
      </div>

      {/* Market Stats Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-semibold uppercase">市场指数</p>
            <h3 className="text-3xl font-bold mt-1">89.42</h3>
            <p className="text-emerald-400 text-sm mt-1 flex items-center gap-1">+1.24% <TrendingUp size={14}/></p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
             <TrendingUp size={120} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs font-semibold uppercase">24h 成交量</p>
           <h3 className="text-2xl font-bold text-slate-800 mt-1">34.5万 吨</h3>
           <p className="text-slate-400 text-sm mt-1">~ ¥ 3120万 成交额</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs font-semibold uppercase">活跃挂单</p>
           <h3 className="text-2xl font-bold text-slate-800 mt-1">1,204</h3>
           <p className="text-slate-400 text-sm mt-1">45 笔待撮合</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索资产 (如 CEA-2023)..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer">全部</span>
             <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-medium cursor-pointer transition-colors">现货</span>
             <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-medium cursor-pointer transition-colors">期货</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">资产名称</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">最新价 (¥)</th>
                <th className="px-6 py-4">24h 涨跌</th>
                <th className="px-6 py-4">成交量 (吨)</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.assetName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.type === AssetType.QUOTA ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {item.type === AssetType.QUOTA ? '配额' : '信用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-slate-700">¥ {item.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 font-medium ${item.change24h >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.change24h > 0 ? '+' : ''}{item.change24h}%
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.volume.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleTradeClick(item)}
                      className="px-3 py-1.5 bg-white border border-emerald-500 text-emerald-600 rounded-md font-medium text-xs hover:bg-emerald-50 transition-colors"
                    >
                      交易
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Publish Order Modal (Using existing Quote modal as proxy) */}
      {isPublishModalOpen && (
        <OffMarketQuotationModal 
           title="发布新挂单"
           onClose={() => setIsPublishModalOpen(false)}
           onSubmit={() => { alert('挂单已发布！'); setIsPublishModalOpen(false); }}
        />
      )}

      {/* Trade Modal (Buying) */}
      {isTradeModalOpen && (
        <PurchaseRequestModal 
           onClose={() => setIsTradeModalOpen(false)}
        />
      )}

    </div>
  );
};

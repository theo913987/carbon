import React, { useState } from 'react';
import { ArrowLeft, Leaf, FileText, BarChart3, ChevronRight } from 'lucide-react';
import { MOCK_QUOTAS } from '../constants';
import { OffMarketQuotationModal } from './OffMarketQuotationModal';

interface QuotaDetailProps {
  id: string;
  onBack: () => void;
}

export const QuotaDetail: React.FC<QuotaDetailProps> = ({ id, onBack }) => {
  const asset = MOCK_QUOTAS.find(c => c.id === id) || MOCK_QUOTAS[0];
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  const InfoItem = ({ label, value, isFile = false }: { label: string, value: string | number, isFile?: boolean }) => (
    <div className="mb-4">
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <div className={`text-sm ${isFile ? 'text-blue-600 cursor-pointer hover:underline' : 'text-slate-800 font-medium'}`}>
        {value}
      </div>
    </div>
  );

  return (
    <div className="p-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-100px)]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-2 mb-4 text-emerald-600 font-medium text-sm">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              碳配额详情
           </div>
           <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-slate-800 max-w-3xl leading-snug">{asset.agencyName}</h1>
              <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-sm border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50">
                 <ArrowLeft size={16} /> 返回
              </button>
           </div>
        </div>

        <div className="p-8 space-y-10">
           
           {/* Basic Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <Leaf size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">基本信息</h3>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                 <InfoItem label="签发日期" value={asset.issuanceDate} />
                 <InfoItem label="签发凭证" value={asset.issuanceCertificate} isFile />
                 <InfoItem label="有效期" value={asset.expiryDate} />
              </div>
           </section>

           {/* Asset Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <FileText size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">资产信息</h3>
                 <button className="text-xs text-emerald-600 flex items-center hover:underline ml-auto">查看详情 <ChevronRight size={12}/></button>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                 {asset.projectIntroduction || '--'}
              </div>
           </section>

           {/* Holdings Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <BarChart3 size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">持仓信息</h3>
                 <button className="text-xs text-emerald-600 flex items-center hover:underline ml-auto">查看详情 <ChevronRight size={12}/></button>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-6 gap-4">
                 <InfoItem label="资产状态" value={asset.status === 'PENDING' ? '待审核' : '正常'} />
                 <InfoItem label="持仓总量(tCO2e)" value={asset.total} />
                 <InfoItem label="资产估值(¥)" value={asset.valuation.toLocaleString()} />
                 <InfoItem label="可用数量(tCO2e)" value={asset.availableAmount} />
                 <InfoItem label="锁定数量(tCO2e)" value={asset.lockedAmount} />
                 <InfoItem label="冻结数量(tCO2e)" value={asset.frozenAmount} />
              </div>
           </section>

           {/* Transaction Info */}
           <section>
              <div className="flex items-center gap-2 mb-6">
                 <FileText size={18} className="text-slate-400" />
                 <h3 className="font-bold text-slate-700">交易信息</h3>
                 <button className="text-xs text-emerald-600 flex items-center hover:underline ml-auto">查看详情 <ChevronRight size={12}/></button>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 grid grid-cols-2 md:grid-cols-6 gap-4">
                 <InfoItem label="交易状态" value={asset.transactionStatus || '--'} />
                 <InfoItem label="交割场所" value={asset.exchangeName || '--'} />
                 <InfoItem label="购入凭证" value={asset.buyCertificate} isFile />
                 <InfoItem label="购入单价(¥)" value={asset.buyPrice} />
                 <InfoItem label="购入总价(¥)" value={asset.buyTotalPrice.toLocaleString()} />
                 <InfoItem label="购入日期" value={asset.buyDate} />
              </div>
           </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4 rounded-b-xl">
           <button onClick={onBack} className="px-6 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              返回
           </button>
           <button onClick={() => setIsQuotationModalOpen(true)} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
              场外报价
           </button>
           <button onClick={() => alert('跳转至场内交易界面')} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
              场内交易
           </button>
        </div>
      </div>

      {isQuotationModalOpen && (
        <OffMarketQuotationModal 
          title={asset.exchangeName} // Using Exchange name as title based on vue example screenshot
          onClose={() => setIsQuotationModalOpen(false)} 
          onSubmit={() => { alert('报价申请已提交'); setIsQuotationModalOpen(false); }}
        />
      )}
    </div>
  );
};
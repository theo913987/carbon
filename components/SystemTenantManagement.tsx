
import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { MOCK_TENANTS } from '../constants';
import { Tenant } from '../types';

export const SystemTenantManagement: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentTenant, setCurrentTenant] = useState<Partial<Tenant>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter Logic
  const handleSearch = () => {
    let filtered = MOCK_TENANTS;
    if (filterType !== '全部') filtered = filtered.filter(t => t.type === filterType);
    if (filterStatus !== '全部') {
       const statusMap: Record<string, string> = { '已开户': 'NORMAL', '禁用': 'DISABLED' };
       filtered = filtered.filter(t => t.status === statusMap[filterStatus]);
    }
    
    if (searchKeyword) {
      filtered = filtered.filter(t => t.tenantName.includes(searchKeyword));
    }
    setTenants(filtered);
  };

  const handleEdit = (tenant: Tenant) => {
    setCurrentTenant({ ...tenant });
    setIsEditModalOpen(true);
  };

  const handleView = (tenant: Tenant) => {
    setCurrentTenant({ ...tenant });
    setIsReadModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setTenants(prev => prev.filter(t => t.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSave = () => {
    if (currentTenant.id) {
      setTenants(prev => prev.map(t => t.id === currentTenant.id ? { ...t, ...currentTenant } as Tenant : t));
    } else {
      const newTenant = {
        ...currentTenant,
        id: Date.now().toString(),
        createdTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: currentTenant.status || 'NORMAL',
        validityTime: currentTenant.validityTime || '--',
      } as Tenant;
      setTenants(prev => [newTenant, ...prev]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'NORMAL': return '已开户';
      case 'DISABLED': return '禁用';
      default: return status;
    }
  };

  // Reusable Form Content
  const TenantForm = ({ isEdit = false, isRead = false }) => (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto px-1">
       {/* Row 1 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">租户 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.tenantName || ''}
               onChange={e => setCurrentTenant({...currentTenant, tenantName: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系电话 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.telephone || ''}
               onChange={e => setCurrentTenant({...currentTenant, telephone: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系邮箱 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.email || ''}
               onChange={e => setCurrentTenant({...currentTenant, email: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
       </div>

       {/* Row 2 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系地址</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.address || ''}
               onChange={e => setCurrentTenant({...currentTenant, address: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">状态 <span className="text-red-500">*</span></label>
             <select 
               disabled={isRead}
               value={currentTenant.status || 'NORMAL'}
               onChange={e => setCurrentTenant({...currentTenant, status: e.target.value as any})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500"
             >
                <option value="NORMAL">启用</option>
                <option value="DISABLED">禁用</option>
             </select>
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">有效期 <span className="text-red-500">*</span></label>
             <input 
               type="date"
               disabled={isRead}
               value={currentTenant.validityTime ? currentTenant.validityTime.split(' ')[0] : ''}
               onChange={e => setCurrentTenant({...currentTenant, validityTime: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
       </div>

       {/* Row 3 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">租户编码 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.orgName || ''}
               onChange={e => setCurrentTenant({...currentTenant, orgName: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系人姓名</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.contactName || ''}
               onChange={e => setCurrentTenant({...currentTenant, contactName: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系人手机</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.contactPhone || ''}
               onChange={e => setCurrentTenant({...currentTenant, contactPhone: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
       </div>

       {/* Row 4 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系人职位</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.contactPosition || ''}
               onChange={e => setCurrentTenant({...currentTenant, contactPosition: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">传真号</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.faxNumber || ''}
               onChange={e => setCurrentTenant({...currentTenant, faxNumber: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">行业</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.industry || ''}
               onChange={e => setCurrentTenant({...currentTenant, industry: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
       </div>

       {/* Row 5 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">法人代表</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.legalRepresentative || ''}
               onChange={e => setCurrentTenant({...currentTenant, legalRepresentative: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">信用代码</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.socialCreditCode || ''}
               onChange={e => setCurrentTenant({...currentTenant, socialCreditCode: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">租户类型 <span className="text-red-500">*</span></label>
             <select 
               disabled={isRead}
               value={currentTenant.type || '企业账户'}
               onChange={e => setCurrentTenant({...currentTenant, type: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500"
             >
                <option value="企业账户">企业账户</option>
                <option value="试用账户">试用账户</option>
             </select>
          </div>
       </div>

       {/* Row 6 */}
       <div className="grid grid-cols-3 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">营业执照</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.businessLicense || ''}
               onChange={e => setCurrentTenant({...currentTenant, businessLicense: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
          <div className="col-span-2">
             <label className="block text-sm text-slate-500 mb-1">企业介绍</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentTenant.introduction || ''}
               onChange={e => setCurrentTenant({...currentTenant, introduction: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500" 
             />
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">租户类型 |</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-32">
               <option>全部</option>
               <option>企业账户</option>
               <option>试用账户</option>
            </select>
         </div>
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">状态 |</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-24">
               <option>全部</option>
               <option>已开户</option>
               <option>禁用</option>
            </select>
         </div>
         <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">租户搜索 |</label>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入公司名" 
              className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearch}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           查询
         </button>
      </div>

      {/* Action Bar */}
      <div>
         <button 
           onClick={() => { setCurrentTenant({}); setIsAddModalOpen(true); }}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors mb-4"
         >
           <Plus size={16} /> 新增租户
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-12">
                  <tr>
                     <th className="px-6 w-16">序号</th>
                     <th className="px-6">租户</th>
                     <th className="px-6">类型</th>
                     <th className="px-6">状态</th>
                     <th className="px-6">联系电话</th>
                     <th className="px-6">联系邮箱</th>
                     <th className="px-6">联系人</th>
                     <th className="px-6 w-40">开户日期</th>
                     <th className="px-6 w-32">租户有效期</th>
                     <th className="px-6 w-24">行业</th>
                     <th className="px-6 w-40 text-center">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {tenants.map((item, idx) => (
                     <tr 
                        key={item.id} 
                        className="hover:bg-slate-50 transition-colors h-14"
                     >
                        <td className="px-6 text-slate-500">{idx + 1}</td>
                        <td className="px-6 text-slate-800">{item.tenantName}</td>
                        <td className="px-6 text-slate-600">{item.type}</td>
                        <td className="px-6">
                           <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.status === 'NORMAL' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                           }`}>
                              {getStatusLabel(item.status)}
                           </span>
                        </td>
                        <td className="px-6 text-slate-600">{item.telephone}</td>
                        <td className="px-6 text-slate-600">{item.email}</td>
                        <td className="px-6 text-slate-600">{item.contactName}</td>
                        <td className="px-6 text-slate-500 text-xs">{item.createdTime}</td>
                        <td className="px-6 text-slate-500 text-xs">{item.validityTime}</td>
                        <td className="px-6 text-slate-500 text-xs">{item.industry}</td>
                        <td className="px-6 text-center">
                           <button 
                             onClick={() => handleView(item)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs mr-3"
                           >
                              查看
                           </button>
                           <button 
                             onClick={() => handleEdit(item)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs mr-3"
                           >
                              编辑
                           </button>
                           <button 
                             onClick={() => handleDeleteClick(item.id)}
                             className="text-red-500 hover:text-red-700 font-medium text-xs"
                           >
                              删除
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
               <span>共 {tenants.length} 条</span>
               <select className="border border-slate-200 rounded px-2 py-1 bg-white">
                  <option>10条/页</option>
               </select>
               <div className="flex gap-1">
                  <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&lt;</button>
                  <button className="w-8 h-8 border rounded bg-emerald-600 text-white">1</button>
                  <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&gt;</button>
               </div>
               <div className="flex items-center gap-2">
                  <span>前往</span>
                  <input type="text" defaultValue="1" className="w-10 h-8 border rounded text-center" />
                  <span>页</span>
               </div>
            </div>
         </div>
      </div>

      {/* Add / Edit / View Modals */}
      {(isAddModalOpen || isEditModalOpen || isReadModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                 <h3 className="text-lg font-medium text-slate-800">
                    {isReadModalOpen ? '企业信息' : isEditModalOpen ? '编辑企业信息' : '新增租户'}
                 </h3>
                 <button 
                   onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setIsReadModalOpen(false); }} 
                   className="text-slate-400 hover:text-slate-600"
                 >
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-8">
                 <TenantForm isEdit={isEditModalOpen} isRead={isReadModalOpen} />
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-center gap-4">
                 {isReadModalOpen ? (
                    <button onClick={() => setIsReadModalOpen(false)} className="px-8 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">确定</button>
                 ) : (
                    <>
                       <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-8 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">取消</button>
                       <button onClick={handleSave} className="px-8 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                          {isEditModalOpen ? '保存' : '确定'}
                       </button>
                    </>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded shadow-xl w-[400px] animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                 <h3 className="text-base font-medium text-slate-800">提示</h3>
                 <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
              </div>
              <div className="p-8 text-center text-slate-600">
                 确认删除当前租户？
              </div>
              <div className="flex justify-center gap-4 pb-6">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 border border-emerald-500 text-emerald-600 rounded text-sm hover:bg-emerald-50 transition-colors">取消</button>
                 <button onClick={confirmDelete} className="px-6 py-2 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 transition-colors">确定</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

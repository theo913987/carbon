
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MOCK_SYSTEM_ACCOUNTS } from '../constants';
import { SystemAccount } from '../types';
import { Modal } from './common/Modal';
import { Pagination } from './common/Pagination';
import { StatusBadge } from './common/StatusBadge';

export const SystemAccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<SystemAccount[]>(MOCK_SYSTEM_ACCOUNTS);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Filters
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');
  const [filterVersion, setFilterVersion] = useState('全部');

  // Modals
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT' | 'VIEW' | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentAccount, setCurrentAccount] = useState<Partial<SystemAccount>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter Logic
  const handleSearch = () => {
    let filtered = MOCK_SYSTEM_ACCOUNTS;
    if (filterType !== '全部') filtered = filtered.filter(a => a.accountType === filterType);
    if (filterStatus !== '全部') {
       const statusMap: Record<string, string> = { '已开户': 'NORMAL', '待审核': 'PENDING', '禁用': 'DISABLED' };
       filtered = filtered.filter(a => a.status === statusMap[filterStatus]);
    }
    if (filterVersion !== '全部') filtered = filtered.filter(a => a.productVersion === filterVersion);
    
    if (searchKeyword) {
      filtered = filtered.filter(a => 
        a.accountName.includes(searchKeyword) || 
        a.username.includes(searchKeyword) ||
        (a.tenantName && a.tenantName.includes(searchKeyword))
      );
    }
    setAccounts(filtered);
  };

  const handleEdit = (account: SystemAccount) => {
    setCurrentAccount({ ...account });
    setModalMode('EDIT');
  };

  const handleView = (account: SystemAccount) => {
    setCurrentAccount({ ...account });
    setModalMode('VIEW');
  };

  const handleAdd = () => {
    setCurrentAccount({});
    setModalMode('ADD');
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setAccounts(prev => prev.filter(a => a.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSave = () => {
    if (currentAccount.id) {
      setAccounts(prev => prev.map(a => a.id === currentAccount.id ? { ...a, ...currentAccount } as SystemAccount : a));
    } else {
      const newAccount = {
        ...currentAccount,
        id: Date.now().toString(),
        createdTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: 'PENDING',
        validityPeriod: '--',
        roleName: currentAccount.roleName || '注册用户'
      } as SystemAccount;
      setAccounts(prev => [newAccount, ...prev]);
    }
    setModalMode(null);
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'NORMAL': return '已开户';
      case 'PENDING': return '待审核';
      case 'DISABLED': return '禁用';
      default: return status;
    }
  };

  // Reusable Form Content
  const AccountForm = ({ isRead = false }) => (
    <div className="space-y-6">
       {/* Row 1 */}
       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">用户账号 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentAccount.accountName || ''}
               onChange={e => setCurrentAccount({...currentAccount, accountName: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">用户姓名</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentAccount.username || ''}
               onChange={e => setCurrentAccount({...currentAccount, username: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500" 
             />
          </div>
       </div>

       {/* Row 2 */}
       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">联系电话 <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentAccount.phone || ''}
               onChange={e => setCurrentAccount({...currentAccount, phone: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500" 
             />
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">电子邮箱</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentAccount.email || ''}
               onChange={e => setCurrentAccount({...currentAccount, email: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500" 
             />
          </div>
       </div>

       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">用户角色 <span className="text-red-500">*</span></label>
             <select 
               disabled={isRead}
               value={currentAccount.roleName || ''}
               onChange={e => setCurrentAccount({...currentAccount, roleName: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500"
             >
                <option value="注册用户">注册用户</option>
                <option value="管理员">管理员</option>
                <option value="超级管理员">超级管理员</option>
             </select>
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">所属租户</label>
             <select 
               disabled={isRead}
               className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500"
             >
                <option>{currentAccount.tenantName || '上海碳邦科技'}</option>
             </select>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">账户类型 <span className="text-red-500">*</span></label>
             <select 
                disabled={isRead}
                value={currentAccount.accountType || ''}
                onChange={e => setCurrentAccount({...currentAccount, accountType: e.target.value})}
                className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500"
             >
               <option value="企业账户">企业账户</option>
               <option value="试用账户">试用账户</option>
             </select>
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">产品版本 <span className="text-red-500">*</span></label>
             <select 
                disabled={isRead}
                value={currentAccount.productVersion || ''}
                onChange={e => setCurrentAccount({...currentAccount, productVersion: e.target.value})}
                className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500"
             >
               <option value="专业版">专业版</option>
               <option value="基础版">基础版</option>
               <option value="试用版">试用版</option>
             </select>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-sm text-slate-500 mb-1">账户状态 <span className="text-red-500">*</span></label>
             <select 
                disabled={isRead}
                value={currentAccount.status || 'NORMAL'}
                onChange={e => setCurrentAccount({...currentAccount, status: e.target.value as any})}
                className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500"
             >
               <option value="NORMAL">已开户/启用</option>
               <option value="PENDING">待审核</option>
               <option value="DISABLED">禁用</option>
             </select>
          </div>
          <div>
             <label className="block text-sm text-slate-500 mb-1">企业介绍/备注</label>
             <input 
               type="text" 
               disabled={isRead}
               value={currentAccount.remarks || ''}
               onChange={e => setCurrentAccount({...currentAccount, remarks: e.target.value})}
               className="w-full p-2.5 border border-slate-300 rounded text-sm disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:border-emerald-500" 
             />
          </div>
       </div>
    </div>
  );

  const modalTitle = {
    'ADD': '新增用户',
    'EDIT': '编辑用户信息',
    'VIEW': '用户信息'
  };

  const modalFooter = () => {
    if (modalMode === 'VIEW') {
        return <button onClick={() => setModalMode(null)} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">确定</button>;
    }
    return (
        <>
            <button onClick={() => setModalMode(null)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">取消</button>
            <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">保存</button>
        </>
    );
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">账户类型 |</label>
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
               <option>待审核</option>
               <option>禁用</option>
            </select>
         </div>
         <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">产品版本 |</label>
            <select value={filterVersion} onChange={e => setFilterVersion(e.target.value)} className="p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 w-28">
               <option>全部</option>
               <option>专业版</option>
               <option>基础版</option>
               <option>试用版</option>
            </select>
         </div>
         <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">用户搜索 |</label>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入用户名或公司名" 
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
           onClick={handleAdd}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors mb-4"
         >
           <Plus size={16} /> 新增用户
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-12">
                  <tr>
                     <th className="px-6 w-16"></th>
                     <th className="px-6">用户账号</th>
                     <th className="px-6">用户名称</th>
                     <th className="px-6">用户角色</th>
                     <th className="px-6">账户类型</th>
                     <th className="px-6">产品版本</th>
                     <th className="px-6">状态</th>
                     <th className="px-6 w-40">开户时间</th>
                     <th className="px-6 w-32">账户有效期</th>
                     <th className="px-6 w-24">备注</th>
                     <th className="px-6 w-32 text-center">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {accounts.map((item) => (
                     <tr 
                        key={item.id} 
                        className="hover:bg-slate-50 transition-colors h-14 cursor-pointer"
                        onClick={() => handleView(item)}
                     >
                        <td className="px-6"></td>
                        <td className="px-6 text-slate-800">{item.accountName}</td>
                        <td className="px-6 text-slate-600 truncate max-w-[120px]" title={item.username}>{item.username}</td>
                        <td className="px-6 text-slate-600">{item.roleName}</td>
                        <td className="px-6 text-slate-600">{item.accountType}</td>
                        <td className="px-6 text-slate-600">{item.productVersion}</td>
                        <td className="px-6">
                           <StatusBadge status={item.status} label={getStatusLabel(item.status)} />
                        </td>
                        <td className="px-6 text-slate-500 text-xs">{item.createdTime}</td>
                        <td className="px-6 text-slate-500 text-xs">{item.validityPeriod}</td>
                        <td className="px-6 text-slate-500 text-xs">{item.remarks}</td>
                        <td className="px-6 text-center" onClick={e => e.stopPropagation()}>
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
            
            <Pagination total={accounts.length} />
         </div>
      </div>

      {/* Main Modal (Add / Edit / View) */}
      <Modal
        isOpen={!!modalMode}
        onClose={() => setModalMode(null)}
        title={modalMode ? modalTitle[modalMode] : ''}
        size="4xl"
        footer={modalFooter()}
      >
         <AccountForm isRead={modalMode === 'VIEW'} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="提示"
        size="sm"
        footer={
            <>
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">取消</button>
                <button onClick={confirmDelete} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">确定</button>
            </>
        }
      >
         <div className="text-center text-slate-600 py-4">
            确认删除当前账户？
         </div>
      </Modal>

    </div>
  );
};

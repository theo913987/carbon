
import React, { useState } from 'react';
import { Search, Plus, X, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { MOCK_SYSTEM_ROLES, MOCK_PERMISSIONS_TREE } from '../constants';
import { SystemRole } from '../types';

export const SystemRoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<SystemRole[]>(MOCK_SYSTEM_ROLES);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPermissionDrawerOpen, setIsPermissionDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentRole, setCurrentRole] = useState<Partial<SystemRole>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newRoleForm, setNewRoleForm] = useState({
    roleName: '',
    roleCode: '',
    status: 'NORMAL',
    description: ''
  });

  // Permission Tree State
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['2', '3']);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Search Logic
  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      setRoles(MOCK_SYSTEM_ROLES);
      return;
    }
    const filtered = MOCK_SYSTEM_ROLES.filter(r => 
      r.roleName.includes(searchKeyword)
    );
    setRoles(filtered);
  };

  const handleEditPermissions = (role: SystemRole) => {
    setCurrentRole(role);
    // Mock: Reset or load permissions for this role
    // For demo, just keeping current selection or resetting
    setIsPermissionDrawerOpen(true);
  };

  const handleAddRole = () => {
    if (!newRoleForm.roleName || !newRoleForm.roleCode) {
      alert('角色名称和角色编码不能为空！');
      return;
    }
    const newRole: SystemRole = {
      id: Date.now().toString(),
      roleName: newRoleForm.roleName,
      roleCode: newRoleForm.roleCode,
      status: newRoleForm.status as 'NORMAL' | 'DISABLED',
      createdTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      description: newRoleForm.description
    };
    setRoles(prev => [newRole, ...prev]);
    setIsAddModalOpen(false);
    setNewRoleForm({ roleName: '', roleCode: '', status: 'NORMAL', description: '' });
    alert('添加成功');
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setRoles(prev => prev.filter(r => r.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      alert('删除数据成功');
    }
  };

  const savePermissions = () => {
    alert('保存成功');
    setIsPermissionDrawerOpen(false);
  };

  // Tree Component Helpers
  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id: string, children?: any[]) => {
    let newSelected = [...selectedPermissions];
    const isSelected = newSelected.includes(id);

    if (isSelected) {
      newSelected = newSelected.filter(pid => pid !== id);
      // Deselect children
      if (children) {
        const childIds = children.map(c => c.id);
        newSelected = newSelected.filter(pid => !childIds.includes(pid));
      }
    } else {
      newSelected.push(id);
      // Select children
      if (children) {
        children.forEach(c => {
          if (!newSelected.includes(c.id)) newSelected.push(c.id);
        });
      }
    }
    setSelectedPermissions(newSelected);
  };

  const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
    const isExpanded = expandedNodes.includes(node.id);
    const isSelected = selectedPermissions.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="select-none">
        <div 
          className="flex items-center py-2 px-2 hover:bg-slate-50 cursor-pointer"
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          <div onClick={(e) => { e.stopPropagation(); if(hasChildren) toggleExpand(node.id); }} className={`mr-1 text-slate-400 ${!hasChildren && 'invisible'}`}>
             {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          <div 
            onClick={() => toggleSelect(node.id, node.children)}
            className={`w-4 h-4 border rounded mr-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}
          >
            {isSelected && <Check size={12} className="text-white" />}
          </div>
          <span className="text-sm text-slate-700" onClick={() => toggleSelect(node.id, node.children)}>{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
         <div className="flex-1 max-w-md flex items-center relative">
            <span className="absolute left-3 text-slate-500 text-sm font-medium border-r border-slate-300 pr-3 mr-3">搜索</span>
            <input 
              type="text" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="输入名称" 
              className="w-full pl-16 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
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
           onClick={() => setIsAddModalOpen(true)}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors mb-4"
         >
           <Plus size={16} /> 添加角色
         </button>

         {/* Table */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-16">
                  <tr>
                     <th className="px-6 w-16">序号</th>
                     <th className="px-6">角色昵称</th>
                     <th className="px-6">角色编码</th>
                     <th className="px-6 w-24">状态</th>
                     <th className="px-6 w-48">创建时间</th>
                     <th className="px-6 w-48">更新时间</th>
                     <th className="px-6 w-40 text-center">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {roles.map((item, idx) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors h-16">
                        <td className="px-6 text-slate-500">{idx + 1}</td>
                        <td className="px-6 font-medium text-slate-800">{item.roleName}</td>
                        <td className="px-6 text-slate-600">{item.roleCode}</td>
                        <td className="px-6">
                           <span className={item.status === 'NORMAL' ? 'text-slate-600' : 'text-amber-600'}>
                              {item.status === 'NORMAL' ? '启用' : '禁用'}
                           </span>
                        </td>
                        <td className="px-6 text-slate-500">{item.createdTime}</td>
                        <td className="px-6 text-slate-500">{item.updatedTime}</td>
                        <td className="px-6 text-center">
                           {item.isDel ? (
                             <span className="text-slate-400">-</span>
                           ) : (
                             <div className="flex items-center justify-center gap-3">
                                <button 
                                  onClick={() => handleEditPermissions(item)}
                                  className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                                >
                                   编辑
                                </button>
                                <button 
                                  onClick={() => handleDeleteClick(item.id)}
                                  className="text-red-500 hover:text-red-700 font-medium text-xs whitespace-nowrap"
                                >
                                   删除
                                </button>
                             </div>
                           )}
                        </td>
                     </tr>
                  ))}
                  {roles.length === 0 && (
                     <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-400">暂无数据</td>
                     </tr>
                  )}
               </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
               <span>共 {roles.length} 条</span>
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

      {/* Add Role Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200 relative">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">添加角色</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">角色名称</label>
                    <input 
                      type="text" 
                      value={newRoleForm.roleName}
                      onChange={e => setNewRoleForm({...newRoleForm, roleName: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">角色编码</label>
                    <input 
                      type="text" 
                      value={newRoleForm.roleCode}
                      onChange={e => setNewRoleForm({...newRoleForm, roleCode: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">角色状态</label>
                    <select 
                      value={newRoleForm.status}
                      onChange={e => setNewRoleForm({...newRoleForm, status: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                    >
                       <option value="NORMAL">启用</option>
                       <option value="DISABLED">禁用</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">角色描述</label>
                    <textarea 
                      value={newRoleForm.description}
                      onChange={e => setNewRoleForm({...newRoleForm, description: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-sm h-20 resize-none" 
                    />
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                 <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    取消
                 </button>
                 <button onClick={handleAddRole} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    确定
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Permission Drawer */}
      {isPermissionDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[60]" onClick={() => setIsPermissionDrawerOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[70] animate-in slide-in-from-right duration-300 flex flex-col">
             <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">角色权限配置</h3>
                {/* Close button not strictly in design but good UX */}
                <button onClick={() => setIsPermissionDrawerOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4">
                {MOCK_PERMISSIONS_TREE.map(node => (
                   <TreeNode key={node.id} node={node} />
                ))}
             </div>

             <div className="p-6 border-t border-slate-100 flex justify-center gap-4 bg-white">
                <button onClick={() => setIsPermissionDrawerOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                   取消
                </button>
                <button onClick={savePermissions} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                   保存
                </button>
             </div>
          </div>
        </>
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
                 是否删除该角色？
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

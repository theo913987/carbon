
import React, { useState } from 'react';
import { Search, Plus, X, Settings } from 'lucide-react';
import { MOCK_SYSTEM_DICTIONARIES, MOCK_SYSTEM_DICTIONARY_ITEMS } from '../constants';
import { SystemDictionary, SystemDictionaryItem } from '../types';

export const SystemDictionaryManagement: React.FC = () => {
  // --- Main Dictionary List State ---
  const [dictionaries, setDictionaries] = useState<SystemDictionary[]>(MOCK_SYSTEM_DICTIONARIES);
  const [searchDictName, setSearchDictName] = useState('');
  const [searchDictCode, setSearchDictCode] = useState('');

  // --- Modals State ---
  const [isDictModalOpen, setIsDictModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // --- Current Selection/Form Data ---
  const [dictForm, setDictForm] = useState<Partial<SystemDictionary>>({});
  const [currentConfigDict, setCurrentConfigDict] = useState<SystemDictionary | null>(null);
  
  const [items, setItems] = useState<SystemDictionaryItem[]>([]); // Current config items
  const [searchItemLabel, setSearchItemLabel] = useState('');
  const [searchItemValue, setSearchItemValue] = useState('');
  const [itemForm, setItemForm] = useState<Partial<SystemDictionaryItem>>({});

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'DICT' | 'ITEM', id: string } | null>(null);

  // --- Dictionary Logic ---

  const handleSearchDicts = () => {
    let filtered = MOCK_SYSTEM_DICTIONARIES;
    if (searchDictName) filtered = filtered.filter(d => d.dictName.includes(searchDictName));
    if (searchDictCode) filtered = filtered.filter(d => d.dictCode.includes(searchDictCode));
    setDictionaries(filtered);
  };

  const handleAddDict = () => {
    setDictForm({ dictName: '', dictCode: '', description: '', type: 'STRING' });
    setIsDictModalOpen(true);
  };

  const handleEditDict = (dict: SystemDictionary) => {
    setDictForm({ ...dict });
    setIsDictModalOpen(true);
  };

  const handleDeleteDict = (id: string) => {
    setDeleteTarget({ type: 'DICT', id });
    setIsDeleteModalOpen(true);
  };

  const saveDict = () => {
    if (!dictForm.dictName || !dictForm.dictCode) {
      alert('字典名称和编码不能为空');
      return;
    }

    if (dictForm.id) {
      // Update
      setDictionaries(prev => prev.map(d => d.id === dictForm.id ? { ...d, ...dictForm } as SystemDictionary : d));
    } else {
      // Create
      const newDict: SystemDictionary = {
        ...dictForm as SystemDictionary,
        id: Date.now().toString(),
        createdTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };
      setDictionaries(prev => [newDict, ...prev]);
    }
    setIsDictModalOpen(false);
  };

  // --- Dictionary Items (Config) Logic ---

  const handleOpenConfig = (dict: SystemDictionary) => {
    setCurrentConfigDict(dict);
    // Load mock items for this dict
    const dictItems = MOCK_SYSTEM_DICTIONARY_ITEMS.filter(i => i.dictCode === dict.dictCode);
    setItems(dictItems);
    setSearchItemLabel('');
    setSearchItemValue('');
    setIsConfigModalOpen(true);
  };

  const handleSearchItems = () => {
    if (!currentConfigDict) return;
    let filtered = MOCK_SYSTEM_DICTIONARY_ITEMS.filter(i => i.dictCode === currentConfigDict.dictCode);
    if (searchItemLabel) filtered = filtered.filter(i => i.itemLabel.includes(searchItemLabel));
    if (searchItemValue) filtered = filtered.filter(i => i.itemValue.includes(searchItemValue));
    setItems(filtered);
  };

  const handleAddItem = () => {
    setItemForm({ itemLabel: '', itemValue: '', description: '', dictCode: currentConfigDict?.dictCode });
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: SystemDictionaryItem) => {
    setItemForm({ ...item });
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setDeleteTarget({ type: 'ITEM', id });
    setIsDeleteModalOpen(true);
  };

  const saveItem = () => {
    if (!itemForm.itemLabel || !itemForm.itemValue) {
      alert('名称和编码不能为空');
      return;
    }

    if (itemForm.id) {
      setItems(prev => prev.map(i => i.id === itemForm.id ? { ...i, ...itemForm } as SystemDictionaryItem : i));
    } else {
      const newItem: SystemDictionaryItem = {
        ...itemForm as SystemDictionaryItem,
        id: Date.now().toString(),
        createdTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };
      setItems(prev => [...prev, newItem]);
    }
    setIsItemModalOpen(false);
  };

  // --- Confirm Delete ---
  
  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'DICT') {
      setDictionaries(prev => prev.filter(d => d.id !== deleteTarget.id));
    } else {
      setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    }
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Top Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">字典名称 |</span>
            <input 
              type="text" 
              value={searchDictName}
              onChange={(e) => setSearchDictName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchDicts()}
              placeholder="请输入字典名称" 
              className="w-48 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearchDicts}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           查询
         </button>

         <div className="flex items-center gap-2 ml-4">
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">字典编号 |</span>
            <input 
              type="text" 
              value={searchDictCode}
              onChange={(e) => setSearchDictCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchDicts()}
              placeholder="请输入字典编号" 
              className="w-48 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" 
            />
         </div>
         <button 
           onClick={handleSearchDicts}
           className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
         >
           查询
         </button>
      </div>

      {/* Main Action Bar */}
      <div className="flex gap-4">
         <button 
           onClick={handleAddDict}
           className="px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
         >
           <Plus size={16} /> 添加
         </button>
         <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
           导出
         </button>
         <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
           导入
         </button>
      </div>

      {/* Dictionary Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 h-16">
               <tr>
                  <th className="px-6 w-16"></th>
                  <th className="px-6">字典名称</th>
                  <th className="px-6">字典编码</th>
                  <th className="px-6 w-64">描述</th>
                  <th className="px-6 w-48">创建时间</th>
                  <th className="px-6 w-48">更新时间</th>
                  <th className="px-6 w-64 text-center">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {dictionaries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors h-16">
                     <td className="px-6 text-slate-500"></td>
                     <td className="px-6 text-slate-800 font-medium">{item.dictName}</td>
                     <td className="px-6 text-slate-600 font-mono">{item.dictCode}</td>
                     <td className="px-6 text-slate-500 truncate max-w-xs">{item.description}</td>
                     <td className="px-6 text-slate-500">{item.createdTime}</td>
                     <td className="px-6 text-slate-500">{item.updatedTime}</td>
                     <td className="px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                           <button 
                             onClick={() => handleEditDict(item)}
                             className="text-blue-500 hover:text-blue-700 font-medium text-xs whitespace-nowrap"
                           >
                              编辑
                           </button>
                           <button 
                             onClick={() => handleOpenConfig(item)}
                             className="text-emerald-500 hover:text-emerald-700 font-medium text-xs whitespace-nowrap flex items-center gap-1"
                           >
                              <Settings size={12} /> 字典配置
                           </button>
                           <button 
                             onClick={() => handleDeleteDict(item.id)}
                             className="text-red-500 hover:text-red-700 font-medium text-xs whitespace-nowrap"
                           >
                              删除
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
               {dictionaries.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-10 text-slate-400">暂无数据</td></tr>
               )}
            </tbody>
        </table>
        {/* Pagination Mock */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-4 text-sm text-slate-500">
           <span>共 {dictionaries.length} 条</span>
           <div className="flex gap-1">
              <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&lt;</button>
              <button className="w-8 h-8 border rounded bg-emerald-600 text-white">1</button>
              <button className="w-8 h-8 border rounded hover:bg-slate-50 disabled:opacity-50">&gt;</button>
           </div>
        </div>
      </div>

      {/* Dictionary Modal (Add/Edit Parent) */}
      {isDictModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200 relative">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">{dictForm.id ? '编辑字典' : '添加字典'}</h3>
                 <button onClick={() => setIsDictModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">字典名称</label>
                    <input type="text" value={dictForm.dictName} onChange={e => setDictForm({...dictForm, dictName: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">字典编码</label>
                    <input type="text" value={dictForm.dictCode} onChange={e => setDictForm({...dictForm, dictCode: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">字典类型</label>
                    <select value={dictForm.type} onChange={e => setDictForm({...dictForm, type: e.target.value as any})} className="w-full p-2.5 border border-slate-300 rounded text-sm bg-white">
                       <option value="STRING">字符串</option>
                       <option value="NUMBER">数字</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
                    <input type="text" value={dictForm.description} onChange={e => setDictForm({...dictForm, description: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                 <button onClick={() => setIsDictModalOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50">取消</button>
                 <button onClick={saveDict} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">确定</button>
              </div>
           </div>
        </div>
      )}

      {/* Config Modal (Manage Items) */}
      {isConfigModalOpen && currentConfigDict && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800">字典编码配置 - {currentConfigDict.dictName}</h3>
                 <button onClick={() => setIsConfigModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              
              <div className="p-6 flex-1 overflow-hidden flex flex-col">
                 {/* Inner Search */}
                 <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-slate-600 whitespace-nowrap">字典名称</span>
                       <input 
                         type="text" 
                         value={searchItemLabel} 
                         onChange={e => setSearchItemLabel(e.target.value)} 
                         onKeyDown={e => e.key === 'Enter' && handleSearchItems()}
                         placeholder="请输入名称" 
                         className="px-3 py-1.5 border border-slate-300 rounded text-sm w-40" 
                       />
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-slate-600 whitespace-nowrap">字典编号</span>
                       <input 
                         type="text" 
                         value={searchItemValue} 
                         onChange={e => setSearchItemValue(e.target.value)} 
                         onKeyDown={e => e.key === 'Enter' && handleSearchItems()}
                         placeholder="请输入编号" 
                         className="px-3 py-1.5 border border-slate-300 rounded text-sm w-40" 
                       />
                    </div>
                    <button onClick={handleSearchItems} className="px-4 py-1.5 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">查询</button>
                 </div>

                 <button onClick={handleAddItem} className="mb-4 px-4 py-2 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded text-sm font-medium w-fit flex items-center gap-1">
                    <Plus size={14} /> 添加
                 </button>

                 {/* Inner Table */}
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50 text-slate-700 font-medium sticky top-0">
                          <tr>
                             <th className="px-4 py-3">字典值(名称)</th>
                             <th className="px-4 py-3">字典编码(值)</th>
                             <th className="px-4 py-3">描述</th>
                             <th className="px-4 py-3 text-center">操作</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {items.map(item => (
                             <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-slate-800">{item.itemLabel}</td>
                                <td className="px-4 py-3 text-slate-600 font-mono">{item.itemValue}</td>
                                <td className="px-4 py-3 text-slate-500">{item.description}</td>
                                <td className="px-4 py-3 text-center">
                                   <button onClick={() => handleEditItem(item)} className="text-blue-500 hover:text-blue-700 text-xs mr-3">编辑</button>
                                   <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700 text-xs">删除</button>
                                </td>
                             </tr>
                          ))}
                          {items.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-slate-400">暂无数据</td></tr>}
                       </tbody>
                    </table>
                 </div>
                 
                 {/* Inner Pagination Mock */}
                 <div className="flex justify-end gap-2 mt-4 text-xs text-slate-500">
                    <span>共 {items.length} 条</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Item Modal (Add/Edit Child) */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200 relative">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">{itemForm.id ? '编辑字典项' : '添加字典项'}</h3>
                 <button onClick={() => setIsItemModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">名称 (Label)</label>
                    <input type="text" value={itemForm.itemLabel} onChange={e => setItemForm({...itemForm, itemLabel: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">字典编码 (Value)</label>
                    <input type="text" value={itemForm.itemValue} onChange={e => setItemForm({...itemForm, itemValue: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">父级字典编码</label>
                    <input type="text" value={itemForm.dictCode} disabled className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-500" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
                    <input type="text" value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded text-sm" />
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                 <button onClick={() => setIsItemModalOpen(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50">取消</button>
                 <button onClick={saveItem} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">确定</button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
           <div className="bg-white rounded shadow-xl w-[400px] animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                 <h3 className="text-base font-medium text-slate-800">提示</h3>
                 <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
              </div>
              <div className="p-8 text-center text-slate-600">
                 {deleteTarget?.type === 'DICT' ? '确认删除当前字典？' : '确认删除当前字典项？'}
              </div>
              <div className="flex justify-center gap-4 pb-6">
                 <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 border border-emerald-500 text-emerald-600 rounded text-sm hover:bg-emerald-50">取消</button>
                 <button onClick={confirmDelete} className="px-6 py-2 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">确定</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};


import React, { useState } from 'react';
import { Check, X, FileText, User, AlertCircle } from 'lucide-react';
import { MOCK_APPROVALS } from '../constants';
import { ApprovalTask } from '../types';

export const ApprovalCenter: React.FC = () => {
  const [tasks, setTasks] = useState<ApprovalTask[]>(MOCK_APPROVALS);

  const handleApprove = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: 'APPROVED', date: new Date().toISOString().split('T')[0] } 
        : task
    ));
  };

  const handleReject = (id: string) => {
    setTasks(prev => prev.map(task => 
        task.id === id 
          ? { ...task, status: 'REJECTED', date: new Date().toISOString().split('T')[0] } 
          : task
      ));
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">审批管理</h2>
        <p className="text-slate-500 mt-1">审核账户、资产与项目申请。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${
                task.status === 'PENDING' ? 'bg-amber-400' : 
                task.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-red-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                   {task.type === 'ACCOUNT' ? <User size={20}/> : <FileText size={20} />}
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800">{task.title}</h3>
                   <p className="text-xs text-slate-500 uppercase tracking-wide">{task.id} • {task.type}</p>
                 </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  task.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                  task.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {task.status === 'PENDING' ? '待审批' : task.status === 'APPROVED' ? '已通过' : '已驳回'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs mb-1">申请人/单位</span>
                    <span className="font-medium text-slate-700">{task.requester}</span>
                  </div>
                   <div>
                    <span className="text-slate-400 block text-xs mb-1">提交日期</span>
                    <span className="font-medium text-slate-700">{task.date}</span>
                  </div>
               </div>
               {task.type === 'PROJECT' && (
                 <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                   <AlertCircle size={14} className="text-blue-500" />
                   包含 4 份附加方法学文档。
                 </div>
               )}
            </div>

            {task.status === 'PENDING' ? (
              <div className="flex gap-3">
                <button 
                  onClick={() => handleApprove(task.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Check size={18} /> 通过
                </button>
                <button 
                  onClick={() => handleReject(task.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  <X size={18} /> 驳回
                </button>
              </div>
            ) : (
               <div className={`w-full py-2.5 text-center text-sm font-medium rounded-lg border ${
                   task.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
               }`}>
                 处理于 {task.date}
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

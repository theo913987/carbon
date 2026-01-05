
import React, { useState } from 'react';
import { Save, Shield, Bell, Database, Server, RefreshCw } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('platform');

  const tabs = [
    { id: 'platform', label: '平台信息', icon: Server },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'notification', label: '通知配置', icon: Bell },
    { id: 'backup', label: '数据备份', icon: Database },
  ];

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
        
        {/* Header Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
           {tabs.map(tab => {
             const Icon = tab.icon;
             return (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-8 py-4 text-sm font-medium transition-colors border-r border-slate-100 ${
                   activeTab === tab.id 
                   ? 'bg-white text-emerald-600 border-t-2 border-t-emerald-500' 
                   : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 border-t-2 border-t-transparent'
                 }`}
               >
                 <Icon size={16} />
                 {tab.label}
               </button>
             );
           })}
        </div>

        <div className="p-8">
           {/* Platform Info */}
           {activeTab === 'platform' && (
             <div className="max-w-2xl space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 mb-6">平台基本信息</h3>
                   <div className="grid grid-cols-1 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">系统名称</label>
                         <input type="text" defaultValue="碳中和数字碳资产管理系统" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">平台Logo</label>
                         <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                               Logo
                            </div>
                            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50">上传图片</button>
                         </div>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">版权信息</label>
                         <input type="text" defaultValue="© 2023 Carbon Neutral Asset Management System. All Rights Reserved." className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">备案号</label>
                         <input type="text" defaultValue="沪ICP备12345678号-1" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                      </div>
                   </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                   <button onClick={() => alert('保存成功')} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2">
                      <Save size={16} /> 保存配置
                   </button>
                </div>
             </div>
           )}

           {/* Security Settings */}
           {activeTab === 'security' && (
             <div className="max-w-2xl space-y-8">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 mb-6">系统安全策略</h3>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                         <div>
                            <div className="font-medium text-slate-700">双因素认证 (2FA)</div>
                            <div className="text-xs text-slate-500 mt-1">强制管理员登录时进行手机验证码或OTP验证</div>
                         </div>
                         <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-emerald-200 bg-emerald-100 cursor-pointer">
                            <span className="absolute left-6 top-0.5 w-5 h-5 bg-emerald-600 rounded-full shadow transition-transform"></span>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                         <div>
                            <div className="font-medium text-slate-700">新设备登录提醒</div>
                            <div className="text-xs text-slate-500 mt-1">当检测到新设备登录时发送邮件通知</div>
                         </div>
                         <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-emerald-200 bg-emerald-100 cursor-pointer">
                            <span className="absolute left-6 top-0.5 w-5 h-5 bg-emerald-600 rounded-full shadow transition-transform"></span>
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-2">密码强度要求</label>
                         <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                            <option>中等 (包含字母和数字, 8位以上)</option>
                            <option>高 (包含大小写字母、数字和符号, 10位以上)</option>
                         </select>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-2">会话超时时间 (分钟)</label>
                         <input type="number" defaultValue="30" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                      </div>
                   </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                   <button onClick={() => alert('保存成功')} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2">
                      <Save size={16} /> 保存配置
                   </button>
                </div>
             </div>
           )}

           {/* Notification Config */}
           {activeTab === 'notification' && (
             <div className="max-w-2xl space-y-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">邮件服务器 (SMTP)</h3>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">SMTP服务器</label>
                      <input type="text" placeholder="smtp.exmail.qq.com" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">端口</label>
                      <input type="text" placeholder="465" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">发件人邮箱</label>
                      <input type="text" placeholder="admin@carbon.com" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">授权码/密码</label>
                      <input type="password" placeholder="******" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                   </div>
                </div>

                <div className="h-px bg-slate-100 my-4"></div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">短信网关</h3>
                <div className="grid grid-cols-1 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">服务提供商</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                         <option>阿里云短信</option>
                         <option>腾讯云短信</option>
                         <option>华为云短信</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">AccessKey ID</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                   <button onClick={() => alert('保存成功')} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2">
                      <Save size={16} /> 保存配置
                   </button>
                </div>
             </div>
           )}

           {/* Backup & Data */}
           {activeTab === 'backup' && (
             <div className="max-w-3xl space-y-6">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-slate-800">数据备份与恢复</h3>
                   <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-2">
                      <RefreshCw size={14} /> 立即备份
                   </button>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-700 font-medium">
                         <tr>
                            <th className="px-6 py-3">备份文件名</th>
                            <th className="px-6 py-3">大小</th>
                            <th className="px-6 py-3">备份时间</th>
                            <th className="px-6 py-3 text-right">操作</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         <tr>
                            <td className="px-6 py-4">backup_20231027_full.sql</td>
                            <td className="px-6 py-4 text-slate-500">45.2 MB</td>
                            <td className="px-6 py-4 text-slate-500">2023-10-27 02:00:00</td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-blue-600 hover:underline mr-3">下载</button>
                               <button className="text-emerald-600 hover:underline">恢复</button>
                            </td>
                         </tr>
                         <tr>
                            <td className="px-6 py-4">backup_20231026_full.sql</td>
                            <td className="px-6 py-4 text-slate-500">44.8 MB</td>
                            <td className="px-6 py-4 text-slate-500">2023-10-26 02:00:00</td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-blue-600 hover:underline mr-3">下载</button>
                               <button className="text-emerald-600 hover:underline">恢复</button>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-6">
                   <h4 className="font-medium text-slate-700 mb-2">自动备份策略</h4>
                   <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>频率: 每天</span>
                      <span>时间: 02:00</span>
                      <span>保留: 最近30天</span>
                      <button className="text-emerald-600 hover:underline ml-auto">修改策略</button>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Copy, X, Upload, Plus, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { MOCK_TRADING_ACCOUNTS, DASHBOARD_DATA } from '../constants';
import { TradingAccount } from '../types';

interface UserProfileProps {
  userName: string;
  initialTab?: 'login' | 'trading';
}

export const UserProfile: React.FC<UserProfileProps> = ({ userName, initialTab = 'login' }) => {
  const { accountVo } = DASHBOARD_DATA;
  const [activeTab, setActiveTab] = useState<'login' | 'trading'>(initialTab);
  const [tradingAccounts, setTradingAccounts] = useState<TradingAccount[]>(MOCK_TRADING_ACCOUNTS);
  
  // Update tab if initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  
  // Modal States
  const [isPwdModalOpen, setIsPwdModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  // Forms
  const [pwdForm, setPwdForm] = useState({ old: '', new: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
      exchangeName: '深圳碳排放权交易所',
      accountName: '',
      remarks: ''
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('账号已复制到剪贴板');
  };

  const handleUnbind = (id: string) => {
    if (window.confirm('确定解绑交易账户？')) {
      setTradingAccounts(prev => prev.map(acc => 
        acc.id === id ? { ...acc, accountName: '--', status: 'DISABLED' as const, loginTime: '--', bindingTime: '--' } : acc
      ));
    }
  };

  const handleAddAccount = () => {
      if (!newAccountForm.accountName) {
          alert('请输入账号名');
          return;
      }
      
      const newAcc: TradingAccount = {
          id: Date.now().toString(),
          exchangeName: newAccountForm.exchangeName,
          accountName: newAccountForm.accountName,
          status: 'NORMAL', // Auto-approve for demo
          loginTime: '--',
          bindingTime: new Date().toISOString().slice(0, 10),
          businessScope: '碳交易',
          url: '#'
      };

      setTradingAccounts(prev => [newAcc, ...prev]);
      alert("添加成功！");
      setNewAccountForm({ exchangeName: '深圳碳排放权交易所', accountName: '', remarks: '' });
      setIsAddAccountModalOpen(false);
  }

  const InputField = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 cursor-not-allowed select-none">
        {value}
      </div>
    </div>
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
           <img src={accountVo.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-slate-50 object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h2 className="text-xl font-bold text-slate-800">基本信息</h2>
           <p className="text-sm text-slate-400 mt-1">管理您的个人资料与账户安全设置</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsPwdModalOpen(true)}
             className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
           >
             修改密码
           </button>
           <button 
             onClick={() => setIsAvatarModalOpen(true)}
             className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
           >
             修改头像
           </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <InputField label="用户名" value={userName} />
            <InputField label="姓名" value="陈亚历" />
            <InputField label="联系电话" value="138****8888" />
            <InputField label="系统角色" value={accountVo.roleNames[0]} />
            <InputField label="电子邮箱" value="chenyali@carbonmsger.com" />
            <InputField label="注册时间" value="2021-06-22 23:46:14" />
         </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
        <div className="flex border-b border-slate-200">
           <button 
             onClick={() => setActiveTab('login')}
             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
               activeTab === 'login' ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
             }`}
           >
             登录相关账号
           </button>
           <button 
             onClick={() => setActiveTab('trading')}
             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
               activeTab === 'trading' ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
             }`}
           >
             交易相关账号
           </button>
        </div>

        <div className="p-8">
           {activeTab === 'login' ? (
             <div className="space-y-6 max-w-4xl">
                {/* Account Item */}
                <div className="flex items-center gap-6 p-4 rounded-lg border border-transparent hover:bg-slate-50 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={20} />
                   </div>
                   <div className="w-20 font-medium text-slate-700">账号</div>
                   <div className="w-48 p-2 bg-slate-100 rounded text-slate-600 text-sm">{userName}</div>
                   <div className="text-xs text-slate-400 flex-1">系统自动生成，可用于登录</div>
                </div>
                
                {/* Phone Item */}
                <div className="flex items-center gap-6 p-4 rounded-lg border border-transparent hover:bg-slate-50 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Phone size={20} />
                   </div>
                   <div className="w-20 font-medium text-slate-700">手机号</div>
                   <div className="w-48 p-2 bg-slate-100 rounded text-slate-600 text-sm">138****8888</div>
                   <div className="text-xs text-slate-400 flex-1">绑定手机号，可用于登录、重置密码或其他安全验证</div>
                   <button className="text-emerald-600 text-sm hover:underline px-3 py-1 border border-emerald-200 rounded hover:bg-emerald-50">修改</button>
                </div>

                {/* Email Item */}
                <div className="flex items-center gap-6 p-4 rounded-lg border border-transparent hover:bg-slate-50 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Mail size={20} />
                   </div>
                   <div className="w-20 font-medium text-slate-700">邮箱</div>
                   <div className="w-48 p-2 bg-slate-100 rounded text-slate-600 text-sm">che***@carbonmsger.com</div>
                   <div className="text-xs text-slate-400 flex-1">绑定邮箱，可用于登录、重置密码或其他安全验证</div>
                   <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700">绑定</button>
                </div>
             </div>
           ) : (
             <div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                         <tr>
                            <th className="px-6 py-4 font-medium">平台</th>
                            <th className="px-6 py-4 font-medium">账号</th>
                            <th className="px-6 py-4 font-medium">账户状态</th>
                            <th className="px-6 py-4 font-medium">最近登录</th>
                            <th className="px-6 py-4 font-medium">绑定时间</th>
                            <th className="px-6 py-4 font-medium text-right">操作</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {tradingAccounts.map(account => (
                           <tr key={account.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-6 py-4 font-medium text-slate-800">{account.exchangeName}</td>
                              <td className="px-6 py-4 font-mono text-slate-600">{account.accountName}</td>
                              <td className="px-6 py-4">
                                 {account.status === 'NORMAL' ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">
                                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 正常
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium">
                                       <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 未绑定
                                    </span>
                                 )}
                              </td>
                              <td className="px-6 py-4 text-slate-500">{account.loginTime}</td>
                              <td className="px-6 py-4 text-slate-500">{account.bindingTime}</td>
                              <td className="px-6 py-4 text-right space-x-3">
                                 {account.status === 'NORMAL' ? (
                                    <>
                                       <button onClick={() => copyToClipboard(account.accountName)} className="text-blue-600 hover:text-blue-800 text-xs font-medium inline-flex items-center gap-1">
                                          <Copy size={12} /> 复制账号
                                       </button>
                                       <button onClick={() => handleUnbind(account.id)} className="text-red-500 hover:text-red-700 text-xs font-medium inline-flex items-center gap-1">
                                          <X size={12} /> 解绑
                                       </button>
                                    </>
                                 ) : (
                                    <button onClick={() => setIsAddAccountModalOpen(true)} className="text-emerald-600 hover:text-emerald-800 text-xs font-medium inline-flex items-center gap-1">
                                       <Plus size={12} /> 添加账号
                                    </button>
                                 )}
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Password Modal */}
      {isPwdModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">修改密码</h3>
                 <button onClick={() => setIsPwdModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">当前密码</label>
                    <input type="password" placeholder="请输入原密码" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">新密码</label>
                    <div className="relative">
                        <input type={showPwd ? "text" : "password"} placeholder="请输入新密码" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                        <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                           {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">重复新密码</label>
                    <input type="password" placeholder="请确认新密码" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                 </div>
              </div>
              <div className="flex gap-3 mt-8">
                 <button onClick={() => setIsPwdModalOpen(false)} className="flex-1 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">取消</button>
                 <button onClick={() => { alert('修改成功'); setIsPwdModalOpen(false); }} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">保存</button>
              </div>
           </div>
        </div>
      )}

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">修改头像</h3>
                 <button onClick={() => setIsAvatarModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="flex gap-8 mb-8">
                 <div className="text-center">
                    <div className="w-40 h-40 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 mb-2">
                       <img src={accountVo.avatar} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <p className="text-xs text-slate-500">支持 JPG, PNG (Max 1MB)</p>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200">
                          <img src={accountVo.avatar} className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs text-slate-400">大尺寸预览 100x100</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                          <img src={accountVo.avatar} className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs text-slate-400">小尺寸预览 32x32</span>
                    </div>
                 </div>
              </div>
              <div className="flex gap-3">
                 <label className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-center cursor-pointer">
                    选择图片
                    <input type="file" className="hidden" onChange={() => alert('图片已选择(模拟)')} />
                 </label>
                 <button onClick={() => { alert('上传成功'); setIsAvatarModalOpen(false); }} className="flex-1 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">确认上传</button>
              </div>
           </div>
        </div>
      )}

       {/* Add Account Modal */}
       {isAddAccountModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800">添加交易账户</h3>
                 <button onClick={() => setIsAddAccountModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">交易所 <span className="text-red-500">*</span></label>
                    <select 
                        value={newAccountForm.exchangeName}
                        onChange={e => setNewAccountForm({...newAccountForm, exchangeName: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                    >
                        <option>深圳碳排放权交易所</option>
                        <option>天津排放权交易所</option>
                        <option>四川联合环境交易所</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">账号名 <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        placeholder="请输入账号" 
                        value={newAccountForm.accountName}
                        onChange={e => setNewAccountForm({...newAccountForm, accountName: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">账户凭证 <span className="text-red-500">*</span></label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-500 cursor-pointer transition-colors bg-slate-50">
                        <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                        <span className="text-sm text-slate-500">点击上传凭证文件</span>
                    </div>
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
                    <textarea 
                        placeholder="请输入内容" 
                        value={newAccountForm.remarks}
                        onChange={e => setNewAccountForm({...newAccountForm, remarks: e.target.value})}
                        className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-20 resize-none"
                    ></textarea>
                 </div>
              </div>
              <div className="mt-6 text-right">
                 <button onClick={handleAddAccount} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">提交</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

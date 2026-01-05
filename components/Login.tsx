
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckSquare, Square, Leaf, X } from 'lucide-react';
import { useToast } from './common/Toast';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
  onGoToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetForm, setResetForm] = useState({
    phone: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetCountdown, setResetCountdown] = useState(0);

  // Countdown Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (resetCountdown > 0) {
      timer = setInterval(() => {
        setResetCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resetCountdown]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      showToast('请输入用户名和密码', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate Backend Request Delay
    setTimeout(() => {
      setIsLoading(false);
      showToast(`欢迎回来，${formData.username}`, 'success');
      onLoginSuccess(formData.username);
    }, 1200);
  };

  const handleSendResetCode = () => {
    setResetCountdown(60);
    showToast('验证码已发送 (任意输入即可)', 'info');
  };

  const handleResetPassword = () => {
      if (!resetForm.newPassword || !resetForm.confirmPassword) {
          showToast("请输入新密码", "error");
          return;
      }
      if (resetForm.newPassword !== resetForm.confirmPassword) {
          showToast("两次密码输入不一致", "error");
          return;
      }
      showToast("密码重置成功，请使用新密码登录", 'success');
      setIsForgotModalOpen(false);
      setResetForm({ phone: '', code: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-[#edf9fc] flex flex-col font-sans relative">
      
       {/* Top Left Logo Area */}
       <div className="absolute top-[30px] left-[40px] flex items-center gap-3 z-20">
        <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-emerald-600 tracking-wide leading-none">碳信使</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest scale-90 origin-left">Carbon Msger</span>
            </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[1200px] flex items-center justify-center">
        
        {/* Left Side: Illustration */}
        <div className="hidden lg:block w-[600px] mr-[90px]">
           <img 
             src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop" 
             alt="Login Illustration" 
             className="w-full h-auto object-contain rounded-xl shadow-lg mix-blend-multiply opacity-90"
             style={{ maxHeight: '600px' }}
           />
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-white w-[400px] md:w-[450px] p-[40px] rounded-[6px] shadow-sm flex flex-col h-[480px]">
          
          <div className="mb-[20px] text-center">
               <h1 className="text-[20px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2ec28b] to-[#0065ff] tracking-wide">
                 碳中和资产管理平台
               </h1>
               <p className="text-[10px] font-bold text-[#27a777] tracking-[1.4px] uppercase mt-[7px]">XCarbon Management Platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-[32px]">
            
            {/* Username Input */}
            <div className="bg-[#e5f9f0] h-[50px] flex items-center group focus-within:ring-1 focus-within:ring-emerald-500 transition-all rounded-sm">
              <div className="w-[80px] h-full flex items-center justify-between px-[16px] text-[#172B4D] font-medium text-[16px] select-none flex-none">
                 <span>用</span>
                 <span>户</span>
                 <span>名</span>
              </div>
              <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            {/* Password Input */}
            <div className="bg-[#e5f9f0] h-[50px] flex items-center relative group focus-within:ring-1 focus-within:ring-emerald-500 transition-all rounded-sm">
              <div className="w-[80px] h-full flex items-center justify-between px-[16px] text-[#172B4D] font-medium text-[16px] select-none flex-none">
                 <span>密</span>
                 <span>码</span>
              </div>
              <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
              <input 
                type={showPassword ? "text" : "password"}
                className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full pr-10"
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 text-slate-400 hover:text-slate-600 focus:outline-none absolute right-2"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-[10px] mb-[10px]">
              <button 
                type="button"
                onClick={() => setFormData({...formData, rememberMe: !formData.rememberMe})}
                className="flex items-center gap-2 text-sm text-[#5e6c84]"
              >
                {formData.rememberMe ? (
                  <CheckSquare size={16} className="text-[#2EC28B]" />
                ) : (
                  <Square size={16} />
                )}
                记住我
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] bg-[#26b581] hover:bg-[#30b08f] text-white font-medium text-[15px] rounded-[2px] shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mb-[30px]"
            >
              {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    登录中...
                  </>
              ) : '登录'}
            </button>

            {/* Footer Links */}
            <div className="flex items-center justify-between text-sm">
               <div className="flex items-center">
                 <span className="text-[#5e6c84]">还没有账号？</span>
                 <button type="button" onClick={onGoToRegister} className="text-[#FF0000] hover:underline ml-1">去注册</button>
               </div>
               <button 
                 type="button" 
                 onClick={() => setIsForgotModalOpen(true)}
                 className="text-[#909399] hover:text-slate-600 hover:underline"
               >
                 忘记密码
               </button>
            </div>

          </form>
        </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                 <h3 className="text-lg font-bold text-slate-800">重置密码</h3>
                 <button onClick={() => setIsForgotModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-5">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">手机号</label>
                    <input 
                      type="text" 
                      placeholder="请输入注册手机号" 
                      value={resetForm.phone}
                      onChange={e => setResetForm({...resetForm, phone: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-emerald-500 outline-none text-sm" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">验证码</label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         placeholder="请输入验证码" 
                         value={resetForm.code}
                         onChange={e => setResetForm({...resetForm, code: e.target.value})}
                         className="flex-1 p-2.5 border border-slate-300 rounded-lg focus:border-emerald-500 outline-none text-sm" 
                       />
                       <button 
                         onClick={handleSendResetCode}
                         disabled={resetCountdown > 0}
                         className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm disabled:text-slate-400 disabled:bg-slate-50 border border-emerald-100 whitespace-nowrap min-w-[100px]"
                       >
                         {resetCountdown > 0 ? `${resetCountdown}s` : '获取验证码'}
                       </button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">新密码</label>
                    <input 
                      type="password" 
                      placeholder="设置新密码" 
                      value={resetForm.newPassword}
                      onChange={e => setResetForm({...resetForm, newPassword: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-emerald-500 outline-none text-sm" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">确认新密码</label>
                    <input 
                      type="password" 
                      placeholder="再次输入新密码" 
                      value={resetForm.confirmPassword}
                      onChange={e => setResetForm({...resetForm, confirmPassword: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-emerald-500 outline-none text-sm" 
                    />
                 </div>
              </div>
              <div className="mt-8">
                 <button 
                   onClick={handleResetPassword}
                   className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                 >
                    确认重置
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

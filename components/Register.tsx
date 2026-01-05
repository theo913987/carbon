
import React, { useState, useEffect } from 'react';
import { Leaf, CheckCircle } from 'lucide-react';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    // Relaxed logic: Always send code
    setCountdown(60);
    alert('验证码已发送: 1234 (任意输入即可通过)');
  };

  const handleRegister = () => {
    // Relaxed logic: Allow any input
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Navigate after showing success message
      setTimeout(() => {
        onGoToLogin(); 
      }, 1500);
    }, 1000);
  };

  // Always enable button for "any input" requirement, 
  // but logically at least some typing feels better. 
  // Per request "regardless of what I input", we keep it enabled or check minimal length visually but allow click.
  const isValid = true; 

  return (
    <div className="min-h-screen bg-[#edf9fc] relative flex flex-col font-sans">
      {/* Top Left Logo */}
      <div className="absolute top-[30px] left-[40px] flex items-center gap-3">
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

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-[520px] min-h-[450px] px-[35px] py-[35px] rounded-none shadow-sm flex flex-col mt-[-50px] relative overflow-hidden transition-all">
            
            {showSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">注册成功！</h3>
                    <p className="text-slate-500">正在跳转至登录页...</p>
                </div>
            ) : (
                <>
                    {/* Username */}
                    <div className="bg-[#E5F9F0] h-[50px] flex items-center mt-0">
                        <label className="w-[85px] text-[#172B4D] font-medium text-[16px] tracking-[1px] pl-[16px] whitespace-nowrap">用 户 名</label>
                        <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
                        <input 
                            type="text" 
                            placeholder="请输入用户名" 
                            className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    {/* Phone */}
                    <div className="bg-[#E5F9F0] h-[50px] flex items-center mt-[32px]">
                        <label className="w-[85px] text-[#172B4D] font-medium text-[16px] tracking-[1px] pl-[16px] whitespace-nowrap">手 机 号</label>
                        <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
                        <input 
                            type="text" 
                            placeholder="请输入手机号" 
                            className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>

                    {/* Verification Code */}
                    <div className="bg-[#E5F9F0] h-[50px] flex items-center mt-[32px]">
                        <label className="w-[85px] text-[#172B4D] font-medium text-[16px] tracking-[1px] pl-[16px] whitespace-nowrap">验 证 码</label>
                        <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
                        <input 
                            type="text" 
                            placeholder="请输入验证码" 
                            className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                            value={formData.code}
                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                        />
                        <button 
                            onClick={handleSendCode}
                            disabled={countdown > 0}
                            className="bg-[#E5F9F0] text-[#0065FF] text-[15px] font-normal mr-[16px] disabled:text-slate-400 whitespace-nowrap"
                        >
                            {countdown > 0 ? `${countdown}s` : '获取验证码'}
                        </button>
                    </div>

                    {/* Password */}
                    <div className="bg-[#E5F9F0] h-[50px] flex items-center mt-[32px]">
                        <label className="w-[85px] text-[#172B4D] font-medium text-[16px] tracking-[1px] pl-[16px] whitespace-nowrap">设置密码</label>
                        <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
                        <input 
                            type="password" 
                            placeholder="请输入密码" 
                            className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="bg-[#E5F9F0] h-[50px] flex items-center mt-[32px]">
                        <label className="w-[85px] text-[#172B4D] font-medium text-[16px] tracking-[1px] pl-[16px] whitespace-nowrap">确认密码</label>
                        <div className="w-[1px] h-[16px] bg-[#b3bac5] mx-[9px]"></div>
                        <input 
                            type="password" 
                            placeholder="请输入确认密码" 
                            className="flex-1 bg-transparent border-none outline-none text-[#172B4D] placeholder:text-[#68b0fe] text-[15px] h-full"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>

                    {/* Register Button */}
                    <div className="mt-[30px]">
                        <button 
                            onClick={handleRegister}
                            disabled={isLoading}
                            className={`w-full h-[50px] text-white text-[18px] font-medium transition-colors rounded-[2px] bg-[#27A777] hover:bg-[#30b08f]`}
                        >
                            {isLoading ? '注册中...' : '注册'}
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="flex items-center justify-center mt-[20px] gap-1">
                        <span className="text-[#5E6C84] text-[14px]">已有账户，</span>
                        <button onClick={onGoToLogin} className="text-[#27A777] text-[14px] hover:underline">
                            去登陆 &gt;
                        </button>
                    </div>
                </>
            )}

        </div>
      </div>
    </div>
  );
};

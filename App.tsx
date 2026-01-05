
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AssetDevelopment } from './components/AssetDevelopment';
import { ProjectForm } from './components/ProjectForm';
import { ProjectDetail } from './components/ProjectDetail';
import { TradingMarket } from './components/TradingMarket';
import { ApprovalCenter } from './components/ApprovalCenter';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { EnterpriseInfo } from './components/EnterpriseInfo';
import { CarbonCredit } from './components/CarbonCredit';
import { AssetDetail } from './components/AssetDetail';
import { CarbonQuota } from './components/CarbonQuota';
import { QuotaDetail } from './components/QuotaDetail';
import { MethodologyManagement } from './components/MethodologyManagement';
import { ProjectSchedule } from './components/ProjectSchedule';
import { ProjectFileManagement } from './components/ProjectFileManagement';
import { SupplyDemandMarket } from './components/SupplyDemandMarket';
import { InquiryManagement } from './components/InquiryManagement';
import { ExchangeManagement } from './components/ExchangeManagement';
import { TradingAccountManagement } from './components/TradingAccountManagement';
import { CarbonNews } from './components/CarbonNews';
import { SystemAccountManagement } from './components/SystemAccountManagement';
import { SystemTenantManagement } from './components/SystemTenantManagement';
import { SystemRoleManagement } from './components/SystemRoleManagement';
import { SystemDictionaryManagement } from './components/SystemDictionaryManagement';
import { SystemNewsManagement } from './components/SystemNewsManagement';
import { SystemExchangeManagement } from './components/SystemExchangeManagement';
import { SystemMethodologyManagement } from './components/SystemMethodologyManagement';
import { SystemProjectLibrary } from './components/SystemProjectLibrary';
import { SystemProjectDocumentManagement } from './components/SystemProjectDocumentManagement';
import { PlatformApproval } from './components/PlatformApproval';
import { SystemSettings } from './components/SystemSettings';
import { UserRole } from './types';
import { Modal } from './components/common/Modal';
import { ToastProvider } from './components/common/Toast';

const AppContent: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  
  // App State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.OWNER);
  const [userName, setUserName] = useState<string>('');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [targetProjectName, setTargetProjectName] = useState<string | undefined>(undefined);

  // Logout Modal State
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Handlers
  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setUserName('新用户');
    setIsAuthenticated(true);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
    setActiveTab('dashboard');
    setIsLogoutModalOpen(false);
  };

  const handleNavigateDetail = (id: string, type: 'credit' | 'quota' | 'project' = 'credit') => {
    setSelectedAssetId(id);
    if (type === 'credit') setActiveTab('asset_detail');
    else if (type === 'quota') setActiveTab('quota_detail');
    else if (type === 'project') setActiveTab('project_detail');
  };

  const handleNavigateEdit = (id: string) => {
    setSelectedAssetId(id);
    setActiveTab('project_edit');
  };

  const handleNavigateCreate = () => {
    setSelectedAssetId(null);
    setActiveTab('project_create');
  };

  const handleViewProjectDocs = (id: string, name: string) => {
    setTargetProjectName(name);
    setActiveTab('files');
  };

  // Main App Content Router
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={userRole} userName={userName} onNavigate={setActiveTab} />;
      case 'news':
        return <CarbonNews />;
      case 'exchanges':
        return <ExchangeManagement />;
      case 'accounts':
        return <TradingAccountManagement onNavigate={setActiveTab} />;
      case 'system_roles':
        return <SystemRoleManagement />;
      case 'system_dict':
        return <SystemDictionaryManagement />;
      case 'system_accounts':
        return <SystemAccountManagement />;
      case 'system_tenants':
        return <SystemTenantManagement />;
      case 'system_news':
        return <SystemNewsManagement />;
      case 'system_exchanges':
        return <SystemExchangeManagement />;
      case 'system_methodology':
        return <SystemMethodologyManagement />;
      case 'system_project_lib':
        return <SystemProjectLibrary 
                  onView={(id) => handleNavigateDetail(id, 'project')} 
                  onDocs={handleViewProjectDocs}
               />;
      case 'system_project_docs':
        return <SystemProjectDocumentManagement />;
      case 'assets':
        return <AssetDevelopment 
                  onCreate={handleNavigateCreate} 
                  onEdit={handleNavigateEdit} 
                  onDetail={(id) => handleNavigateDetail(id, 'project')} 
               />;
      case 'schedule':
        return <ProjectSchedule onBack={() => setActiveTab('dashboard')} />;
      case 'platform_approval':
        return <PlatformApproval />;
      case 'files':
        return <ProjectFileManagement initialProjectName={targetProjectName} />;
      case 'project_create':
        return <ProjectForm onBack={() => setActiveTab('assets')} onSubmit={() => setActiveTab('assets')} />;
      case 'project_edit':
        return <ProjectForm id={selectedAssetId || undefined} onBack={() => setActiveTab('assets')} onSubmit={() => setActiveTab('assets')} />;
      case 'project_detail':
        return <ProjectDetail id={selectedAssetId || ''} onBack={() => setActiveTab('assets')} />;
      case 'methodology':
        return <MethodologyManagement />;
      case 'credits':
        return <CarbonCredit onNavigateDetail={(id) => handleNavigateDetail(id, 'credit')} />;
      case 'asset_detail':
        return <AssetDetail id={selectedAssetId || ''} onBack={() => setActiveTab('credits')} />;
      case 'quotas':
        return <CarbonQuota onNavigateDetail={(id) => handleNavigateDetail(id, 'quota')} />;
      case 'quota_detail':
        return <QuotaDetail id={selectedAssetId || ''} onBack={() => setActiveTab('quotas')} />;
      case 'supply_demand':
        return <SupplyDemandMarket />;
      case 'inquiries':
        return <InquiryManagement />;
      case 'trading':
        return <TradingMarket />;
      case 'approvals':
        return <ApprovalCenter />;
      case 'settings':
        return <SystemSettings />;
      case 'enterprise':
        return <EnterpriseInfo />;
      case 'profile':
        return <UserProfile userName={userName} initialTab="login" />;
      case 'profile_trading':
        return <UserProfile userName={userName} initialTab="trading" />;
      default:
        return <Dashboard userRole={userRole} userName={userName} onNavigate={setActiveTab} />;
    }
  };

  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Register 
          onRegisterSuccess={handleRegisterSuccess} 
          onGoToLogin={() => setAuthView('login')} 
        />
      );
    }
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess}
        onGoToRegister={() => setAuthView('register')}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        activeTab={
          activeTab.startsWith('asset') || activeTab.startsWith('project') ? 'assets' :
          activeTab === 'quota_detail' ? 'quotas' : 
          activeTab === 'profile_trading' ? 'profile' :
          activeTab
        } 
        setActiveTab={setActiveTab} 
        userRole={userRole}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        {activeTab !== 'schedule' && activeTab !== 'platform_approval' && (
          <Header 
            userRole={userRole} 
            setUserRole={setUserRole}
            userName={userName}
            onNavigate={setActiveTab}
            onLogout={handleLogoutClick}
          />
        )}

        <main className={`flex-1 overflow-y-auto ${activeTab === 'schedule' || activeTab === 'platform_approval' ? 'bg-white' : 'bg-slate-50/50'}`}>
          <div className={activeTab === 'schedule' || activeTab === 'platform_approval' ? 'w-full h-full' : 'max-w-7xl mx-auto w-full'}>
            {renderContent()}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="退出登录"
        size="sm"
        footer={
          <div className="flex gap-3">
            <button 
              onClick={() => setIsLogoutModalOpen(false)} 
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={confirmLogout} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              确认退出
            </button>
          </div>
        }
      >
        <div className="text-slate-600 py-4 text-center">
          您确定要退出当前账号吗？
        </div>
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;


import React from 'react';
import { UserRole } from '../types';
import { CompanyPackage } from './CompanyPackage';
import { CapitalStat } from './CapitalStat';
import { ProjectStats } from './ProjectStats';
import { TradeInfoPanel } from './TradeInfoPanel';
import { NewsPanel } from './NewsPanel';
import { QuickActions } from './QuickActions';

interface DashboardProps {
  userRole: UserRole;
  userName: string;
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, userName, onNavigate }) => {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* 1. 资产与资金收入 / 账户信息 */}
      <CompanyPackage userName={userName} />

      {/* 2. 供应/开发/销售量 统计 */}
      <CapitalStat />

      {/* 3. 项目统计 (Charts & List) */}
      <ProjectStats />

      {/* 4. 碳交易行情 */}
      <TradeInfoPanel />

      {/* 5. 行业资讯 */}
      <NewsPanel />

      {/* 6. 常用功能 */}
      <QuickActions onNavigate={onNavigate} />

    </div>
  );
};

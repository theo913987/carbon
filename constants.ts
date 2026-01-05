
import { ApprovalTask, CarbonProject, MarketItem, ProjectStatus, UserRole, AssetType, TradingAccount, CarbonCreditAsset, CarbonQuotaAsset, Methodology, ProjectDocument, TradeItem, InquiryItem, Exchange, Article, SystemAccount, Tenant, SystemRole, SystemDictionary, SystemDictionaryItem } from "./types";

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.OWNER]: '企业业主',
  [UserRole.PROVIDER]: '资产开发商',
  [UserRole.ADMIN]: '平台管理员'
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [UserRole.OWNER]: '查看企业资产与收益，进行交易',
  [UserRole.PROVIDER]: '管理项目开发、文档与方法学',
  [UserRole.ADMIN]: '系统全局配置与审核管理'
};

// Generate more mock projects for pagination demo
const generateMockProjects = (): CarbonProject[] => {
  const baseProjects: CarbonProject[] = [
    {
      id: '1',
      name: '甘肃酒泉风电项目',
      standard: 'CCER',
      field: '能源工业',
      industry: '电力业',
      status: ProjectStatus.INITIATION,
      location: '甘肃省酒泉市',
      owner: '酒泉风能开发有限公司',
      initiationDate: '2023-01-15',
      methodology: 'CM-001-V01 可再生能源联网发电',
      estimatedReduction: 50000,
      carbonValuation: 2500000,
      developer: '上海诺涵科技',
      description: '本项目位于甘肃省酒泉市，利用当地丰富的风能资源进行发电...',
      type: '风电',
      documents: [],
      refId: 'P-2023-001'
    },
    {
      id: '2',
      name: '湖北林业碳汇项目',
      standard: 'VCS',
      field: '林业碳汇',
      industry: '林业',
      status: ProjectStatus.DEVELOPMENT,
      location: '湖北省恩施市',
      owner: '恩施林业局',
      initiationDate: '2022-11-20',
      methodology: 'VM0010 改进森林管理',
      estimatedReduction: 12000,
      carbonValuation: 600000,
      developer: '上海诺涵科技',
      type: '林业',
      documents: [],
      refId: 'P-2022-005'
    }
  ];

  const statuses = [ProjectStatus.INITIATION, ProjectStatus.DEVELOPMENT, ProjectStatus.VALIDATION, ProjectStatus.ISSUED, ProjectStatus.RECORD_FILING];
  const fields = ['能源工业', '林业碳汇', '工业/制造业', '废弃物处理'];
  const locations = ['内蒙古包头', '四川凉山', '云南大理', '新疆哈密', '江苏盐城'];

  for (let i = 3; i <= 28; i++) {
    baseProjects.push({
      id: i.toString(),
      name: `测试项目-${i}号分布式光伏`,
      standard: i % 2 === 0 ? 'CCER' : 'VCS',
      field: fields[i % fields.length],
      industry: '电力业',
      status: statuses[i % statuses.length],
      location: locations[i % locations.length],
      owner: `测试业主公司-${i}`,
      initiationDate: `2023-0${(i % 9) + 1}-15`,
      methodology: 'CM-001-V01',
      estimatedReduction: 10000 + i * 1000,
      carbonValuation: 500000 + i * 50000,
      developer: '上海诺涵科技',
      description: '这是一个自动生成的测试项目数据，用于展示分页功能。',
      type: '光伏',
      documents: [],
      refId: `P-2023-0${i < 10 ? '0' + i : i}`
    });
  }

  return baseProjects;
};

export const MOCK_PROJECTS: CarbonProject[] = generateMockProjects();

export const MOCK_MARKET_DATA: MarketItem[] = [
  { id: '1', assetName: 'SHEA-2023', type: AssetType.QUOTA, price: 58.50, change24h: 1.2, volume: 12500 },
  { id: '2', assetName: 'CEA-2023', type: AssetType.QUOTA, price: 62.10, change24h: -0.5, volume: 45000 },
  { id: '3', assetName: 'CCER-Wind', type: AssetType.CREDIT, price: 45.00, change24h: 2.1, volume: 8000 },
  { id: '4', assetName: 'GDEA-2022', type: AssetType.QUOTA, price: 78.20, change24h: 0.0, volume: 2000 },
  { id: '5', assetName: 'VCS-Forest', type: AssetType.CREDIT, price: 35.50, change24h: -1.5, volume: 15000 },
];

export const MOCK_APPROVALS: ApprovalTask[] = [
  { id: 'TASK-001', type: 'ACCOUNT', title: '新企业账户注册审核', requester: '绿能科技(上海)有限公司', date: '2023-10-25', status: 'PENDING' },
  { id: 'TASK-002', type: 'PROJECT', title: '甘肃光伏项目立项申请', requester: '西部新能源', date: '2023-10-24', status: 'PENDING' },
  { id: 'TASK-003', type: 'ACCOUNT', title: '交易员权限变更申请', requester: '张三', date: '2023-10-20', status: 'APPROVED' },
  { id: 'TASK-004', type: 'PROJECT', title: '林业碳汇监测报告', requester: '森工集团', date: '2023-10-18', status: 'REJECTED' },
];

export const DASHBOARD_DATA = {
  assetsIncome: { statDate: '2023-09', totalIncome: '1,245,000', monthOnMonthRatio: '12.5', yearOnYearRatio: '45.2' },
  fundIncome: { statDate: '2023-09', monthIncome: '458,000', totalIncome: '5,200,000', monthOnMonthRatio: '-2.1', yearOnYearRatio: '15.8' },
  carbonCredit: 125000,
  carbonQuota: 85000,
  greenScore: 4500,
  accountVo: {
    // Fixed avatar for consistency
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    roleNames: ['企业管理员'],
    productVersionName: '专业版',
    enterpriseName: '上海诺涵科技有限公司',
    carbonNeutralRatio: '85%',
    esgScore: 'A+',
    accountValidity: '2025-12-31'
  },
  monthSupply: {
    statDate: '2023-09',
    carbonSupply: '150,000',
    carbonCredit: '80,000',
    carbonQuota: '60,000',
    greenScore: '10,000',
    carbonSupplyTotal: '1,500,000',
    carbonValuation: '75,000,000'
  },
  monthDevelopment: {
    statDate: '2023-09',
    carbonSupply: '45,000',
    carbonCredit: '45,000',
    carbonQuota: '0',
    greenScore: '0',
    carbonSupplyTotal: '450,000',
    carbonValuation: '2,250,000'
  },
  monthSales: {
    statDate: '2023-09',
    carbonSupply: '32,000',
    carbonCredit: '20,000',
    carbonQuota: '12,000',
    greenScore: '0',
    carbonSupplyTotal: '320,000',
    carbonValuation: '1,600,000'
  },
  projectStat: {
    reductionTotal: '2,500,000',
    approvedCount: 12,
    filingCount: 8,
    singCount: 5,
    projectList: [
      { projectName: '内蒙古风电二期', reduction: 120000, carbonValuation: 6000000, developmentStateName: '已立项' },
      { projectName: '云南水电站扩建', reduction: 85000, carbonValuation: 4250000, developmentStateName: '审定中' },
      { projectName: '四川林业碳汇', reduction: 45000, carbonValuation: 2250000, developmentStateName: '已备案' },
    ]
  },
  quotation: {
    stockCount: 1500000,
    writtenOffCount: 500000,
    approvedCount: 25,
    filingCount: 18,
    singCount: 12,
    ccerCount: 850000,
    ccerProjectCount: 45,
    projects: [
      { type: '风电', singCount: 300000, stockCount: 200000, projectCount: 15 },
      { type: '光伏', singCount: 250000, stockCount: 150000, projectCount: 12 },
      { type: '林业', singCount: 100000, stockCount: 80000, projectCount: 8 },
    ]
  },
  news: [
    { id: '1', title: '全国碳市场启动两周年：成交额破百亿', date: '2023-10-25', isHot: true },
    { id: '2', title: '生态环境部发布关于做好2023—2025年发电行业配额分配保障工作的通知', date: '2023-10-24', isHot: true },
    { id: '3', title: '欧盟碳边境调节机制(CBAM)正式进入过渡期', date: '2023-10-22', isHot: false },
    { id: '4', title: 'CCER重启在即，方法学先行', date: '2023-10-20', isHot: false },
  ],
  notices: [
    { id: '1', title: '关于系统维护升级的通知 (10月30日)' },
    { id: '2', title: '新版用户协议生效通知' },
    { id: '3', title: '关于新增碳交易API接口的说明' },
  ],
  questions: [
    { id: '1', title: '如何申请开设碳交易账户？' },
    { id: '2', title: 'CCER项目开发流程是怎样的？' },
    { id: '3', title: '配额清缴履约的截止日期是什么时候？' },
  ]
};

export const MOCK_TRADING_ACCOUNTS: TradingAccount[] = [
  { id: '1', exchangeName: '上海环境能源交易所', accountName: 'SH-2023-001', status: 'NORMAL', loginTime: '2023-10-26 09:30', bindingTime: '2023-01-15', businessScope: '碳配额、CCER交易', url: 'https://www.cneeex.com/' },
  { id: '2', exchangeName: '北京绿色交易所', accountName: 'BJ-2023-055', status: 'NORMAL', loginTime: '2023-10-25 14:20', bindingTime: '2023-03-20', businessScope: '自愿减排量交易', url: 'https://www.cbeex.com.cn/' },
  { id: '3', exchangeName: '湖北碳排放权交易中心', accountName: '--', status: 'DISABLED', loginTime: '--', bindingTime: '--', businessScope: '配额交易', url: 'http://www.hbets.cn/' },
];

export const ENTERPRISE_DATA = {
  tenantName: '上海诺涵科技有限公司',
  telephone: '021-12345678',
  faxNumber: '021-87654321',
  industry: '节能环保 / 碳资产管理',
  createdTime: '2021-06-18',
  validityDate: '2030-12-31',
  accountTypeName: '企业主账户',
  address: '上海市浦东新区张江高科技园区科苑路88号',
  introduction: '上海诺涵科技有限公司是一家专注于碳中和领域的科技企业，致力于为企业提供全方位的碳资产管理解决方案。公司业务涵盖碳盘查、碳减排项目开发、碳交易咨询及碳金融服务等。\n\n我们拥有一支经验丰富的专业团队，利用大数据、人工智能等先进技术，帮助企业实现绿色低碳转型，提升市场竞争力。'
};

export const MOCK_PROJECT_SELECTION_LIST: CarbonProject[] = MOCK_PROJECTS;

export const MOCK_CREDITS: CarbonCreditAsset[] = [
  {
    id: '1',
    projectName: '甘肃酒泉风电项目',
    standard: 'CCER',
    methodology: 'CM-001-V01 可再生能源联网发电',
    type: '风电',
    holdings: 50000,
    valuation: 2250000,
    status: 'NORMAL',
    issuanceDate: '2023-05-20',
    availableAmount: 30000,
    lockedAmount: 10000,
    frozenAmount: 10000,
    verificationAgency: '中国质量认证中心',
    issuanceAgency: '国家发改委',
    introduction: '本项目位于甘肃省酒泉市，装机容量100MW，预计年减排量5万吨。',
    exchangeName: '上海环境能源交易所'
  },
  {
    id: '2',
    projectName: '四川造林碳汇一期',
    standard: 'CCER',
    methodology: 'CM-003-V01 造林碳汇',
    type: '林业',
    holdings: 15000,
    valuation: 900000,
    status: 'PENDING',
    issuanceDate: '2023-08-15',
    availableAmount: 0,
    lockedAmount: 15000,
    frozenAmount: 0,
    verificationAgency: '中环联合认证中心',
    issuanceAgency: '生态环境部',
    introduction: '四川省凉山州造林项目，造林面积5000亩。',
    exchangeName: '--'
  }
];

export const MOCK_QUOTAS: CarbonQuotaAsset[] = [
  {
    id: '1',
    agencyName: '生态环境部',
    total: 100000,
    valuation: 6500000,
    status: 'NORMAL',
    expiryDate: '2023-12-31',
    availableAmount: 80000,
    lockedAmount: 20000,
    frozenAmount: 0,
    issuanceDate: '2023-01-01',
    issuanceCertificate: 'cert_quota_2023.pdf',
    projectIntroduction: '2023年度全国碳市场发电行业配额预分配。',
    transactionStatus: '交易中',
    exchangeName: '全国碳排放权交易系统',
    buyPrice: 0,
    buyTotalPrice: 0,
    buyDate: '--',
    buyCertificate: ''
  },
  {
    id: '2',
    agencyName: '上海市生态环境局',
    total: 20000,
    valuation: 1400000,
    status: 'NORMAL',
    expiryDate: '2024-06-30',
    availableAmount: 20000,
    lockedAmount: 0,
    frozenAmount: 0,
    issuanceDate: '2023-06-01',
    issuanceCertificate: 'sh_quota_2023.pdf',
    projectIntroduction: '上海市2022年度碳排放配额清缴分配。',
    transactionStatus: '无交易',
    exchangeName: '上海环境能源交易所',
    buyPrice: 58,
    buyTotalPrice: 1160000,
    buyDate: '2023-07-10',
    buyCertificate: 'trade_sh_001.pdf'
  }
];

export const MOCK_METHODOLOGIES: Methodology[] = [
  { id: '1', code: 'CM-001-V01', methodCode: 'CM-001', name: '可再生能源联网发电', field: '能源工业', industry: '电力业', standard: 'CCER', fileUrl: '#', status: 'PUBLISHED' },
  { id: '2', code: 'CM-003-V01', methodCode: 'CM-003', name: '造林碳汇', field: '林业碳汇', industry: '林业', standard: 'CCER', fileUrl: '#', status: 'PUBLISHED' },
  { id: '3', code: 'VM0010', methodCode: 'VM0010', name: '改进森林管理', field: '林业碳汇', industry: '林业', standard: 'VCS', fileUrl: '#', status: 'PUBLISHED' },
  { id: '4', code: 'CMS-002', methodCode: 'CMS-002', name: '垃圾填埋气回收利用', field: '废弃物处理', industry: '市政', standard: 'CCER', fileUrl: '#', status: 'DRAFT' },
];

export const MOCK_SCHEDULE_DATA = [
  { devLead: '张三', phone: '13800138000', agency: '上海诺涵科技', project: '甘肃酒泉风电项目', methodology: 'CM-001-V01', country: '中国', province: '甘肃' },
  { devLead: '李四', phone: '13900139000', agency: '上海诺涵科技', project: '湖北林业碳汇项目', methodology: 'VM0010', country: '中国', province: '湖北' },
  { devLead: '王五', phone: '13700137000', agency: '北京低碳中心', project: '内蒙古光伏发电', methodology: 'CM-001-V01', country: '中国', province: '内蒙古' },
];

export const MOCK_DOCUMENTS: ProjectDocument[] = [
  { id: 'DOC-001', name: '甘肃风电项目设计文件(PDD)', projectName: '甘肃酒泉风电项目', type: '设计文档', completionDate: '2023-02-15', updatedDate: '2023-02-15', url: '#' },
  { id: 'DOC-002', name: '甘肃风电项目环评批复', projectName: '甘肃酒泉风电项目', type: '设计文档', completionDate: '2023-01-20', updatedDate: '2023-01-20', url: '#' },
  { id: 'DOC-003', name: '湖北林业碳汇监测报告2022', projectName: '湖北林业碳汇项目', type: '监测报告', completionDate: '2023-03-10', updatedDate: '2023-03-12', url: '#' },
];

export const MOCK_TRADE_ITEMS: TradeItem[] = [
  { id: '1', direction: 'BUY', assetType: '碳配额', projectType: '履约配额', institutionName: '华能集团', quantity: 50000, price: 65.00, deadline: '2023-11-30', deliveryMethod: '协议转让', exchange: '全国碳交所' },
  { id: '2', direction: 'BUY', assetType: '碳信用', projectType: '林业碳汇', institutionName: '腾讯科技', quantity: 10000, price: 45.00, deadline: '2023-12-15', deliveryMethod: '大宗交易', exchange: '北京绿交所' },
  { id: '3', direction: 'SELL', assetType: '碳信用', projectType: '风电', institutionName: '国电投', quantity: 20000, price: 42.00, deadline: '2023-11-20', deliveryMethod: '挂牌交易', exchange: '上海环交所' },
];

export const MOCK_INQUIRIES: InquiryItem[] = [
  { id: '1', conversation: '关于CCER风电项目的询价...', tradeRole: '买方', assetType: '碳信用', projectType: '风电', buyerName: '某钢铁集团', sellerName: '我方', buyerPrice: 40, sellerPrice: 42, buyerQuantity: 5000, sellerQuantity: 5000, deadline: '2023-11-01', deliveryMethod: '协议转让', deliveryTime: '2023-11-10' },
  { id: '2', conversation: 'SHEA配额出吗？', tradeRole: '卖方', assetType: '碳配额', projectType: '上海配额', buyerName: '我方', sellerName: '某化工企业', buyerPrice: 58, sellerPrice: 60, buyerQuantity: 2000, sellerQuantity: 2000, deadline: '2023-10-28', deliveryMethod: '协议转让', deliveryTime: '2023-10-30' },
];

export const MOCK_EXCHANGES: Exchange[] = [
  { id: '1', name: '上海环境能源交易所', city: '上海', businessScope: '全国碳排放权交易系统建设与运维，上海碳排放配额交易，CCER交易，碳普惠', detailUrl: 'https://www.cneeex.com/', website: 'https://www.cneeex.com/', status: 'PUBLISHED' },
  { id: '2', name: '北京绿色交易所', city: '北京', businessScope: '北京市碳排放权交易，全国温室气体自愿减排交易中心', detailUrl: 'https://www.cbeex.com.cn/', website: 'https://www.cbeex.com.cn/', status: 'PUBLISHED' },
  { id: '3', name: '湖北碳排放权交易中心', city: '武汉', businessScope: '湖北试点碳配额交易，碳金融服务', detailUrl: 'http://www.hbets.cn/', website: 'http://www.hbets.cn/', status: 'PUBLISHED' },
];

export const MOCK_ARTICLES: Article[] = [
  { id: '1', title: '生态环境部：加快建设全国统一的温室气体自愿减排交易市场', categoryName: '行业动态', author: '生态环境部', updatedTime: '2023-10-27', url: '#', status: 'PUBLISHED', browseNum: 1542 },
  { id: '2', title: '欧盟碳关税(CBAM)对中国出口企业的影响分析', categoryName: '行业知识库', author: '碳信使研究院', updatedTime: '2023-10-25', url: '#', status: 'PUBLISHED', browseNum: 890 },
  { id: '3', title: 'CCER方法学重启：首批包含造林碳汇、光热发电等', categoryName: '行业动态', author: '新华社', updatedTime: '2023-10-24', url: '#', status: 'PUBLISHED', browseNum: 2100 },
];

export const MOCK_SYSTEM_ACCOUNTS: SystemAccount[] = [
  { id: '1', accountName: 'admin', username: '系统管理员', roleName: '超级管理员', accountType: '企业账户', productVersion: '专业版', status: 'NORMAL', createdTime: '2021-01-01 00:00:00', validityPeriod: '2099-12-31', tenantName: '平台运营方' },
  { id: '2', accountName: 'user001', username: '张经理', roleName: '企业管理员', accountType: '企业账户', productVersion: '专业版', status: 'NORMAL', createdTime: '2023-01-15 10:00:00', validityPeriod: '2024-01-15', tenantName: '上海诺涵科技' },
  { id: '3', accountName: 'guest', username: '访客', roleName: '注册用户', accountType: '试用账户', productVersion: '试用版', status: 'PENDING', createdTime: '2023-10-20 14:30:00', validityPeriod: '2023-11-20', tenantName: '个人' },
];

export const MOCK_TENANTS: Tenant[] = [
  { id: '1', tenantName: '上海诺涵科技有限公司', type: '企业账户', status: 'NORMAL', telephone: '021-12345678', email: 'contact@nuohan.com', contactName: '张伟', createdTime: '2021-06-18', validityTime: '2030-12-31', industry: '科技推广和应用服务业', address: '上海市浦东新区' },
  { id: '2', tenantName: '绿能发展集团', type: '企业账户', status: 'NORMAL', telephone: '010-88889999', email: 'info@greenenergy.com', contactName: '李强', createdTime: '2022-03-10', validityTime: '2025-03-10', industry: '电力、热力生产和供应业', address: '北京市朝阳区' },
];

export const MOCK_SYSTEM_PROJECT_LIB: CarbonProject[] = [
  ...MOCK_PROJECTS.map(p => ({ ...p, status: ProjectStatus.ISSUED, filingDate: '2023-06-01', approvalDate: '2023-03-01', certificationDate: '2023-05-01', issuanceDate: '2023-06-15' })),
  {
    id: '3',
    name: '广东光伏分布式发电项目',
    standard: 'CCER',
    field: '能源工业',
    industry: '电力业',
    status: ProjectStatus.RECORD_FILING,
    location: '广东省广州市',
    owner: '广州新能源',
    initiationDate: '2022-09-01',
    methodology: 'CM-001-V01',
    estimatedReduction: 30000,
    filingDate: '2023-01-10',
    approvalDate: '2022-12-01',
    refId: 'P-2022-088'
  }
];

export const MOCK_SYSTEM_ROLES: SystemRole[] = [
  { id: '1', roleName: '注册用户', roleCode: '0200000001', status: 'NORMAL', createdTime: '2022-06-20 10:00:00', updatedTime: '2022-06-21 12:00:00', description: '普通注册用户', isDel: true },
  { id: '2', roleName: '管理员', roleCode: '0200000010', status: 'NORMAL', createdTime: '2022-06-15 09:30:00', updatedTime: '2022-06-16 11:30:00', description: '系统普通管理员', isDel: true },
  { id: '3', roleName: '咨询员子账户', roleCode: '0200000004', status: 'NORMAL', createdTime: '2022-07-01 14:20:00', updatedTime: '2022-07-02 15:20:00', description: '咨询员' },
  { id: '4', roleName: '公司主账户', roleCode: '0200000003', status: 'NORMAL', createdTime: '2022-05-20 08:00:00', updatedTime: '2022-05-21 09:00:00', description: '企业主账号' },
  { id: '5', roleName: '试用人员', roleCode: '0200000002', status: 'NORMAL', createdTime: '2022-08-10 16:45:00', updatedTime: '2022-08-11 17:45:00', description: '试用账号' },
  { id: '6', roleName: '超级管理员', roleCode: '0200000009', status: 'NORMAL', createdTime: '2021-01-01 00:00:00', updatedTime: '2021-01-01 00:00:00', description: '系统超级管理员', isDel: true },
];

export const MOCK_SYSTEM_DICTIONARIES: SystemDictionary[] = [
  { id: '1', dictName: '碳资产方法学评估问卷答案', dictCode: '059', description: '--', type: 'STRING', createdTime: '2022-08-20 10:00:00', updatedTime: '2022-08-21 12:00:00' },
  { id: '2', dictName: '交易品种', dictCode: '058', description: '--', type: 'STRING', createdTime: '2022-08-18 09:30:00', updatedTime: '2022-08-19 11:30:00' },
  { id: '3', dictName: '项目年头', dictCode: '057', description: '--', type: 'STRING', createdTime: '2022-08-15 14:20:00', updatedTime: '2022-08-16 15:20:00' },
  { id: '4', dictName: '项目年份', dictCode: '056', description: '--', type: 'NUMBER', createdTime: '2022-08-12 08:00:00', updatedTime: '2022-08-13 09:00:00' },
  { id: '5', dictName: '电网测试', dictCode: '024', description: '测试描述', type: 'STRING', createdTime: '2022-08-10 16:45:00', updatedTime: '2022-08-11 17:45:00' },
  { id: '6', dictName: '电网公司', dictCode: '055', description: '--', type: 'STRING', createdTime: '2022-08-08 10:00:00', updatedTime: '2022-08-09 12:00:00' },
  { id: '7', dictName: '核证机构', dictCode: '052', description: '--', type: 'STRING', createdTime: '2022-08-05 09:30:00', updatedTime: '2022-08-06 11:30:00' },
  { id: '8', dictName: '行业模型-电力、热力、燃气及水的生产和供应业', dictCode: '604', description: '--', type: 'STRING', createdTime: '2022-08-01 14:20:00', updatedTime: '2022-08-02 15:20:00' },
];

export const MOCK_SYSTEM_DICTIONARY_ITEMS: SystemDictionaryItem[] = [
  { id: '101', dictCode: '052', itemLabel: 'GHD服务公司（股份有限公司）', itemValue: '0520000001', description: '--', createdTime: '2022-08-05 10:00:00' },
  { id: '102', dictCode: '052', itemLabel: 'Ruby Canyon环保公司', itemValue: '0520000002', description: '--', createdTime: '2022-08-05 10:05:00' },
  { id: '103', dictCode: '052', itemLabel: 'NSF认证有限责任公司', itemValue: '0520000003', description: '--', createdTime: '2022-08-05 10:10:00' },
  { id: '104', dictCode: '052', itemLabel: '第一环境公司', itemValue: '0520000004', description: '--', createdTime: '2022-08-05 10:15:00' },
  { id: '105', dictCode: '052', itemLabel: 'SCS全球服务', itemValue: '0520000005', description: '--', createdTime: '2022-08-05 10:20:00' },
  { id: '201', dictCode: '058', itemLabel: '碳配额 (CEA)', itemValue: 'QUOTA', description: 'Carbon Emission Allowance', createdTime: '2022-08-18 10:00:00' },
  { id: '202', dictCode: '058', itemLabel: '碳信用 (CCER)', itemValue: 'CREDIT', description: 'Chinese Certified Emission Reduction', createdTime: '2022-08-18 10:05:00' },
  { id: '301', dictCode: '055', itemLabel: '国家电网', itemValue: 'SGCC', description: 'State Grid Corporation of China', createdTime: '2022-08-08 10:30:00' },
  { id: '302', dictCode: '055', itemLabel: '南方电网', itemValue: 'CSG', description: 'China Southern Power Grid', createdTime: '2022-08-08 10:35:00' },
];

export const MOCK_PERMISSIONS_TREE = [
  {
    id: '1',
    label: '首页',
    children: []
  },
  {
    id: '2',
    label: '账户管理',
    children: [
      { id: '2-1', label: '基本信息' },
      { id: '2-2', label: '企业信息' },
    ]
  },
  {
    id: '3',
    label: '碳资产开发',
    children: [
        { id: '3-1', label: '项目管理' },
        { id: '3-2', label: '开发进度' },
    ]
  },
  {
    id: '4',
    label: '系统管理',
    children: [
        { id: '4-1', label: '用户管理' },
        { id: '4-2', label: '角色管理' },
    ]
  }
];

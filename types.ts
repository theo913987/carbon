export enum UserRole {
  OWNER = 'OWNER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum ProjectStatus {
  INITIATION = 'INITIATION',
  DEVELOPMENT = 'DEVELOPMENT',
  VALIDATION = 'VALIDATION',
  ISSUED = 'ISSUED',
  RECORD_FILING = 'RECORD_FILING'
}

export enum AssetType {
  CREDIT = 'CREDIT',
  QUOTA = 'QUOTA'
}

export interface ApprovalTask {
  id: string;
  type: 'ACCOUNT' | 'PROJECT';
  title: string;
  requester: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ProjectDocument {
  id: string;
  name: string;
  projectName: string;
  projectId?: string;
  type: string;
  completionDate: string;
  updatedDate: string;
  url: string;
}

export interface CarbonProject {
  id: string;
  name: string;
  standard: string;
  field: string;
  industry: string;
  status: ProjectStatus;
  location: string;
  owner: string;
  initiationDate: string;
  methodology: string;
  estimatedReduction: number;
  carbonValuation?: number;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  developer?: string;
  description?: string;
  legalPersonName?: string;
  legalPersonPhone?: string;
  principalName?: string;
  principalPhone?: string;
  documents?: ProjectDocument[];
  refId?: string;
  approvalDate?: string;
  filingDate?: string;
  certificationDate?: string;
  issuanceDate?: string;
  type?: string;
  developmentStateName?: string;
  reduction?: number;
}

export interface MarketItem {
  id: string;
  assetName: string;
  type: AssetType;
  price: number;
  change24h: number;
  volume: number;
}

export interface TradingAccount {
  id: string;
  exchangeName: string;
  accountName: string;
  status: 'NORMAL' | 'DISABLED';
  loginTime: string;
  bindingTime: string;
  businessScope?: string;
  createdTime?: string;
  url?: string;
}

export interface CarbonCreditAsset {
  id: string;
  projectName: string;
  standard: string;
  methodology: string;
  type: string;
  holdings: number;
  valuation: number;
  status: 'PENDING' | 'NORMAL';
  issuanceDate: string;
  availableAmount: number;
  lockedAmount: number;
  frozenAmount: number;
  verificationAgency?: string;
  issuanceAgency?: string;
  introduction?: string;
  exchangeName?: string;
}

export interface CarbonQuotaAsset {
  id: string;
  agencyName: string;
  total: number;
  valuation: number;
  status: 'PENDING' | 'NORMAL';
  expiryDate: string;
  availableAmount: number;
  lockedAmount: number;
  frozenAmount: number;
  issuanceDate: string;
  issuanceCertificate?: string;
  projectIntroduction?: string;
  transactionStatus?: string;
  exchangeName?: string;
  buyCertificate?: string;
  buyPrice?: number;
  buyTotalPrice?: number;
  buyDate?: string;
}

export interface Methodology {
  id: string;
  code: string;
  methodCode: string;
  name: string;
  field: string;
  industry: string;
  standard: string;
  fileUrl?: string;
  sourceFileUrl?: string;
  wordUrl?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'OFFLINE';
  dictCode?: string;
  type?: string;
}

export interface TradeItem {
  id: string;
  direction: 'BUY' | 'SELL';
  assetType: string;
  projectType: string;
  institutionName: string;
  quantity: number;
  price: number;
  deadline: string;
  projectScope?: string;
  deliveryDate?: string;
  deliveryMethod?: string;
  exchange?: string;
}

export interface InquiryItem {
  id: string;
  conversation: string;
  tradeRole: string;
  assetType: string;
  projectType: string;
  sellerQuantity?: number;
  sellerPrice?: number;
  buyerQuantity?: number;
  buyerPrice?: number;
  deadline: string;
  deliveryMethod?: string;
  deliveryTime?: string;
  sellerName?: string;
  sellerContacts?: string;
  sellerPhone?: string;
  sellerEmail?: string;
  buyerName?: string;
  buyerContacts?: string;
  buyerPhone?: string;
  buyerEmail?: string;
}

export interface Exchange {
  id: string;
  name: string;
  city: string;
  businessScope: string;
  detailUrl: string;
  website: string;
  status?: 'PUBLISHED' | 'UNPUBLISHED';
}

export interface Article {
  id: string;
  title: string;
  categoryName: string;
  author: string;
  updatedTime: string;
  url: string;
  isHot?: boolean;
  date?: string;
  browseNum?: number;
  status?: 'DRAFT' | 'PUBLISHED' | 'OFFLINE';
}

export interface SystemAccount {
  id: string;
  accountName: string;
  username: string;
  roleName: string;
  accountType: string;
  productVersion: string;
  status: 'NORMAL' | 'PENDING' | 'DISABLED';
  createdTime: string;
  validityPeriod: string;
  remarks?: string;
  phone?: string;
  email?: string;
  tenantName?: string;
}

export interface Tenant {
  id: string;
  tenantName: string;
  type: string;
  status: 'NORMAL' | 'DISABLED';
  telephone: string;
  email: string;
  contactName: string;
  createdTime: string;
  validityTime: string;
  industry: string;
  address?: string;
  orgName?: string;
  contactPhone?: string;
  contactPosition?: string;
  faxNumber?: string;
  legalRepresentative?: string;
  socialCreditCode?: string;
  businessLicense?: string;
  introduction?: string;
}

export interface SystemRole {
  id: string;
  roleName: string;
  roleCode: string;
  status: 'NORMAL' | 'DISABLED';
  createdTime: string;
  updatedTime: string;
  description?: string;
  isDel?: boolean;
}

export interface SystemDictionary {
  id: string;
  dictName: string;
  dictCode: string;
  description: string;
  type: 'STRING' | 'NUMBER';
  createdTime: string;
  updatedTime: string;
  isDel?: boolean;
}

export interface SystemDictionaryItem {
  id: string;
  dictCode: string;
  itemLabel: string;
  itemValue: string;
  description: string;
  createdTime?: string;
}
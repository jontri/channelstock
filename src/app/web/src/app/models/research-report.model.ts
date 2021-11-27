import { Analyst } from './analyst.model';

export interface ResearchReport {
  id: number;
  companyInfoId: number;
  companyId: number;
  body: string;
  publishedDate: Date;
  analyst: Analyst;
  priceValue: number;
  rating: number;
  reportTitle: string;
  reportData: string;
  companyResearchDisclosure: string;
  marketMakingDisclaimer: string;
  outperformPercentOfSecurities: number;
  marketPerformPercentOfSecurities: number;
  underperformPercentOfSecurities: number;
  outperformPercentOfIBClients: number;
  marketPerformPercentOfIBClients: number;
  underperformPercentOfIBClients: number;
  analystCredentials: string;
  certifyIndependenceOfView: string;
  certifyReceiptOfCompensation: string;
  certifyOwnership: string;
  legacyId: string;
}

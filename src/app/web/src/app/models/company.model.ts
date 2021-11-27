import {Address} from './address.model';
import {YearRange} from './year-range.model';
import {ResearchReport} from './research-report.model';

export interface Company {
  id: number;
  symbol: string;
  averageVolume: number;
  exchange: string;
  companyName: string;
  companyProfile: string;
  alternateProfile: string;
  currentPrice: number;
  previousPrice: number;
  marketCap: number;
  rating: number;
  targetPrice: number;
  yearRange: YearRange;
  logoURL: string;
  roadshowLogoURL: string;
  website: string;
  address: Address;
  telephone: string;
  naics: string;
  participationLevel: string;
  email: string;
  isAddedToWatchList: boolean;
  sector: string;
  industry: string;
  companyId: number;
  presentationFilename: string;
  presentationContent: string;
  researchReports: any[];
  analystId: string;
  analystName: string;
  analystCredentials: string;
  analystEmail: string;
  analystPhoto: string;
  industryLink: string;
  channelCastCount: number;
  upcomingRoadshowCount: number;
  shareVolume: number;

}

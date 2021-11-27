import {NewsDetails} from "./newsDetails.model";

export interface News {
  id: number;
  title: string;
  content: string;
  category: string;
  date: Date;
  bannerTitle?: string;
  headerTitle?: string;
  bannerUrl?: string;
  relatedCompanies?:string;
  newsDetails?: any;
  isEquityReport?: boolean;
  visible?: boolean;
  newsItemType: string;
  featured: boolean;
}

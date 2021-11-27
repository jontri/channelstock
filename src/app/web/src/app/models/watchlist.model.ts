import { Company } from '@models';

export interface WatchList {
  id: number;
  company: Company;
  username: string;
  percentChange: number;
}

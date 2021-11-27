import { YearRange } from './year-range.model';

export interface Ticker {
  id: number;
  symbol: string;
  currentPrice: number;
  previousPrice: number;
  marketCap: number;
  yearRange: YearRange;
}

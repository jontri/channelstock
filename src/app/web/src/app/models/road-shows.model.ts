import { Company } from './company.model';
import { RoadShowLocation } from './roadshowlocation.model';
import { Address } from './address.model';

export interface RoadShow {
  id: number;
  city: string;
  schedule: string;
  seats: string;
  companyName: string;
  issuer?: Company;
  issuerId: number;
  locationId: number;
  locationName: string;
  roadshowLocation?: RoadShowLocation;
  address: Address;
  date: string;
  overview?: string
  version?: any,
  deleted?: any,
  dirty?: any,
  lastModified?: any,
  menuLink:string,
  presenterName: string,
  presenterBio: string,
  presenterMugshotURL: string,
  copanyOverview: string
}

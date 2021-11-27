import { Address } from './address.model';

export interface RoadShowLocation {
    timezone: string;
    address: Address;
    contact: string;
    maxSeats: number;
    locationName: string;
    imageContent: string;
    email: string;
    version?: any,
    deleted?: any,
    dirty?: any,
    lastModified?: any
    id?: number;
    locationImageUrl?: string;
}

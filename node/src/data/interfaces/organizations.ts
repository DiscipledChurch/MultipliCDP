import { Address } from './addresses';
import { PhoneNumber } from './phoneNumbers';
import { Location } from './locations';

export class Organization {
    name: string;
    hostname: string;
    customUrl: string;
    isAuthorized: boolean;
    createdDate: Date;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
    locations: Location[];
}

export interface IOrganization {
    save(organization: Organization): number;
    delete(id: number): void;
    get(id: number): Organization;
    getAll(): Organization[];
 }

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
    save(organization: Organization): Promise<any>;
    delete(id: number): Promise<any>;
    get(id: number): Promise<Organization>;
    getAll(): Promise<Organization[]>;
 }

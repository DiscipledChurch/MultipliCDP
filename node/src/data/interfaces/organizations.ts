import { Address } from './addresses';
import { PhoneNumber } from './phoneNumbers';
import { Location } from './locations';

export class Organization {
    _id?: string;
    name: string;
    hostname: string;
    customUrl: string;
    isAuthorized: boolean;
    createdDate: Date;
    isDeleted: boolean;
    deletedDate: Date;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
    locations: Location[];

    constructor(
        name?: string,
        hostname?: string
    ) {
        this.name = name;
        this.hostname = hostname;
        this.isAuthorized = false;
        this.createdDate = new Date();
    }
}

export interface IOrganization {
    save(organization: Organization): Promise<any>;
    delete(id: number): Promise<any>;
    get(id: number, includeInactive: boolean): Promise<Organization>;
    getAll(includeInactive: boolean): Promise<Organization[]>;
}

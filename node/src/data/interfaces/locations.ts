import { Address } from './addresses';
import { PhoneNumber } from './phoneNumbers';

export class Locations {
    name: string;
    hostname: string;
    customUrl: string;
    isAuthorized: boolean;
    createdDate: Date;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
}
import { EmailAddress } from './emailAddress';

export class Person {
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: string;
    emailAddresses: EmailAddress[];
}

export interface IPeople {
    save(Person): number;
    delete(number): void;
    get(number): Person;
    getAll(): Person[];
 }

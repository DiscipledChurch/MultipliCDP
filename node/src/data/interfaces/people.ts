import { EmailAddress } from './emailAddress';

export class Person {
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: string;
    emailAddresses: EmailAddress[];
}

export interface IPeople {
    save(person: Person): number;
    delete(id: number): void;
    get(id: number): Person;
    getAll(): Person[];
 }

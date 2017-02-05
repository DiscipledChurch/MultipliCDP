import { IPeople, Person } from '../interfaces/people';

class People implements IPeople {
    constructor() {}

    public save(person: Person): number {

        return 0;
    }

    public delete(id: number): void {
    }

    public get(id: number): Person {
        let person = new Person();
        return person;
    }

    public getAll(): Person[] {
        let persons = new Array<Person>();
        return persons;
    }
}

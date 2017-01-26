import { IOrganization, Organization } from './interfaces/organizations';

class People implements IOrganization {
    constructor() {}

    public save(organization: Organization): number {

        return 0;
    }

    public delete(id: number): void {
    }

    public get(id: number): Organization {
        let organization = new Organization();
        return organization;
    }

    public getAll(): Organization[] {
        let organizations = new Array<Organization>();
        return organizations;
    }
}

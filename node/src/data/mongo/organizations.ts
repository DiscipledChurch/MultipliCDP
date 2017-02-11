import * as mongoose from 'mongoose';

import { IOrganization, Organization } from '../interfaces/organizations';
import { OrganizationsDB } from './schemas/organizations';

export class Organizations implements IOrganization {
    constructor() { }

    public save(organization: Organization): Promise<any> {
        let org = new OrganizationsDB();
        org.convertToSchema(organization);

        return new Promise<any>((resolve, reject) => {
            if (!!org._id) {
            org.save((err) => {
                if (err) reject(err);

                resolve(1);
            });
            } else {
                OrganizationsDB.findByIdAndUpdate(org._id, org, (err => {
                    if (err) reject(err);

                    resolve(1);
                }));                
            }
        });
    }

    public delete(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            OrganizationsDB.findByIdAndRemove(id, (err) => {
                if (err) reject(err);

                resolve();
            });
        });
    }

    public get(id: number, includeInactive: boolean): Promise<Organization> {
        return new Promise<Organization>((resolve, reject) => {
            OrganizationsDB.findById(id, (err, org) => {
                if (err) reject(err);

                resolve(org.convertFromSchema());
            });
        });
    }

    public getAll(includeInactive: boolean): Promise<Organization[]> {
        return new Promise<Organization[]>((resolve, reject) => {
            OrganizationsDB.find({}, (err, orgModels) => {
                if (err) reject(err);

                let orgs = orgModels.map<Organization>((org) => { return org.convertFromSchema(); });
                resolve(orgs);
            });
        });
    }
}

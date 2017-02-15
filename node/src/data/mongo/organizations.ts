import * as mongoose from 'mongoose';

import { IOrganization, Organization } from '../interfaces/organizations';
import { OrganizationsDB } from './schemas/organizations';

export class Organizations implements IOrganization {
    constructor() { }

    public save(organization: Organization): Promise<any> {
        let org = new OrganizationsDB();
        org.convertToSchema(organization);

        return new Promise<any>((resolve, reject) => {
            if (org._id == null && org._id == undefined) {
                org.save((err, result) => {
                    if (err) reject(err);

                    resolve(result);
                });
            } else {
                OrganizationsDB.findById(org._id, ((err, found) => {
                    if (err) reject(err);
                    else if (found == null) reject({ error: 'Entity not found.' });
                    else if (found.isDeleted) reject({ error: 'Entity is deleted.' });
                    else
                        org.save((err, result) => {
                            if (err) reject(err);

                            resolve(true);
                        });
                }));
            }
        });
    }

    public delete(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            OrganizationsDB.findById(id, ((err, org) => {
                if (err) reject(err);
                else if (org == null) reject({ error: 'Entity not found.' });
                else if (org.isDeleted) reject({ error: 'Entity is deleted.' });
                else {
                    org.isDeleted = true;
                    org.save((err, result) => {
                        if (err) reject(err);

                        resolve(true);
                    });
                }
            }));
        });
    }

    public get(id: string, includeInactive: boolean): Promise<Organization> {
        return new Promise<Organization>((resolve, reject) => {
            var filter = includeInactive ? { '_id': id } : { '_id': id, 'isDeleted': false };
            OrganizationsDB.find(filter, (err, orgs) => {
                if (err) reject(err);

                if (orgs.length == 0)
                    resolve();
                else if (orgs.length == 1)
                    resolve(orgs[0]);
                //resolve(orgs[0].convertFromSchema());
                else
                    reject('Too many entities returned.');
            });
        });
    }

    public getAll(includeInactive: boolean): Promise<Organization[]> {
        return new Promise<Organization[]>((resolve, reject) => {
            var filter = includeInactive ? {} : { 'isDeleted': false };
            OrganizationsDB.find(filter, (err, orgModels) => {
                if (err) reject(err);

                let orgs = orgModels.map<Organization>((org) => { return org.convertFromSchema(); });
                resolve(orgs);
            });
        });
    }
}

import 'reflect-metadata';
import { injectable } from 'inversify';
import { IOrganization, Organization } from '../interfaces/organizations';
import { OrganizationsDB } from './schemas/organizations';

@injectable()
export class Organizations implements IOrganization {
    constructor() { }

    public save(organization: Organization): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (organization._id == null && organization._id === undefined) {
                let org = new OrganizationsDB();
                org.convertToSchema(organization);

                org.save((err, result) => {
                    if (err) { reject(err); }

                    resolve(result);
                });
            } else {
                OrganizationsDB.findById(organization._id, ((err, found) => {
                    if (err) { reject(err); }
                    else if (found == null) { reject({ error: 'Entity not found.' }); }
                    else if (found.isDeleted) { reject({ error: 'Entity is deleted.' }); }
                    else {
                        found.convertToSchema(organization);

                        found.save((saveErr, result) => {
                            if (saveErr) { reject(saveErr); }

                            resolve(true);
                        });
                    }
                }));
            }
        });
    }

    public delete(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            OrganizationsDB.findById(id, ((err, org) => {
                if (err) { reject(err); }
                else if (org == null) { reject({ error: 'Entity not found.' }); }
                else if (org.isDeleted) { reject({ error: 'Entity is deleted.' }); }
                else {
                    org.isDeleted = true;
                    org.save((saveErr, result) => {
                        if (saveErr) { reject(saveErr); }

                        resolve(true);
                    });
                }
            }));
        });
    }

    public get(id: string, includeInactive: boolean): Promise<Organization> {
        return new Promise<Organization>((resolve, reject) => {
            let filter = includeInactive ? { '_id': id } : { '_id': id, 'isDeleted': false };
            OrganizationsDB.find(filter, (err, orgs) => {
                if (err) { reject(err); }

                if (orgs.length === 0) {
                    resolve();
                } else if (orgs.length === 1) {
                    resolve(orgs[0].convertFromSchema());
                } else {
                    reject('Too many entities returned.');
                }
            });
        });
    }

    public getAll(includeInactive: boolean): Promise<Organization[]> {
        return new Promise<Organization[]>((resolve, reject) => {
            let filter = includeInactive ? {} : { 'isDeleted': false };
            OrganizationsDB.find(filter, (err, orgModels) => {
                if (err) { reject(err); }

                let orgs = orgModels.map<Organization>((org) => { return org.convertFromSchema(); });
                resolve(orgs);
            });
        });
    }
}

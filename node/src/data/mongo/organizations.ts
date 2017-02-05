import mongoose = require('mongoose');

import { IOrganization, Organization } from '../interfaces/organizations';
import OrganizationsDB = require('./schemas/organizations');

class Organizations implements IOrganization {
    constructor() { }

    public save(organization: Organization): Promise<any> {
        let org = new OrganizationsDB();
        org.convertToSchema(organization);

        return new Promise<any>((resolve, reject) => {
            org.save((err) => {
                if (err) reject(err);

                resolve(1);
            });
        });
    }

    public delete(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            OrganizationsDB.findByIdAndRemove(id)
                .exec()
                .then((org) => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public get(id: number): Promise<Organization> {
        return new Promise<Organization>((resolve, reject) => {
            OrganizationsDB.findById(id, (err, org) => {
                if (err) reject(err);

                resolve(org.convertFromSchema());
            });
        });
    }

    public getAll(): Promise<Organization[]> {
        return new Promise<Organization[]>((resolve, reject) => {
            OrganizationsDB.find({}, (err, orgModels) => {
                if (err) reject(err);

                let orgs = orgModels.map<Organization>((org) => { return org.convertFromSchema(); });
                resolve(orgs);
            });
        });
    }
}

import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;

import { Organization } from '../../interfaces/organizations';
import MongoHelper from '../mongoHelper';

interface IOrganizationSchema extends Organization, mongoose.Document {
    _id: string,
    convertToSchema: (org: Organization) => void,
    convertFromSchema: () => Organization
}

var OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hostname: {
        type: String
    },
    customUrl: {
        type: String
    },
    isAuthorized: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    deletedDate: {
        type: Date,
        required: false
    }
});

OrganizationSchema.methods.convertToSchema = function(org: Organization) {
        var orgSchema = this;
        MongoHelper.convert<Organization, Schema>(org, orgSchema);
}

OrganizationSchema.methods.convertFromSchema = function() {
        var org = new Organization(this.name, this.hostname);
        var orgSchema = this;

        MongoHelper.convert<Schema, Organization>(orgSchema, org);
        return org;
}

export const OrganizationsDB = mongoose.model<IOrganizationSchema>('OrganizationsDB', OrganizationSchema);
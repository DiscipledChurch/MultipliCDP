import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;

import { Organization } from '../../interfaces/organizations';
import { MongoHelper, Connection } from '../mongoHelper';

interface IOrganizationSchema extends Organization, mongoose.Document {
    _id: string,
    convertToSchema: (org: Organization) => void,
    convertFromSchema: () => Organization
}

var OrganizationSchema = new Schema({
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

OrganizationSchema.methods.convertToSchema = function (org: Organization) {
    var orgSchema = this;
    MongoHelper.convert<Organization, Schema>(org);
}

OrganizationSchema.methods.convertFromSchema = function () {
    var orgSchema = this;

    return MongoHelper.convert<Schema, Organization>(orgSchema);
}

export const OrganizationsDB = mongoose.model<IOrganizationSchema>('Organization', OrganizationSchema);

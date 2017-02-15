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
    _id: {
        type: Schema.Types.ObjectId,
        auto: false
    },
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
},{ _id : false });

OrganizationSchema.methods.convertToSchema = function (org: Organization) {
    var orgSchema = this;
    MongoHelper.convert(org, orgSchema);
};

OrganizationSchema.methods.convertFromSchema = function () {
    var orgSchema = this;
    var org = new Organization();

    MongoHelper.convert(orgSchema, org);

    return org;
};

OrganizationSchema.pre('save', function(next) {
    var org = this;
    if (org._id == null || org._id == undefined) 
        org._id = mongoose.Types.ObjectId();

    next();
});

export const OrganizationsDB = mongoose.model<IOrganizationSchema>('Organization', OrganizationSchema);

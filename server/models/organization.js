var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    name: { type: String, required: true },
    hostname: { type: String },
    customUrl: { type: String },
    isAuthorized: { type: Boolean, required: true },
    createdDate: { type: Date, required: true }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
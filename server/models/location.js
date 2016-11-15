var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Address = require('./address');
var PhoneNumber = require('./phoneNumber');

var LocationSchema = new Schema({
    name: { type: String, required: true },
    hostname: { type: String },
    customUrl: { type: String },
    isAuthorized: { type: Boolean, required: true },
    createdDate: { type: Date, required: true },
    addresses: { type: [Address] },
    phoneNumbers: { type: [PhoneNumber] }
});

module.exports = mongoose.model('Location', LocationSchema);
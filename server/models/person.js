var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailAddress = require('./emailAddress');

var PersonSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    birthdate: { type: Date },
    gender: { type: String },
    emailAddresses: { type: [EmailAddress] }
});

module.exports = mongoose.model('Person', PersonSchema);
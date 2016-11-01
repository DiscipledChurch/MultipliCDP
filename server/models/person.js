var mongoose = require('mongoose');
var schema = mongoose.Schema;

var EmailAddress = require('./emailAddress');

var PersonSchema = new Schema({
    firstName: { type: string, required: true },
    lastName: { type: string },
    birthdate: { type: Date },
    gender: { type: string },
    emailAddresses: { type: [EmailAddress] }
});

module.exports = mongoose.model('Person', PersonSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailAddressSchema = new Schema({
    address: { type: String, required: true },
    confirmGuid: { type: String },
    confirmed: { type: Boolean },
    isPrimary: { type: Boolean },
    locationSubscribed: { type: Boolean },
    marketingSubscribed: { type: Boolean },
    systemSubscribed: { type: Boolean },
    isDeleted: { type: Boolean }
});

module.exports = mongoose.model('EmailAddress', EmailAddressSchema);
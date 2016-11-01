var mongoose = require('mongoose');
var schema = mongoose.Schema;

var EmailAddressSchema = new Schema({
    addresse: { type: string, required: true },
    confirmGuid: { type: string },
    confirmed: { type: Boolean },
    isPrimary: { type: Boolean },
    locationSubscribed: { type: Boolean },
    marketingSubscribed: { type: Boolean },
    systemSubscribed: { type: Boolean },
    isDeleted: { type: Boolean }
});

module.exports = mongoose.model('EmailAddress', EmailAddressSchema);
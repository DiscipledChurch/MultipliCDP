var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    main: { type: String, required: true },
    suite: { type: String },
    country: { type: String },
    region: { type: String },
    province: { type: String },
    postalCode: { type: String },
    type: { type: String }
});

module.exports = mongoose.model('Address', AddressSchema);
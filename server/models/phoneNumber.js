var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhoneNumberSchema = new Schema({
    number: { type: String, required: true },
    type: { type: String }
});

module.exports = mongoose.model('PhoneNumber', PhoneNumberSchema);
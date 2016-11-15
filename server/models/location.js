var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    hostname: { type: String },
    customUrl: { type: String },
    isAuthorized: { type: Boolean, required: true },
    createdDate: { type: Date, required: true }
});

module.exports = mongoose.model('Location', LocationSchema);
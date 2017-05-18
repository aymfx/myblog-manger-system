var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate'); //分页用的

var UserSchema = new mongoose.Schema({
    name: String,
    pwd: String,
    mail: String,
    city: String,
    date: { type: Date },
    gender: String,
    interest: [],
    desc: String
})

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
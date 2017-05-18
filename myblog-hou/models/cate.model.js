var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materializedPlugin = require('mongoose-materialized');

CateSchema = new Schema({
    type:Number,
    title: {type:String}
})

CateSchema.plugin(materializedPlugin);
module.exports = mongoose.model('Cate',CateSchema);
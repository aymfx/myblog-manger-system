var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate'); // 分页用的


var CommentSchema = new mongoose.Schema({
    title: String,
    desc: String
});

CommentSchema.plugin(mongoosePaginate); // 自动将数据进行了分页操作
module.exports = mongoose.model('Comment', CommentSchema);
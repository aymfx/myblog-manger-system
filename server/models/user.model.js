var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var mongoosePaginate=require('mongoose-paginate');

var UserSchema=new mongoose.Schema({
    name:String,
    pwd:String,
    mail:String,
    city:String,
    date:{type:Date},
    gender:String,
    intrest:[],
    desc:String
});
//自动将数据进行分页操作
UserSchema.plugin(mongoosePaginate);
module.exports=mongoose.model('User',UserSchema);


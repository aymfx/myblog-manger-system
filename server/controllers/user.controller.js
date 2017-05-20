var mongoose=require('mongoose');
const User=require('../models/user.model');



//新建用户
exports.create=function(req,res,next){
    const user=new User(req.body);
    user.save().then(data=>{
        res.json(data);
    })
}

//查询所有用户
exports.getAll=function(req,res,next){
    User.find({}).then(data=>{
        res.json(data);
    })
}


//分页查询
exports.list=function(req,res,next){
    var page=(req.body.page)?req.body.page:1;
    page=parseInt(page);
    var limit=(req.body.limit)?req.body.limit:5;
    limit=parseInt(limit);
    var keywords=[];//查询条件，关键字
    if(req.body.name!=null && req.body.name.trim().length>0){
        var name=req.body.name;
         console.log(name,'hhhhhhhh');
        keywords={
            "name":new RegExp(name,'i')//构建一个正则表达式进行name的模糊匹配
        }
    }
    console.log(keywords,"1111111");

    User.paginate(keywords,{page:page,limit:limit},function(err,result){
        res.json(result);
    })
}

//删除id用户
exports.remove=function(req,res,next){
    var id=req.params.id;//delete请求
    User.findByIdAndRemove(id,function(){
        res.json({status:200,msg:'ok'});
    })
}


//删除多个用户
exports.removes=function(req,res,next){
    var ids=req.body.ids;//delete请求
    console.log(ids,122222222);
    User.remove({_id:{$in:ids}},function(){
        res.json({status:200,msg:'ok'});
    })      
}

//更新
exports.update=function(req,res,next){
    var id=req.params.id;//put请求
    User.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
        res.json(data);
    })    
}

//登录
exports.login = function(req,res,next){
    User.findOne({"name":req.body.name,"pwd":req.body.pwd},function(err,data){
        res.json(data);
    })
}
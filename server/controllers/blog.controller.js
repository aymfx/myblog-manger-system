var mongoose = require('mongoose');

const Blog = require('../models/blog.model'); // 数据模型的内容引入进来，User就是一个用户对象

// 新建用户
exports.create = function(req,res,next){
    const blog = new Blog(req.body);
    blog.save().then(data=>{
        res.json(data);
    })
}

// 查询所有用户
exports.getAll = function(req,res,next){
    Blog.find({}).then(data=>{
        res.json(data);
    })
}

// 分页查询
exports.list = function(req,res,next){
    var page = (req.body.page) ? req.body.page : 1;
    page = parseInt(page);
    var limit = (req.body.limit) ? req.body.limit: 8;
    limit = parseInt(limit);
    var keywords = []; // 查询条件，关键词
    if(req.body.name!=null && req.body.name.trim().length>0){
        var name = req.body.name;
        keywords = {
            "title":new RegExp(name,'i') //构建了一个正则表达式进行name字段模糊匹配
        }
    }
    console.log(keywords)

    Blog.paginate(keywords,{page:page,limit:limit},function(err,result){
        if(err){
            console.log(err);
        }
        res.json(result);
    })

}

//删除id用户
exports.remove = function(req,res,next){
    var id = req.params.id;
    Blog.findByIdAndRemove(id,function(){
        res.json({status:200,msg:'ok'});
    })
}

// 删除多个
exports.removes = function(req,res,next){
    var ids = req.body.ids;
    Blog.remove({_id: { $in:ids }},function(){
        res.json({status:200,msg:'ok'});
    })

}

// 更新
exports.update = function(req,res,next){
    var id = req.params.id;
    Blog.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
        res.json(data);
    })
}
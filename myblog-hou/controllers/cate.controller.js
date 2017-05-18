var mongoose = require('mongoose');

const Cate = require('../models/cate.model'); // 数据模型的内容引入进来，User就是一个用户对象

exports.create = function(req,res,next){
    const cate = new Cate(req.body);
    cate.save().then(data=>{
        res.json(data);
    })
}


exports.update = function(req,res,next){
    const id = req.params.id;
    console.log(id);
    Cate.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{
        res.send({data});
    })
}

function revreseTree(data,pid){
    var result = [],temp;
    var data = JSON.parse(JSON.stringify(data));  // 需要将对象进行转换才能够进行children子节点的设置，这是因为mongoose的document类型和js的类型其实是不一样的
    // data原来是数据模型对象，我们通过JSON方式将它转成了字符串，然后再转成js对象

    for(var i in data){
        if(data[i].parentId == pid){
            result.push(data[i]);

            temp = revreseTree(data,data[i]._id);
            // 递归，并且把递归返回的对象设置成temp值
            if(temp.length>0){
                data[i].children = temp;
            }

        }
    }
    return result;
}

exports.getall = function(req,res,next){
    var type = req.params.type;
    Cate.find({type:type},function(err,data){
        var rpTree = revreseTree(data,null);
        res.json(rpTree);
    })
}

exports.remove = function(req,res,next){
    var id = req.params.id;
    var ids = [];

    Cate.findOne({_id : id},function(err,doc){
        if(doc){
            ids = [doc._id];
            doc.getChildren().then(function(docs){
                for(var i=0;i<docs.length;i++){
                    ids.push(docs[i]._id);
                }

                Cate.remove({_id: {$in:ids}}).then(deleted=>{
                    res.json({status:200,'message':'ok'})
                })
            })

        }
    })

}
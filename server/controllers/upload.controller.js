var multer  = require('multer');

var formidable = require('formidable');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('avatar');

exports.uploads = function(req,res,next){

    upload(req,res,function(err){
        if(err){
            return;
        }else{
            console.log('file upload success');
            console.log('这个是res：',req.file.path);
            console.log('这个是next：',next);
            return res.json({id:"101",url:req.file.path});
        }
    })
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){   
        console.log('这是fields',fields)
        console.log('这是files',files)
    })
    
}
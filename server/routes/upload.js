var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/upload.controller');



router.post('/img',dataCtrl.uploads);



module.exports = router;
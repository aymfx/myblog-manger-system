var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/cate.controller');

router.post('/data',dataCtrl.create);
router.get("/:type",dataCtrl.getall);

router.put('/data/:id',dataCtrl.update)

router.delete('/:id',dataCtrl.remove);



module.exports = router;
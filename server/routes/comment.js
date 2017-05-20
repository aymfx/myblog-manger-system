var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/comment.controller');

router.post('/data',dataCtrl.create);
router.post('/list',dataCtrl.list);
router.post('/removes',dataCtrl.removes);
router.put('/data/:id',dataCtrl.update)
router.get('/',dataCtrl.getAll);
router.delete('/:id',dataCtrl.remove);



module.exports = router;
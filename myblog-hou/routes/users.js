var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', dataCtrl.getAll);
router.post('/data', dataCtrl.create);
router.post('/list', dataCtrl.list);
router.delete('/:id', dataCtrl.remove);
router.post('/removes', dataCtrl.removes);
router.put('/data/:id', dataCtrl.update)
module.exports = router;
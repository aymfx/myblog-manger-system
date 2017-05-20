var express = require('express');
var router = express.Router();
var dataCtrl=require('../controllers/user.controller');
router.get('/',dataCtrl.getAll);

router.post('/data',dataCtrl.create);
router.post('/list',dataCtrl.list);
router.post('/removes',dataCtrl.removes);
router.post('/login',dataCtrl.login);

router.delete('/:id',dataCtrl.remove);
router.put('/data/:id',dataCtrl.update);



module.exports = router;

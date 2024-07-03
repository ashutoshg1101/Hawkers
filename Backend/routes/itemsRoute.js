const express = require('express');
const router = express.Router();
const {getItemByHawker , getItem , handleCreateItem , handleUpdateItem , handleDeleteItem} = require('../controller/items')

router.post('/create',handleCreateItem);
router.post('/update',handleUpdateItem);
router.post('/byhawker',getItemByHawker);
router.post('/delete',handleDeleteItem);
router.get('/',getItem);

module.exports = router;
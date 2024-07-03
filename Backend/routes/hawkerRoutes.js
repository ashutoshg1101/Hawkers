const express = require('express');
router = express.Router();
const {handleCreateUser,handleUserLogin,handleHawkerDetails,handleHawkerDetailsById} = require('../controller/hawker');

router.post("/signup",handleCreateUser);
router.post("/login",handleUserLogin);
router.post("/detail",handleHawkerDetails);
router.post("/detailbyID",handleHawkerDetailsById)

module.exports = router;
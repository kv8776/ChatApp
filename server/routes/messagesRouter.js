const express = require('express');
const functions=require("./../controllers/messageController")

const router=express.Router();

router.route('/getmsg').post(functions.getAllMsg);
router.route('/addmsg').post(functions.addMsg);

module.exports=router;

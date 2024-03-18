const express = require('express');
const functions=require('./../controllers/userController');

const router=express.Router();

router.route('/signup').post(functions.signup);
router.route('/login').post(functions.login);
router.route('/setavatar/:id').post(functions.setAvatar);
router.route('/allusers/:id').get(functions.getallusers);
module.exports=router;

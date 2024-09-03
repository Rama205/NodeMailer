const router = require('express').Router();
const {signUp,getBill} = require('../controllers/appController.js');



router.post('/user/signup',signUp);

router.post('/product',getBill)


module.exports =router;
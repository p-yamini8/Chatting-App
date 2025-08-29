const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/auth')
const userControllers=require('../controllers/user')
router.post('/signup',userControllers.signup);
router.post('/login',userControllers.login);
router.get('/all-users',authenticate,userControllers.getAllUsers);
module.exports=router;
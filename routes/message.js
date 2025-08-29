const express=require('express');
const router=express.Router();

const messageController=require('../controllers/message');
const authenticate=require('../middleware/auth');

router.post('/',authenticate,messageController.sendMessage);
router.get('/:receiverId',authenticate,messageController.getMessages);

module.exports=router;
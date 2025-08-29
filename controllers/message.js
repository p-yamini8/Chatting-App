const Message=require('../model/message');
const { Op } = require('sequelize');

exports.sendMessage=async (req,res)=>{
 try {
    const {content,receiverId}=req.body;
    const senderId=req.user.id;

    const message=await Message.create({
      content,
      senderId,
      receiverId
    });
    res.status(200).json({ message: 'Message sent successfully', data: message});
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
 }
}

exports.getMessages=async (req,res)=>{
  try {
    const receiverId=parseInt(req.params.receiverId);
    const senderId=req.user.id;
    const messages=await Message.findAll({
    where:{
      [Op.or]:[
        { senderId, receiverId },
         { senderId: receiverId, receiverId: senderId }
      ]
    },
    order: [['createdAt', 'ASC']]
    })
    res.status(200).json({messages})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
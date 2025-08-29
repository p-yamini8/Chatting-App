const {Sequelize,DataTypes}=require('sequelize');
const sequelize = require('../util/database');

const Message=sequelize.define('Message',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    unique:true,
    primaryKey:true,
  },
  content:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  senderId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  receiverId:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
});

module.exports=Message;
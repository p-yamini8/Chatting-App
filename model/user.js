const {DataTypes}=require('sequelize');
const Sequelize=require('../util/database');
const User=Sequelize.define('chatappuser',{
    id:{type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{type:DataTypes.STRING,
        allowNull:false,},

        email:{type:DataTypes.STRING,
        allowNull:false,
    unique:true,},
        password:{
            type:DataTypes.STRING,
        allowNull:false,
        }
})
module.exports=User;
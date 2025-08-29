const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {Op}=require('sequelize');
require('dotenv').config();
exports.signup=async(req,res)=>{
    try{
const {name,email,phone,password}=req.body;
if(!name||!email||!phone||!password)
{
    return res.status(400).json({message:"enter all details"})
}
//
const existinguser=await User.findOne({where:{email}});
if(existinguser)
{
    return res.status(400).json({message:'User already existss, please login'})
}
console.log(req.body)
const hash=await bcrypt.hash(password,10)
const user=await User.create({name,email,phone,password:hash});
res.status(201).json({message:'signup successful',user})

    }
catch(err)
{
    console.log(err)
    res.status(500).json({message:'error signup',err})
}
}

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
        return res.status(400).json('missing fields');

    }
    try{
    const user=await User.findOne({where:{email}});
    if(!user)
    {
        return res.status(404).json({message:'User not found'})
    }
    if(!(await bcrypt.compare(password,user.password)))
    {
return res.status(401).json({message:'Invalid credentials'});
    }
    const token=jwt.sign({id:user.id,
        name:user.name,
        email:user.email,
    },process.env.JWT_SECRET);
    res.json({message:'Login successful',token,name:user.name,email:user.email})

}catch(err)
{
    console.log(err);
    return res.status(500).json({message:'error login',err})
}
}

exports.getAllUsers=async (req,res)=>{
  try {
   const users=await User.findAll({
    attributes:['id','name','email'],
    where:{
       id:{[Op.ne]:req.user.id}
    }
   });
   res.status(200).json({users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}
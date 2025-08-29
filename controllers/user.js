const User=require('../model/user');
const bcrypt=require('bcrypt');
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
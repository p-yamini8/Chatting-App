const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const app=express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'view')))
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'view','signup' ,'signup.html'));
})
app.listen(3000,()=>{
    console.log('running 3000');
})
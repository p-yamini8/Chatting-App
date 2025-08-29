const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors');
const helmet=require('helmet');
const compress=require('compression');
const sequelize=require('./util/database');
const app=express();


////////
app.use(cors());

app.use(cors({
  origin:'http://127.0.0.1:5500',
  methods:['GET,POST,PUT,DELETE'],
  credentials:true
}));
app.use(helmet());
app.use(compress());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'view')))
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'view','signup' ,'signup.html'));
})
const userRoutes=require('./routes/user');
const messageRoutes=require('./routes/message')
//
app.use('/user',userRoutes);
app.use('/message',messageRoutes);
sequelize.sync()
.then(()=>{
app.listen(3000,()=>{
    console.log('running 3000');
})
})
.catch(err=>{
    console.log(err);
})

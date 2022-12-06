const mongoose = require('mongoose');
const Userlist=require('../connection/mongoose')
mongoose.Promise = global.Promise;



const saveToDB = async (n,e,p)=>{
    try{
     const newUserlist= new Userlist({
       name:n,
       email:e,
       password:p
    
     })
     await newUserlist.save();
     console.log("successfully added user");
    }catch(err){
        console.log(err);
    }
 }
 



module.exports = saveToDB;
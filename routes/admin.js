const { response } = require('express');
const express=require('express');
const router=express.Router();
const db= require('../connection/mongoose')
const adminhelper=require('../config/admin-helper/admin-data')
const p = '1234'
const userList=require('../config/admin-helper/admin-data')
const aps='$2a$10$gm6v7Df9hW81Apfj6wLP5ufeRY5Iqf4AeQk/eM5u8PSjAxz27IUJe'

// router.get('/',(req,res)=>{
  
//       res.render('admin-login')
    
// });

router.get('/', function(req, res, next) {
  db.dbConnect()
  userList.findOne({name:"ajay"},(err, docs) => {
      if (!err) {
        console.log(docs)
          res.render("", {
              data: docs
              
          });
          db.dbClose()
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});





router.get('/login',(req,res)=>{
    res.render('admin-login')
  });



router.post('/admin-login',(req,res)=>{
  console.log('admin login')
  res.redirect('/admin')
})


router.post('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/admin/login')
})








module.exports=router;
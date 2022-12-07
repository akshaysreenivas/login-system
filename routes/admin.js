const { response } = require('express');
const express=require('express');
const router=express.Router();
const adminhelper=require('../config/admin-helper/admin-data')
const p = '1234'

const aps='$2a$10$gm6v7Df9hW81Apfj6wLP5ufeRY5Iqf4AeQk/eM5u8PSjAxz27IUJe'

router.get('/',(req,res)=>{
  adminhelper.adminlogin(p,aps).then((response)=>{
    if(response.status){
      // req.session.admin.logged=true
      res.render('admin-header')
    }else{
      res.redirect('/admin/admin-login')
    }

  })
});

router.get('/admin/admin-login',(req,res)=>{

    res.render('admin-login')
  });
router.post('/admin-login',(req,res)=>{
  console.log('admin login')
  res.redirect('/admin')
})








module.exports=router;
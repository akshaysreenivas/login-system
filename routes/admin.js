
const express=require('express');
const router=express.Router();
const adminlog=require('../config/admin-helper/admin-data')
const User = require('../config/user-helper/userData')






// homepage .....

router.get('/',(req,res)=>{
  if(req.session.adminlogged){
    

    res.render('adminpanel',{admin:req.session.admin})
  }else
    res.redirect('/admin/login')
    
});

// login.....

router.get('/login',(req,res)=>{
  if(req.session.adminlogged){
    res.redirect('/admin')
  }else{
const loginfail=req.session.loginfailmsg
console.log("login fail>>",loginfail)
    res.render('admin-login',{loginfail})
    req.session.loginfailmsg=""
  }
  });



router.post('/admin-login',(req,res)=>{
  console.log('admin login')
  adminlog.adminlogin(req.body).then((response)=>{
    if (response.status){
      req.session.adminlogged=true
      req.session.admin=response.docs
      console.log('response.doc',response.docs.name)
      res.redirect('/admin')

    }else{
      if(response.check){
        req.session.loginfailmsg="Invalid Password"
      }else{
        req.session.loginfailmsg="No admin account with this Email ID"
      }
      res.redirect('/admin/login')

    }
  });

})


// ........user management......


// adduser....

router.get('/adduser',(req,res)=>{
  const usermanagemsg=req.session.usermanagemsg
  const user=req.session.user
  res.render('adduser',{usermanagemsg,admin:req.session.admin})
  req.session.usermanagemsg=""
})

router.post('/adduser',(req,res)=>{
  User.createAccount(req.body).then((response) => {
    if (response.added) {
        req.session.logged = true;
        req.session.user = response.data;
        req.session.usermanagemsg="Successfully added user ",
        res.redirect("/admin/adduser");
    } else if(!response.added){
        req.session.usermanagemsg = "cannot add user"
        res.redirect('/signup')

    }else{
        req.session.loginFailmsg = "This email id is alredy linked with an account"
        res.redirect('/login')
    }
})
})


// edit user ..

router.get('/edituser',(req,res)=>{
  res.render('edit-user',{admin:req.session.admin})
})

// show user ....

router.get('/showusers',(req,res)=>{
  User.getData().then((response)=>{
if(response){
 const usersData=response.data
  // console.log("response",usersData)
      res.render('showuser',{usersData,admin:req.session.admin})
}
else{

  res.send("cannot get Users Data")
}
  })
})

// delete user.... 

router.post('/deleteuser',(req,res)=>{
  console.log("id-",req.body)
  User.deleteData(req.body).then((response)=>{
    if(response.status) res.redirect("/admin/showuser")
  })
 
})





// logout .....

router.get('/adminlogout',(req,res)=>{
  console.log('admin logout')

  req.session.destroy();
  res.redirect('/admin/login')
})








module.exports=router;
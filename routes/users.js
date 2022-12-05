const express = require("express");
const router = express.Router();
// const Mongodb=require("../mongodb/mongo")

router.get("/", (req, res) => {
   
        res.redirect("/home");
   
});

router.get('/home',(req,res)=>{
    if (req.session.logged) {
        res.render("home");
    } else {
        res.redirect("/login");
        
    }
})
router.get("/login", (req, res) => {
    if (req.session.logged) {
        res.redirect("/home");
    } else {
        const loginfail=req.session.loginfail
        res.render("login",{loginfail});
        req.session.loginfail=false
    }
});

router.post("/login", (req, res) => {
    
    const loginfail=req.session.logged
    if (
        req.body.Email === req.session.email &&
        req.body.Password === req.session.password
    ) {
        req.session.logged = true;
        res.redirect("/");
    } else {
        
        req.session.loginfail=true;
      
       res.redirect("/login");
    }
});
router.get("/signup", (req, res) => {
    if(req.session.logged){
        res.redirect("/home");
    }else
    res.render("signup");
});
router.post("/signup", (req, res) => {
    console.log(req.body);

    req.session.name = req.body.fname;
    req.session.email = req.body.Email;
    req.session.password = req.body.password;
    req.session.logged = true;
    res.redirect("/home");
});

router.get("/home/usersdata",(req,res)=>{
   res.render('page');
});




module.exports = router;

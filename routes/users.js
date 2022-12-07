const express = require("express");
const router = express.Router();
const Userhelper = require('../config/user-helper/userData')
const mobiles =require('../config/products.js/products')

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.get('/home', (req, res) => {
    if (req.session.logged) {
        const userName = req.session.users.name
      
        
        res.render("home", { userName,mobiles });
    } else {
        res.redirect("/login");
    }
})

// login get

router.get("/login", (req, res) => {
    if (req.session.logged) {
        res.redirect("/home");
    } else {
        const loginfail = req.session.loginFailmsg
        res.render("login", { loginfail });
        req.session.loginFailmsg = " "
    }
});

// login post 

router.post("/login", (req, res) => {
    Userhelper.doLogin(req.body).then((response) => {
        console.log(response.status)
        if (response.status) {
            console.log("login ")
            req.session.logged = true;
            req.session.users = response.user;
            res.redirect("/");
        } else {
            console.log("login fail")
            if (response.found) {

                req.session.loginFailmsg = "Invalid Password";
                console.log(req.session.loginFailmsg)
            } else {

                req.session.loginFailmsg = "No account found with this EmailId ";
                console.log(req.session.loginFailmsg)
            }
            res.redirect("/login");
        }
    })


});


// signup get  

router.get("/signup", (req, res) => {
    if (req.session.logged) {
        res.redirect("/home");
    } else
        res.render("signup");
});

// signup post

router.post("/signup", (req, res) => {
    Userhelper.doSignup(req.body).then((response) => {
        if (response.added) {
            req.session.logged = true;
            req.session.users = response.data;
            res.redirect("/home");
        } else {
            req.session.loginFailmsg = "This email id is alredy linked with an account"
            res.redirect('/login')
        }
    })

});

// logout   

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/login')
})



module.exports = router;

const express=require('express');
const app=express();
const port=3000;
const session=require('express-session')
const userRouter=require('./routes/users');
const adminRouter=require('./routes/admin');
const hbs = require('express-handlebars')

// view engine 
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/' }))


app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:600000 },
  }));

  // prevent cache last page
app.use((req,res,next)=>{
    res.set("Cache-Control","no-store");
    next();
  })



app.use("/",userRouter);
app.use("/admin",adminRouter);



app.listen(port,()=>console.log("Server started on port ",port))
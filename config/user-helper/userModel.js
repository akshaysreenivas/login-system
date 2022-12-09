const mongoose=require('mongoose')
const bcrypt = require("bcryptjs")
const saltRounds = 10;



// creating schema

const userDatasc = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: { unique: true },
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userDatasc.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            } 
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })


module.exports=new mongoose.model("Userlist", userDatasc)
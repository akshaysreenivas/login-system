const bcrypt = require("bcryptjs")
const saltRounds = 10;
const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

mongoose.connect(`mongodb://127.0.0.1:27017/mywebsite`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to MongoDB.");      
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


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
    
    const Userlist = new mongoose.model("Userlist", userDatasc)

    



module.exports = Userlist;
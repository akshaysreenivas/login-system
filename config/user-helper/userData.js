const mongoose = require('mongoose');
const Userlist = require('../../connection/mongoose')
const bcrypt = require('bcryptjs')
mongoose.Promise = global.Promise;

const doLogin = (userData) => {
  return new Promise(async (resolve, reject) => {
    await Userlist.findOne({ email: userData.Email }).exec((error, user) => {
      if (user) {
        bcrypt.compare(userData.Password, user.password, (error, isMatch) => {
          if (isMatch) {
            console.log("user found")
            resolve({ status: true, user })
          } else {
            console.log("user password not matching")
            resolve({ status: false, found: true })
          }
        });
      }
      else {
        console.log("no user found")
        resolve({ status: false, found: false })
      }
    });
  });
};




const doSignup = (signUpdata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUserlist = new Userlist({
        name: signUpdata.fname,
        email: signUpdata.Email,
        password: signUpdata.password

      })
      await newUserlist.save((err, data) => {
        if (data) {
          console.log("successfully added user")
          resolve({ added: true, data })
        }
        else {
          console.log("can't add user")
          resolve({ added: false })
        }
      })

    } catch (err) {
      console.log(err);
    }
  })
}




module.exports = { doSignup, doLogin };
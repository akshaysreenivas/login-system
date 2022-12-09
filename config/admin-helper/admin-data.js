const bcrypt = require("bcryptjs");
const adminlist = require("../admin-helper/adminModel");

module.exports = {
  adminlogin: (adminData) => {
    console.log("adminData",adminData)
    return new Promise((resolve, reject) => {
      adminlist.findOne({ email: adminData.Email }, (err, docs) => {
        if (docs) {
          console.log("docs",docs);

          bcrypt.compare(adminData.Password, docs.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            } else if (isMatch) {
              console.log("matched");
              resolve({ status: true ,docs});
            } else if (!isMatch) {
              resolve({ status: false,check:true });
              console.log("no match");
            }
          });
        } else if(err) {
          console.log("Failed to retrieve the Course List: " + err);
          resolve({error:true})
        }else{
console.log('no admin found')
            resolve({check:false})
        }
      });
    });
  },
};

// bcrypt.compare(password, adPassword, (err, isMatch) => {
//     if (err) {
//         console.log(err)
//     } else if (isMatch) {
//         console.log("matched");
//         resolve({ status: true })

//     } else if(!isMatch) {
//         resolve({status:false})
//         console.log("no match");
//          }
// })

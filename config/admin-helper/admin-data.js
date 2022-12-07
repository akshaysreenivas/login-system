const bcrypt = require('bcryptjs')


const adminlogin = (password,adPassword) => {
    return new Promise( (resolve, reject) => {
        bcrypt.compare(password, adPassword, (err, isMatch) => {
            if (err) {
                console.log(err)
            } else if (isMatch) {
                console.log("matched");
                resolve({ status: true })
                
          
            } else if(!isMatch) {
                resolve({status:false})
                console.log("no match");
                 }
        })
    })
}

module.exports=adminlogin
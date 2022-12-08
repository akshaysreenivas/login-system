const mongoose = require("mongoose");
 
// create an schema
const userSchema = new mongoose.Schema({
            name: String,
            email:String,
            password:String
        });
 

 
module.exports = mongoose.model("adminlists", userSchema);
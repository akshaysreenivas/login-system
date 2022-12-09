const mongoose = require("mongoose");
 
// creating schema
const adminSchema = new mongoose.Schema({
            name: String,
            email:String,
            password:String
        });
 

 
module.exports = mongoose.model("adminlist", adminSchema);
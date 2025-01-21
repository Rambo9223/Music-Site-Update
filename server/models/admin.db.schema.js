const mongoose = require("mongoose");

// the schema for a new user entry for new doctor or admin accounts 

let adminSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model("admin",adminSchema);
const mongoose = require("mongoose");

// the schema for a new user entry for new doctor or admin accounts 

let enquiriesSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:false
    },
    subject:{
        type:String,
        required:true
    },
    enquiry:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    read:{
        type:Boolean,
        required:true
    },
    trash:{
        type:Boolean,
        required:true
    },
    answered:{
        type:Boolean,
        required:true
    }
    
    
});

module.exports = mongoose.model("enquiries",enquiriesSchema);
const mongoose = require("mongoose");

// the schema for a new subscriber

let subscriberSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    preferences:{
        shows:{
            type:Boolean,
            required:true
        },
        releases:{
            type:Boolean,
            required:true
        }
    },
    
    // date in the following format 2023-06-27
    /*subscribeDate:{
        type:Date,
        required:true
    }*/
});

module.exports = mongoose.model("subscribers",subscriberSchema);

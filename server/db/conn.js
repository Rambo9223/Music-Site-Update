//import { MongoClient } from "mongodb";
const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI || "" ;

//const client = new MongoClient(connectionString);

// db is the default connection to mongoose
const db = mongoose.connection
mongoose.Promise = global.Promise;

if(connectionString!==""){
// connect to our database 
mongoose.connect(connectionString,{
    dbName:"SR-Music-DB",
})

// check database is connected
db.on("error",(error)=>{
    console.log(error);
});
db.once("connected",()=>{
    console.log("Database Connected");
})
};


module.exports = db;
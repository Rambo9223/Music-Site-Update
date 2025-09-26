// template from https://www.mongodb.com/languages/mern-stack-tutorial

// to do - test helmet & write tests for backend, import neccessary modules 

const express = require("express");
const cors = require("cors");
//import "./loadEnvironment.js"
// require dotenv file 
require("dotenv").config();


// routes that require authentication
const routes = require("./routes/authRoutes.js");
// admin login routes
const login = require("./routes/login.js");
// routes that require no authentication
const user = require("./routes/nonAuthRoutes.js");
//const media = require("./media.json");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const path = require("path");
const {checkContentJSON, checkJWTToken} = require("./routes/middleware.js");
const PORT = process.env.PORT || 5000;
const app = express();

// code for build
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'),function(err){
    res.status(500).send(err);
  });
});

app.get("/welcome",(req,res)=>{
  res.status(200).json({ok:true,message:"Server connected. Welcome!"})
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set("trust proxy",1);
// we want users to be able to add enquirys and subscribe without auth (possibly limiting),
// we want admin to be verified when doing all other actions
app.use("/login",checkContentJSON,login)
app.use("/admin",checkContentJSON,checkJWTToken,routes);
app.use("/user",checkContentJSON,user)


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
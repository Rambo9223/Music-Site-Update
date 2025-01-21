// admin page for admin to login
// auto logout to be created in frontend maybe seconds of 59 minutes that counts
// down when admin is logged in & once 0 deletes token from local storage. 

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const admin = require("../models/admin.db.schema");
const blacklist = require("../models/blacklist.db.schema");
const {loginLimiter} = require("./middleware");
// import our webtoken package
const jwt = require("jsonwebtoken");
// to be added , change password function for admin
// import middleware for changing password and checks token is valid
//const {/*changePasswordVerification,*/checkJWTToken} = require("./middleware");

let u = 0;
/* Login Admin, once logged in functions after have to verify the token*/
router.post("/",loginLimiter,asyncHandler(async function(req, res){

    // check sever has user 
    let allAdmin = await admin.find({})
    let objSearch = allAdmin.find((o) => o.username === req.body.username);
    // user exists and passwords match
    if (objSearch !== undefined && req.body.password === objSearch.password) {
      // generate token for the user
      let jwtToken = jwt.sign(
        { 
          name:objSearch.name,
          username: objSearch.username,
          password: objSearch.password
        },
        "secretKey",{expiresIn:"1h"}
      );
      // send code 200 and send jwtToken
      res.status(200).send({
        status:200,
        ok:true,
        admin:true,
        "loggedIn":objSearch.name,
        "token":jwtToken});
  
      u = 0;// reset failed login counter
      
      // if username doesn't exist
    } else if (objSearch === undefined) {
      u++
      res.status(404).send({ 
        ok:false,
        status:404,
        message:`No accout exists with username - ${req.body.username}.`,
        failedAttempts:u 
      });
      // user exits but password is incorrect
    } else if (objSearch!== undefined && req.body.password!==objSearch.password){
      u++;// add 1 to failed login conter
      // log error
      res.status(404).send({ 
        status:404,
        ok:false,
        message: "Password Incorrect Please try logging in again",
        failedAttempts:u});
    }
    // else any other failure
    else {
      res.status(403).send({ 
      status:403,
      ok:false,
      message: "Error! User not Authenticated" 
    });
    }
  }));
  

  // Add logout function for Admins
  // make auto logout in front end and regular log out

  // logout route to enhance security
  router.get("/logout",asyncHandler(async function(req,res){
    // when admin logs out
    try {
      let token = req.headers.token ; // take active token
      // check to see if token is already blacklisted
      const checkIfBlacklisted = await blacklist.findOne({"token":token});
      if(checkIfBlacklisted) return res.status(401).json({message:"This session has expired. Please Login"});// send no content error 

      // add the token to the blacklist
      const newBlacklist = await blacklist.insertMany({
        "token":token,
    });
    // clear site data/cookies and the token on success
    res.setHeader("Clear-Site-Data",'"token"');
    res.status(200).json({
      status:200,
      ok:true,
      message:"You have been logged out!"
    });
           
    } catch (error) { // else if error
      res.status(500).json({
        status:500,
        ok:false,
        message:"Internal Sever Error"
      })
    }
    res.end();
  }))

  module.exports = router ; 
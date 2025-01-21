// middleware file to accept only JSON, check a token from admin requests, possibly limit requests from ip's

// import web token package
let jwt = require("jsonwebtoken");
// blacklist database
let blacklist = require("../models/blacklist.db.schema");
// import rate limiter
const rateLimiter = require("express-rate-limit");


// check token funcions
const checkJWTToken = async(req,res,next)=>{
    
    if(req.headers.token){// if token exists
        let token = req.headers.token;
        // check token hasn't been used before 
        const checkIfBlacklisted = await blacklist.find({"token":token});
        
        //if token exists send error 
        if(checkIfBlacklisted[0] !== undefined) return res.status(401).json({message:"This session has expired. Please Login"})
        ;
        // use verify to decode token 
        jwt.verify(token,"secretKey",function(error,data){
            if(error){
                res.status(401).json({message:"This session has expired. Please Login"});
                next();
            }
            else{
                // if token is valid 
                // set username,password
                // so they can be used in the index/user functions
                req.username = data.username;
                req.password = data.password;
                next();
            }
        });
    }
    else{// no token in headers so send error
        res.status(401).json({message:"No token attached to the request"});
        req.body = {};
        req.query = {};
        
    }
};

// check for guest admin, this will only allow guest logins to see admin page 
//but not interact directly with the server
function checkGuestAdmin(req,res,next){
    if(req.headers.token){// if token exists
        if(req.username==="GuestAdmin@SRMusic.com"){
            res.status(403).json({message:"Guest admin is not permitted to make these changes."})
        }else{next();}
    }
    
}


// check content is application/json
function checkContentJSON(req,res,next){
    let content = req.headers["content-type"];
    let body = req.body;
    if(content!=="application/json"){// if content is not json
        //send error
        res.status(400).send({message:"Item content is not of application/json, request rejected"});
        // change request body to empty string so the post/put functions will not update
        body = {};
        next();
    }
    else{next();}
}

// reject enquiries that have too long of a body 
function checkContentLength(req,res,next){
    let content = req.body.enquiry;
    
    if(content.length>400){// if greater than 400 characters
        res.status(400).send({// reject and send to user 
            status:"error",
            message:"Enquiry length is greater than 400 characters",
        });
        req.body = {};// remove body
        next();
    }else{next()}
}

// limit requests from users for enquiries
const limiter = rateLimiter({
    windowMs: 60 * 1000 * 240,//set time 4 hours 
    limit:5,// number of requests
    standardHeaders:"draft-7",
    legacyHeaders:false,
    message:{message:"You have exceeded your allowed number of requests. Try again later."},
});
// login limiter 
const loginLimiter = rateLimiter({
    windowMs:60 * 1000 * 5,// set time 5 minutes, can make longer
    limit:5,// max 5 requests
    standardHeaders:"draft-7",
    legacyHeaders:false,
    message:{message:"Too many failed login attempts. Your account has been locked for 5 minutes for your safety."}
})

module.exports = {
    checkJWTToken,
    checkGuestAdmin,
    checkContentJSON,
    checkContentLength,
    limiter, 
    loginLimiter
}
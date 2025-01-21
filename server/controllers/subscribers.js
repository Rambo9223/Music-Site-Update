// add, edit, remove and find subscribers
// import the user schema
const subscribers = require("../models/subscribers.db.schema");
// asyncHandler is used to write the async funtions
const asyncHandler = require("express-async-handler");


//add new user
exports.create = asyncHandler(async function(req,res){    
    let input = (req.body);// item to add
    // check user does not already exist
    let allUsers = await subscribers.find({});
    let objSearchUsers = allUsers.find((o) => (o.email === input.email && o.name === input.name))
    if(objSearchUsers===undefined){
    // if user doesn't exist add user and log success
    let data = await subscribers.insertMany(input);
    if(res.statusCode === 200){
        res.status(200).send({
            status:200,
            ok:true,
            message:`Thank you ${input.name}. You have sucessfully subscribed`});
        }else{console.log("Error")
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })};
     //else error
    }else{res.status(409).json({
        status:409,
        ok:false,
        message:"Error! User already subscribed."
      })}    
});

// find users 
exports.findSubscriber = asyncHandler(async function(req,res){
    // filter to query database
    let filter;
    // filter body is preferences, so fixed filter 
    if(req.body.query==="preferences"){filter={[req.body.query]:req.body.filter};}
    // filter is written query type so filter has regex to help return potential results
    else if(req.body.query!==""&&req.body.query!=="preferences"&&req.query.email===undefined){
    filter = {[req.body.query]:{$regex:req.body.filter,$options:"i"}};
    }else{filter = req.query;// else filter is country which is set
    }
    // find user
    let data = await subscribers.find(filter);
    if(data[0]!==undefined){
    // on success send data
    res.send({
        status:200,
        ok:true,
        "results":data});
    }
    else{// send no subscriber exists 
        let message = `${JSON.stringify(filter).replace(":"," - ").replace(/[,{}\"]/g,"").replace("$regex:","").replace("$options:i","")}`
        res.status(404).send({
            status:404,
            ok:false,
            message:`No subscriber with the ${message}`
        })
    };
});



//Update a single user account
exports.updateSubscriber = asyncHandler(async function(req,res){
    //console.log(req);
    let id = req.body._id ; // id of account to update 
    //console.log(id);
    let toUpdate = req.body; // updated content
    // find user and update database
    let data = await subscribers.findOneAndUpdate({_id:id},toUpdate,{new:true});
    // on success 
    if(res.statusCode === 200){
        res.send({
            status:200,
            ok:true,
            message:`Subscription updated - `,
            data:data});
        // else
        }else{res.status(500).json({
            status:500,
            ok:false,
            message:"Internal Sever Error"
          })};
});


// delete an user account
exports.deleteById = asyncHandler( async function(req,res){

    let id = req.query// id of account to delete
    // find and remove
    let data = await subscribers.findOneAndRemove(id);
    //console.log(id);
    // on success
    if(res.statusCode === 200){
        res.send({
            status:200,
            ok:true,
            message:`Subscriber Removed - ${data.name}`});
        
        }else{// on error 
            res.status(500).json({
                status:500,
                ok:false,
                message:"Internal Sever Error"
              })
        };
})


// import the enquiry schema
const enquiries = require("../models/enquiries.db.schema");
// asyncHandler is used to write the async funtions
const asyncHandler = require("express-async-handler");

//add new enquiry
exports.create = asyncHandler(async function(req,res){    
    let input = (req.body);// item to add
    //console.log(input);
    // enquiries can be made by anyone, 
    // added limiter to middleware to only allow 5 requests from an ip address minute
    let data = await enquiries.insertMany(input);
    if(res.statusCode === 200){// on success
        res.status(200).send({
            status:200,
            ok:true,
            message:`New enquiry recieved from - ${input.name}`});
        }else{// on failure 
        res.status(500).send({
            status:500,
            ok:false,
            message:"Internal Sever Error"
          })
        };
});

// find enquiries, admin can view this and query by date or answered etc
exports.findEnquiry = asyncHandler(async function(req,res){
    // filter to query database
    let filter = {[req.body.query]:req.body.filter};

    let sort = {"date":-1}
    // find enquiry
    let data = await enquiries.find(filter).sort(sort);
    if(res.statusCode === 200){
    // on success send data
    res.status(200).json({
        status:200,
        ok:true,
        results:data});
    }else{console.log("Error")
    res.status(500).json({
        status:"error",
        message:"Internal Sever Error"
      })};
});



//Update an enquiry to trash/answered etc
exports.updateEnquiry = asyncHandler(async function(req,res){
    let id = req.body._id ; // id of enquiry to update 
    let toUpdate = req.body; // updated content 
    // find enquiry and update database
    let data = await enquiries.findOneAndUpdate({"_id":id},toUpdate,{new:true})
    // on success 
    if(res.statusCode === 200){
        res.status(200).json({
            status:200,
            ok:true,
            message:`Enquiry Updated - ${data}`});
        // else
        }else{console.log("Error")
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })};
});


// delete an enquiry
exports.deleteEnquiry = asyncHandler( async function(req,res){
    // find and remove
    console.log(req.query);
    // conflict with query and params??? possibly use find byId and delete and remove top id code?
    let data = await enquiries.findByIdAndDelete(req.query._id);
    // on success
    //console.log(req);
    if(res.statusCode === 200){
        res.status(200).json({
            status:200,
            ok:true,
            message:`Message Deleted - ${data}`});
        // else
        }else{console.log("Error");
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })
        };
})


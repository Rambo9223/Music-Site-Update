const admin = require("../models/admin.db.schema");
// asyncHandler is used to write the async funtions
const asyncHandler = require("express-async-handler");

//add new admin
exports.createAdmin = asyncHandler(async function(req,res){    
    let input = (req.body);// item to add
    let allAdmin = await admin.find({});//find all admin
    // test to see if admin email/name matches any items in the returned object
    let objSearchAdmin = allAdmin.find((o) => (o.email === input.email && o.name === input.name))
    if(objSearchAdmin===undefined){
    let data = await admin.insertMany(input);// insert new
    if(res.statusCode === 200){// if success
        res.send({message:`New Admin Added - ${data}`});
        }else{// if failure to add
        console.log("Error");
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })
        
    };
  }else{// fails as admin already exists
    res.status(409).json({
      status:"error",
      message:"Admin already exists"
    })
  }
});

// find enquiries, admin can view this and query by date or answered etc
exports.findAdmin = asyncHandler(async function(req,res){
    // filter to query database
    let filter = {[req.body.query]:req.body.filter};
    // find enquiry
    let data = await admin.find(filter);
    if(res.statusCode === 200){
    // on success send data
    res.send(data);
    }else{console.log("Error");
    // on failure send error
    res.status(500).json({
        status:"error",
        message:"Internal Sever Error"
      })
};
});

exports.editAdmin = asyncHandler(async function(req,res){
    let toUpdate = req.body; // updated content 
    // find enquiry and update database
    let data = await admin.findOneAndUpdate({"_id":req.body.id},toUpdate,{new:true})
    // on success 
    if(res.statusCode === 200){
        res.send({message:`Admin Details Updated - ${data}`});
        // else
        }else{console.log("Error");
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })
        };
})

// delete an enquiry
exports.deleteAdmin = asyncHandler( async function(req,res){
    
    // conflict with query and params, change to params when front end implemented???
    let data = await admin.findByIdAndDelete(req.body.id);
    // on success
    if(res.statusCode === 200){
        res.send(`Admin Removed - ${data}`);
        // else if failure
        }else{console.log("Error");
        res.status(500).json({
            status:"error",
            message:"Internal Sever Error"
          })
        };
})
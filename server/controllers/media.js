const asyncHandler = require("express-async-handler");
const mediaObject = require("../media.json");
const fs = require("fs-extra");
// creating functions to update media JSON file 

// send items to frontend user
exports.allItems = asyncHandler(async function(req,res){
    res.send(mediaObject);
})

// find an return certain types of media item 
exports.findItem = asyncHandler(async function(req,res){
    let filter = {query:req.body.query,
        filter:req.body.filter};// user supplied filter
    let results;

    if(filter.query===""){// empty filter
        res.status(200).send({
            status:200,
            ok:true,
            results:mediaObject// send all 
        })
    }else{// filter exists 
        results = mediaObject.filter((item)=>{//set results based on filter
            if(item[filter.query] === filter.filter){
                return item
            }
        })
    if(results.length>0){// if resutlts is greater than 0
        res.status(200).send({// send to frontend
            status:200,
            ok:true,
            results:results
        })
    }else{// else send error
        res.status(500).send({
            status:500,
            ok:false,
            message:"Internal Sever Error"
        })
    }
    }
        
})


// ADD MEDIA ITEM FUNCTION
function addItem(media,path,title,link,id){
    // new item with a http link
    const link_Item = {
        "media":media,
        "path":path,
        "title":title,
        "link":link,
        "id":id
    }
    // item with no link 
    const item ={
        "media":media,
        "path":path,
        "title":title,
        "id":id
    }
    // find out which item exists 
    // push to mediaObject 
    if(link===null){
        mediaObject.push(item)
    }else{
        mediaObject.push(link_Item)
    }
    // use outputfilesync with removal of (.) from path
    // write to local json object
    fs.outputFileSync("./media.json",JSON.stringify(mediaObject));
}

exports.newItem = (function(req,res){
    let newItem = req.body;// new media item
    let dbItem = undefined;// database item 
    let i = 0;// count variable
    let id = Math.round(Math.random()*10000)
    // loop through eash db item
    mediaObject.forEach((item)=>{
        // check for no duplicates
        if(item.title === newItem.title || item.path === newItem.path || item.id === id){
            // if duplicate found
            res.status(400).send({
                status:400,
                ok:false,
                message:`-${newItem.title}- already exists or has duplicate path or title with another ${item.media} in the server.`
            })
            dbItem = item;
        }
        if(i===mediaObject.length-1 && dbItem === undefined){// no duplicates found 
            if(newItem.media&&newItem.path&&newItem.title){
                // does the link param exist?
                let linkStatus = Boolean(newItem.link === "" || newItem.link === undefined);
                // if no, add item without link, if yes add all
                linkStatus===true?addItem(newItem.media,newItem.path,newItem.title,null,id):addItem(newItem.media,newItem.path,newItem.title,newItem.link,id)
                // log success
                res.status(200).send({
                    status:200,
                    ok:true,
                    message:`New Item Added - ${newItem.title}`
                }); 
            }else{// one of the key item params not inputed
                res.status(500).send({
                    status:500,
                    ok:false,
                    message:`Error! Could not add - ${newItem.title}`
                });// log error 
            }
        }
        i++;
    })
})
// 

exports.editItem = (function(req,res){
    let editedItem = req.body; // edited item
    let id = Number(editedItem.id)
    let i = 0;// count variable
    let bool = false;// bool to check if edited
    mediaObject.forEach((item)=>{// loop through json
        if(item.id === id){// item found
            // change paramters that are allowd to be changed
            (editedItem.path)?item.path=editedItem.path:null;
            (editedItem.title)?item.title=editedItem.title:null;
            (editedItem.link)?item.link=editedItem.link:null;
            // log success
            //res.send(`Your changes have been made.`);
            res.status(200).send({
                status:200,
                ok:true,
                message:`Media item: ${item.title} has been successfully edited.`
            })
            // overwrite json file
            fs.outputFileSync("./media.json",JSON.stringify(mediaObject));
            // change bool to mark item is edited
            bool = true;
        }else if(i === mediaObject.length -1 && bool === false){// if looped throgh items && none have been edited
            // log error
            //res.send(`Error, cannot find item with id - ${editedItem.id}`)
            res.status(404).send({
                status:404,
                ok:false,
                message:`Error! ${editedItem.title} could not be edited.`
            })
        }
        i++;
    })
})

exports.deleteItem = (function (req,res){
    let id = Number(req.query._id);// id of item to delete
    let i = 0 ;// count variable 
    let bool = false;// bool to indicate item exists
    
    mediaObject.forEach((item)=>{// loop through object 
        if(item.id === id){// item exists 
            res.status(200).send({// send respose to user 
                status:200,
                ok:true,
                message:`Media item: ${item.title} has been successfully deleted.`
            })
            mediaObject.splice(i,1);// remove from object array 
            // rewrite object 
            fs.outputFileSync("./media.json",JSON.stringify(mediaObject));
            bool = true;// set bool true to end loop 
        }else if(bool === false && i === mediaObject.length - 1){
            res.status(500).send({
                status:500,
                ok:false,
                message:`Error, cannot find item with id - ${id}`
            })
        }
        i++ ; 
    })
    
})

// added id to all media items, function redundant
/* 
exports.giveId = (function(req,res){
    let result = Math.round(Math.random()*10000);
    mediaObject.forEach((item)=>{
        item.id = Math.round(Math.random()*10000);
        fs.outputFileSync("./media.json",JSON.stringify(mediaObject));
    })
    console.log(mediaObject);
})
*/

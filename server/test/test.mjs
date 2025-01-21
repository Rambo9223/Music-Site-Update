import { expect } from "chai";
import testObject from "./testItem.json" assert {type:"json"}
import mediaObject from "../media.json" assert {type:"json"};
import subscribers from "../models/subscribers.db.schema.js" //assert {type:"array"};
import blacklist from "../models/blacklist.db.schema.js";
import { it } from "mocha";
process.env.NODE_ENV = "test" ;
const { default: chaiHttp } = await import("chai-http");
const chaiModule = await import ("chai");
const server = await import("../index.js");
const serverHttp = "http://localhost:5000";
const chai = chaiModule.use(chaiHttp);
const assert = chai.assert;


/* Changed to ESM type, conflict with common JS
https://byteofdev.com/posts/how-to-use-esm/#:~:text=ESM%20(or%20ECMAScript%20Modules)%20is,tree%20shaking%2C%20among%20other%20features.

https://github.com/chaijs/chai/issues/1578

maybe download older version of chai

getting somewhere now, have to change chai functions*/

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXJub2xkIEFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBjbGluaWMuY29tIiwicGFzc3dvcmQiOiJhZG1pbjEiLCJwb3NpdGlvbiI6IkFkbWluIiwiaWF0IjoxNjg4ODI0NjE5fQ.nVNMSPswU3QmELHJWNzgc1-t5kcIQ8-EnlDuttJgYSE"


describe("Test backend API for users & admin", function(){
    describe("User Tests",function(){
        it("Test server connected", function(done){
            chai.request.execute(serverHttp).get("/welcome").end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                const message = res.body.message;
                assert.equal(
                    message,
                    "Server connected. Welcome!"
                );
                done();
            })
        });
        it("Test get media object",function(done){
            chai.request.execute(serverHttp).post("/user/media").set("Content-Type","application/json")
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                expect(res.body[0].path).to.equal(mediaObject[0].path);
                done();
            });
        });
        it("Reject non JSON request",function(done){
            chai.request.execute(serverHttp).post("/user/enquiries").set("Content-Type","text/html").send(testObject.enquiryPass.enquiry)
            .end((err,res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.be.a("object");
                assert.deepEqual(
                    "Item content is not of application/json, request rejected",res.body.message
                )
                done();
            })
        });
    });
    describe("Subscriber Tests",function(){
        this.timeout(20000);
        it("Add new subscriber",function(done){
            chai.request.execute(serverHttp).post("/user/subscribers").set("Content-Type","application/json").send(testObject.subscriber)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body.message).to.equal("Thank you Thomas Test. You have sucessfully subscribed")
                done();
            });
        });
        it("Edit Subscriber info",function(done){
            let subscriber = testObject.subscriber
            subscriber.age = 40;
            subscriber.city = "Perth"
            chai.request.execute(serverHttp).put("/user/subscribers").set("Content-Type","application/json").send(subscriber)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                assert.deepEqual(
                    subscriber,res.body.data
                )
                done();
            })
        });
        it("Reject duplicate subscriber",function(done){
            chai.request.execute(serverHttp).post("/user/subscribers").set("Content-Type","application/json").send(testObject.subscriber_Double)
            .end((err,res)=>{
                expect(res).to.have.status(409);
                expect(res.body).to.be.a("object");
                expect(res.body.message).to.equal("Error! User already subscribed.")
                done();
            })
        });
        it("User Unsubscribe",async function(){
            let data = await subscribers.find({});
            let id = {"_id":testObject.subscriber._id}
            //console.log(id);
            chai.request.execute(serverHttp).delete("/user/subscriber").set("Content-Type","application/json").query(id)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(data).to.not.contain(testObject.subscriber);
                assert.deepEqual(
                    "Subscriber Removed - Thomas Test",res.body.message
                )
                
            })
        });
    });
    describe("User Enquiry",function(){
        it("Send a message to the server",function(done){
            chai.request.execute(serverHttp).post("/user/enquiries").set("Content-Type","application/json").send(testObject.enquiryPass)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                assert.deepEqual(
                    "New enquiry recieved from - Thomas Test",res.body.message
                )
                done();
            })
        });
        it("Reject a message with too many characters",function(done){
            chai.request.execute(serverHttp).post("/user/enquiries").set("Content-Type","application/json").send(testObject.enquiryFail)
            .end((err,res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.be.a("object");
                assert.deepEqual({
                status:"error",
                message:"Enquiry length is greater than 400 characters",
                },res.body
                )
                done();
            })
        })   
    })
    describe("Admin Tests",function(){
        this.timeout(20000);
        
            it("Login Fail UserName",function(done){
                let falseAdmin = testObject.Admin;
                falseAdmin.username = "notAdmin@gmail.com";
                chai.request.execute(serverHttp).post("/login/").set("Content-Type","application/json").send(falseAdmin)
                    .end((err,res)=>{
                        assert.deepEqual({ 
                            ok:false,
                            status:404,
                            message:`No accout exists with username - ${falseAdmin.username}.`,
                            "failedAttempts":1},res.body);
                            falseAdmin.username = "GuestAdmin@SRMusic.com";
                            done();
                    })
            })
            it("Login Fail Password",function(done){
                let falseAdmin = testObject.Admin;
                falseAdmin.password = "notAdmin";
                chai.request.execute(serverHttp).post("/login/").set("Content-Type","application/json").send(falseAdmin)
                    .end((err,res)=>{
                        assert.deepEqual({ 
                            ok:false,
                            status:404,
                            message:`Password Incorrect Please try logging in again`,
                            "failedAttempts":2},res.body);
                            falseAdmin.password = "guestAdmin";
                            done();
                    })
            })
            // Server requests here before logout
            /*describe("Server tests",function(){
                it("")
            });*/
            it("Expired Session",function(done){    
            chai.request.execute(serverHttp).get("/login/logout").set("Content-Type","application/json").set("token",testObject.token)
            .end(function(err,res){
            assert.deepEqual(
            {message:"This session has expired. Please Login"},res.body)
            done();
                })  
            })
            it("Login Success",function(done){
                chai.request.execute(serverHttp).post("/login/").set("Content-Type","application/json").send(testObject.Admin)
                .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a("string");
                done() 
                })
            });
            it("Logout Success",function(done){
                const remove = async () =>{
                    let blacklistData = await blacklist.deleteMany({})
                } 
                remove().then(()=>{
                chai.request.execute(serverHttp).get("/login/logout").set("Content-Type","application/json").set("token",testObject.token)
                .end(function(err,res){
                    assert.deepEqual(
                        {status:200,ok:true,
                        message:"You have been logged out!"},res.body
                    )
                    done();
                })})
            })
        })
})



// add tests for admins 
//login/logout/,reject bad password, reject request -frontend without token, bad username, 


// three test, find all enquiries and edit,delete

// media, find all, add new, edit, delete

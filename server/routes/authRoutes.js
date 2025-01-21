const express = require("express");
require("../db/conn.js");// connection script to connect to mongo server

// routes available to only admins with authorisation 

const {checkGuestAdmin} = require("./middleware.js")

const subscribers = require("../controllers/subscribers.js");

const enquiries = require("../controllers/enquiries.js");

const admin = require("../controllers/admin.js");

const media = require("../controllers/media.js");

const router = express.Router();

router.post("/subscribers",subscribers.findSubscriber);

router.put("/subscriber",checkGuestAdmin,subscribers.updateSubscriber);

router.delete("/subscriber",checkGuestAdmin,subscribers.deleteById);




router.post("/enquiries",enquiries.findEnquiry);

router.put("/enquiry",checkGuestAdmin,enquiries.updateEnquiry);

router.delete("/enquiry",checkGuestAdmin,enquiries.deleteEnquiry);


router.post("/new",admin.createAdmin);

router.post("/",admin.findAdmin);

router.put("/",admin.editAdmin);

router.delete("/",admin.deleteAdmin);

router.post("/media/new",checkGuestAdmin,media.newItem);

router.post("/media",media.findItem);

router.put("/media",checkGuestAdmin,media.editItem);

router.delete("/media",checkGuestAdmin,media.deleteItem);


module.exports = router

// removed functions

//router.get("/enquiries",enquiries.findAll); can use post with empty {}

//router.post("/enquiries",enquiries.create); moved to non auth 

//router.post("/media/newId",media.giveId); function used to give media items id's

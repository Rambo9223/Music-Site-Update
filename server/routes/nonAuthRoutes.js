const express = require("express");

// routes for user that require no authorisation

const {limiter,checkContentLength} = require("../routes/middleware");

const subscribers = require("../controllers/subscribers");

const enquiries = require("../controllers/enquiries");

const media = require("../controllers/media");

const router = express.Router();

router.post("/subscribers",subscribers.create);

router.post("/subscriber",subscribers.findSubscriber);

router.put("/subscribers",subscribers.updateSubscriber);

router.delete("/subscriber",subscribers.deleteById);

router.post("/enquiries",limiter,checkContentLength,enquiries.create);

router.post("/media",media.allItems);


module.exports = router
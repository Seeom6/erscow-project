const express = require("express");
const { addMessage, getMessages ,DeleteMassages} = require("../Services/messagesService");

const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/msg" ,DeleteMassages)
module.exports = router;
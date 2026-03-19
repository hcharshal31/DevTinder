const express = require("express");
const router = express.Router();
const { userAuth }= require("../middleware/auth")
const connectionRequestController  = require("../controllers/connectionRequestController");

router.post("/request/send/:status/:toUserId", userAuth, connectionRequestController);

module.exports = router;
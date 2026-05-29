const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");
const connectionRequestController = require("../controllers/connectionRequestController");
const addOrRejectConnection = require("../controllers/addOrRejectConnectionController");

router.post(
  "/request/send/:status/:toUserId",
  userAuth,
  connectionRequestController,
);

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  addOrRejectConnection,
);

module.exports = router;

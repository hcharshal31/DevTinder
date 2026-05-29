const ConnectionRequest = require("../models/connectionRequest");

const addOrRejectConnection = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allowedStatus = ["accepted", "rejected"];

    const { status, requestId } = req.params;
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    console.log(requestId);

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection request not found",
      });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    return res.status(200).json({
      message: "Connection request accepted successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addOrRejectConnection;

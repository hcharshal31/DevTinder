const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const connectionRequestController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "user not found.",
      });
    }

    const fromUserId = user?._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    if (!toUserId) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // We have written the same logic at schema level in pre method. But we can also write this logic here. Its not compulsory to write this logic at schema level we can write it inside the controller function as well.

    // if (fromUserId.toString() === toUserId) {
    //   return res.status(400).json({
    //     message: "Bad request!",
    //   });
    // }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exist",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return res.status(200).json({
      message: `${user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message,
    });
  }
};

module.exports = connectionRequestController;

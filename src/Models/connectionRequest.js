const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted, rejected"],
        message: "Incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send the connection request to yourself.");
  }

  next();
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // In this line we are creating compound index, this way when we query the database for finding the perticular perticular connection request based on both toUserId and fromUserId, the index make this operation much much faster.

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);

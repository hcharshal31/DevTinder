const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://hcharshal31:pm1Yt0KlgWKGmAF6@namastenode.na34ll3.mongodb.net/devTinder")
}

module.exports = connectDB;
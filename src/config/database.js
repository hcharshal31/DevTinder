const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://bloguser:bloguser123@namastenode.uf1jqgz.mongodb.net/devTinder")
}

module.exports = connectDB;
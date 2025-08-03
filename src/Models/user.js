const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    Password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// Some times we can directly export the model like below.
// module.exports = mongoose.Model("User", userSchema);
// This way dont need to separatly create a user and then export it.


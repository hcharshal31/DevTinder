const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        emailId: {
            type: String,
            trim: true,
            usique: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email address")
                }
            }
        },
        password: {
            type: String,
            // validate(value){
            //     if(!validator.isStrongPassword(value)){
            //         throw new Error("Your password is not strong")
            //     }
            // }
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            validate(value){
                if(!["male", "female", "others"].includes(value)){
                    throw new Error("Invalid gender data.");
                }
            }
        }
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// Some times we can directly export the model like below.
// module.exports = mongoose.Model("User", userSchema);
// This way dont need to separatly create a user and then export it.


const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
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
            unique: true,
            index: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email address")
                }
            }
        },
        password: {
            type: String,
            select: false,
            minlength: 8
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            lowercase: true,
            enum: {
                values: ["male", "female", "others"],
                message: "{VALUE} value is not correct",
            }
        },
        about:{
            type: String,
            trim: true,
        },
        photoURL: {
            type: String,
            trim: true,
            default: function () {
                if (this.gender === "male") {
                    return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png";
                } else if (this.gender === "female") {
                    return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/woman-user-circle-icon.png";
                } else {
                    return "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
                }
            }
        }
},
{
    timestamps: true,
});

// Here we are attaching the getJWT method on userSchema for geting the jWT token for the every instance of the user collection.
userSchema.methods.getJWT = function() {
    const user = this;
    // Here this means the current user

    const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d" });
    return jwtToken;
}

userSchema.methods.validatePassword = async function(userPassword) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(userPassword, user.password)

    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

// Some times we can directly export the model like below.
// module.exports = mongoose.Model("User", userSchema);
// This way dont need to separatly create a user and then export it.



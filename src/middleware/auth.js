const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    
    try {
        const { token } = req.cookies;

        if(!token){
            return res.status(401).json({
                message: "Token missing or invalid"
            })
        }

        const decodedMessage = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = decodedMessage;

        const user = await User.findById(_id);
        if(!user){
            return res.status(401).json({
                message: "Token missing or invalid"
            })
        }

        req.user = user;
        next();

    }catch(error){
        return res.status(error.status || 500).json({
            message: error.message || "Unknown Error"
        })
    }
};

module.exports = {
    userAuth,
}
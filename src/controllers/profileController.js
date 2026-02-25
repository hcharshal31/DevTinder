const validateEditProfileData = require("../utils/validation")

const getProfile = async (req, res) => {
    try{
        const user = req.user;

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "Welcome to your profile",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender
            }
        })


    }catch(err){
        res.status(401 || err.status).json({
            message: err.message || "Invalid or expired token"
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        // const {_id} = user;

        const isUpdateAllowed = validateEditProfileData(req.body);

        if(!isUpdateAllowed){
            return res.status(403).json({
                message: "Forbidden",
            })
        }

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: loggedInUser,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to update profile"
        });
    }
}

module.exports = {getProfile, updateProfile}
const { validateSignUpData, validateLoginData } = require("../utils/validation")

const signUpUser = async (req, res) => {
    try{

        validateSignUpData(req.body);

        const { firstName, lastName, emailId, password, age, gender } = req.body;

        const isExistingEmail = await User.findOne({emailId});
        if(isExistingEmail){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Inside bcrypt hash method we can either directly pass a salt string or we can add the number of salt rounds should happen to hash the password. 10 is a standard number of salt rounds.

        // Salt sting can be any string it depends upon developer what to use

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            age,
            gender
        });

        await user.save();

        return res.status(201).json({
            message: "User added successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            message: "Bad request",
            err,
        });
    }    
}

const logInUser = async (req, res) => {
    const { emailId, password } = req.body;
    try{

        validateLoginData(req.body);

        const user = await User.findOne({emailId});
        if(!user){
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const jwtToken = user.getJWT();
            res.cookie("token", jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            return res.status(200).json({
                message: "Login successful!"
            });
        } else {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        
    }catch(error){
        return res.status(error.status || 500).json({
            message: error.message || "Unknown error: Please try again after some time"
        });
    }
}

const logOutUser = async (req, res) => {
     res.cookie("token", null, { expires: new Date(Date.now()) });
     res.status(200).json({
        message: "You are Logged out successfully..."
     })
}

module.exports = {
    signUpUser,
    logInUser,
    logOutUser,
}
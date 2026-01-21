const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");
const dotenv = require("dotenv");

const app = express();


app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
    try{
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
});

app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try{
        const user = await User.findOne({emailId});
        if(!user){
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
            res.cookie("token", jwtToken);
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
});

app.get("/profile", userAuth, async (req, res) => {
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
});

app.get("/user", async (req, res) => {
    try{
        const user = await User.find({emailId: "pratik123@gmail.com"});
        if(user){
            res.send(user);
        }else{
            res.status(404).send("User not found!")
        }
    }catch(err){
        res.send("Something went wrong!")
    }
});

app.get("/feed", async (req, res) => {
    try{
        const user = await User.find();
        if(user){
            res.send(user)
        }else{
            res.status(404).send("User not found!")
        }
    }catch(err){
        res.send("Something went wrong!")
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
            res.send("User deleted successfully!");
    }catch(err){
        res.status(400).send("Something went wrong!")
    }
})

app.patch("/update-email", async (req, res) => {
    
    const { id, newEmail } = req.body;

    try{
        const newEmailAlreadyExist = await User.findOne({emailId: newEmail});
        if(newEmailAlreadyExist){
            return res.status(400).json({
                message: "The new email address already exist. Please provide the different email."
            })
        }

        const user = await User.findByIdAndUpdate(
            {_id: id}, 
            { emailId: newEmail },
            {
            runValidators: true,
            new: true,
            context: "query"
            }
        );
        if(!user){
            return res.status(404).json({
                message: "The user with this email address does not exist."
            })
        }

        return res.status(200).json({
            message: "User Email updated succussfully"
        })

    } catch (err){
        res.status(500).json({
            message: "Error in updating the email! Please try again after some time",
            err,
        })
    }
})


connectDB().then(
    () => {
        console.log("Connected to database successfully.")
        app.listen(3000, () => {
            console.log("Listening to port 3000 succussfully.")
        });
    }
).catch((err) => {
    console.log("Can not connect to database due to the error: " + err);
});


// mongodb+srv://hcharshal31:pm1Yt0KlgWKGmAF6@namastenode.uf1jqgz.mongodb.net/devTinder

// mongodb+srv://bloguser123:QCIGfSjLaiSrhJf2@namastenode.uf1jqgz.mongodb.net/devTinder
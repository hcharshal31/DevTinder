const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes")
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", profileRoutes);



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
        }
        res.status(404).send("User not found!")
        
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
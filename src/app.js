const express = require("express");
const connectDB = require("./config/database");
const User = require("./Models/user");

const app = express();

// const { adminAuth, userAuth } = require("./middleware/auth")

// app.use("/user/data", userAuth);

// app.get("/user", adminAuth);

app.use(express.json());


app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        console.log(req.body);
        res.send("User added succussfully!")
    } catch(err) {
        res.status(400).send("Bad request");
        console.log(err);
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

// mongodb+srv://hcharshal31:pm1Yt0KlgWKGmAF6@namastenode.na34ll3.mongodb.net/
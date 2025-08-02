const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middleware/auth")

app.use("/user/data", userAuth);

app.get("/user", adminAuth);

app.listen(3000, () => {
    console.log("Listening to port 3000 succussfully.")
});

// mongodb+srv://hcharshal31:pm1Yt0KlgWKGmAF6@namastenode.na34ll3.mongodb.net/
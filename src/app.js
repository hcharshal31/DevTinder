const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Listening to port 3000 succussfully.")
});

app.use("/hello", (req, res) => {
    res.send("Hello Everyone from port 3000.")
});

app.use("/browse", (req, res) => {
    res.send("Welcome to browse page.")
});

app.use("/harshal", (req, res) => {
    res.send("Hello Harshal!")
});

app.use("/pratik", (req, res) => {
    res.send("Hello Pratik!")
});

app.use("/shambho", (req, res) => {
    res.send("Hello shambho!")
});

app.use("/", (req, res) => {
    res.send("Welocome to dashboard.")
});
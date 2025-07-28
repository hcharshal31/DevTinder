const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Listening to port 3000 succussfully.")
});

// app.use("/hello/world", (req, res) => {
//     res.send("Hello world.")
// });

// app.use("/hello", (req, res) => {
//     res.send("Hello Everyone from port 3000.")
// });

app.get("/user", (req, res) => {
    res.send("Got the data succussfully.")
});

app.post("/user", (req, res) => {
    res.send("Data added to database successfully.")
});

app.put("/user", (req, res) => {
    res.send("Data updated succussfully using PUT method")
});

app.patch("/user", (req, res) =>{
    res.send("Data updated succussfully using PATCH method")
});

app.delete("/user", (res, req) => {
    res.send("Deleted data succussfully.")
})
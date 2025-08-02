const adminAuth = (req, res, next) => {
    const token = "Authorize";
    const authorized = token === "Authorize";
    if(authorized){
        console.log("Hello world! 1");
        res.send("Admin is authorized!");
    } else {
        res.status(401).send("Admin is unauthorized!");
    }
};

const userAuth = (req, res, next) => {
    const token = "unAuthorize";
    const authorized = token === "Authorize";
    if(authorized){
        res.send("User is authorized!");
    } else {
        res.status(401).send("User is unauthorized!");
    }
};

module.exports = {
    adminAuth,
    userAuth,
}
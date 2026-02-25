const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {signUpUser, logInUser, logOutUser} = require("../controllers/authController")

router.post("/signup", signUpUser);

router.post("/login", logInUser);

router.post("/logout", logOutUser)

module.exports = router;
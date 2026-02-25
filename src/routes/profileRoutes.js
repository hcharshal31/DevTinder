const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const router = express.Router()
const { userAuth } = require("../middleware/auth");

router.get("/profile", userAuth, getProfile);

router.patch("/profile", userAuth, updateProfile);

module.exports = router;
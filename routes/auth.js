const router = require("express").Router();
const { googleAuth, signin, signup } = require("../controller/auth.js");

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

//GOOGLE AUTH
// router.post("/google", googleAuth);

module.exports = router;

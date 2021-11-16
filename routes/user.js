let express = require("express");
const { signUp, login, getUser } = require("../controllers/userControllers");
const auth = require("../middleware/auth");

const { signUpRules, validator } = require("../middleware/validator");
let router = express.Router();

router.post("/signUp", signUpRules(), validator, signUp);
router.post("/login", login);
router.get("/get", auth, getUser);

module.exports = router;

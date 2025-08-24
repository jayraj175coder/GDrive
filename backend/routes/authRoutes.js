const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);

module.exports = router;

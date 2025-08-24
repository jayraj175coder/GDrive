const express = require("express");
const { uploadImage, uploadMiddleware, searchImages } = require("../controllers/imageController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload", auth, uploadMiddleware, uploadImage);
router.get("/search", auth, searchImages);

module.exports = router;

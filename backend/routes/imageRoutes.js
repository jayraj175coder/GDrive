const express = require("express");
const { uploadImage, uploadMiddleware, searchImages, getImagesByFolder } = require("../controllers/imageController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Upload an image
router.post("/", auth, uploadMiddleware, uploadImage);

// Search images
router.get("/search", auth, searchImages);

// Get all images (no folder filter)
router.get("/", auth, getImagesByFolder);

// Get images by folder ID
router.get("/folder/:folderId", auth, getImagesByFolder);

module.exports = router;

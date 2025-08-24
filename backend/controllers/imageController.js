const Image = require("../models/Image");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single("image");

exports.uploadImage = async (req, res) => {
  const { name, folder } = req.body;
  try {
    const image = new Image({
      name,
      filePath: req.file.path,
      folder: folder || null,
      user: req.user.id
    });
    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.searchImages = async (req, res) => {
  const { query } = req.query;
  try {
    const images = await Image.find({
      user: req.user.id,
      name: { $regex: query, $options: "i" }
    });
    res.json(images);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

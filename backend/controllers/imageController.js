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
  try {
    const { name, folder } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    
    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: 'Image name is required' });
    }
    
    const image = new Image({
      name,
      filePath: req.file.path,
      folder: folder || null,
      user: req.user.id
    });
    
    await image.save();
    
    // Return the saved image with populated user info
    const savedImage = await Image.findById(image._id).populate('user', 'username');
    
    res.status(201).json({
      success: true,
      image: savedImage
    });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ message: 'Server error during image upload' });
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

exports.getImagesByFolder = async (req, res) => {
  try {
    const query = { user: req.user.id };
    
    // Check if we're getting images for a specific folder
    if (req.params.folderId) {
      query.folder = req.params.folderId;
    } else {
      // If no folder ID is provided, get images not in any folder
      query.folder = { $exists: false };
    }
    
    const images = await Image.find(query);
    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Server error while fetching images' });
  }
};

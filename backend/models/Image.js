const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", imageSchema);

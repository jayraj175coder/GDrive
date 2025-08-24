const Folder = require("../models/Folder");

exports.createFolder = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const folder = new Folder({ name, parent: parent || null, user: req.user.id });
    await folder.save();
    res.json(folder);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id });
    res.json(folders);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();
connectDB();

const app = express();

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test route works!' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

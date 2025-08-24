# 🖼️ Image Uploader - Full Stack Web Application

A modern web application where users can register, create nested folders, upload images, and search through their content with user-specific access control.

## ✨ Features

- 🔐 **User Authentication**: Signup, Login, Logout with JWT
- 📁 **Nested Folder Management**: Create unlimited nested folders like Google Drive
- 🖼️ **Image Upload**: Upload images to specific folders with metadata
- 🔍 **Smart Search**: Search through your images by name
- 👤 **User Isolation**: Each user only sees their own folders and images
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - User interface library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Uploader
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your MongoDB connection string
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: https://g-drive-seven.vercel.app/
   - Backend: [http://localhost:5000](https://gdrive-4da3.onrender.com/)

## 🌐 Deployment

### Option 1: Render (Recommended - Free)
- **Backend**: Web Service on Render
- **Frontend**: Static Site on Render
- **Database**: MongoDB Atlas

### Option 2: Railway
- **Backend**: Node.js service
- **Frontend**: Static hosting
- **Database**: MongoDB Atlas

### Option 3: Vercel + Railway
- **Frontend**: Vercel (free)
- **Backend**: Railway
- **Database**: MongoDB Atlas

📖 **See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions**

## 📁 Project Structure

```
Uploader/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── uploads/            # File upload directory
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   └── context/        # React context
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── DEPLOYMENT_GUIDE.md     # Deployment instructions
├── deploy.sh               # Linux/Mac deployment script
├── deploy.bat              # Windows deployment script
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/imageuploader
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Folders
- `POST /api/folders` - Create folder
- `GET /api/folders` - Get user folders

### Images
- `POST /api/images` - Upload image
- `GET /api/images` - Get all user images
- `GET /api/images/folder/:id` - Get images in folder
- `GET /api/images/search` - Search images

## 🎨 UI Components

- **Navbar**: Navigation and user status
- **FolderTree**: Hierarchical folder display
- **ImageCard**: Individual image display
- **Dashboard**: Main application interface
- **Search**: Image search functionality
- **Auth Forms**: Login and signup forms

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- User data isolation
- CORS protection
- Input validation
- File upload restrictions

## 🚨 Important Notes

1. **File Storage**: Images are stored locally in production. Consider cloud storage for scalability.
2. **Database**: MongoDB Atlas free tier has limitations. Plan for growth.
3. **Environment Variables**: Never commit `.env` files to version control.
4. **CORS**: Configure CORS properly for production deployment.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Check CORS_ORIGIN environment variable
   - Ensure frontend and backend URLs match

2. **Database Connection**
   - Verify MongoDB connection string
   - Check network connectivity

3. **File Uploads**
   - Ensure uploads directory exists
   - Check file size limits

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


**Made with ❤️ by [Your Name]**

**Happy Coding! 🚀** 

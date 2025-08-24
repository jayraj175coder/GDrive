import React, { useState, useEffect } from 'react';
import FolderTree from '../components/FolderTree';
import ImageCard from '../components/ImageCard';
import { uploadImage, getImages } from '../api/api';


export default function Dashboard() {
const [selectedFolder, setSelectedFolder] = useState(null);
const [images, setImages] = useState([]);
const [file, setFile] = useState(null);
const [name, setName] = useState('');


useEffect(() => {
if (selectedFolder) fetchImages(selectedFolder);
}, [selectedFolder]);


const fetchImages = async (folderId) => {
const { data } = await getImages(folderId);
setImages(data);
};


const handleUpload = async () => {
  try {
    if (!name.trim()) {
      alert('Please enter an image name');
      return;
    }
    if (!file) {
      alert('Please select an image file');
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('folder', selectedFolder || '');
    formData.append('image', file);
    
    await uploadImage(formData);
    setName('');
    setFile(null);
    if (selectedFolder) {
      fetchImages(selectedFolder);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload image. Please try again.');
  }
};


return (
  <div className="dashboard">
    <div className="sidebar">
      <h2>Folders</h2>
      <FolderTree onSelectFolder={setSelectedFolder} />
    </div>
    
    <div className="main-content">
      <div className="header">
        <h1>Image Manager</h1>
        {selectedFolder && (
          <div className="upload-section">
            <h3>Upload Image to Current Folder</h3>
            <div className="upload-form">
              <input 
                placeholder="Image Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="name-input"
              />
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="file-input"
              />
              <button onClick={handleUpload} className="upload-btn">
                Upload Image
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="images-section">
        <h3>{selectedFolder ? 'Images in Folder' : 'All Images'}</h3>
        {images.length === 0 ? (
          <p className="no-images">No images found</p>
        ) : (
          <div className="images-grid">
            {images.map(img => <ImageCard key={img._id} image={img} />)}
          </div>
        )}
      </div>
    </div>
  </div>
);
}
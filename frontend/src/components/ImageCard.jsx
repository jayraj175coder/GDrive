import React from 'react';


export default function ImageCard({ image }) {
  return (
    <div className="image-card">
      <div className="image-container">
        <img 
{/*           src={`http://localhost:5000/${image.filePath}`}  */}
          src={`https://gdrive-4da3.onrender.com/${image.filePath}`} 

          alt={image.name} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150x150?text=Image+Error';
          }}
        />
      </div>
      <div className="image-info">
        <h4>{image.name}</h4>
        <p className="upload-date">
          {new Date(image.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

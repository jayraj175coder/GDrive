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
const formData = new FormData();
formData.append('name', name);
formData.append('folderId', selectedFolder);
formData.append('image', file);
await uploadImage(formData);
setName('');
setFile(null);
fetchImages(selectedFolder);
};


return (
<div>
<FolderTree onSelectFolder={setSelectedFolder} />
{selectedFolder && (
<div>
<h3>Upload Image</h3>
<input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
<input type="file" onChange={(e) => setFile(e.target.files[0])} />
<button onClick={handleUpload}>Upload</button>
</div>
)}
<div className="images">
{images.map(img => <ImageCard key={img._id} image={img} />)}
</div>
</div>
);
}
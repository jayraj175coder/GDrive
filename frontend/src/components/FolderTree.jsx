import React, { useEffect, useState } from 'react';
import { getFolders, createFolder } from '../api/api';


export default function FolderTree({ onSelectFolder }) {
const [folders, setFolders] = useState([]);
const [name, setName] = useState('');
const [parentId, setParentId] = useState(null);


useEffect(() => {
fetchFolders();
}, []);


const fetchFolders = async () => {
const { data } = await getFolders();
setFolders(data);
};


const handleCreate = async () => {
if (!name) return;
await createFolder({ name, parentId });
setName('');
fetchFolders();
};


return (
  <div className="folder-tree">
    <div className="folder-actions">
      <h3>Create New Folder</h3>
      <div className="folder-form">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Folder name" 
          className="folder-name-input"
        />
        <select 
          value={parentId || ''} 
          onChange={(e) => setParentId(e.target.value || null)}
          className="parent-folder-select"
        >
          <option value="">No parent folder</option>
          {folders.map(folder => (
            <option key={folder._id} value={folder._id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button 
          onClick={handleCreate} 
          className="create-folder-btn"
          disabled={!name.trim()}
        >
          Create Folder
        </button>
      </div>
    </div>
    
    <div className="folders-list">
      <h3>Your Folders</h3>
      {folders.length === 0 ? (
        <p className="no-folders">No folders created yet</p>
      ) : (
        <ul className="folders-ul">
          {folders.map(folder => (
            <li 
              key={folder._id} 
              onClick={() => onSelectFolder(folder._id)}
              className="folder-item"
            >
              📁 {folder.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}
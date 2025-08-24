import React, { useEffect, useState } from 'react';
import { getFolders, createFolder } from '../api/api';

// Helper function to build folder tree structure
const buildFolderTree = (folders) => {
  const folderMap = {};
  const rootFolders = [];

  // Create a map of all folders
  folders.forEach(folder => {
    folderMap[folder._id] = { ...folder, children: [] };
  });

  // Build the tree structure
  folders.forEach(folder => {
    if (folder.parent) {
      // This is a child folder
      if (folderMap[folder.parent]) {
        folderMap[folder.parent].children.push(folderMap[folder._id]);
      }
    } else {
      // This is a root folder
      rootFolders.push(folderMap[folder._id]);
    }
  });

  return rootFolders;
};

// Helper function to get folder path
const getFolderPath = (folders, folderId) => {
  const folderMap = {};
  folders.forEach(folder => {
    folderMap[folder._id] = folder;
  });

  const path = [];
  let currentFolder = folderMap[folderId];

  while (currentFolder) {
    path.unshift(currentFolder.name);
    currentFolder = currentFolder.parent ? folderMap[currentFolder.parent] : null;
  }

  return path;
};

// Recursive component to render folder tree
const FolderItem = ({ folder, level = 0, onSelectFolder, selectedFolderId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = folder.children && folder.children.length > 0;
  const isSelected = selectedFolderId === folder._id;

  return (
    <div className="folder-tree-item">
      <div 
        className={`folder-item level-${level} ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelectFolder(folder._id, folder.name)}
      >
        {hasChildren && (
          <span 
            className="expand-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        {!hasChildren && <span className="expand-icon-placeholder"></span>}
        <span className="folder-icon">📁</span>
        <span className="folder-name">{folder.name}</span>
        {hasChildren && (
          <span className="child-count">({folder.children.length})</span>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="folder-children">
          {folder.children.map(child => (
            <FolderItem 
              key={child._id} 
              folder={child} 
              level={level + 1} 
              onSelectFolder={onSelectFolder}
              selectedFolderId={selectedFolderId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FolderTree({ onSelectFolder, selectedFolderId }) {
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
    if (!name.trim()) return;
    await createFolder({ name, parent: parentId || null });
    setName('');
    setParentId(null);
    fetchFolders();
  };

  const folderTree = buildFolderTree(folders);

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
            <option value="">No parent folder (Root)</option>
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
          <div className="folder-tree-container">
            {folderTree.map(folder => (
              <FolderItem 
                key={folder._id} 
                folder={folder} 
                onSelectFolder={onSelectFolder}
                selectedFolderId={selectedFolderId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
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
<div>
<h3>Folders</h3>
<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Folder name" />
<button onClick={handleCreate}>Create Folder</button>
<ul>
{folders.map(folder => (
<li key={folder._id} onClick={() => onSelectFolder(folder._id)}>
{folder.name}
</li>
))}
</ul>
</div>
);
}
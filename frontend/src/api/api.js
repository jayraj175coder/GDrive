import axios from 'axios';


const API = axios.create({ 
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' 
    baseURL: 'https://gdrive-4da3.onrender.com' 

});


// Add token to requests
API.interceptors.request.use((req) => {
const profile = localStorage.getItem('profile');
if (profile) {
req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
}
return req;
});


// Auth
export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Folders
export const createFolder = (data) => API.post('/folders', data);
export const getFolders = () => API.get('/folders');

// Images
export const uploadImage = (formData) => API.post('/images', formData);

export const getImages = (folderId) => 
  folderId ? 
    API.get(`/images/folder/${folderId}`) : 
    API.get('/images');

export const searchImages = (query) => 
  API.get('/images/search', { params: { query } });

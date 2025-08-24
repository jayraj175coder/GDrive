import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api' });


// Add token to requests
API.interceptors.request.use((req) => {
const profile = localStorage.getItem('profile');
if (profile) {
req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
}
return req;
});


export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const createFolder = (data) => API.post('/folders', data);
export const getFolders = () => API.get('/folders');
export const uploadImage = (data) => API.post('/images', data);
export const getImages = (folderId) => API.get(`/images/${folderId}`);
export const searchImages = (query) => API.get(`/images/search?query=${query}`);
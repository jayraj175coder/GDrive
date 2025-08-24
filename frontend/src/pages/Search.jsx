import React, { useState } from 'react';
import { searchImages } from '../api/api';
import ImageCard from '../components/ImageCard';


export default function Search() {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);


const handleSearch = async () => {
const { data } = await searchImages(query);
setResults(data);
};


return (
<div>
<h2>Search Images</h2>
<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Image name" />
<button onClick={handleSearch}>Search</button>
<div className="images">
{results.map(img => <ImageCard key={img._id} image={img} />)}
</div>
</div>
);
}
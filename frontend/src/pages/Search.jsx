import React, { useState } from 'react';
import { searchImages } from '../api/api';
import ImageCard from '../components/ImageCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { data } = await searchImages(query);
      setImages(data);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Images</h1>
        <p>Search through your uploaded images by name</p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter image name to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            required
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searched && (
        <div className="search-results">
          <h3>Search Results for "{query}"</h3>
          {loading ? (
            <div className="loading">Searching...</div>
          ) : images.length === 0 ? (
            <div className="no-results">
              <p>No images found matching "{query}"</p>
            </div>
          ) : (
            <div className="images-grid">
              {images.map(img => <ImageCard key={img._id} image={img} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
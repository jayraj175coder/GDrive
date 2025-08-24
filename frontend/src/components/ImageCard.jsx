import React from 'react';


export default function ImageCard({ image }) {
return (
<div className="image-card">
<p>{image.name}</p>
<img src={`http://localhost:5000/${image.path}`} alt={image.name} width="150" />
</div>
);
}
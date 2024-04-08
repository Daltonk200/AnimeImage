// src/components/ImageGrid.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Masonry from 'react-masonry-css';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("")
  const getSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    getImages()
  }

  const getImages = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${search}`);
      setImages(response.data.data);
    }
    catch (error) {
      console.error('Error fetching images:', error);
    };
  }
useEffect(()=>{
getImages()
},[search])
  console.log(search)

  return (
    <>
      <form onSubmit={getSearch}>
        <input type="text"
          value={search}
          onChange={getSearch }
          className="search-box"
          placeholder='search Any anime name ' />
      </form>
      <div className="image-grid">

        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.images.jpg.image_url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;

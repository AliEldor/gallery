import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import AddPhotoModal from '../components/AddPhotoModal';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import '../styles/Gallery.css';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
      
      navigate('/login');
      return;
    }

    
    const storedPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    setPhotos(storedPhotos);

    //  all unique tags from photos
    const tags = new Set();
    storedPhotos.forEach(photo => {
      photo.tags.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Photo Gallery</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="gallery-controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagFilter 
          allTags={allTags} 
          selectedTags={selectedTags} 
          setSelectedTags={setSelectedTags} 
        />
        <button 
          className="add-photo-btn" 
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Photo
        </button>
      </div>

      <div className="photo-grid">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map(photo => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onEdit={handleEditPhoto} 
              onDelete={handleDeletePhoto} 
            />
          ))
        ) : (
          <p className="no-photos-message">
            No photos found. Add a new photo or adjust your filters.
          </p>
        )}
      </div>

      {isAddModalOpen && (
        <AddPhotoModal 
          onAdd={handleAddPhoto} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default GalleryPage;
import React, { useState } from 'react';
import EditPhotoModal from './EditPhotoModal';
import '../styles/photoCard.css';

const PhotoCard = ({ photo, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this photo?')) {
        onDelete(photo.id);
      }
    };
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    const openEditModal = (e) => {
      e.stopPropagation();
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const handleEditPhoto = (editedPhoto) => {
      onEdit(editedPhoto);
      closeEditModal();
    };
  
    return (
      <>
        <div className="photo-card">
          <img 
            src={photo.imageUrl} 
            alt={photo.title} 
            className="photo-image"
            onClick={toggleDescription}
          />
          <div className="photo-info">
            <h3 className="photo-title">{photo.title}</h3>
            
            <div className="photo-description">
              {showFullDescription ? (
                <p>{photo.description}</p>
              ) : (
                <p>
                  {photo.description.length > 100 
                    ? `${photo.description.substring(0, 100)}...` 
                    : photo.description}
                </p>
              )}
              {photo.description.length > 100 && (
                <button 
                  className="read-more-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDescription();
                  }}
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
  
            <div className="photo-tags">
              {photo.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
  
            <div className="photo-actions">
              <button 
                className="edit-btn" 
                onClick={openEditModal}
              >
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        
      </>
    );
  };
  
  export default PhotoCard;
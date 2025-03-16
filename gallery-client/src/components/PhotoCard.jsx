import React, { useState } from 'react';
import EditPhotoModal from './EditPhotoModal';
import '../styles/photoCard.css';

const PhotoCard = ({ photo, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    
  
    return (
      <>
        <div className="photo-card">
          <img 
           
            className="photo-image"
            
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
                  
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
  
            <div className="photo-tags">
              
            </div>
  
            <div className="photo-actions">
              <button 
                className="edit-btn" 
                
              >
                Edit
              </button>
              <button 
                className="delete-btn" 
                
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        {isEditModalOpen && (
          <EditPhotoModal 
            photo={photo} 
            onEdit={handleEditPhoto} 
            onClose={closeEditModal} 
          />
        )}
      </>
    );
  };
  
  export default PhotoCard;
import React, { useState } from 'react';
import '../styles/PhotoModal.css';

const AddPhotoModal = ({ onAdd, onClose }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      tags: '',
      imageFile: null,
      imageUrl: ''
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleTagsChange = (e) => {
      setFormData({
        ...formData,
        tags: e.target.value
      });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        //  preview image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
          setFormData({
            ...formData,
            imageFile: file,
            imageUrl: reader.result // Store the data URL
          });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      // Validation
      if (!formData.title.trim()) {
        setError('Title is required');
        return;
      }
      if (!formData.imageUrl) {
        setError('Please select an image');
        return;
      }
  
      
      const processedTags = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];
  
     
      const newPhoto = {
        title: formData.title,
        description: formData.description,
        tags: processedTags,
        imageUrl: formData.imageUrl,
        createdAt: new Date().toISOString()
      };
  
      onAdd(newPhoto);
      onClose();
    };
  
    
    const stopPropagation = (e) => {
      e.stopPropagation();
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={stopPropagation}>
          <div className="modal-header">
            <h2>Add New Photo</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
  
          {error && <div className="error-message">{error}</div>}
  
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleTagsChange}
                placeholder="nature, vacation, family, etc."
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="image">Image *</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
  
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
  
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="submit-btn">Add Photo</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddPhotoModal;
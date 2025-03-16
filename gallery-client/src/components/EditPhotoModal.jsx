import React, { useState } from 'react';
import '../styles/photoModal.css';

const EditPhotoModal = ({ photo, onEdit, onClose }) => {
  const [formData, setFormData] = useState({
    title: photo.title,
    description: photo.description,
    tags: photo.tags.join(', '),
    imageUrl: photo.imageUrl
  });
  const [previewUrl, setPreviewUrl] = useState(photo.imageUrl);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result
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

    // Process tags 
    const processedTags = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];

    // Create updated photo object
    const updatedPhoto = {
      ...photo,
      title: formData.title,
      description: formData.description,
      tags: processedTags,
      imageUrl: formData.imageUrl,
      updatedAt: new Date().toISOString()
    };

    onEdit(updatedPhoto);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Photo</h2>
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
              onChange={handleChange}
              placeholder="nature, vacation, family, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Replace Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoModal;
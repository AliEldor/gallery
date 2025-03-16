import React, { useState } from 'react';
import '../styles/photoModal.css';



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
              
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              
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
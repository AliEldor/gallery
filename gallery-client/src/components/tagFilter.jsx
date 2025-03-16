import React from 'react';
import '../styles/TagFilter.css';

const TagFilter = ({ allTags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <h4>Filter by Tags:</h4>
      <div className="tag-list">
        {allTags.map(tag => (
          <span 
            key={tag} 
            className={`tag-filter-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <button 
          className="clear-tags-btn"
          onClick={() => setSelectedTags([])}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default TagFilter;
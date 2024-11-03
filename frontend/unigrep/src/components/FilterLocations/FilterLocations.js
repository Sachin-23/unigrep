import React, { useState } from 'react';
import './FilterLocations.css'; // Assuming your CSS is in this file

const FilterLocations = () => {
  const [locations, setLocations] = useState([
    '/home/user/Documents',
    '/home/user/Downloads',
    '/home/user/Uploads/sent',
  ]);

  const handleAddLocation = () => {
    const newLocation = prompt("Enter a new location:");
    if (newLocation) {
      setLocations([...locations, newLocation]);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all locations?")) {
      setLocations([]);
    }
  };

  return (
    <div className="filter-location-body">
      <div className="section-box">
        <div className="caption">Filter Locations</div>
        <div className="spacer"></div>
        <div className="button-bar darkorange">
          <div className="button" onClick={handleClearAll}>Clear All</div>
          <div className="button" onClick={handleAddLocation}>Add</div>
        </div>
      </div>

      <div className="path-item-box">
        {locations.map((location, index) => (
          <div key={index} className="path-item">
            {location}
            <span 
              className="path-item-remove" 
              onClick={() => setLocations(locations.filter((_, i) => i !== index))}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterLocations;

import React, { useState } from 'react';
import './FilterQuery.css';

function FilterQuery() {
  const [selectedOption, setSelectedOption] = useState('filenames');
  const [selectedLocation, setSelectedLocation] = useState('local');

  // Handle location change, reset to "filenames" if "ftp" is selected
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    if (location === 'ftp') {
      setSelectedOption('filenames');
    }
  };

  return (
    <div className="filter-body">
      <div className="caption">Filter Query</div>
      <div className="filter-bar" contentEditable={true}>My Doc:*</div>
      <div className="button-bar-set">
        
        {/* Filenames and File Contents as radio buttons */}
        <div className="button-bar darkgreen">
          <label className="radio-button">
            <input
              type="radio"
              name="queryType"
              value="filenames"
              checked={selectedOption === 'filenames'}
              onChange={() => setSelectedOption('filenames')}
            />
            Filenames
          </label>
          <label className={`radio-button ${selectedLocation === 'ftp' ? 'disabled' : ''}`}>
            <input
              type="radio"
              name="queryType"
              value="fileContents"
              checked={selectedOption === 'fileContents'}
              onChange={() => setSelectedOption('fileContents')}
              disabled={selectedLocation === 'ftp'} // Disable if FTP is selected
            />
            File Contents
          </label>
        </div>

        {/* Local, FTP, and SFTP as radio buttons */}
        <div className="button-bar">
          <label className="radio-button">
            <input
              type="radio"
              name="locationType"
              value="local"
              checked={selectedLocation === 'local'}
              onChange={() => handleLocationChange('local')}
            />
            Local
          </label>
          <label className="radio-button">
            <input
              type="radio"
              name="locationType"
              value="ftp"
              checked={selectedLocation === 'ftp'}
              onChange={() => handleLocationChange('ftp')}
            />
            FTP
          </label>
          <label className="radio-button">
            <input
              type="radio"
              name="locationType"
              value="sftp"
              checked={selectedLocation === 'sftp'}
              onChange={() => handleLocationChange('sftp')}
            />
            SFTP
          </label>
        </div>

        <div className="spacer"></div>

        {/* Basic, Glob, and Regex buttons */}
        <div className="button-bar darkblue">
          <div className="button">Basic</div>
          <div className="button">Glob</div>
          <div className="button">Regex</div>
        </div>
      </div>
    </div>
  );
}

export default FilterQuery;

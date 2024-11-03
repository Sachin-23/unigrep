import React from 'react';
import './FilterQuery.css';

function FilterQuery() {
  return (
    <div className="filter-body">
      <div className="caption">Filter Query</div>
      <div className="filter-bar" contentEditable={true}>My Doc:*</div>
      <div className="button-bar-set">
        <div className="button-bar darkgreen">
          <div className="button">Filenames</div>
          <div className="button">File Contents</div>
        </div>

        <div className="button-bar">
          <div className="button">Local</div>
          <div className="button">FTP</div>
          <div className="button">SFTP</div>
          <div className="button">WebDAV</div>
        </div>

        <div className="spacer"></div>

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

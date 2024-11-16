import React, { useState } from 'react';
import './ApplyTab.css'; // Assuming your CSS is in this file

const ApplyTab = () => {
  const [operation, setOperation] = useState("Copy");
  const [location, setLocation] = useState("/home/user/Publish/");
  const previewFiles = [
    { name: "My Doc: First.doc", path: "/home/user/Publish/work/My Doc: First.doc" },
    { name: "My Doc: Second.doc", path: "/home/user/Publish/work/My Doc: Second.doc" },
    { name: "My Doc: Third.doc", path: "/home/user/Publish/work/My Doc: Third.doc" },
  ];

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    if (e.target.value === "Delete") {
      setLocation(""); // Clear location for Delete operation
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="apply-tab">
      <div className="apply-tab-header">Operating on {previewFiles.length} files.</div>

      <div className="apply-section">
        <div className="caption">Operation</div>
        <select value={operation} onChange={handleOperationChange} className="operation-dropdown">
          <option value="Copy">Copy</option>
          <option value="Move">Move</option>
          <option value="Delete">Delete</option>
          {/* Add more operations as needed */}
        </select>
      </div>

      {operation !== "Delete" && (
        <div className="apply-section">
          <div className="caption">{operation} Location:</div>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            className="location-input"
            placeholder={`Enter ${operation.toLowerCase()} location`}
          />
        </div>
      )}

      <div className="apply-section">
        <div className="caption">Preview</div>
        <div className="preview-list">
          {previewFiles.map((file, index) => (
            <div key={index} className="preview-item">
              <div className="title">{file.name}</div>
              <div className="path">{file.path}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="apply-button">Apply</button>
    </div>
  );
};

export default ApplyTab;

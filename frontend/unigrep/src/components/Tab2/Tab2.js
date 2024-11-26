// Tab2.js
import React,{useState} from 'react';
import { useTabState } from '../../TabStateContext';
import '../ApplyTab/ApplyTab.css'; // Assuming your CSS is in this file

const Tab2 = () => {
  const { selectedFileType, selectedConnection, selectedMode, searchResult, root, username, password } = useTabState();
  const [operation, setOperation] = useState("Delete");
  const [location, setLocation] = useState("/destination/location");
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
    // <div>
    //   <h3>Tab 2</h3>
    //   <p><strong>File Type:</strong> {selectedFileType}</p>
    //   <p><strong>Connection Type:</strong> {selectedConnection}</p>
    //   <p><strong>Mode:</strong> {selectedMode}</p>

    //   {/* Display the search result */}
    //   <textarea readOnly value={searchResult} placeholder="Search results will appear here" />

    //   <div>
    //     <p><strong>Root:</strong> {root}</p>
    //     <p><strong>Username:</strong> {username}</p>
    //     <p><strong>Password:</strong> {password}</p>
    //   </div>
    // </div>
    <div className="apply-tab">
      <div className="apply-tab-header">Operating on {searchResult.length} files.</div>

      <div className="apply-section">
        <div className="caption">Operation</div>
        <select value={operation} onChange={handleOperationChange} className="operation-dropdown">
        {selectedConnection === 'local' && <option value="Copy">Copy</option>}
        {selectedConnection === 'local' && <option value="Move">Move</option>}
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
          {searchResult.map((file, index) => (
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

export default Tab2;

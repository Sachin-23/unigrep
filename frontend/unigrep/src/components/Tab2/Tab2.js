// Tab2.js
import React, { useState, useEffect } from 'react';
import { useTabState } from '../../TabStateContext';
import '../ApplyTab/ApplyTab.css'; // Assuming your CSS is in this file
import { performApply } from '../utils/Apply';

const Tab2 = () => {
  const { selectedFileType, selectedConnection, selectedMode, searchResult, root, username, password } = useTabState();
  const [operation, setOperation] = useState(selectedConnection === "ftp" ? "download" : "delete");
  const [location, setLocation] = useState("/destination/location");
  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    if (e.target.value === "delete") {
      setLocation(""); // Clear location for Delete operation
    }
  };
  const [isValid, setIsValid] = useState(false); // Tracks the validation status
  const [errorMessage, setErrorMessage] = useState("");

  // Validation logic in useEffect
  useEffect(() => {
    let error = "";
    const isLocationValid = location.trim() !== "";
    const isAuthRequired = selectedConnection === "sftp" || selectedConnection === "ftp";
    const isAuthValid = username && password && root && username.trim() !== "" && password.trim() !== "" && root.trim() !== "";

    const isValid = isLocationValid && (!isAuthRequired || isAuthValid) && searchResult;
    setIsValid(isValid); // Button is disabled if validation fails

    if(!searchResult){
      error = "No Search Result to apply to"
    }
    else if (!isLocationValid) {
      error = "Please provide a valid location.";
    } else if (isAuthRequired && !isAuthValid) {
      error = "For SFTP/FTP connections, username, password, and root address are required.";
    }
    

    setErrorMessage(error); // Set the error message

  }, [location, selectedConnection, username, password, root]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleApply = async () => {
    // Build the request body based on input fields and selected radio buttons
    const msg = {
        search_domain: selectedConnection, // Based on selected radio button for connection
        root_address: root,
        auth_username: username,
        auth_password: password,
        operation: operation,
        parameters: (operation === "delete" || operation === "download") ? null : {
          "destination_path" : location
        },
        result_set : searchResult
    };
    console.log(msg)
    try {
        // Call performSearch from the utils file
        const result = await performApply(msg);

        // Handle the response
        console.log('Apply result:', result);
    } catch (error) {
        console.error('Apply failed:', error);
    }
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
      {searchResult && <div className="apply-tab-header">Operating on {Object.values(searchResult.path).length} files.</div>}

      <div className="apply-section">
        <div className="caption">Operation</div>
        <select value={operation} onChange={handleOperationChange} className="operation-dropdown">
          {selectedConnection === 'local' && <option value="copy">Copy</option>}
          {selectedConnection === 'local' && <option value="move">Move</option>}
          {selectedConnection === 'ftp' && <option value="download">Download</option>}
          {selectedConnection !== 'ftp' && <option value="delete">Delete</option>}
        </select>
      </div>

      {(operation !== "delete" && operation !== "download" ) && (
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
          {/* {searchResult.path.map((file, index) => (
            <div key={index} className="preview-item">
              <div className="title">{file.name}</div>
              <div className="path">{file.path}</div>
            </div>
          ))} */}
        </div>
      </div>
      <button
        onClick={handleApply}
        className="apply-button" disabled={!isValid}>
          Apply
          </button>
      {errorMessage && (
        <p className="error" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

    </div>
  );
};

export default Tab2;

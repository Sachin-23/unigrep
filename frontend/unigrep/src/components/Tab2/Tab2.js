// Tab2.js
import React, { useState, useEffect } from 'react';
import { useTabState } from '../../TabStateContext';
import '../ApplyTab/ApplyTab.css'; // Assuming your CSS is in this file
import { performApply } from '../utils/Apply';


const Tab2 = () => {
  const { selectedFileType, selectedConnection, selectedMode, searchResult, root, username, password } = useTabState();
  const [operation, setOperation] = useState("download");
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
    const isLocationValid =  location.trim() !== "";
    const isAuthRequired = selectedConnection === "ssh";
    const isAuthValid = username && password && root && username.trim() !== "" && password.trim() !== "" && root.trim() !== "";
    const isOnlyRootRequired = selectedConnection === "ftp";
    const isOnlyRootValid = root && root.trim() !== "";
    const isValid = isLocationValid && (!isAuthRequired || isAuthValid) && searchResult;
    setIsValid(isValid); // Button is disabled if validation fails

    if(!searchResult){
      error = "No Search Result to apply to"
    }
    else if ((operation==="move" || operation==="copy") && !isLocationValid) {
      error = "Please provide a valid location.";
    } else if (isAuthRequired && !isAuthValid) {
      error = "For SFTP connections, username, password, and root address are required.";
    }
    else if (isOnlyRootRequired && !isOnlyRootValid){
      error = "Please provide valid root address"
    }
    

    setErrorMessage(error); // Set the error message

  }, [location, selectedConnection, username, password, root , operation]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const performDownload = (msg) => {
    fetch(`http://localhost:8000/api/apply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
    })
    .then (
      resp => {
        console.log(resp);
        if (resp.headers.get("Content-Type") != "application/octet-stream") {
          alert("Error in getting value")
          return null
        }
        return resp.blob()
      },
      reason => { alert(`${reason}`);})
    .then(
      blob => {
        if (!blob) {
          return;
        }
        const url = window.URL.createObjectURL(blob); // create a new object url
        const a = document.createElement("a"); // create a new anchor element
        a.href = url; // set its href to the object URL
        a.download = "file.zip";  // set its download attribute to the deisred filename.
        a.click();
      },
      reason => { alert(`${reason}`);}
    )

  }


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
        if(operation === "download")
          performDownload(msg)
        else{
          const result = await performApply(msg);
          console.log('Apply result:', result);
          }
        // Handle the response
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
          {selectedConnection === 'local' && <option value="delete">Delete</option>}

          {selectedConnection !== 'local' && <option value="download">Download</option>}
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

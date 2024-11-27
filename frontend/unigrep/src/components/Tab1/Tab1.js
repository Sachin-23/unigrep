// Tab1.js
import React, { useState, useEffect } from "react";
import { useTabState } from "../../TabStateContext";
import "../FilterQuery/FilterQuery.css";
import "../Results/Results.css";
import FilterLocations from "../FilterLocations/FilterLocations";
import { performSearch } from "../utils/Search";

import "./Tab1.css";

const Tab1 = () => {
  const {
    selectedFileType,
    setSelectedFileType,
    selectedConnection,
    setSelectedConnection,
    selectedMode,
    setSelectedMode,
    searchResult,
    updateSearchResult,
    root,
    setRoot,
    username,
    setUsername,
    password,
    setPassword,
  } = useTabState();

  // Initialize state for the input field
  const [inputValue, setInputValue] = useState("My Doc:*");
  const [errorMessage, setErrorMessage] = useState("");

  // Handler function to update state when input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [locations, setLocations] = useState([
    "C:\\Users\\preet\\Documents",
  ]);

  const [isValid, setIsValid] = useState(false); // Tracks the validation status
  // Validation logic in useEffect
  useEffect(() => {
    let error = "";

    const isInputValid = inputValue.trim() !== "";
    const areLocationsValid =
      locations.length > 0 && locations.every((loc) => loc.trim() !== ""); // Check all locations have values
    const isAuthRequired = selectedConnection === "ssh";
    const isAuthValid =
      username &&
      password &&
      root &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      root.trim() !== "";
    const isOnlyRootRequired = selectedConnection === "ftp";
    const isOnlyRootValid = root && root.trim() !== "";

    setIsValid(
      isInputValid && areLocationsValid && (!isAuthRequired || isAuthValid),
    );
    if (!areLocationsValid) {
      error = "Please provide valid locations.";
    } else if (isAuthRequired && !isAuthValid) {
      error =
        "For SFTP connection, username, password, and root address are required.";
    } else if (isOnlyRootRequired && !isOnlyRootValid) {
      error = "Please provide valid root address";
    } else if (!isInputValid) {
      error = "Please provide valid filter Query";
    }

    setErrorMessage(error); // Set the error message
  }, [inputValue, locations, selectedConnection, username, password, root]); // Dependencies: Re-run when these change

  const handleSearch = async () => {
    // Build the request body based on input fields and selected radio buttons
    const msg = {
      search_type: selectedFileType, // Static value for now, can be dynamic if needed
      search_domain: selectedConnection, // Based on selected radio button for connection
      search_locations: locations, // Static values for now
      search_query: inputValue, // Value from the search input
      search_query_type: selectedMode, // Regex or glob from the radio button
      root_address: root,
      auth_username: username,
      auth_password: password,
      recursion_depth: 5,
    };
    console.log(msg);
    try {
      // Call performSearch from the utils file
      const result = await performSearch(msg);

      // Handle the response
      console.log("Search result:", result);
      updateSearchResult(result); // Store result in context
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="filter-body">
      <div className="caption">Filter Query</div>

      <input
        type="text"
        className="filter-bar"
        value={inputValue} // Bind input value to state
        onChange={handleInputChange} // Update state on input change
      />

      <div className="button-bar-set">
        <div className="button-bar darkgreen">
          <label className="radio-button">
            <input
              type="radio"
              value="filenames"
              checked={selectedFileType === "filenames"}
              onChange={(e) => setSelectedFileType(e.target.value)}
            />
            Filename
          </label>

          <label
            className={`radio-button ${selectedConnection === "ftp" ? "disabled" : ""}`}
          >
            <input
              type="radio"
              value="fileContent"
              checked={selectedFileType === "fileContent"}
              onChange={(e) => setSelectedFileType(e.target.value)}
              disabled={selectedConnection === "ftp"} // Disable if FTP is selected
            />
            File Content
          </label>

          {console.log(selectedConnection)}
        </div>

        <div className="button-bar">
          <label className="radio-button">
            <input
              type="radio"
              value="local"
              checked={selectedConnection === "local"}
              onChange={(e) => setSelectedConnection(e.target.value)}
            />
            Local
          </label>
          <label className="radio-button">
            <input
              type="radio"
              value="ftp"
              checked={selectedConnection === "ftp"}
              onChange={(e) => {
                setSelectedConnection(e.target.value);
                setSelectedFileType("filenames");
              }}
            />
            FTP
          </label>
          <label className="radio-button">
            <input
              type="radio"
              value="ssh"
              checked={selectedConnection === "ssh"}
              onChange={(e) => setSelectedConnection(e.target.value)}
            />
            SFTP
          </label>
        </div>

        <div className="spacer"></div>

        <div className="button-bar darkblue">
          <label className="radio-button">
            <input
              type="radio"
              value="glob"
              checked={selectedMode === "glob"}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            Glob
          </label>
          <label className="radio-button">
            <input
              type="radio"
              value="regex"
              checked={selectedMode === "regex"}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            Regex
          </label>
        </div>
      </div>

      {/* Conditionally render the input fields for Root, Username, and Password */}
      {(selectedConnection === "ftp" || selectedConnection === "ssh") && (
        <div className="credentials-form">
          <input
            type="text"
            value={root}
            onChange={(e) => setRoot(e.target.value)}
            placeholder="Root"
            label="root"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      )}

      <FilterLocations locations={locations} setLocations={setLocations} />

      {/* Search Button with inline CSS */}
      <button onClick={handleSearch} className="search" disabled={!isValid}>
        Search
      </button>
      {errorMessage && (
        <p className="error" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

      <div className="results-container">
        {/* {searchResult && <div className="caption">Results [{searchResult.path.length}]</div>} */}
        <div className="results-bar">
          {/* {searchResult.map((sourceItem, sourceIndex) => (
                        <div key={sourceIndex} className="source">

                            {sourceItem.result.map((resultItem, resultIndex) => (
                                <div key={resultIndex} className="result">
                                    <div className="matchType">Match Type: {resultItem.match_type}</div>
                                    <div className="path">Path: {resultItem.path}</div>
                                </div>
                            ))}
                        </div>
                    ))} */}

          {searchResult &&
            Object.values(searchResult.path).map((path, index) => (
              <div className="path" key={index}>
                <span className="result-title">Path: </span>
                <span className="result-path">{path}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div>
  //       <h3>Tab 1</h3>

  //       {/* File Type Radio Buttons */}
  //       <div>
  //         <label>
  //           <input
  //             type="radio"
  //             value="filename"
  //             checked={selectedFileType === 'filename'}
  //             onChange={(e) => setSelectedFileType(e.target.value)}
  //           />
  //           Filename
  //         </label>
  //         <label>
  //           <input
  //             type="radio"
  //             value="fileContent"
  //             checked={selectedFileType === 'fileContent'}
  //             onChange={(e) => setSelectedFileType(e.target.value)}
  //           />
  //           File Content
  //         </label>
  //       </div>

  //       {/* Connection Type Radio Buttons */}
  //       <div>
  //         <label>
  //           <input
  //             type="radio"
  //             value="local"
  //             checked={selectedConnection === 'local'}
  //             onChange={(e) => setSelectedConnection(e.target.value)}
  //           />
  //           Local
  //         </label>
  //         <label>
  //           <input
  //             type="radio"
  //             value="ftp"
  //             checked={selectedConnection === 'ftp'}
  //             onChange={(e) => setSelectedConnection(e.target.value)}
  //           />
  //           FTP
  //         </label>
  //         <label>
  //           <input
  //             type="radio"
  //             value="sftp"
  //             checked={selectedConnection === 'sftp'}
  //             onChange={(e) => setSelectedConnection(e.target.value)}
  //           />
  //           SFTP
  //         </label>
  //       </div>

  //       {/* Mode Radio Buttons */}
  //       <div>
  //         <label>
  //           <input
  //             type="radio"
  //             value="blob"
  //             checked={selectedMode === 'blob'}
  //             onChange={(e) => setSelectedMode(e.target.value)}
  //           />
  //           Blob
  //         </label>
  //         <label>
  //           <input
  //             type="radio"
  //             value="regex"
  //             checked={selectedMode === 'regex'}
  //             onChange={(e) => setSelectedMode(e.target.value)}
  //           />
  //           Regex
  //         </label>
  //       </div>

  //       {/* Search Input */}
  //       <div>
  //         <input
  //           type="text"
  //           value={searchQuery}
  //           onChange={(e) => setSearchQuery(e.target.value)}
  //           placeholder="Enter search query"
  //         />
  //       </div>

  //       {/* Search Button */}
  //       <button onClick={handleSearch}>Search</button>
  //     </div>
  //   );
};

export default Tab1;

// Tab1.js
import React, { useState } from 'react';
import { useTabState } from '../../TabStateContext';
import '../FilterQuery/FilterQuery.css';
import '../Results/Results.css'
import FilterLocations from '../FilterLocations/FilterLocations';
import { performSearch } from '../utils/Search';
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
    const [inputValue, setInputValue] = useState('My Doc:*');

    // Handler function to update state when input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const [locations, setLocations] = useState([
        "/home/user/preet",
        "/home/user/Downloads",
        "/home/user/Uploads/sent",
      ]);
    const handleSearch = async () => {
        // Build the request body based on input fields and selected radio buttons
        const msg = {
            search_types: [selectedFileType], // Static value for now, can be dynamic if needed
            search_domains: [selectedConnection], // Based on selected radio button for connection
            search_locations: locations, // Static values for now
            search_query: inputValue, // Value from the search input
            search_query_type: selectedMode, // Regex or Blob from the radio button
        };

        try {
            // Call performSearch from the utils file
            const result = await performSearch(msg);

            // Handle the response
            console.log('Search result:', result);
            updateSearchResult(result); // Store result in context
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div className="filter-body">
            <div className="caption">Filter Query</div>

            <input
                type="text"
                className="filter-bar"
                value={inputValue}  // Bind input value to state
                onChange={handleInputChange}  // Update state on input change
            />

            <div className="button-bar-set">
                <div className="button-bar darkgreen">
                    <label className="radio-button">
                        <input
                            type="radio"
                            value="filename"
                            checked={selectedFileType === 'filename'}
                            onChange={(e) => setSelectedFileType(e.target.value)}
                        />
                        Filename
                    </label>

                    <label className={`radio-button ${selectedConnection === 'ftp' ? 'disabled' : ''}`}>
                        <input
                            type="radio"
                            value="fileContent"
                            checked={selectedFileType === 'fileContent'}
                            onChange={(e) => setSelectedFileType(e.target.value)}
                            disabled={selectedConnection === 'ftp'} // Disable if FTP is selected

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
                            checked={selectedConnection === 'local'}
                            onChange={(e) => setSelectedConnection(e.target.value)}
                        />
                        Local
                    </label>
                    <label className="radio-button">
                        <input
                            type="radio"
                            value="ftp"
                            checked={selectedConnection === 'ftp'}
                            onChange={(e) => {
                                setSelectedConnection(e.target.value)
                                setSelectedFileType('filename')
                            }}
                        />
                        FTP
                    </label>
                    <label className="radio-button">
                        <input
                            type="radio"
                            value="sftp"
                            checked={selectedConnection === 'sftp'}
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
                            value="blob"
                            checked={selectedMode === 'blob'}
                            onChange={(e) => setSelectedMode(e.target.value)}
                        />
                        Blob
                    </label>
                    <label className="radio-button">
                        <input
                            type="radio"
                            value="regex"
                            checked={selectedMode === 'regex'}
                            onChange={(e) => setSelectedMode(e.target.value)}
                        />
                        Regex
                    </label>
                </div>
            </div>

            {/* Conditionally render the input fields for Root, Username, and Password */}
            {(selectedConnection === "ftp" || selectedConnection === "sftp") && (
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
            <button
                onClick={handleSearch}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px',
                }}
            >
                Search
            </button>


            <div className="results-container">
                <div className="caption">Results [{searchResult.length}]</div>
                <div className="results-bar">
                    {searchResult.map((sourceItem, sourceIndex) => (
                        <div key={sourceIndex} className="source">
                           
                            {/* Loop through each result within the source */}
                            {sourceItem.result.map((resultItem, resultIndex) => (
                                <div key={resultIndex} className="result">
                                    <div className="matchType">Match Type: {resultItem.match_type}</div>
                                    <div className="path">Path: {resultItem.path}</div>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
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

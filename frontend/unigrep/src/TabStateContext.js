// TabStateContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const TabStateContext = createContext();

// Create Provider
export const TabStateProvider = ({ children }) => {
  const [selectedFileType, setSelectedFileType] = useState('filename');
  const [selectedConnection, setSelectedConnection] = useState('local');
  const [selectedMode, setSelectedMode] = useState('blob');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [root, setRoot] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Function to update the search result
  const updateSearchResult = (result) => setSearchResult(result);

  return (
    <TabStateContext.Provider
      value={{
        selectedFileType,
        setSelectedFileType,
        selectedConnection,
        setSelectedConnection,
        selectedMode,
        setSelectedMode,
        searchQuery,
        setSearchQuery,
        searchResult,
        updateSearchResult,
        root,
        setRoot,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      {children}
    </TabStateContext.Provider>
  );
};

// Custom hook to use the context
export const useTabState = () => useContext(TabStateContext);

// TabStateContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const TabStateContext = createContext();

// Create Provider
export const TabStateProvider = ({ children }) => {
  const [selectedFileType, setSelectedFileType] = useState('filenames');
  const [selectedConnection, setSelectedConnection] = useState('local');
  const [selectedMode, setSelectedMode] = useState('glob');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [root, setRoot] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
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

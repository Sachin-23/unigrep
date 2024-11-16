// Tab2.js
import React from 'react';
import { useTabState } from '../../TabStateContext';

const Tab2 = () => {
  const { selectedFileType, selectedConnection, selectedMode, searchResult , root, username, password } = useTabState();

  return (
    <div>
      <h3>Tab 2</h3>
      <p><strong>File Type:</strong> {selectedFileType}</p>
      <p><strong>Connection Type:</strong> {selectedConnection}</p>
      <p><strong>Mode:</strong> {selectedMode}</p>

      {/* Display the search result */}
      <textarea readOnly value={searchResult} placeholder="Search results will appear here" />

      <div>
        <p><strong>Root:</strong> {root}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Password:</strong> {password}</p>
      </div>
    </div>
  );
};

export default Tab2;

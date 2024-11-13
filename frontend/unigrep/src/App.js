import React, { useState } from 'react';
import Header from './components/Header/Header';
import FilterQuery from './components/FilterQuery/FilterQuery';
import FilterLocations from './components/FilterLocations/FilterLocations';
import Results from './components/Results/Results';
// Import the ApplyTab component, which we'll create next
import ApplyTab from './components/ApplyTab/ApplyTab';

function App() {
  const [activeTab, setActiveTab] = useState("filter");

  // Function to toggle tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />

      {/* Tab Buttons */}
      <div className="tabbar">
        <div
          className={`tab ${activeTab === "filter" ? "active-tab" : ""}`}
          onClick={() => toggleTab("filter")}
        >
          Filter
        </div>
        <div
          className={`tab ${activeTab === "apply" ? "active-tab" : ""}`}
          onClick={() => toggleTab("apply")}
        >
          Apply
        </div>
        <div className="spacer"></div>
        <div className="tab">Settings</div>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "filter" ? (
        <>
          <FilterQuery />
          <FilterLocations />
          <Results />
        </>
      ) : (
        <ApplyTab />
      )}
    </div>
  );
}

export default App;
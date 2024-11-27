import React, { useState } from "react";
import "./FilterQuery.css";

function FilterQuery() {
  const [selectedOption, setSelectedOption] = useState("filenames");
  const [selectedLocation, setSelectedLocation] = useState("local");

  // Handle location change, reset to "filenames" if "ftp" is selected
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    if (location === "ftp") {
      setSelectedOption("filenames");
    }
  };

  return (
    <div className="filter-body">
      <div className="caption">Filter Query</div>
      <div className="filter-bar" contentEditable={true}>
        My Doc:*
      </div>
      <div className="button-bar-set-set">
        <div className="button-bar">
          <input
            type="radio"
            name="queryType"
            value="filenames"
            className="button"
            checked={selectedOption === "filenames"}
            onChange={() => setSelectedOption("filenames")}
          />
          <label className="radio-button">Filenames</label>
          <input
            type="radio"
            name="queryType"
            value="fileContents"
            checked={selectedOption === "fileContents"}
            onChange={() => setSelectedOption("fileContents")}
            disabled={selectedLocation === "ftp"} // Disable if FTP is selected
          />
          <label
            className={`radio-button ${selectedLocation === "ftp" ? "disabled" : ""}`}
          >
            File Contents
          </label>
        </div>

        {/* Local, FTP, and SFTP as radio buttons */}
        <div className="button-bar">
          <input
            type="radio"
            name="locationType"
            value="local"
            checked={selectedLocation === "local"}
            onChange={() => handleLocationChange("local")}
          />
          <label className="radio-button">Local</label>
          <input
            type="radio"
            name="locationType"
            value="ftp"
            checked={selectedLocation === "ftp"}
            onChange={() => handleLocationChange("ftp")}
          />
          <label className="radio-button">FTP</label>
          <input
            type="radio"
            name="locationType"
            value="sftp"
            checked={selectedLocation === "sftp"}
            onChange={() => handleLocationChange("sftp")}
          />
          <label className="radio-button">SFTP</label>
        </div>

        <div className="spacer"></div>

        {/* Basic, Glob, and Regex buttons */}
        <div className="button-bar darkblue">
          <div className="button">Basic</div>
          <div className="button">Glob</div>
          <div className="button">Regex</div>
        </div>
      </div>
    </div>
  );
}

export default FilterQuery;

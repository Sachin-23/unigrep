import React, { useEffect, useState } from 'react';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);

  // Simulate an API call to fetch results
  useEffect(() => {
    // Sample data to simulate API response
    const fetchData = async () => {
      // This would typically be an actual API call
      const data = [
        { filename: 'My Doc: First.doc', location: '/home/user/Documents/work' },
        { filename: 'My Doc: Second.doc', location: '/home/user/Documents/work' },
        { filename: 'My Doc: Third.doc', location: '/home/user/Documents/work' },
        { filename: 'My Doc: First Draft.doc', location: '/home/user/Documents/work/backup' },
      ];
      setResults(data);
    };

    fetchData();
  }, []);

  return (
    <div className="results-container">
      <div className="caption">Results [{results.length}]</div>
      <div className="results-bar">
        {results.map((result, index) => (
          <div key={index} className="result">
            <div className="title">{result.filename}</div>
            <div className="path">{result.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;

import logo from './logo.svg';
import Header from './components/Header/Header';
import FilterQuery from './components/FilterQuery/FilterQuery';
import './App.css';
import FilterLocations from './components/FilterLocations/FilterLocations';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Header />
        <FilterQuery />
        <FilterLocations/>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

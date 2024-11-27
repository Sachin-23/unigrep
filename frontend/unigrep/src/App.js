import React, { useState } from 'react';
import { TabStateProvider } from './TabStateContext';
import Tab1 from './components/Tab1/Tab1';
import Tab2 from './components/Tab2/Tab2';
import Header from './components/Header/Header';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <TabStateProvider>
      <Header/>
      <div className="container">
        <button className="tab" onClick={() => setActiveTab(1)}>Filter</button>
        <button onClick={() => setActiveTab(2)}>Apply</button>

        {activeTab === 1 && <Tab1 />}
        {activeTab === 2 && <Tab2 />}
      </div>
    </TabStateProvider>);
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Greeter } from './components/greeter/greeter';

function App() {

  const user = { firstName: "SPFx", lastName: "Developer" };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            <Greeter user={user} />
            {/* <SkillList /> */}
          </div>
        </div>
    
  );
}

export default App;

import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Greeter } from './components/greeter/greeter';
import { SkillList } from './components/skill-list/skill-list';

const skillData = require('./skills.json');

function App() {

  const [skills, setSkills] = useState(skillData)

  const user = { firstName: "SPFx", lastName: "Developer" };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            <Greeter user={user} />
            <SkillList skills={skills} />
          </div>
        </div>
    
  );
}

export default App;

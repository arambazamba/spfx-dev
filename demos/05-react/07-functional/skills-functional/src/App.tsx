import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Greeter } from './components/greeter/greeter';
import { SkillList } from './components/skill-list/skill-list';
import axios from 'axios';

function App() {

  const [skills, setSkills] = useState([])

  const user = { firstName: "SPFx", lastName: "Developer" };

  useEffect(() => {
    axios
    .get('http://localhost:3001/skills.json')
    .then((res) => {
      setSkills(res.data)
    })
    .catch((err) => console.log('err fetching data: ', err));
}, []);

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

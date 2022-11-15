import SkillList from "./components/SkillList";
import * as React from "react";
import "./App.css";
import { Skill } from "./skill";
import axios from "axios";
import { Greeting } from "./components/Greeting";
import { IContext, SkillsCtx } from "./skills-context";

const logo = require("./logo.svg");

/*
// AppState is now IContext - because it is the same
// can be nested if needed - but not for this simple sample

export interface AppState {
  skills: Skill[];
  original_skills:Skill[],
  removeSkill:(skill: Skill)=>void,
  toggleComplete:(id: number)=>void,
  addSkill:(skill: string)=>void,
  filterSkills: (filter: string)=>void
}
*/

class App extends React.Component<any, IContext> {
  constructor(props: any) {
    super(props);
    this.state = {

      skills: [],
      original_skills: [],
      removeSkill:this.removeSkill,
      toggleComplete:this.toggleComplete,
      addSkill:this.addSkill,
      filterSkills: this.filterSkills
    };
  }

  componentDidMount() {
    this.loadData()
    
  }

  render() {
    return (
      <SkillsCtx.Provider value={this.state}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            <Greeting user={user} />
            <SkillList />
          </div>
        </div>
      </SkillsCtx.Provider>
    );
  }



  // Data processing - load and process on the same level

  loadData=():void => {
    axios
        .get("http://localhost:3000/skills.json")
        .then((res) => {
          this.setState((state, props) => ({ ...state, skills: res.data, original_skills: res.data }));
        })
        .catch((err) => console.log("err fetching data: ", err));
  }

  removeSkill=(skill: Skill): void => {
    console.log(`Removing skill: ${skill.name}`);
    
    this.setState({
      ...this.state,
      skills: this.state.skills.filter((i: Skill) => i !== skill),
    });
    
  }

  toggleComplete=(id: number):void => {
    this.setState({
      ... this.state,
      skills: this.state.skills.map((sk) => {
        if (sk.id === id) {
          sk.completed = !sk.completed;
        }
        return sk;
      }),
    });
  }

  //addSkill uses arrow function syntax
  addSkill = (skill: string):void => {
    let newid = Math.max.apply(
      Math,
      this.state.skills.map((item) => item.id + 1)
    );
    console.log(`Adding skill: ${skill} with ${newid}`);
    this.setState({
      ... this.state,
      skills: this.state.skills.concat([
        { id: newid, name: skill, completed: false },
      ]),
    });
  };

  filterSkills = (filter: string):void => {
    console.log("Filtering for: ", filter);
    filter != ""
      ? this.setState({
          ... this.state,
          skills: this.state.skills.filter((i) => i.name.includes(filter)),
        })
      : this.setState({
          ... this.state,
          skills: this.state.original_skills,
        });
  };


}

let user = { firstName: "SPFx", lastName: "Developer" };

export default App;

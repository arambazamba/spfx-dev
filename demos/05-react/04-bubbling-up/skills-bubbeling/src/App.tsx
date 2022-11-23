import SkillList from './components/SkillList';
import * as React from 'react';
import './App.css';
import { Skill } from './skill';
import axios from 'axios';
import { Greeting } from './components/Greeting';

const logo = require('./logo.svg');

export interface AppState {
	skills: Skill[];
	title: string;
}

class App extends React.Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			skills: [],
			title: "Welcome to React"
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3000/skills.json')
			.then((res) => {
				this.setState((state, props) => ({ skills: res.data }));
			})
			.catch((err) => console.log('err fetching data: ', err));
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>{this.state.title}</h2>
				</div>
				<div className="App-intro">
					<Greeting user={user} />
					<SkillList skills={this.state.skills} />
				</div>
			</div>
		);
	}
}

let user = { firstName: 'SPFx', lastName: 'Developer' };

export default App;

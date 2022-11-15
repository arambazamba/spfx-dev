import SkillList from './components/SkillList';
import { Greeting } from './components/Greeting';
import * as React from 'react';
import './App.css';
import { Skill } from './skill';

const logo = require('./logo.svg');

export interface AppState {
	skills: Skill[];
}

class App extends React.Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			skills: [
				{ id: 1, name: 'node.js', completed: true },
				{ id: 2, name: 'type script', completed: false },
				{ id: 3, name: 'pnp core js', completed: false },
				{ id: 4, name: 'ms graph', completed: false }
			]
		};
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					<Greeting />
					<SkillList skills={this.state.skills} />
				</p>
			</div>
		);
	}
}

export default App;

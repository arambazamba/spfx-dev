import * as React from 'react';
import './SkillList.css';
import { Skill } from '../skill';

export interface SkillListProps {
	skills: Skill[];
}

export interface SkillListState {
	skills: Skill[];
	skillToAdd: string;
}

export default class SkillList extends React.Component<SkillListProps, SkillListState> {
	constructor(props: SkillListProps) {
		super(props);
		this.state = {
			skills: this.props.skills,
			skillToAdd: ''
		};

		this.handleSkillChange = this.handleSkillChange.bind(this);
	}

	componentWillReceiveProps(props: SkillListProps) {
		this.setState((state, props) => ({ skills: props.skills }));
	}

	render() {
		return (
			<div className="container">
				<div>Your need the follwowing skills</div>
				<div className="skillContainer">
					{this.state.skills.map((item) => {
						return (
							<div key={item.id} className="skillRow">
								<div>
									<input type="checkbox" />
								</div>
								<div>{item.name}</div>
								<div style={{ cursor: 'pointer' }} onClick={() => this.removeSkill(item)} />
							</div>
						);
					})}
				</div>
				<div className="addPannel">
					<div>
						<label className="lblNewSkill">Enter a new skill:</label>
						<input type="text" value={this.state.skillToAdd} onChange={this.handleSkillChange} />
						<button onClick={() => this.addSkill()}>Add</button>
					</div>
					{this.state.skillToAdd ? <div style={divResponse}>You typed: {this.state.skillToAdd}</div> : null}
				</div>
			</div>
		);
	}

	handleSkillChange(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ skillToAdd: e.currentTarget.value });
	}

	addSkill(): void {
		let newid = Math.max.apply(Math, this.state.skills.map((item) => item.id + 1));
		this.setState({
			skills: this.state.skills.concat([ { id: newid, name: this.state.skillToAdd, completed: false } ]),
			skillToAdd: ''
		});
		console.log(`Adding skill: ${this.state.skillToAdd} with ${newid}`);
	}

	removeSkill(skill: Skill): void {
		console.log(`Removing skill: ${skill.name}`);
		this.setState({
			skills: this.state.skills.filter((i: Skill) => i !== skill)
		});
	}
}

const divResponse = {
	color: '#CC3B3B',
	margin: '10px'
};

import * as React from 'react';
import './addskill.css';

export interface Props {
	addSkill(skill: string): void;
}

export interface State {
	skillToAdd: string;
}

export default class AddSkill extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			skillToAdd: ''
		};
		this.handleSkillChange = this.handleSkillChange.bind(this);
	}

	render() {
		return (
			<div className="addPannel">
				<div>
					<label className="lblNewSkill">Enter a new skill:</label>
					<input type="text" value={this.state.skillToAdd} onChange={this.handleSkillChange} />
					<button onClick={() => this.props.addSkill(this.state.skillToAdd)}>Add</button>
				</div>
				{this.state.skillToAdd ? <div>You typed: {this.state.skillToAdd}</div> : null}
			</div>
		);
	}

	handleSkillChange(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ skillToAdd: e.currentTarget.value });
	}
}

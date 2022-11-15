import * as React from 'react';
import './SkillList.css';
import { Skill } from '../skill';
import AddSkill from './AddSkill';
import SkillItem from './SkillItem';
import SkillFilter from './SkillFilter';

export interface SkillListProps {
	skills: Skill[];
}

export interface SkillListState {
	skills: Skill[];
	// skillToAdd: string;
}

export default class SkillList extends React.Component<SkillListProps, SkillListState> {
	constructor(props: SkillListProps) {
		super(props);
		this.state = {
			skills: this.props.skills
		};
	}

	componentWillReceiveProps(props: SkillListProps) {
		this.setState((state, props) => ({ skills: props.skills }));
	}

	render() {
		return (
			<div className="container">
				<SkillFilter onFilter={this.filterSkills} />
				<div>Your need the follwowing skills</div>
				<div className="skillContainer">
					{this.state.skills.map((item) => {
						return (
							<SkillItem
								key={item.id}
								item={item}
								removeSkill={this.removeSkill.bind(this)}
								toggleComplete={this.toggleComplete.bind(this)}
							/>
						); //Notice this.method.bind(this) syntax
					})}
				</div>
				{/* Notice we don't use this.method.bind(this) syntax here ... instead we implement an arrow function */}
				<AddSkill addSkill={this.addSkill} />
			</div>
		);
	}

	removeSkill(skill: Skill): void {
		console.log(`Removing skill: ${skill.name}`);
		this.setState({
			skills: this.state.skills.filter((i: Skill) => i !== skill)
		});
	}

	toggleComplete(id: number) {
		this.setState({
			skills: this.state.skills.map((sk) => {
				if (sk.id === id) {
					sk.completed = !sk.completed;
				}
				return sk;
			})
		});
	}

	//addSkill uses arrow function syntax
	addSkill = (skill: string) => {
		let newid = Math.max.apply(Math, this.state.skills.map((item) => item.id + 1));
		console.log(`Adding skill: ${skill} with ${newid}`);
		this.setState({
			skills: this.state.skills.concat([ { id: newid, name: skill, completed: false } ])
		});
	};

	filterSkills = (filter: string) => {
		console.log('Filtering for: ', filter);
		filter != ''
			? this.setState({
					skills: this.state.skills.filter((i) => i.name.includes(filter))
				})
			: this.setState({
					skills: this.props.skills
				});
	};
}

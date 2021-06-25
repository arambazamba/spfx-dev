import * as React from 'react';
import { Skill } from '../../skill';
import './skillitem.css';

export interface Props {
	item: Skill;
	removeSkill(skill: Skill): void;
	toggleComplete(id: number): void;
}

export interface State {
	item: Skill;
}

export default class SkillItem extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
		// this.state = {
		// 	item: this.props.item
		// };
	}

	render() {
		// Using Destructoring
		const { completed, name } = this.props.item;
		return (
			<div className="skillRow">
				<div>
					{/* 
					Shorter but harder maybe to unserstand?
					<input type="checkbox" checked={this.props.item.completed} onChange={this.props.toggleComplete.bind(this, id)} /> 
					*/}
					<input type="checkbox" checked={this.props.item.completed} onChange={this.toggleComplete} />
				</div>
				{/* 
				Original version:
				<div style={this.getStyle()}>{this.props.item.name}</div> 
				When using Destructuring you can also use the destructured var: name
				*/}
				<div style={this.getStyle()}>{name}</div>
				<div style={{ cursor: 'pointer' }} onClick={() => this.props.removeSkill(this.props.item)}>
					{completed ? <img src="remove.svg" alt="Logo" /> : ''}
				</div>
			</div>
		);
	}

	toggleComplete = () => {
		console.log(this.props.item.completed);
		this.props.toggleComplete(this.props.item.id);
	};

	getStyle() {
		return { textDecoration: this.props.item.completed ? 'line-through' : 'none' };
	}
}

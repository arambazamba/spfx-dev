import * as React from 'react';
import { Skill } from '../../skill';

export interface Props {
	item: Skill;
}

export interface State {}

export default class SkillItem extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}

import * as React from 'react';
import './Greeting.css';
import { User } from '../user';

export interface GreetingProps {
	user: User;
}

export class Greeting extends React.Component<GreetingProps, any> {
	constructor(props: GreetingProps) {
		super(props);
		this.state = {
			user: this.props.user
		};
	}

	render() {
		return (
			<div>
				<h2>Hello, {this.formatName(this.state.user)}</h2>
			</div>
		);
	}

	formatName(user: any) {
		return user.firstName + ' ' + user.lastName;
	}
}

export default Greeting;

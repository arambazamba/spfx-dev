import * as React from 'react';
import './skillfilter.css';

export interface Props {
	onFilter(f: string): void;
}

export interface State {}

export default class SkillFilter extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="searchPannel">
				<div>
					<input type="text" onChange={this.handleFilterChange} placeholder="Type your filter:" />
				</div>
			</div>
		);
	}

	handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.props.onFilter(e.currentTarget.value);
	};
}

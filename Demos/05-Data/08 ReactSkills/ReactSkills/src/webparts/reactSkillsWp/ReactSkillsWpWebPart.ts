import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactSkillsWpWebPartStrings';
import ReactSkillsWp from './components/ReactSkillsWp';
import { SPHttpClient } from '@microsoft/sp-http';
import { Skill } from './components/skill';
import { IReactSkillsWpProps } from './components/ReactSkillsWpProps';

export interface IReactSkillsWebPartProps {
	description: string;
}

export default class ReactSkillsWebPart extends BaseClientSideWebPart<IReactSkillsWebPartProps> {
	constructor() {
		super();
	}

	public render(): void {
		this.getSkillData().then((data) => {
			const element: React.ReactElement<IReactSkillsWpProps> = React.createElement(ReactSkillsWp, {
				skills: data
			});
			ReactDom.render(element, this.domElement);
		});
	}

	private getSkillData(): Promise<Skill[]> {
		console.log('url: ', this.context.pageContext.web.absoluteUrl);
		const url: string = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('skills')/items`;
		return this.context.spHttpClient
			.get(url, SPHttpClient.configurations.v1)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				return json.value;
			}) as Promise<Skill[]>;
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel
								})
							]
						}
					]
				}
			]
		};
	}
}

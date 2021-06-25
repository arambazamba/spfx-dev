import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GraphWpWebPart.module.scss';
import * as strings from 'GraphWpWebPartStrings';

import { HttpClientResponse } from '@microsoft/sp-http';
import { IOffice365Group } from './IGroup';

import { MSGraphClient } from '@microsoft/sp-http';

export interface IGraphWpWebPartProps {
	description: string;
}

export default class GraphWpWebPart extends BaseClientSideWebPart<IGraphWpWebPartProps> {
	private graphClient: MSGraphClient;

	//Get a reference to Graph Client
	public onInit(): Promise<void> {
		return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
			this.context.msGraphClientFactory.getClient().then(
				(client: MSGraphClient): void => {
					this.graphClient = client;
					resolve();
				},
				(err) => reject(err)
			);
		});
	}

	public render(): void {
		this.domElement.innerHTML = `
     <div class="${styles.graphWp}">
     <div class="${styles.container}">
     <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
       <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
         <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
         <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using web parts.</p>
         <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
         <a id="btnReadGraph" class="${styles.button}">
           <span class="${styles.label}">Read /me from MS Graph</span>
         </a>
         <p>       
         </p>
         <div id="graphResult" ></div>
       </div>
     </div>
   </div>
 </div>`;
		this.domElement.querySelector('#btnReadGraph').addEventListener('click', () => {
			this.readGraph();
		});
	}

	protected readGraph() {
		// Query for all groups on the tenant using Microsoft Graph.
		this.graphClient.api('me').version('v1.0').select('displayName,mail,userPrincipalName').get((err, res) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(res);
			const tableContainer: Element = this.domElement.querySelector('#graphResult');
			tableContainer.innerHTML = 'Hello ' + res.userPrincipalName;
		});
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

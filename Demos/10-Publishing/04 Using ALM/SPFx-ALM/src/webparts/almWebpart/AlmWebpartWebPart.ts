import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AlmWebpartWebPart.module.scss';
import * as strings from 'AlmWebpartWebPartStrings';

export interface IAlmWebpartWebPartProps {
	description: string;
}

export default class AlmWebpartWebPart extends BaseClientSideWebPart<IAlmWebpartWebPartProps> {
	public render(): void {
		this.domElement.innerHTML = `
      <div class="${styles.almWebpart}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <div>ALM Sample</div>             
            </div>
          </div>
        </div>
      </div>`;
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

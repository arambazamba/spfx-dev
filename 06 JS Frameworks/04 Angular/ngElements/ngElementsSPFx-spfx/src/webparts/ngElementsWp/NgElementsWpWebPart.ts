import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NgElementsWpWebPartStrings';

import 'ng-elements-sp-fx/dist/ngElementsSPFx/bundle.js';

export interface INgElementsWpWebPartProps {
  description: string;
}

export default class NgElementsWpWebPart extends BaseClientSideWebPart<INgElementsWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<app-ng-elements-wp-web-part description="${ this.properties.description }"></app-ng-elements-wp-web-part>`;
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

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HandlebarWpWebPart.module.scss';
import * as strings from 'HandlebarWpWebPartStrings';

import * as Handlebars from 'handlebars';


export interface IHandlebarWpWebPartProps {
  description: string;
}

export default class HandlebarWpWebPart extends BaseClientSideWebPart<IHandlebarWpWebPartProps> {

  public render(): void {

    // load and precompile template
    var HandlebarWpWebPartTemplate =  <HandlebarsTemplateDelegate>require('./components/HandlebarWpWebPart.hbs');

    var data = {
      styles: styles,
      description: this.properties.description
    };

    this.domElement.innerHTML = HandlebarWpWebPartTemplate(data);

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

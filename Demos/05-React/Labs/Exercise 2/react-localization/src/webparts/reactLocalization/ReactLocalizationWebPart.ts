import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactLocalizationWebPartStrings';
import ReactLocalization from './components/ReactLocalization';
import { IReactLocalizationProps } from './components/IReactLocalizationProps';

export interface IReactLocalizationWebPartProps {
  description: string;
}

export default class ReactLocalizationWebPart extends BaseClientSideWebPart<IReactLocalizationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactLocalizationProps > = React.createElement(
      ReactLocalization,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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

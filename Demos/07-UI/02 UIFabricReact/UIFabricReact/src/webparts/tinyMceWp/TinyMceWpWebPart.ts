import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TinyMceWpWebPartStrings';
import TinyMceWp from './components/TinyMceWp';
import { ITinyMceWpProps } from './components/ITinyMceWpProps';

export interface ITinyMceWpWebPartProps {
  Content: string;
}

export default class TinyMceWpWebPart extends BaseClientSideWebPart<ITinyMceWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITinyMceWpProps > = React.createElement(
      TinyMceWp,
      {
        saveRteContent: this.setRteContentProp.bind(this),
        isReadMode: DisplayMode.Read === this.displayMode,
        content: this.properties.Content
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private setRteContentProp(content: string): void {
    this.properties['Content'] = content;
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
